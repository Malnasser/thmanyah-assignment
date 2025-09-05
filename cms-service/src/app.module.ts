import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { CmsModule } from './cms/cms.module';
import { Program } from './cms/programs/entities/program.entity';
import { User } from './cms/users/entities/user.entity';
import { Episode } from './cms/episodes/entities/episode.entity';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { DiscoveryModule } from './discovery/discovery.module';
import { MediaUpload } from './cms/media/entities/media.entity';
import { Category } from './cms/categories/entities/category.entity';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Program, User, Episode, MediaUpload, Category],
        migrations: [__dirname + '/../migrations/*.ts'],
        synchronize: false,
        logging: process.env.NODE_ENV == 'development',
      }),
      inject: [ConfigService],
    }),
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
