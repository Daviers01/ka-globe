import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: 'prisma/migrations',
    seed: 'npm run seed',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
