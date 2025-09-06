import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module'; // New import

@Module({
  imports: [AuthModule, CacheModule], // Add CacheModule
  exports: [AuthModule, CacheModule], // Add CacheModule
})
export class CoreModule {}
