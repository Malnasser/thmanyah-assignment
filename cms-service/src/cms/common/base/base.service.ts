import { FindManyOptions, DeepPartial, FindOptionsOrder } from 'typeorm';
import { Inject } from '@nestjs/common';
import { IBaseService, IBaseRepository } from './interfaces';
import { ICacheService } from '@core/cache/interfaces/cache-service.interface';

export abstract class BaseService<T> implements IBaseService<T> {
  protected baseRepository: IBaseRepository<T>;

  get repository(): IBaseRepository<T> {
    return this.baseRepository;
  }
  protected entityType: new () => T;

  constructor(
    baseRepository: IBaseRepository<T>,
    @Inject('ICacheService') protected cacheService: ICacheService,
    entityType: new () => T,
  ) {
    this.baseRepository = baseRepository;
    this.entityType = entityType;
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const createdEntity = await this.baseRepository.create(entity);
    await this.cacheService.del(
      this.cacheService.getCacheKey(undefined, undefined, this.entityType),
    );
    return createdEntity;
  }

  async findById(
    id: string | number,
    select?: (keyof T)[] | undefined,
    relations?: string[],
  ): Promise<T | null> {
    const cacheKey = this.cacheService.getCacheKey(id, select, this.entityType);
    console.log(`Attempting to get from cache with key: ${cacheKey}`);
    const cachedData = await this.cacheService.get<T>(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedData;
    }
    console.log(`Cache miss for key: ${cacheKey}. Fetching from repository.`);
    const data = await this.baseRepository.findById(id, select, relations);
    if (data) {
      console.log(
        `Data fetched from repository. Setting cache for key: ${cacheKey}`,
      );
      await this.cacheService.set(cacheKey, data, 60 * 60 * 1000); // 1 hour TTL
    } else {
      console.log(`No data found from repository for key: ${cacheKey}`);
    }
    return data;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const cacheKey = this.cacheService.getCacheKey(
      undefined,
      undefined,
      this.entityType,
    );
    console.log(`Attempting to get from cache with key: ${cacheKey}`);
    const cachedData = await this.cacheService.get<T[]>(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedData;
    }
    console.log(`Cache miss for key: ${cacheKey}. Fetching from repository.`);
    const data = await this.baseRepository.findAll(options);
    console.log(
      `Data fetched from repository. Setting cache for key: ${cacheKey}`,
    );
    await this.cacheService.set(cacheKey, data, 60 * 60 * 1000); // 1 hour TTL
    return data;
  }

  async update(id: string | number, entity: Partial<T>): Promise<T | null> {
    const updatedEntity = await this.baseRepository.update(id, entity);
    console.log(
      `Invalidating cache for all entities with key: ${this.cacheService.getCacheKey(undefined, undefined, this.entityType)}`,
    );
    await this.cacheService.del(
      this.cacheService.getCacheKey(undefined, undefined, this.entityType),
    ); // Invalidate all
    console.log(
      `Invalidating cache for specific entity with key: ${this.cacheService.getCacheKey(id, undefined, this.entityType)}`,
    );
    await this.cacheService.del(
      this.cacheService.getCacheKey(id, undefined, this.entityType),
    ); // Invalidate specific
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
        `Invalidating cache for all entities with key: ${this.cacheService.getCacheKey(undefined, undefined, this.entityType)}`,
      );
      await this.cacheService.del(
        this.cacheService.getCacheKey(undefined, undefined, this.entityType),
      ); // Invalidate all
      console.log(
        `Invalidating cache for specific entity with key: ${this.cacheService.getCacheKey(id, undefined, this.entityType)}`,
      );
      await this.cacheService.del(
        this.cacheService.getCacheKey(id, undefined, this.entityType),
      ); // Invalidate specific
      return entityToDelete;
    }
    return null;
  }

  async findOne(condition: Partial<T>): Promise<T | null> {
    const cacheKey = this.cacheService.getCacheKey(
      condition,
      undefined,
      this.entityType,
    );
    console.log(`Attempting to get from cache with key: ${cacheKey}`);
    const cachedData = await this.cacheService.get<T>(cacheKey);
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
      await this.cacheService.set(cacheKey, data, 60 * 60 * 1000);
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
    relations?: string[],
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const cacheKey = this.cacheService.getPaginationCacheKey(
      page,
      limit,
      filter,
      select,
      sort as Record<string, 'ASC' | 'DESC'>,
      this.entityType,
    );

    console.log(`Attempting to get paginated cache with key: ${cacheKey}`);
    const cachedData = await this.cacheService.get<{
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
      relations,
    );

    console.log(`Setting paginated cache for key: ${cacheKey}`);
    await this.cacheService.set(
      cacheKey,
      { data: result.data, total: result.total },
      60 * 60 * 1000,
    );

    return { ...result, page, limit };
  }
}
