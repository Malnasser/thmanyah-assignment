import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ContentStatus, Language, MediaType } from '@cms/common/enums';
import { Program } from '@cms/programs/entities';
import { CategoryResDto } from '@cms/categories/dto';
import { MediaUploadDto } from '@cms/media/dto';

export class ProgramResDto {
  @Expose()
  @ApiProperty({ example: '7dc8db86-69bc-474f-b036-c4e55369f3be' })
  id: string;

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
  category: CategoryResDto;

  @Expose()
  @ApiProperty()
  poster: MediaUploadDto;

  @Expose()
  @ApiProperty({ example: { author: 'Mahmood Alnasser' } })
  metadata: Record<string, any>;

  static fromEntity(program: Program): ProgramResDto {
    const dto = new ProgramResDto();
    dto.id = program.id;
    dto.title = program.title;
    dto.description = program.description;
    dto.mediaType = program.mediaType;
    dto.language = program.language;
    dto.publishDate = program.publishDate;
    dto.status = program.status;
    dto.metadata = program.metadata;

    if (program.category)
      dto.category = CategoryResDto.fromEntity(program.category);
    if (program.poster) dto.poster = MediaUploadDto.fromEntity(program.poster);

    return dto;
  }

  static fromEntities(programs: Program[]): ProgramResDto[] {
    return programs.map((p) => this.fromEntity(p));
  }
}
