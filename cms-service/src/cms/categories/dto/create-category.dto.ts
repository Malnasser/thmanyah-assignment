import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Movies', description: 'Name of the category' })
  name: string;
}
