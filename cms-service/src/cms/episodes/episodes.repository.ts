import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { BaseRepository } from '../common/base/base.repository';
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
