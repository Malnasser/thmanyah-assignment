import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Program } from '@cms/programs/entities/program.entity';
import { User } from '@cms/users/entities/user.entity';
import { MediaUpload } from '@cms/media/entities/media.entity';
import { Category } from '@cms/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('app.database.host'),
        port: configService.get<number>('app.database.port'),
        username: configService.get<string>('app.database.username'),
        password: configService.get<string>('app.database.password'),
        database: configService.get<string>('app.database.name'),
        entities: [Program, User, MediaUpload, Category],
        migrations: [__dirname + '/../../../migrations/*.ts'], // Adjusted path
        synchronize: false,
        logging: configService.get<string>('app.env') == 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
