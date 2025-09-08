import { ApiProperty } from '@nestjs/swagger';
import { MediaUpload } from '@cms/media/entities/media.entity';

export class MediaUploadDto {
  @ApiProperty({ example: 'p1' })
  id: string;

  @ApiProperty({ example: 'https://example.com/poster.png' })
  fileUrl: string;

  static fromEntity(media: MediaUpload): MediaUploadDto {
    const dto = new MediaUploadDto();
    dto.id = media.id;
    dto.fileUrl = media.fileUrl;
    return dto;
  }
}
