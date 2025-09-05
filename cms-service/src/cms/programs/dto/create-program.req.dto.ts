import { ApiProperty } from '@nestjs/swagger';
import { ContentStatus } from 'src/cms/common/enums/content-status.enum';
import { Language } from 'src/cms/common/enums/language.enum';
import { MediaType } from 'src/cms/common/enums/media-type.enum';
import { Program } from '../entities/program.entity';

export class CreateProgramReqDto {
  @ApiProperty({ example: 'My Awesome Program' })
  title: string;

  @ApiProperty({
    example: 'This is a description of my awesome program.',
    nullable: true,
  })
  description: string;

  @ApiProperty({ enum: MediaType, example: MediaType.PODCAST })
  mediaType: MediaType;

  @ApiProperty({ example: 'c6acbc14-113c-4014-a717-3d67acd36ad9' })
  categoryId: string;

  @ApiProperty({ enum: Language, example: Language.AR })
  language: Language;

  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  publishDate: Date;

  @ApiProperty({ enum: ContentStatus, example: ContentStatus.DRAFT })
  status: ContentStatus;

  @ApiProperty({ example: { author: 'Mahmood Alnasser' } })
  metadata: Record<string, any>;
}
