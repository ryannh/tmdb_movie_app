export function truncate(text: string | undefined, n = 140) {
  if (!text) return '';
  return text.length > n ? text.slice(0, n - 1) + '…' : text;
}
