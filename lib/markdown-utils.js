export function slugifyHeading(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

export function markdownStats(value) {
  const readable = value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?(?:\[([^\]]*)\])(?:\([^)]*\))/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|\-]+/g, ' ');
  const words = readable.trim().match(/[\p{Letter}\p{Number}]+(?:['’.-][\p{Letter}\p{Number}]+)*/gu)?.length || 0;
  const headings = value.match(/^#{1,6}\s+.+$/gm)?.length || 0;
  return { words, characters: value.length, headings, readingMinutes: words ? Math.max(1, Math.ceil(words / 200)) : 0 };
}

export function replaceAllLiteral(value, search, replacement) {
  return search ? value.split(search).join(replacement) : value;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
}

export function standaloneMarkdownHtml(title, renderedHtml) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title || 'Markdown document')}</title>
  <style>body{max-width:52rem;margin:0 auto;padding:2rem;font:16px/1.65 system-ui,sans-serif;color:#1f2937}h1,h2,h3,h4{line-height:1.25;margin-top:1.6em}a{color:#2563eb}img{max-width:100%}blockquote{border-left:4px solid #93c5fd;margin-left:0;padding-left:1rem;color:#4b5563}pre{overflow:auto;background:#111827;color:#e5e7eb;padding:1rem;border-radius:.5rem}code{font-family:ui-monospace,monospace}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d1d5db;padding:.5rem;text-align:left}hr{border:0;border-top:1px solid #d1d5db}</style>
</head>
<body>${renderedHtml}</body>
</html>`;
}
