export const discoveryTasks = [
  { title: 'Clean up or inspect JSON', description: 'Format, validate, sort, minify, or browse nested data.', keywords: 'json api response validate pretty object data', href: '/tools/json-formatter' },
  { title: 'Compare two pieces of text', description: 'See additions, removals, and changed lines clearly.', keywords: 'compare difference diff text files changes', href: '/tools/text-diff' },
  { title: 'Write and preview Markdown', description: 'Draft documentation with GFM, code highlighting, and export.', keywords: 'markdown readme docs preview html write', href: '/tools/markdown-preview' },
  { title: 'Inspect or convert tabular data', description: 'Open CSV or TSV, filter rows, sort, and convert to JSON.', keywords: 'csv spreadsheet table tsv rows columns json', href: '/tools/csv-viewer' },
  { title: 'Test a regular expression', description: 'Try a JavaScript pattern and inspect matches and groups.', keywords: 'regex regexp pattern match validation capture', href: '/tools/regex-tester' },
  { title: 'Encode or decode content', description: 'Work with Base64, URL components, and Unicode text.', keywords: 'encode decode base64 url escape percent', href: '/tools/base64' },
  { title: 'Build a multi-step transformation', description: 'Chain private text and data operations into a repeatable workflow.', keywords: 'workflow pipeline multiple chain automate transform', href: '/workflows' },
  { title: 'Generate IDs, hashes, or random values', description: 'Create UUIDs, secure strings, placeholder text, or digests.', keywords: 'uuid random password hash sha identifier lorem', href: '/tools/random-generator' },
];

export function findTasks(query, limit = 4) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return discoveryTasks.slice(0, limit);
  return discoveryTasks.map((task) => ({ task, score: words.reduce((score, word) => score + (`${task.title} ${task.description} ${task.keywords}`.toLowerCase().includes(word) ? 1 : 0), 0) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map(({ task }) => task);
}
