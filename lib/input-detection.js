const result = (type, confidence, reason, tools) => ({ type, confidence, reason, tools });

export function detectInput(value) {
  const input = String(value || '').trim();
  if (!input) return result('Unknown', 0, 'Paste some content to identify it.', []);
  if (/^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(input)) return result('JWT', 99, 'Three URL-safe Base64 sections match the structure of a JSON Web Token.', ['/tools/jwt-decoder', '/tools/base64']);
  try { JSON.parse(input); return result('JSON', 99, 'The content parses as valid JSON.', ['/tools/json-formatter', '/tools/yaml-json']); } catch {}
  if (/^https?:\/\/[^\s]+$/i.test(input)) return result('URL', 97, 'The value is a complete HTTP or HTTPS URL.', ['/tools/url-encoder', '/tools/regex-tester']);
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input)) return result('UUID', 98, 'The value matches the RFC UUID layout.', ['/tools/uuid']);
  if (/^(?:\*|\?|\d|[\d*/?,\-]+)(?:\s+(?:\*|\?|\d|[\d*/?,\-]+)){4}$/.test(input)) return result('Cron expression', 92, 'Five whitespace-separated scheduling fields resemble standard cron syntax.', ['/tools/cron-explainer']);
  if (/^-?\d{10}(?:\d{3})?$/.test(input)) return result('Unix timestamp', 94, 'A 10- or 13-digit integer commonly represents epoch seconds or milliseconds.', ['/tools/unix-timestamp']);
  const lines = input.split(/\r?\n/); const commas = lines.filter((line) => line.includes(',')).length; const tabs = lines.filter((line) => line.includes('\t')).length;
  if (lines.length > 1 && (commas >= Math.ceil(lines.length * .7) || tabs >= Math.ceil(lines.length * .7))) return result(tabs > commas ? 'TSV' : 'CSV', 88, 'Most lines use a consistent tabular delimiter.', ['/tools/csv-viewer', '/tools/json-formatter']);
  if (/^(?:---\s*\n)?[\w"'-]+:\s*[^\n]+/m.test(input) && lines.length > 1) return result('YAML', 82, 'Key-and-value lines resemble a YAML mapping.', ['/tools/yaml-json', '/tools/json-formatter']);
  if (/^#{1,6}\s+|\[[ xX]\]|```|\*\*[^*]+\*\*/m.test(input)) return result('Markdown', 84, 'Headings, task items, code fences, or emphasis resemble Markdown.', ['/tools/markdown-preview', '/tools/word-counter']);
  if (input.length >= 16 && input.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(input)) return result('Base64', 72, 'The character set and padding are compatible with standard Base64.', ['/tools/base64']);
  return result('Plain text', 65, 'No more specific structured format was detected.', ['/tools/word-counter', '/tools/case-converter', '/tools/text-diff']);
}

export const toolNames = {
  '/tools/jwt-decoder': 'JWT Decoder', '/tools/base64': 'Base64 Encoder / Decoder', '/tools/json-formatter': 'JSON Formatter', '/tools/yaml-json': 'YAML ↔ JSON Converter', '/tools/url-encoder': 'URL Encoder / Decoder', '/tools/regex-tester': 'Regex Tester', '/tools/uuid': 'UUID Generator / Validator', '/tools/cron-explainer': 'Cron Expression Explainer', '/tools/unix-timestamp': 'Unix Timestamp Converter', '/tools/csv-viewer': 'CSV Viewer & Converter', '/tools/markdown-preview': 'Markdown Studio', '/tools/word-counter': 'Word Counter', '/tools/case-converter': 'Case Converter', '/tools/text-diff': 'Text Diff Checker',
};
