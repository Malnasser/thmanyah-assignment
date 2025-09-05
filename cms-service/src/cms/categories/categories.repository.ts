import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { BaseRepository } from '../../cms/common/base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
