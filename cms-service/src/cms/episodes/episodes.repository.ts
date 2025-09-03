import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { BaseRepository } from '../../shared/database/base-repository.abstract';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EpisodeRepository extends BaseRepository<Episode> {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {
    super(episodeRepository);
  }
}
