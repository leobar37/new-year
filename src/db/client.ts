import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { results } from './schema';

const sql = neon(process.env.DATABASE_URL || 'postgres://user:pass@localhost/myyear');
export const db = drizzle(sql, { schema: { results } });
