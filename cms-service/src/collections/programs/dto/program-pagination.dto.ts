import { ApiProperty } from '@nestjs/swagger';
import { Program } from '../entities/program.entity';

export class ProgramPaginationDto {
  @ApiProperty({ type: [Program] })
  data: Program[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
