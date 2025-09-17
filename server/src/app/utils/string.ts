/**
 * ## Check Short Url Format
 *
 * @param shortUrl - The short URL to be validated.
 * @returns `true` if the short URL format is valid, otherwise `false`.
 *
 * ### Format Rules:
 * Each word must start with an uppercase letter.
 * The following letters of the word are lowercase.
 * Each word is separated by hyphen (-).
 * Has at least one word.
 * Only numbers and letters are allowed.
 * Special characters or spaces are not allowed. */
export const checkShortUrlFormat = (shortUrl: string) => {
  return /^[A-Z][a-z0-9]*(?:-[A-Z][a-z0-9]*)*$/.test(shortUrl)
}
