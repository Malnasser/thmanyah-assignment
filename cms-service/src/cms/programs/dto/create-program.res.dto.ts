import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Category } from 'src/cms/categories/entities/category.entity';
import { ContentStatus } from 'src/cms/common/enums/content-status.enum';
import { Language } from 'src/cms/common/enums/language.enum';
import { MediaType } from 'src/cms/common/enums/media-type.enum';

export class CreateProgramResDto {
  @Expose()
  @ApiProperty({ example: 'My Awesome Program' })
  title: string;

  @Expose()
  @ApiProperty({
    example: 'This is a description of my awesome program.',
    nullable: true,
  })
  description: string;

  @Expose()
  @ApiProperty({ enum: MediaType, example: MediaType.PODCAST })
  mediaType: MediaType;

  @Expose()
  @ApiProperty({ enum: Language, example: Language.AR })
  language: Language;

  @Expose()
  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  publishDate: Date;

  @Expose()
  @ApiProperty({ enum: ContentStatus, example: ContentStatus.DRAFT })
  status: ContentStatus;

  @Expose()
  @ApiProperty()
  category: Category;

  @Expose()
  @ApiProperty({ example: { author: 'Mahmood Alnasser' } })
  metadata: Record<string, any>;
}
