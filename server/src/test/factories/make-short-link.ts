import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeShortLink(
  overrides?: Partial<InferInsertModel<typeof schema.shortLinks>>
) {
  const fileName = faker.system.fileName()

  const result = await db
    .insert(schema.shortLinks)
    .values({
      originalUrl: 'https://example.com/fileName',
      shortUrl: `${fileName}${uuidv7().slice(0, 6).toLowerCase()}`,
      accessCount: 1,
      createdAt: new Date(),
      ...overrides,
    })
    .returning()

  return result[0]
}
