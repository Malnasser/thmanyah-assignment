import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '@cms/common/base/base.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './categories.repository';
import { ICacheService } from '@core/cache/interfaces/cache-service.interface';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject('ICacheService') cacheService: ICacheService,
  ) {
    super(categoryRepository, cacheService, Category);
  }
}
