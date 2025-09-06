import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../common/base/base.service';
import { Program } from './entities';
import { ProgramRepository } from './programs.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DeepPartial } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProgramsService extends BaseService<Program> {
  constructor(
    private readonly programRepository: ProgramRepository,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    private readonly categoryService: CategoriesService,
  ) {
    super(programRepository, cacheManager, Program);
  }

  async create(entity: DeepPartial<Program>): Promise<Program> {
    if (entity.categoryId) {
      const category = await this.categoryService.findById(entity.categoryId);
      if (!category) {
        throw new BadRequestException('Invalid categoryId');
      }
      entity.category = category;
    }

    return super.create(entity);
  }

  async attachPoster(programId: string, mediaId: string) {
    const program = await this.programRepository.findById(programId);
    if (!program) throw new Error('Program not found');

    program.poster = { id: mediaId } as any; // assumes ManyToOne relation
    await this.programRepository.update(programId, program);
    return await this.programRepository.findById(programId, null, [
      'category',
      'poster',
    ]);
  }
}
