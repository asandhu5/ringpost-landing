/**
 * A search-result description: at most `max` characters, cut at the end of a sentence
 * when one fits, otherwise at a word, with an ellipsis. Search engines show about 155 to
 * 160 characters; longer text is cut mid-word by them instead.
 */
export function seoDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const sentence = cut.lastIndexOf(". ");
  if (sentence >= 80) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}
