import { ApiProperty } from '@nestjs/swagger';
import { UserResDto } from './user.res.dto';

export class UserPaginationDto {
  @ApiProperty({ type: [UserResDto] })
  data: UserResDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  static fromPaginated(result: { data: any[]; total: number; page: number; limit: number }): UserPaginationDto {
    const dto = new UserPaginationDto();
    dto.data = result.data.map(UserResDto.fromEntity);
    dto.total = result.total;
    dto.page = result.page;
    dto.limit = result.limit;
    return dto;
  }
}
