import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'

const incrementAccessCountInput = z.object({
  searchQuery: z.string(),
  accessCount: z.coerce.number(),
})

type IncrementAccessCountInput = z.input<typeof incrementAccessCountInput>

type IncrementAccessCountOutput = {
  updatedAccessCount: number
}

export async function incrementAccessCount(
  input: IncrementAccessCountInput
): Promise<Either<never, IncrementAccessCountOutput>> {
  const { searchQuery, accessCount } = incrementAccessCountInput.parse(input)

  const result = await db
    .update(schema.shortLinks)
    .set({
      accessCount: accessCount + 1,
    })
    .where(eq(schema.shortLinks.shortUrl, searchQuery))
    .returning({
      updatedAccessCount: schema.shortLinks.accessCount,
    })

  const updatedAccessCount = result[0]?.updatedAccessCount ?? 0

  return makeRight({ updatedAccessCount })
}
