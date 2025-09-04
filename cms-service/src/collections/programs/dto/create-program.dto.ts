import { ApiProperty } from '@nestjs/swagger';
import { Language } from 'src/collections/common/enums/language.enum';
import { MediaType } from 'src/collections/common/enums/media-type.enum';

export class CreateProgramDto {
  @ApiProperty({ example: 'My Awesome Program' })
  title: string;

  @ApiProperty({ example: 'This is a description of my awesome program.', nullable: true })
  description: string;

  @ApiProperty({ enum: MediaType, example: MediaType.PODCAST })
  mediaType: MediaType;

  @ApiProperty({ example: 'podcast' })
  category: string;

  @ApiProperty({ enum: Language, example: Language.AR })
  language: Language;

  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  publishDate: Date;

  @ApiProperty({ example: 'https://example.com/program.mp3', nullable: true })
  fileUrl: string;

  @ApiProperty({ example: 'https://example.com/program-thumbnail.jpg', nullable: true })
  thumbnailUrl: string;
}
