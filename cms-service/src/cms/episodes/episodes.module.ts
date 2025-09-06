import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { EpisodeRepository } from './episodes.repository';
import { CacheModule } from 'src/core/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Episode]), CacheModule],
  controllers: [EpisodesController],
  providers: [EpisodesService, EpisodeRepository],
})
export class EpisodesModule {}
