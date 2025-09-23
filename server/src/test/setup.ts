import { beforeEach } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

beforeEach(async () => {
  await db.delete(schema.shortLinks).execute()
})
