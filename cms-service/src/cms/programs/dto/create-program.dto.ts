import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
