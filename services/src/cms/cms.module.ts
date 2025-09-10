import { Module } from '@nestjs/common';
import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users';
import { MediaModule } from './media/media.module';
import { CategoriesModule } from '../cms/categories/categories.module';

@Module({
  imports: [ProgramsModule, UsersModule, MediaModule, CategoriesModule],
})
export class CmsModule {}
