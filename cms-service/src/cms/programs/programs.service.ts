import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../common/base/base.service';
import { Program } from './entities/program.entity';
import { ProgramRepository } from './programs.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProgramsService extends BaseService<Program> {
  constructor(
    private readonly programRepository: ProgramRepository,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(programRepository, cacheManager, Program);
  }

  async attachPoster(programId: string, mediaId: string) {
    const program = await this.programRepository.findById(programId);
    if (!program) throw new Error('Program not found');

    program.poster = { id: mediaId } as any; // assumes ManyToOne relation
    return this.programRepository.update(programId, program);
  }
}
