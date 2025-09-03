import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../../common/enums/language.enum';

export class CreateProgramDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ enum: Language })
  language: Language;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  publishDate: Date;
}
