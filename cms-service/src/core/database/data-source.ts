import { DataSource } from 'typeorm';
import { Program } from '../../cms/programs/entities/program.entity';
import { Episode } from '../../cms/episodes/entities/episode.entity';
import { config } from 'dotenv';
import { User } from '../../cms/users/entities/user.entity';
import { MediaUpload } from '../../cms/media/entities/media.entity';
import { Category } from '../../cms/categories/entities/category.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Program, Episode, User, MediaUpload, Category],
  migrations: [process.cwd() + '/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV == 'development',
});
