import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from '@core/cache/cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('app.redis.host'),
            port: configService.get<number>('app.redis.port'),
          },
          ttl: 60000, // optional, default TTL in ms
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    CacheService,
    {
      provide: 'ICacheService',
      useClass: CacheService,
    },
  ],
  exports: [CacheService, 'ICacheService'],
})
export class CacheModule {}
