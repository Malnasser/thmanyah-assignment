import { DataSource } from 'typeorm';
import { Program } from '@cms/programs/entities/program.entity';
import { User } from '@cms/users/entities/user.entity';
import { Category } from '@cms/categories/entities/category.entity';
import { config } from 'dotenv';
import { MediaUpload } from '@cms/media';

config();

const requiredEnvVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

console.log(process.env.DB_PASSWORD);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Program, User, Category, MediaUpload],
  migrations: ['migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  extra: {
    connectionTimeoutMillis: 60000,
    query_timeout: 60000,
  },
});
