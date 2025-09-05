import { Module } from '@nestjs/common';
import { ProgramsModule } from './programs/programs.module';
import { EpisodesModule } from './episodes/episodes.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { CategoriesModule } from '../cms/categories/categories.module';

@Module({
  imports: [
    ProgramsModule,
    EpisodesModule,
    UsersModule,
    MediaModule,
    CategoriesModule,
  ],
})
export class CmsModule {}
