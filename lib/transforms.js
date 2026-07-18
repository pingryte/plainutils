import { base64ToUtf8, sortedJson, utf8ToBase64 } from './tool-utils';

export const pipelineTransforms = [
  ['json-format', 'Format JSON'], ['json-minify', 'Minify JSON'], ['json-sort', 'Sort JSON keys'],
  ['base64-encode', 'Base64 encode'], ['base64-decode', 'Base64 decode'], ['url-encode', 'URL encode'], ['url-decode', 'URL decode'],
  ['uppercase', 'UPPERCASE'], ['lowercase', 'lowercase'], ['trim', 'Trim whitespace'], ['yaml-json', 'YAML → JSON'], ['json-yaml', 'JSON → YAML'],
];

export async function applyTransform(id, input) {
  if (id === 'json-format') return JSON.stringify(JSON.parse(input), null, 2);
  if (id === 'json-minify') return JSON.stringify(JSON.parse(input));
  if (id === 'json-sort') return JSON.stringify(sortedJson(JSON.parse(input)), null, 2);
  if (id === 'base64-encode') return utf8ToBase64(input);
  if (id === 'base64-decode') return base64ToUtf8(input);
  if (id === 'url-encode') return encodeURIComponent(input);
  if (id === 'url-decode') return decodeURIComponent(input);
  if (id === 'uppercase') return input.toUpperCase();
  if (id === 'lowercase') return input.toLowerCase();
  if (id === 'trim') return input.trim();
  if (id === 'yaml-json' || id === 'json-yaml') { const YAML = await import('yaml'); return id === 'yaml-json' ? JSON.stringify(YAML.parse(input), null, 2) : YAML.stringify(JSON.parse(input)); }
  throw new Error('Unknown transformation.');
}
