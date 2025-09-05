import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Episode } from '../../episodes/entities/episode.entity';
import { Language } from '../../common/enums/language.enum';
import { MediaType } from '../../common/enums/media-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { MediaUpload } from '../../media/entities/media.entity';
import { Category } from '../../../cms/categories/entities/category.entity';
import { ContentStatus } from '../../common/enums/content-status.enum';
import { Expose } from 'class-transformer';

@Entity('programs')
@Index('idx_program_title', ['title'])
@Index('idx_program_publishDate', ['publishDate'])
@Index('idx_program_categoryId', ['category'])
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'tsvector',
    select: false,
    nullable: true,
    insert: false,
    update: false,
  })
  searchVector: string;

  @ManyToOne(() => Category, (category: Category) => category.programs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'enum', enum: MediaType, default: MediaType.PODCAST })
  mediaType: MediaType;

  @Column({ type: 'enum', enum: Language, default: Language.AR })
  language: Language;

  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @ManyToOne(() => MediaUpload, (media) => media.programsWithPoster, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'poster_id' })
  poster?: MediaUpload;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @OneToMany(() => Episode, (episode) => episode.program, { cascade: true })
  episodes: Episode[];

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  status: ContentStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
}
