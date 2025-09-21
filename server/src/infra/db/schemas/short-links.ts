import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const shortLinks = pgTable('short-links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').notNull().unique(),
  accessCount: integer('access_count').default(0).notNull(),
  csvRemoteKey: text('remote_key').unique(),
  csvRemoteUrl: text('remote_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
