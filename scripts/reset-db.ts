import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);

async function resetDatabase() {
  console.log('Dropping results table...');
  await db.execute(sql`DROP TABLE IF EXISTS results`);

  console.log('Creating results table with new schema...');
  await db.execute(sql`
    CREATE TABLE results (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      result_id TEXT UNIQUE NOT NULL,
      user_name TEXT,
      birth_date TIMESTAMP NOT NULL,
      vibration_number INTEGER NOT NULL,
      reading JSONB,
      image_blob_path TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  console.log('Database reset complete!');
  process.exit(0);
}

resetDatabase().catch((err) => {
  console.error('Error resetting database:', err);
  process.exit(1);
});
