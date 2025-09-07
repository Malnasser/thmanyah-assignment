import { DataSource } from 'typeorm';
import { Program } from '@cms/programs/entities/program.entity';
import { Episode } from '@cms/episodes/entities/episode.entity';
import { User } from '@cms/users/entities/user.entity';
import { MediaUpload } from '@cms/media/entities/media.entity';
import { Category } from '@cms/categories/entities/category.entity';
import { config } from 'dotenv';

// Only load dotenv in development/local environments
if (process.env.NODE_ENV === 'local') {
  config();
}

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

console.log('Database configuration:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_NAME:', process.env.DB_NAME);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Program, Episode, User, MediaUpload, Category],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/migrations/*.js'
      : 'migrations/*.ts',
  ],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  extra: {
    connectionTimeoutMillis: 60000,
    query_timeout: 60000,
  },
});