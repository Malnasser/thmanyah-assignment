import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities';
import { ProgramRepository } from './programs.repository';
import { MediaModule } from '../media/media.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program]), MediaModule, CategoriesModule],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramRepository],
  exports: [ProgramsService],
})
export class ProgramsModule {}
