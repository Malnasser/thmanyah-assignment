import { Module } from '@nestjs/common';
import { ProgramsModule } from './programs/programs.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [ProgramsModule, EpisodesModule],
})
export class CmsModule {}
