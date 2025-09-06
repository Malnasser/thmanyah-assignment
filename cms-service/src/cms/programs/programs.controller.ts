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
  ParseUUIDPipe,
  NotFoundException,
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
import { Program } from './entities';
import { BaseController } from '../common/base/base.controller';

import {
  ProgramPaginationDto,
  UpdateProgramDto,
  CreateProgramReqDto,
  ProgramResDto,
} from './dto';
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
    type: ProgramResDto,
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('select') select?: string,
  ): Promise<ProgramResDto> {
    const result = await super._findOne(id, select, ['category', 'poster']);
    if (!result) {
      throw new NotFoundException('Program not found');
    }
    return ProgramResDto.fromEntity(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiBody({
    type: UpdateProgramDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully updated.',
    type: ProgramResDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<ProgramResDto> {
    const existingProgram = await this.programsService.findById(id);
    if (!existingProgram) {
      throw new NotFoundException('Program not found');
    }
    const entity = new Program();
    Object.assign(entity, updateProgramDto);
    const updatedProgram = await this.programsService.update(id, entity);
    if (!updatedProgram) {
      throw new NotFoundException('Program not found after update');
    }
    return ProgramResDto.fromEntity(updatedProgram);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully deleted.',
    type: ProgramResDto,
  })
  @ApiBearerAuth()
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ProgramResDto> {
    const existingProgram = await this.programsService.findById(id);
    if (!existingProgram) {
      throw new NotFoundException('Program Not Found');
    }
    const result = await super._remove(id);
    return ProgramResDto.fromEntity(result);
  }

  @Post(':id/upload-poster')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a poster for a program' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    type: ProgramResDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  async uploadPoster(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProgramResDto> {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File is not an image');
    }

    const existingProgram = this.programsService.findById(id);
    if (!existingProgram) {
      throw new NotFoundException('Program is not found');
    }

    const media = await this.mediaService.uploadToS3(
      file.buffer,
      file.originalname,
      file.mimetype,
      'image',
    );

    const program = await this.programsService.attachPoster(id, media.id);

    return ProgramResDto.fromEntity(program);
  }
}
