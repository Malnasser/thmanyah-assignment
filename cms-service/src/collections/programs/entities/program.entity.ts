import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Episode } from '../../episodes/entities/episode.entity';
import { Language } from '../../common/enums/language.enum';
import { MediaType } from '../../common/enums/media-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('programs')
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

  @ApiProperty({ example: 'podcast' })
  @Column()
  category: string; // movie, podcast, documentary, etc.

  @ApiProperty({ enum: MediaType, example: MediaType.PODCAST })
  @Column({ type: 'enum', enum: MediaType, default: MediaType.PODCAST })
  mediaType: MediaType;

  @ApiProperty({ enum: Language, example: Language.AR })
  @Column({ type: 'enum', enum: Language, default: Language.AR })
  language: Language;

  @ApiProperty({ example: '2025-09-04T12:00:00Z', nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @ApiProperty({ example: 'https://example.com/program.mp3', nullable: true })
  @Column({ nullable: true })
  fileUrl: string; // S3 path

  @ApiProperty({
    example: 'https://example.com/program-thumbnail.jpg',
    nullable: true,
  })
  @Column({ nullable: true })
  thumbnailUrl: string;

  @ApiProperty({ type: () => [Episode] })
  @OneToMany(() => Episode, (episode) => episode.program, { cascade: true })
  episodes: Episode[];
}
