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

@Entity('programs')
@Index('idx_program_title', ['title'])
@Index('idx_program_publishDate', ['publishDate'])
@Index('idx_program_categoryId', ['category'])
export class Program {
  @ApiProperty({ example: 'c6acbc14-113c-4014-a717-3d67acd36ad9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'My Awesome Program' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'This is a description of my awesome program.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'tsvector', select: false, nullable: true })
  searchVector: string;

  @ManyToOne(() => Category, (category: Category) => category.programs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ApiProperty({ enum: MediaType, example: MediaType.PODCAST })
  @Column({ type: 'enum', enum: MediaType, default: MediaType.PODCAST })
  mediaType: MediaType;

  @ApiProperty({ enum: Language, example: Language.AR })
  @Column({ type: 'enum', enum: Language, default: Language.AR })
  language: Language;

  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @ManyToOne(() => MediaUpload, (media) => media.programsWithPoster, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'poster_id' })
  poster?: MediaUpload;

  @ApiProperty({ type: () => [Episode] })
  @OneToMany(() => Episode, (episode) => episode.program, { cascade: true })
  episodes: Episode[];

  @ApiProperty({ description: 'Additional metadata for the media file.' })
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
}
