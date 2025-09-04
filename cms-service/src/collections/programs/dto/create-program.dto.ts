import { ApiProperty } from '@nestjs/swagger';
import { Language } from 'src/collections/common/enums/language.enum';
import { MediaType } from 'src/collections/common/enums/media-type.enum';

export class CreateProgramDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: MediaType })
  mediatype: MediaType;

  @ApiProperty()
  category: string;

  @ApiProperty({ enum: Language, example: Language.AR })
  language: Language;

  @ApiProperty()
  publishdate: Date;
}
