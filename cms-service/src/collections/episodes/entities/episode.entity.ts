import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('episodes')
export class Episode {
  @ApiProperty({ example: 'c6acbc14-113c-4014-a717-3d67acd36ad9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'My Awesome Episode' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'This is a description of my awesome episode.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 'en' })
  @Column({ default: 'en' })
  language: string; // same as Program or different

  @ApiProperty({ example: 3600, nullable: true })
  @Column({ type: 'int', nullable: true })
  duration: number; // seconds

  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @ApiProperty({ example: 'https://example.com/episode.mp3', nullable: true })
  @Column({ nullable: true })
  fileUrl: string;

  @ApiProperty({
    example: 'https://example.com/episode-thumbnail.jpg',
    nullable: true,
  })
  @Column({ nullable: true })
  thumbnailUrl: string;

  @ApiProperty({ type: () => Program })
  @ManyToOne(() => Program, (program) => program.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'programId' })
  program: Program;
}
