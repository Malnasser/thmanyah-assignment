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
  ): Promise<{ data: T[]; total: number; page: number; limit: number }>;
  findById(id: string, select?: (keyof T)[]): Promise<T | null>;
  update(id: string, dto: UpdateDto): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
