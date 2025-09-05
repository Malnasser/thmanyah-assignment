import { ProgramResDto } from './program.res.dto';

export class ProgramPaginationDto {
  data: ProgramResDto[];
  total: number;
  page: number;
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
