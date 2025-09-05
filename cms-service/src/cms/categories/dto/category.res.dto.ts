import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoryDto {
  @ApiProperty({ example: '5f02b774-51d7-441d-b897-02afcbca86ed' })
  id: string;

  @ApiProperty({ example: 'News' })
  name: string;

  static fromEntity(category: Category): CategoryDto {
    const dto = new CategoryDto();
    dto.id = category.id;
    dto.name = category.name;
    return dto;
  }
}
