import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'test@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashedpassword' })
  @Column()
  password: string;

  @ApiProperty({ example: 'John', nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', nullable: true })
  @Column({ nullable: true })
  lastName: string;
}
