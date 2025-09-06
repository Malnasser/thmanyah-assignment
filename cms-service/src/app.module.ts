import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { CmsModule } from './cms/cms.module';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { DiscoveryModule } from './discovery/discovery.module';
import { DatabaseModule } from './core/database/database.module'; // New import

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          ttl: 60000, // optional, default TTL in ms
        }),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CmsModule,
    CoreModule,
    DatabaseModule, // Use the new DatabaseModule
    DiscoveryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
