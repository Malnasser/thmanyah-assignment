import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [AuthModule, CacheModule, S3Module],
  exports: [AuthModule, CacheModule, S3Module],
})
export class CoreModule {}
