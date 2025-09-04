import { Module } from '@nestjs/common';
import { ProgramsModule } from './programs/programs.module';
import { EpisodesModule } from './episodes/episodes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProgramsModule, EpisodesModule, UsersModule],
})
export class CmsModule {}
