import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/database/base-service.abstract';
import { Episode } from './entities/episode.entity';
import { EpisodeRepository } from './episodes.repository';

@Injectable()
export class EpisodesService extends BaseService<Episode> {
  constructor(private readonly episodeRepository: EpisodeRepository) {
    super(episodeRepository);
  }
}
