const unwidow = str => {
  // Remove extra whitespace characters before starting.
  const clean = str.trim().replace(/\s+/g, ' ')

  // We only care about strings with at least 4 words.
  if (clean.split(' ').count < 4) return clean

  // If the last word is long enough, just return the cleaned string.
  if (clean.split(' ').pop().length > 15) return clean

  // Regex matches the last instance of a whitespace character that is followed
  // by a non-whitespace character. It then replaces the former with a
  // non-breaking space character (\u00A0).
  return clean.replace(/\s+([\S]*)(\s*)$/g, '\u00A0$1$2')
}

export default unwidow
