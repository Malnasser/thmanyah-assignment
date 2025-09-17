import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseService } from '@cms/common/base/base.service';
import { Program } from './entities';
import { ProgramRepository } from './programs.repository';
import { ICacheService } from '@core/cache/interfaces/cache-service.interface';
import { DeepPartial } from 'typeorm';
import { CategoriesService } from '@cms/categories/categories.service';
import { DiscoveryService } from '@discovery/discovery.service';
import { ContentStatus } from '@cms/common';

@Injectable()
export class ProgramsService extends BaseService<Program> {
  constructor(
    private readonly programRepository: ProgramRepository,
    @Inject('ICacheService') cacheService: ICacheService,
    private readonly categoryService: CategoriesService,
    private readonly discoveryService: DiscoveryService,
  ) {
    super(programRepository, cacheService, Program);
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

  async update(
    id: string | number,
    entity: Partial<Program>,
  ): Promise<Program> {
    if (entity.categoryId) {
      const category = await this.categoryService.findById(entity.categoryId);
      if (!category) {
        throw new BadRequestException('Invalid categoryId');
      }
      entity.category = category;
    }
    return super.update(id, entity);
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

  async publishProgram(id: string) {
    let entity = await this.programRepository.findById(id, null, [
      'poster',
      'category',
    ]);
    entity.status = ContentStatus.PUBLISHED;
    entity.publishDate = new Date();
    entity = await this.discoveryService.putProgram(entity);
    if (!entity) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error publishing program: ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    entity = await this.programRepository.update(id, entity);
    return entity;
  }
}
