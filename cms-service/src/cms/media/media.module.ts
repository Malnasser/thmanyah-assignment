import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaUpload } from './entities/media.entity';
import { MediaRepository } from './media.repository';
import { CoreModule } from 'src/core/core.module'; // Import CoreModule

@Module({
  imports: [TypeOrmModule.forFeature([MediaUpload]), CoreModule], // Add CoreModule here
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [MediaService],
})
export class MediaModule {}
