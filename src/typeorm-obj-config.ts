import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const config = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: +process.env.POSTGRES_PORT as number,
  database: process.env.POSTGRES_DB as string,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/**/migration/*.{ts,js}'],
  synchronize: false,
  migrationsRun: true,
});

export default config;
