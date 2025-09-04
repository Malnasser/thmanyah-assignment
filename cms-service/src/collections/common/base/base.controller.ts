import { DeepPartial } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { IBaseService } from './interfaces/base-service.interface';
import { BadRequestException } from '@nestjs/common';

export abstract class BaseController<
  T,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends Partial<T>,
> {
  constructor(protected baseService: IBaseService<T, CreateDto, UpdateDto>) {}

  protected _create(createDto: CreateDto): Promise<T> {
    return this.baseService.create(createDto);
  }

  protected _findAll(
    query: PaginationQueryDto,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, filter, select, sort } = query;
    let filterObject: { [key: string]: any } | undefined;
    if (filter) {
      try {
        filterObject = filter.split(',').reduce((acc, part) => {
          const [key, value] = part.split(':');
          if (key && value) {
            acc[key.trim()] = value.trim();
          }
          return acc;
        }, {});
      } catch (e) {
        throw new BadRequestException(
          'Invalid filter query parameter. Expected format: key:value,key:value',
        );
      }
    }

    let selectFields: (keyof T)[] | undefined;
    if (select) {
      const fields = select
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
      if (fields.length > 0) {
        selectFields = fields as (keyof T)[];
      }
    }

    let sortObject: { [key: string]: 'ASC' | 'DESC' } | undefined;
    if (sort) {
      try {
        sortObject = sort.split(',').reduce((acc, part) => {
          const [key, value] = part.split(':');
          if (key && value) {
            const direction = value.trim().toUpperCase();
            if (direction === 'ASC' || direction === 'DESC') {
              acc[key.trim()] = direction;
            }
          }
          return acc;
        }, {});
      } catch (e) {
        throw new BadRequestException(
          'Invalid sort query parameter. Expected format: key:direction,key:direction',
        );
      }
    }

    return this.baseService.findWithPagination(
      page,
      limit,
      filterObject as Partial<T>,
      selectFields,
      sortObject,
    );
  }

  protected _findOne(id: string, select?: string): Promise<T | null> {
    let selectFields: (keyof T)[] | undefined;
    if (select) {
      const fields = select
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
      if (fields.length > 0) {
        selectFields = fields as (keyof T)[];
      }
    }
    return this.baseService.findById(id, selectFields);
  }

  protected _update(id: string, updateDto: UpdateDto): Promise<T | null> {
    return this.baseService.update(id, updateDto);
  }

  protected _remove(id: string): Promise<boolean> {
    return this.baseService.delete(id);
  }
}
