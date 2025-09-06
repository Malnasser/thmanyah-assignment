import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { IS3Service } from './interfaces/s3-service.interface';

@Injectable()
export class S3Service implements IS3Service {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: this.configService.get<string>('AWS_ENDPOINT'),
      forcePathStyle:
        this.configService.get<string>('AWS_FORCE_PATH_STYLE') === 'true',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  getS3Client(): S3Client {
    return this.s3;
  }

  async uploadFile(
    fileStream: any,
    fileName: string,
    mimeType: string,
  ): Promise<Upload> {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: bucketName,
        Key: fileName,
        Body: fileStream,
        ContentType: mimeType,
      },
    });

    return upload;
  }
}
