import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    return this.baseService.findWithPagination(page, limit);
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
