import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseService } from './base-service.abstract';
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
  async findAll(): Promise<T[]> {
    return this.baseService.findAll();
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
