import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

import { ProgramsService } from './programs.service';
import { MediaService } from '../media/media.service';
import { Program } from './entities/program.entity';
import { BaseController } from '../common/base/base.controller';

import {
  ProgramPaginationDto,
  UpdateProgramDto,
  CreateProgramReqDto,
  ProgramResDto,
} from './dto/';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';

import { Express } from 'express';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController extends BaseController<Program> {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly mediaService: MediaService,
  ) {
    super(programsService);
  }

  @Post()
  @ApiOperation({ summary: 'Create program' })
  @ApiCreatedResponse({
    description: 'The program has been successfully created.',
    type: ProgramResDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  async create(
    @Body() createProgramDto: CreateProgramReqDto,
  ): Promise<ProgramResDto> {
    // TODO: find better way to transform req dto to entity without breaking
    const entity = new Program();
    Object.assign(entity, createProgramDto);
    const saved = await this.programsService.create(entity);
    return ProgramResDto.fromEntity(saved);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({ status: 200, type: ProgramPaginationDto })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ProgramPaginationDto> {
    const result = await super._findAll(query, ['category', 'poster']);
    return ProgramPaginationDto.fromPaginated(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiQuery({
    name: 'select',
    type: String,
    required: false,
    description: 'Comma separated fields to select',
  })
  @ApiResponse({
    status: 200,
    description: 'Return program by id.',
    type: Program,
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<ProgramResDto | null> {
    const result = await super._findOne(id, select, ['category', 'poster']);
    return ProgramResDto.fromEntity(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiBody({
    type: UpdateProgramDto,
    examples: {
      a: { summary: 'Partial Update', value: { title: 'New Title' } },
      b: {
        summary: 'Full Update',
        value: {
          title: 'New Title',
          description: 'New Description',
          category: 'movie',
          mediaType: 'movie',
          language: 'en',
          publishDate: '2025-01-01T00:00:00Z',
          fileUrl: 'http://example.com/new.mp3',
          thumbnailUrl: 'http://example.com/new.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully updated.',
    type: Program,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<Program | null> {
    const entity = new Program();
    Object.assign(entity, updateProgramDto);
    return super._update(id, entity);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully deleted.',
    type: Program,
  })
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<Program | null> {
    return super._remove(id);
  }

  @Post(':id/upload-poster')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a poster for a program' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Poster image file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'The poster has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  async uploadPoster(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File is not an image');
    }

    const media = await this.mediaService.uploadToS3(
      file.buffer,
      file.originalname,
      file.mimetype,
      'image',
    );

    const program = await this.programsService.attachPoster(id, media.id);

    return { program, media };
  }
}
