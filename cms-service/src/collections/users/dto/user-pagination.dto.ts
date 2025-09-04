import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserPaginationDto {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
