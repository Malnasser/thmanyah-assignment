import { ApiProperty } from '@nestjs/swagger';
import { MediaResDto } from './media.res.dto';

export class MediaPaginationDto {
  @ApiProperty({ type: [MediaResDto], description: 'List of media items' })
  data: MediaResDto[];

  @ApiProperty({ example: 100, description: 'Total number of media items' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  static fromPaginated(result: { data: any[]; total: number; page: number; limit: number }): MediaPaginationDto {
    const dto = new MediaPaginationDto();
    dto.data = result.data.map(MediaResDto.fromEntity);
    dto.total = result.total;
    dto.page = result.page;
    dto.limit = result.limit;
    return dto;
  }
}