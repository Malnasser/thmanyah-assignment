import { Injectable } from '@nestjs/common';
import { SearchProgramDto } from './dto/search-program.dto';
import { ApiTags } from '@nestjs/swagger';
import { Like } from 'typeorm';
import { ProgramsService } from '@cms/programs/programs.service';

@ApiTags('Search')
@Injectable()
export class SearchService {
  constructor(private readonly programsService: ProgramsService) {}

  async search(dto: SearchProgramDto) {
    const { page, limit, keyword, category, language } = dto;
    const filter: any = {};

    if (keyword) {
      filter.title = Like(`%${keyword}%`);
    }

    if (category) {
      filter.category = category;
    }

    if (language) {
      filter.language = language;
    }

    return this.programsService.findWithPagination(page, limit, filter);
  }
}
