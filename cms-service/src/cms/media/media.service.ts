import { S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { MediaUpload } from './entities/media.entity';
import { Upload } from '@aws-sdk/lib-storage';
import { BaseService } from '../common/base/base.service';
import { ICacheService } from 'src/core/cache/interfaces/cache-service.interface';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService extends BaseService<MediaUpload> {
  private s3: S3Client;

  constructor(
    private readonly mediaRepository: MediaRepository,
    @Inject('ICacheService') cacheService: ICacheService,
  ) {
    super(mediaRepository, cacheService, MediaUpload);
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT,
      forcePathStyle: process.env.AWS_FORCE_PATH_STYLE === 'true',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadToS3(
    fileStream: any,
    fileName: string,
    mimeType: string,
    type: string,
  ) {
    const bucketName = process.env.AWS_BUCKET_NAME;

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileStream,
        ContentType: mimeType,
      },
    });

    await upload.done();

    const media = await this.mediaRepository.create({
      fileUrl: `s3://${bucketName}/${fileName}`,
      mimeType,
      type,
    });

    return media;
  }
}
