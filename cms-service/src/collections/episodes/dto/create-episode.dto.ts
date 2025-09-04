import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
