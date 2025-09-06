import { Inject, Injectable } from '@nestjs/common';
import { MediaUpload } from './entities/media.entity';
import { BaseService } from '../common/base/base.service';
import { ICacheService } from 'src/core/cache/interfaces/cache-service.interface';
import { MediaRepository } from './media.repository';
import { IS3Service } from 'src/core/s3/interfaces/s3-service.interface';

@Injectable()
export class MediaService extends BaseService<MediaUpload> {
  constructor(
    private readonly mediaRepository: MediaRepository,
    @Inject('ICacheService') cacheService: ICacheService,
    @Inject('IS3Service') private readonly s3Service: IS3Service,
  ) {
    super(mediaRepository, cacheService, MediaUpload);
  }

  async uploadToS3(
    fileStream: any,
    fileName: string,
    mimeType: string,
    type: string,
  ) {
    const upload = await this.s3Service.uploadFile(
      fileStream,
      fileName,
      mimeType,
    );

    await upload.done();

    const bucketName = process.env.AWS_BUCKET_NAME;

    const media = await this.mediaRepository.create({
      fileUrl: `s3://${bucketName}/${fileName}`,
      mimeType,
      type,
    });

    return media;
  }
}
