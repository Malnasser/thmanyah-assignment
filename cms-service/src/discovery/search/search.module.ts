import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProgramsModule } from 'src/collections/programs/programs.module';

@Module({
  imports: [ProgramsModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
