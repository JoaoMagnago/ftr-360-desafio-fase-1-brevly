export const escapeCSVValue = (value: unknown): string => {
  if (value == null) return ''

  const str = String(value)

  // Escape if it contains comma, quote, or newline
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }

  return str
}
