import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Episode } from './entities/episode.entity';
import { BaseController } from '../common/base/base.controller';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';

@ApiTags('Episodes')
@Controller('episodes')
export class EpisodesController extends BaseController<Episode> {
  constructor(private readonly episodesService: EpisodesService) {
    super(episodesService);
  }

  @Post()
  @ApiOperation({ summary: 'Create episode' })
  @ApiBody({ type: CreateEpisodeDto })
  @ApiResponse({
    status: 201,
    description: 'The episode has been successfully created.',
    type: Episode,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  async create(@Body() createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const entity = new Episode();
    Object.assign(entity, createEpisodeDto);
    return super._create(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all episodes' })
  @ApiResponse({
    status: 200,
    description: 'Return all episodes.',
    type: [Episode],
  })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<{ data: Episode[]; total: number; page: number; limit: number }> {
    return super._findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get episode by id' })
  @ApiParam({ name: 'id', type: String, description: 'Episode ID' })
  @ApiResponse({
    status: 200,
    description: 'Return episode by id.',
    type: Episode,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<Episode | null> {
    return super._findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update episode' })
  @ApiParam({ name: 'id', type: String, description: 'Episode ID' })
  @ApiBody({ type: UpdateEpisodeDto })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully updated.',
    type: Episode,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode | null> {
    const entity = new Episode();
    Object.assign(entity, updateEpisodeDto);
    return super._update(id, entity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete episode' })
  @ApiParam({ name: 'id', type: String, description: 'Episode ID' })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully deleted.',
    type: Episode,
  })
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<Episode | null> {
    return super._remove(id);
  }
}
