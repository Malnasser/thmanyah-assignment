import { ProgramPaginationDto } from './dto/program-pagination.dto';
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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Program } from './entities/program.entity';
import { BaseController } from '../common/base/base.controller';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../media/media.service';
import { Express } from 'express';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController extends BaseController<
  Program,
  CreateProgramDto,
  UpdateProgramDto
> {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly mediaService: MediaService,
  ) {
    super(programsService);
  }

  @Post()
  @ApiOperation({ summary: 'Create program' })
  @ApiBody({ type: CreateProgramDto })
  @ApiResponse({
    status: 201,
    description: 'The program has been successfully created.',
    type: Program,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  async create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return super._create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({ status: 200, type: ProgramPaginationDto })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ProgramPaginationDto> {
    return super._findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'Return program by id.',
    type: Program,
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<Program | null> {
    return super._findOne(id, select);
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
    return super._update(id, updateProgramDto);
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
