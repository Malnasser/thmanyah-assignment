import { DeepPartial, FindManyOptions, FindOptionsOrder } from 'typeorm';

export interface IBaseRepository<T> {
  create(entity: DeepPartial<T>): Promise<T>;
  findById(id: string | number, select?: (keyof T)[]): Promise<T | null>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  update(id: string | number, entity: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  findOne(condition: Partial<T>): Promise<T | null>;
  count(condition?: Partial<T>): Promise<number>;
  exists(condition: Partial<T>): Promise<boolean>;
  findWithPagination(
    page: number,
    limit: number,
    condition?: Partial<T>,
    select?: (keyof T)[],
    sort?: FindOptionsOrder<T>,
  ): Promise<{ data: T[]; total: number }>;
}
