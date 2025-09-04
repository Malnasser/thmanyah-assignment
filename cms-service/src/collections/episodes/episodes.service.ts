import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../common/base/base.service';
import { Episode } from './entities/episode.entity';
import { EpisodeRepository } from './episodes.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class EpisodesService extends BaseService<Episode> {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(episodeRepository, cacheManager, Episode);
  }
}
