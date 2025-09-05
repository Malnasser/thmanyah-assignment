import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: 'John', nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName: string;
}
