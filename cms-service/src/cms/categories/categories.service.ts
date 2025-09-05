import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../cms/common/base/base.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './categories.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(categoryRepository, cacheManager, Category);
  }
}
