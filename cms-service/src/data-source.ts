import { DataSource } from 'typeorm';
import { Program } from './collections/programs/entities/program.entity';
import { Episode } from './collections/episodes/entities/episode.entity';
import { config } from 'dotenv';
import { User } from './collections/users/entities/user.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Program, Episode, User],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV == 'development',
});
