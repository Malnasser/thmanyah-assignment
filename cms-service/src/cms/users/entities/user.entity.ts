import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 'c6acbc14-113c-4014-a717-3d67acd36ad9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ApiProperty({ example: '2025-09-04T12:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-04T12:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
