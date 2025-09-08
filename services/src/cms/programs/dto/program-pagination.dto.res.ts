import { ApiProperty } from '@nestjs/swagger';
import { ProgramResDto } from './program.res.dto';

export class ProgramPaginationDto {
  @ApiProperty({ type: [ProgramResDto] })
  data: ProgramResDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  static fromPaginated<
    T extends { data: any[]; total: number; page: number; limit: number },
  >(paginated: T): ProgramPaginationDto {
    const dto = new ProgramPaginationDto();

    // If items are already Program entities, map them
    dto.data = paginated.data.map((item) => {
      if ('title' in item) {
        // crude check if entity
        return ProgramResDto.fromEntity(item);
      }
      return item; // already DTO
    });

    dto.total = paginated.total;
    dto.page = paginated.page;
    dto.limit = paginated.limit;
    return dto;
  }
}
