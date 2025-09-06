import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoryResDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'Unique identifier of the category',
  })
  id: string;

  @ApiProperty({ example: 'Movies', description: 'Name of the category' })
  name: string;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  static fromEntity(entity: Category): CategoryResDto {
    const dto = new CategoryResDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
