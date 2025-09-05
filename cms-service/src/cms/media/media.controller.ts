import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { MediaService } from './media.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediaUpload } from './entities/media.entity';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all media' })
  @ApiResponse({
    status: 200,
    description: 'Return all media.',
    type: [MediaUpload],
  })
  @ApiBearerAuth()
  findAll(@Query() query: PaginationQueryDto): Promise<{
    data: MediaUpload[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, filter, select, sort } = query;
    let filterObject: { [key: string]: any } | undefined;
    if (filter) {
      try {
        filterObject = filter.split(',').reduce((acc, part) => {
          const [key, value] = part.split(':');
          if (key && value) {
            acc[key.trim()] = value.trim();
          }
          return acc;
        }, {});
      } catch (e) {
        throw new BadRequestException(
          'Invalid filter query parameter. Expected format: key:value,key:value',
        );
      }
    }

    let selectFields: (keyof MediaUpload)[] | undefined;
    if (select) {
      const fields = select
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
      if (fields.length > 0) {
        selectFields = fields as (keyof MediaUpload)[];
      }
    }

    let sortObject: { [key: string]: 'ASC' | 'DESC' } | undefined;
    if (sort) {
      try {
        sortObject = sort.split(',').reduce((acc, part) => {
          const [key, value] = part.split(':');
          if (key && value) {
            const direction = value.trim().toUpperCase();
            if (direction === 'ASC' || direction === 'DESC') {
              acc[key.trim()] = direction;
            }
          }
          return acc;
        }, {});
      } catch (e) {
        throw new BadRequestException(
          'Invalid sort query parameter. Expected format: key:direction,key:direction',
        );
      }
    }

    return this.mediaService.findWithPagination(
      page,
      limit,
      filterObject as Partial<MediaUpload>,
      selectFields,
      sortObject,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media by id' })
  @ApiParam({ name: 'id', type: String, description: 'Media ID' })
  @ApiResponse({
    status: 200,
    description: 'Return media by id.',
    type: MediaUpload,
  })
  @ApiBearerAuth()
  findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<MediaUpload | null> {
    let selectFields: (keyof MediaUpload)[] | undefined;
    if (select) {
      const fields = select
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
      if (fields.length > 0) {
        selectFields = fields as (keyof MediaUpload)[];
      }
    }
    return this.mediaService.findById(id, selectFields);
  }
}
