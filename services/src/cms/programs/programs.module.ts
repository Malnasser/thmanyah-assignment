import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities';
import { ProgramRepository } from './programs.repository';
import { MediaModule } from '@cms/media/media.module';
import { CategoriesModule } from '@cms/categories/categories.module';
import { CacheModule } from '@core/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program]),
    MediaModule,
    CategoriesModule,
    CacheModule,
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramRepository],
  exports: [ProgramsService],
})
export class ProgramsModule {}
