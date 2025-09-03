import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/database/base-service.abstract';
import { Program } from './entities/program.entity';
import { ProgramRepository } from './programs.repository';

@Injectable()
export class ProgramsService extends BaseService<Program> {
  constructor(private readonly programRepository: ProgramRepository) {
    super(programRepository);
  }
}
