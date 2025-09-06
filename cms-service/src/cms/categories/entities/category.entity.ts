import { Entity, Column, OneToMany } from 'typeorm';
import { Program } from '../../../cms/programs/entities/program.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @ApiProperty({ example: 'Documentary' })
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Program, (program: Program) => program.category)
  programs: Program[];
}
