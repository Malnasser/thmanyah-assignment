import { DeepPartial } from 'typeorm';

export interface IBaseService<
  T,
  CreateDto = DeepPartial<T>,
  UpdateDto = Partial<T>,
> {
  create(dto: CreateDto): Promise<T>;
  findWithPagination(
    page: number,
    limit: number,
    filter?: Partial<T>,
    select?: (keyof T)[],
    sort?: Record<string, 'ASC' | 'DESC'>,
    relations?: string[],
  ): Promise<{ data: T[]; total: number; page: number; limit: number }>;
  findById(
    id: string,
    select?: (keyof T)[],
    relations?: string[],
  ): Promise<T | null>;
  update(id: string, dto: UpdateDto): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
