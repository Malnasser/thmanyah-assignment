import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Program } from '../../../cms/programs/entities/program.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 'c6acbc14-113c-4014-a717-3d67acd36ad9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Documentary' })
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Program, (program: Program) => program.category)
  programs: Program[];
}
