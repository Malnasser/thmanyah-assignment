import { FindManyOptions, DeepPartial } from 'typeorm';
import { BaseRepository } from './base-repository.abstract';

// TODO: move this abstract to a proper file
export abstract class BaseService<T> {
  protected baseRepository: BaseRepository<T>;

  constructor(baseRepository: BaseRepository<T>) {
    this.baseRepository = baseRepository;
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    return this.baseRepository.create(entity);
  }

  async findById(id: string | number): Promise<T | null> {
    return this.baseRepository.findById(id);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.baseRepository.findAll(options);
  }

  async update(id: string | number, entity: Partial<T>): Promise<T | null> {
    return this.baseRepository.update(id, entity);
  }

  async delete(id: string | number): Promise<boolean> {
    return this.baseRepository.delete(id);
  }

  async findByCondition(condition: Partial<T>): Promise<T[]> {
    return this.baseRepository.findByCondition(condition);
  }

  async findOne(condition: Partial<T>): Promise<T | null> {
    return this.baseRepository.findOne(condition);
  }

  async count(condition?: Partial<T>): Promise<number> {
    return this.baseRepository.count(condition);
  }

  async exists(condition: Partial<T>): Promise<boolean> {
    return this.baseRepository.exists(condition);
  }

  async findWithPagination(
    page: number = 1,
    limit: number = 10,
    condition?: Partial<T>,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    return this.baseRepository.findWithPagination(page, limit, condition);
  }
}
