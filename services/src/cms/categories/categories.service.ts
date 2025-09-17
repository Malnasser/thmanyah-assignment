import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '@cms/common/base/base.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './categories.repository';
import { ICacheService } from '@core/cache/interfaces/cache-service.interface';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject('ICacheService') cacheService: ICacheService,
  ) {
    super(categoryRepository, cacheService, Category);
  }

  public async create(entity: DeepPartial<Category>): Promise<Category> {
    const isCategoryExists = await this.categoryRepository.findOne({
      name: entity.name,
    });
    if (isCategoryExists) {
      throw new HttpException(
        {
          massage: `Category with name ${entity.name} already exists!`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await super.create(entity);
  }
}
