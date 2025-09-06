import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Program } from '@cms/programs/entities/program.entity';
import { User } from '@cms/users/entities/user.entity';
import { Episode } from '@cms/episodes/entities/episode.entity';
import { MediaUpload } from '@cms/media/entities/media.entity';
import { Category } from '@cms/categories/entities/category.entity';

@Module({
  imports: [
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
        migrations: [__dirname + '/../../../migrations/*.ts'], // Adjusted path
        synchronize: false,
        logging: process.env.NODE_ENV == 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
