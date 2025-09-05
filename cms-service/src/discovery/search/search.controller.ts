import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { SearchProgramDto } from './dto/search-program.dto';
import { SearchService } from './search.service';
import { ProgramPaginationDto } from 'src/cms/programs/dto/program-pagination.dto.res';

@ApiTags('Discovery')
@Controller('discovery')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: 'Keyword to search in title or description',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'category',
    type: String,
    required: false,
    description: 'Filter by category',
  })
  @ApiQuery({
    name: 'language',
    type: String,
    required: false,
    description: 'Filter by language',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search programs' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved programs',
    type: ProgramPaginationDto,
  })
  async search(@Query() dto: SearchProgramDto) {
    return this.searchService.search(dto);
  }
}
