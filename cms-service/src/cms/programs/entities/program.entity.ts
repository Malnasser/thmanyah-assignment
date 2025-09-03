import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Episode } from '../../episodes/entities/episode.entity';
import { Language } from '../../common/enums/language.enum';
import { MediaType } from '../../common/enums/media-type.enum';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  category: string; // movie, podcast, documentary, etc.

  @Column({ type: 'enum', enum: MediaType, default: MediaType.PODCAST })
  mediaType: MediaType;

  @Column({ type: 'enum', enum: Language, default: Language.AR })
  language: Language;

  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @Column({ nullable: true })
  fileUrl: string; // S3 path

  @Column({ nullable: true })
  thumbnailUrl: string;

  @OneToMany(() => Episode, (episode) => episode.program, { cascade: true })
  episodes: Episode[];
}
