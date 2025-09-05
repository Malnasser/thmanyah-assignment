import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { Episode } from '../../episodes/entities/episode.entity';

@Entity('media_uploads')
export class MediaUpload {
  @ApiProperty({ description: 'The unique identifier of the media.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The URL of the media file.' })
  @Column({ type: 'text' })
  fileUrl: string;

  @ApiProperty({
    description: 'The type of the media (e.g., image, video, audio).',
  })
  @Column({ type: 'varchar', length: 50 })
  type: string;

  @ApiProperty({
    description: 'The MIME type of the media file.',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  mimeType?: string;

  @ApiProperty({
    description: 'The size of the media file in bytes.',
    required: false,
  })
  @Column({ type: 'bigint', nullable: true })
  size?: number;

  @ApiProperty({
    description: 'The duration of the media file in seconds.',
    required: false,
  })
  @Column({ type: 'int', nullable: true })
  duration?: number;

  @ApiProperty({ description: 'Additional metadata for the media file.' })
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @ApiProperty({ description: 'The date and time the media was created.' })
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Program, (program) => program.poster)
  programsWithPoster: Program[];

  @OneToMany(() => Episode, (episode) => episode.media)
  episodes: Episode[];
}
