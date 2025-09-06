import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { MediaService } from './media.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { MediaUpload } from './entities';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';
import { BaseController } from '../common/base/base.controller';
import {
  MediaResDto,
  MediaPaginationDto,
  CreateMediaDto,
  UpdateMediaDto,
} from './dto';

@ApiTags('Media')
@Controller('media')
export class MediaController extends BaseController<MediaUpload> {
  constructor(private readonly mediaService: MediaService) {
    super(mediaService);
  }

  @Post()
  @ApiOperation({ summary: 'Create media' })
  @ApiCreatedResponse({
    description: 'The media has been successfully created.',
    type: MediaResDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  async create(@Body() createMediaDto: CreateMediaDto): Promise<MediaResDto> {
    const entity = new MediaUpload();
    Object.assign(entity, createMediaDto);
    const saved = await this.mediaService.create(entity);
    return MediaResDto.fromEntity(saved);
  }

  @Get()
  @ApiOperation({ summary: 'Get all media' })
  @ApiResponse({ status: 200, type: MediaPaginationDto })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<MediaPaginationDto> {
    const result = await super._findAll(query);
    return MediaPaginationDto.fromPaginated(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media by id' })
  @ApiParam({ name: 'id', type: String, description: 'Media ID' })
  @ApiQuery({
    name: 'select',
    type: String,
    required: false,
    description: 'Comma separated fields to select',
  })
  @ApiResponse({
    status: 200,
    description: 'Return media by id.',
    type: MediaResDto,
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('select') select?: string,
  ): Promise<MediaResDto> {
    const result = await super._findOne(id, select);
    if (!result) {
      throw new NotFoundException('Media not found');
    }
    return MediaResDto.fromEntity(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update media' })
  @ApiParam({ name: 'id', type: String, description: 'Media ID' })
  @ApiBody({
    type: UpdateMediaDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The media has been successfully updated.',
    type: MediaResDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ): Promise<MediaResDto> {
    const existingMedia = await this.mediaService.findById(id);
    if (!existingMedia) {
      throw new NotFoundException('Media not found');
    }
    const entity = new MediaUpload();
    Object.assign(entity, updateMediaDto);
    const updatedMedia = await this.mediaService.update(id, entity);
    if (!updatedMedia) {
      throw new NotFoundException('Media not found after update');
    }
    return MediaResDto.fromEntity(updatedMedia);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete media' })
  @ApiParam({ name: 'id', type: String, description: 'Media ID' })
  @ApiResponse({
    status: 200,
    description: 'The media has been successfully deleted.',
    type: MediaResDto,
  })
  @ApiBearerAuth()
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<MediaResDto> {
    const existingMedia = await this.mediaService.findById(id);
    if (!existingMedia) {
      throw new NotFoundException('Media Not Found');
    }
    const result = await super._remove(id);
    return MediaResDto.fromEntity(result);
  }
}
