import { pgTable, uuid, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const results = pgTable('results', {
  id: uuid('id').primaryKey().defaultRandom(),
  resultId: text('result_id').unique().notNull(),

  // User input
  userName: text('user_name'),
  birthDate: timestamp('birth_date').notNull(),
  vibrationNumber: integer('vibration_number').notNull(),

  // AI Generated content - structured reading
  reading: jsonb('reading'), // StructuredReading object
  imageBlobPath: text('image_blob_path'), // Vercel Blob path

  // Status
  status: text('status', { enum: ['pending', 'processing', 'completed', 'error'] })
    .notNull()
    .default('pending'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type Result = typeof results.$inferSelect;
export type NewResult = typeof results.$inferInsert;
