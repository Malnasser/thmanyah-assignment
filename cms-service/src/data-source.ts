import { DataSource } from 'typeorm';
import { Program } from './cms/programs/entities/program.entity';
import { Episode } from './cms/episodes/entities/episode.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database',
  entities: [Program, Episode],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
  logging: true,
});
