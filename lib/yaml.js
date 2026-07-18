const scalar = (value) => {
  const clean = value.trim();
  if (clean === 'true') return true; if (clean === 'false') return false; if (clean === 'null' || clean === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(clean)) return Number(clean);
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) return clean.slice(1, -1);
  return clean;
};
export function parseSimpleYaml(input) {
  const lines = input.split('\n').filter((line) => line.trim() && !line.trim().startsWith('#'));
  if (lines.some((line) => /^\s*-\s/.test(line))) throw new Error('Nested YAML arrays are not supported by this lightweight converter; use a JSON array instead.');
  const root = {}; const stack = [{ indent: -1, value: root }];
  for (const line of lines) { const indent = line.match(/^\s*/)[0].length; const match = line.trim().match(/^([^:]+):(.*)$/); if (!match) throw new Error(`Invalid YAML line: ${line.trim()}`); while (stack.at(-1).indent >= indent) stack.pop(); const parent = stack.at(-1).value; const key = match[1].trim(); const raw = match[2]; if (!raw.trim()) { parent[key] = {}; stack.push({ indent, value: parent[key] }); } else parent[key] = scalar(raw); }
  return root;
}
const quote = (value) => typeof value === 'string' && (/[:#\n]|^\s|\s$/.test(value) || value === '') ? JSON.stringify(value) : String(value);
export function jsonToYaml(value, indent = 0) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('The root JSON value must be an object.');
  return Object.entries(value).map(([key, item]) => {
    if (Array.isArray(item)) return `${' '.repeat(indent)}${key}:\n${item.map(entry => `${' '.repeat(indent + 2)}- ${typeof entry === 'object' ? JSON.stringify(entry) : quote(entry)}`).join('\n')}`;
    if (item && typeof item === 'object') return `${' '.repeat(indent)}${key}:\n${jsonToYaml(item, indent + 2)}`;
    return `${' '.repeat(indent)}${key}: ${item === null ? 'null' : quote(item)}`;
  }).join('\n');
}
