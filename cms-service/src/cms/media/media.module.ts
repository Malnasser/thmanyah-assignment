import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaUpload } from './entities/media.entity';
import { MediaRepository } from './media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MediaUpload])],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [MediaService],
})
export class MediaModule {}
