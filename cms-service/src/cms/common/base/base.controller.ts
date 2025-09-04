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
import { DeepPartial } from 'typeorm';

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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
    @Query('select') select?: string,
    @Query('sort') sort?: string,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    let filterObject;
    if (filter) {
      try {
        filterObject = JSON.parse(filter);
      } catch (e) {
        throw new BadRequestException('Invalid filter query parameter');
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

    let sortObject;
    if (sort) {
      try {
        sortObject = JSON.parse(sort);
      } catch (e) {
        throw new BadRequestException('Invalid sort query parameter');
      }
    }

    return this.baseService.findWithPagination(
      page,
      limit,
      filterObject,
      selectFields,
      sortObject,
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
