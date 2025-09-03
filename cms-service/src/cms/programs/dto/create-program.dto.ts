import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../../common/enums/language.enum';
import { MediaType } from 'src/cms/common/enums/media-type.enum';

export class CreateProgramDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: MediaType })
  mediaType: MediaType;

  @ApiProperty()
  category: string;

  @ApiProperty({ enum: Language, example: Language.AR })
  language: Language;

  @ApiProperty()
  publishDate: Date;
}
