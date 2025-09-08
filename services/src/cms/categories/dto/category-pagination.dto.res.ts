import { ApiProperty } from '@nestjs/swagger';
import { CategoryResDto } from './category.res.dto';

export class CategoryPaginationDto {
  @ApiProperty({ type: [CategoryResDto], description: 'List of categories' })
  data: CategoryResDto[];

  @ApiProperty({ example: 100, description: 'Total number of categories' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  static fromPaginated(result: {
    data: any[];
    total: number;
    page: number;
    limit: number;
  }): CategoryPaginationDto {
    const dto = new CategoryPaginationDto();
    dto.data = result.data.map(CategoryResDto.fromEntity);
    dto.total = result.total;
    dto.page = result.page;
    dto.limit = result.limit;
    return dto;
  }
}
