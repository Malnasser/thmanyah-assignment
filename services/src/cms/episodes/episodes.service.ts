import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '@cms/common/base/base.service';
import { Episode } from './entities/episode.entity';
import { EpisodeRepository } from './episodes.repository';
import { ICacheService } from '@core/cache/interfaces/cache-service.interface';

@Injectable()
export class EpisodesService extends BaseService<Episode> {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    @Inject('ICacheService') cacheService: ICacheService,
  ) {
    super(episodeRepository, cacheService, Episode);
  }
}
