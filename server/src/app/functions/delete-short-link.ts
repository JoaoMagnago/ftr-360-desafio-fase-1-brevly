import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'

const getShortLinkInput = z.object({
  shortLinkId: z.string(),
})

type DeleteShortLinkInput = z.input<typeof getShortLinkInput>

type DeleteShortLinkOutput = {
  message: string
}

export async function deleteShortLink(
  input: DeleteShortLinkInput
): Promise<Either<ShortLinkNotFoundError, DeleteShortLinkOutput>> {
  const { shortLinkId } = getShortLinkInput.parse(input)

  const [shortLink] = await db
    .select({ id: schema.shortLinks.id })
    .from(schema.shortLinks)
    .where(eq(schema.shortLinks.id, shortLinkId))

  if (!shortLink) {
    return makeLeft(new ShortLinkNotFoundError(shortLinkId))
  }

  await db
    .delete(schema.shortLinks)
    .where(eq(schema.shortLinks.id, shortLinkId))

  return makeRight({ message: 'Short link successfully deleted' })
}
