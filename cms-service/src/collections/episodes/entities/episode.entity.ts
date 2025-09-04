import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Program } from '../../programs/entities/program.entity';

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'en' })
  language: string; // same as Program or different

  @Column({ type: 'int', nullable: true })
  duration: number; // seconds

  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @ManyToOne(() => Program, (program) => program.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'programId' })
  program: Program;
}
