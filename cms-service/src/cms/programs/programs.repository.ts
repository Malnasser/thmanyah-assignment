import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { BaseRepository } from '../../shared/database/base-repository.abstract';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgramRepository extends BaseRepository<Program> {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {
    super(programRepository);
  }
}
