import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'root@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;
}
