import { ApiProperty } from '@nestjs/swagger';
import { MediaUpload } from '../entities/media.entity';

export class MediaResDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'Unique identifier of the media',
  })
  id: string;

  @ApiProperty({
    example: 's3://bucket/image.jpg',
    description: 'URL of the media file',
  })
  fileUrl: string;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'MIME type of the media file',
  })
  mimeType: string;

  @ApiProperty({
    example: 'image',
    description: 'Type of media (e.g., image, video)',
  })
  type: string;

  static fromEntity(entity: MediaUpload): MediaResDto {
    const dto = new MediaResDto();
    dto.id = entity.id;
    dto.fileUrl = entity.fileUrl;
    dto.mimeType = entity.mimeType;
    dto.type = entity.type;
    return dto;
  }
}

