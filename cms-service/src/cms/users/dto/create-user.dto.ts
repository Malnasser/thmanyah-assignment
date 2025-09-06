import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'John', description: 'User first name', nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name', nullable: true })
  lastName: string;
}
