import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MediaUpload } from '../../media/entities/media.entity';
import { ContentStatus } from '../../common/enums/content-status.enum';

@Entity('episodes')
@Index('idx_episode_title', ['title'])
@Index('idx_episode_publishDate', ['publishDate'])
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

  @Column({ type: 'tsvector', select: false, nullable: true })
  searchVector: string;

  @ApiProperty({ example: 'en', nullable: false })
  @Column({ default: 'en', nullable: false })
  language: string; // same as Program or different

  @ApiProperty({ example: 3600, nullable: true })
  @Column({ type: 'int', nullable: true })
  duration: number; // seconds

  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @ManyToOne(() => MediaUpload, (media) => media.episodes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'media_id' })
  media?: MediaUpload;

  @ManyToOne(() => Program, (program) => program.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'programId' })
  program: Program;

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  status: ContentStatus;

  @ApiProperty({ description: 'Additional metadata for the media file.' })
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
}
