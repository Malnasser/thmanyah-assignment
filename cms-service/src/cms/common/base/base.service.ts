import { FindManyOptions, DeepPartial, FindOptionsOrder } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { IBaseService } from './interfaces/base-service.interface';
import { IBaseRepository } from './interfaces/base-repoitory.interface';

export abstract class BaseService<T> implements IBaseService<T> {
  protected baseRepository: IBaseRepository<T>;
  protected cacheManager: Cache;
  protected entityType: new () => T;

  constructor(
    baseRepository: IBaseRepository<T>,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    entityType: new () => T,
  ) {
    this.baseRepository = baseRepository;
    this.cacheManager = cacheManager;
    this.entityType = entityType;
  }

  protected getCacheKey(
    id?: string | number | Partial<T>,
    select?: (keyof T)[] | undefined,
  ): string {
    const entityName = this.entityType.name.toLowerCase();
    const key = id
      ? typeof id === 'object'
        ? `${entityName}_${JSON.stringify(id)}`
        : `${entityName}_${id}`
      : `all_${entityName}s`;
    const selectKey = select && select.length > 0 ? select.join(',') : 'all';
    const finalKey = `${key}_select_${selectKey}`;
    console.log(`Generated cache key: ${finalKey}`);
    return finalKey;
  }

  protected getPaginationCacheKey(
    page: number,
    limit: number,
    condition?: Partial<T>,
    select?: (keyof T)[] | undefined,
    sort?: FindOptionsOrder<T>,
  ): string {
    const entityName = this.entityType.name.toLowerCase();
    const conditionKey = condition ? JSON.stringify(condition) : 'all';
    const selectKey = select && select.length > 0 ? select.join(',') : 'all';
    const sortKey = sort ? JSON.stringify(sort) : 'all';
    return `${entityName}_page_${page}_limit_${limit}_${conditionKey}_select_${selectKey}_sort_${sortKey}`;
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const createdEntity = await this.baseRepository.create(entity);
    await this.cacheManager.del(this.getCacheKey());
    return createdEntity;
  }

  async findById(
    id: string | number,
    select?: (keyof T)[] | undefined,
  ): Promise<T | null> {
    const cacheKey = this.getCacheKey(id, select);
    console.log(`Attempting to get from cache with key: ${cacheKey}`);
    const cachedData = await this.cacheManager.get<T>(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedData;
    }
    console.log(`Cache miss for key: ${cacheKey}. Fetching from repository.`);
    const data = await this.baseRepository.findById(id, select);
    if (data) {
      console.log(
        `Data fetched from repository. Setting cache for key: ${cacheKey}`,
      );
      await this.cacheManager.set(cacheKey, data, 60 * 60 * 1000); // 1 hour TTL
    } else {
      console.log(`No data found from repository for key: ${cacheKey}`);
    }
    return data;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const cacheKey = this.getCacheKey();
    console.log(`Attempting to get from cache with key: ${cacheKey}`);
    const cachedData = await this.cacheManager.get<T[]>(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedData;
    }
    console.log(`Cache miss for key: ${cacheKey}. Fetching from repository.`);
    const data = await this.baseRepository.findAll(options);
    console.log(
      `Data fetched from repository. Setting cache for key: ${cacheKey}`,
    );
    await this.cacheManager.set(cacheKey, data, 60 * 60 * 1000); // 1 hour TTL
    return data;
  }

  async update(id: string | number, entity: Partial<T>): Promise<T | null> {
    const updatedEntity = await this.baseRepository.update(id, entity);
    console.log(
      `Invalidating cache for all entities with key: ${this.getCacheKey()}`,
    );
    await this.cacheManager.del(this.getCacheKey()); // Invalidate all
    console.log(
      `Invalidating cache for specific entity with key: ${this.getCacheKey(id)}`,
    );
    await this.cacheManager.del(this.getCacheKey(id)); // Invalidate specific
    return updatedEntity;
  }

  async delete(id: string | number): Promise<T | null> {
    const entityToDelete = await this.baseRepository.findById(id);
    if (!entityToDelete) {
      return null;
    }
    const result = await this.baseRepository.delete(id);
    if (result) {
      console.log(
        `Invalidating cache for all entities with key: ${this.getCacheKey()}`,
      );
      await this.cacheManager.del(this.getCacheKey()); // Invalidate all
      console.log(
        `Invalidating cache for specific entity with key: ${this.getCacheKey(id)}`,
      );
      await this.cacheManager.del(this.getCacheKey(id)); // Invalidate specific
      return entityToDelete;
    }
    return null;
  }

  async findOne(condition: Partial<T>): Promise<T | null> {
    const cacheKey = this.getCacheKey(condition);
    console.log(`Attempting to get from cache with key: ${cacheKey}`);
    const cachedData = await this.cacheManager.get<T>(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedData;
    }
    console.log(`Cache miss for key: ${cacheKey}. Fetching from repository.`);
    const data = await this.baseRepository.findOne(condition);
    if (data) {
      console.log(
        `Data fetched from repository. Setting cache for key: ${cacheKey}`,
      );
      await this.cacheManager.set(cacheKey, data, 60 * 60 * 1000);
    } else {
      console.log(`No data found from repository for key: ${cacheKey}`);
    }
    return data;
  }

  async count(condition?: Partial<T>): Promise<number> {
    return this.baseRepository.count(condition);
  }

  async exists(condition: Partial<T>): Promise<boolean> {
    return this.baseRepository.exists(condition);
  }

  async findWithPagination(
    page: number,
    limit: number,
    filter?: Partial<T>,
    select?: (keyof T)[] | undefined,
    sort?: Record<string, 'ASC' | 'DESC'>,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const cacheKey = this.getPaginationCacheKey(
      page,
      limit,
      filter,
      select,
      sort as FindOptionsOrder<T>,
    );

    console.log(`Attempting to get paginated cache with key: ${cacheKey}`);
    const cachedData = await this.cacheManager.get<{
      data: T[];
      total: number;
    }>(cacheKey);

    if (cachedData) {
      console.log(`Paginated cache hit for key: ${cacheKey}`);
      return { ...cachedData, page, limit };
    }

    console.log(
      `Paginated cache miss for key: ${cacheKey}. Fetching from repository.`,
    );
    const result = await this.baseRepository.findWithPagination(
      page,
      limit,
      filter,
      select,
      sort as FindOptionsOrder<T>,
    );

    console.log(`Setting paginated cache for key: ${cacheKey}`);
    await this.cacheManager.set(
      cacheKey,
      { data: result.data, total: result.total },
      60 * 60 * 1000,
    );

    return { ...result, page, limit };
  }
}
