import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Episode } from './entities/episode.entity';

@ApiTags('episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create episode' })
  @ApiResponse({
    status: 201,
    description: 'The episode has been successfully created.',
    type: Episode,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all episodes' })
  @ApiResponse({
    status: 200,
    description: 'Return all episodes.',
    type: [Episode],
  })
  findAll() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get episode by id' })
  @ApiResponse({
    status: 200,
    description: 'Return episode by id.',
    type: Episode,
  })
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update episode' })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully updated.',
    type: Episode,
  })
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete episode' })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return id; //this.episodesService.remove(+id);
  }
}
