import { Entity, Column, OneToMany } from 'typeorm';
import { Program } from '@cms/programs/entities/program.entity';
import { BaseEntity } from '@core/database/base.entity';

@Entity('media_uploads')
export class MediaUpload extends BaseEntity {
  @Column({ type: 'text' })
  fileUrl: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  mimeType?: string;

  @Column({ type: 'bigint', nullable: true })
  size?: number;

  @Column({ type: 'int', nullable: true })
  duration?: number;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @OneToMany(() => Program, (program) => program.poster)
  programsWithPoster: Program[];
}
