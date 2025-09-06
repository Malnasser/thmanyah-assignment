import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ example: 'test@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John', description: 'User first name', nullable: true })
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'User last name', nullable: true })
  lastName?: string;

  @ApiProperty({ example: '2023-01-01T12:00:00Z', description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T12:00:00Z', description: 'Last update timestamp' })
  updatedAt: Date;

  static fromEntity(entity: User): UserResDto {
    const dto = new UserResDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}