import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { DeepPartial, FindOptionsOrder } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { query } from 'express';

export abstract class BaseController<
  T,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends Partial<T>,
> {
  protected baseService: BaseService<T>;

  constructor(baseService: BaseService<T>) {
    this.baseService = baseService;
  }

  @Post()
  async create(@Body() createDto: CreateDto): Promise<T> {
    return this.baseService.create(createDto);
  }

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const { page, limit, filter, select, sort } = query;
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
      sortObject as FindOptionsOrder<T>,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T | null> {
    return this.baseService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<T | null> {
    return this.baseService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.baseService.delete(id);
  }
}
