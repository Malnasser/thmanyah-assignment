import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
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
import { MediaUpload } from './entities/media.entity';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';
import { BaseController } from '../common/base/base.controller';
import { MediaResDto } from './dto/media.res.dto';
import { MediaPaginationDto } from './dto/media-pagination.dto.res';
import { UpdateMediaDto } from './dto/update-media.dto';

@ApiTags('Media')
@Controller('media')
export class MediaController extends BaseController<MediaUpload> {
  constructor(private readonly mediaService: MediaService) {
    super(mediaService);
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
}
