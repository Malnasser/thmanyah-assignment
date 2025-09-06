import { Repository } from 'typeorm';
import { BaseRepository } from '@cms/common/base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaUpload } from './entities';

@Injectable()
export class MediaRepository extends BaseRepository<MediaUpload> {
  constructor(
    @InjectRepository(MediaUpload)
    private readonly mediaRepository: Repository<MediaUpload>,
  ) {
    super(mediaRepository);
  }
}
