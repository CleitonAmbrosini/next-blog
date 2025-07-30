import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { parse } from 'pg-connection-string';

dotenv.config();

const config = parse(process.env.DATABASE_URL!);

export default defineConfig({
  schema: './src/db/drizzle/schemas.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: config.host!,
    port: config.port ? parseInt(config.port) : 5432,
    user: config.user!,
    password: config.password!,
    database: config.database!,
    ssl: 'require',
  },
});
