export function diffLines(left, right, { ignoreCase = false, ignoreWhitespace = false } = {}) {
  const a = left.split('\n'); const b = right.split('\n');
  const normalize = (value) => { let result = value; if (ignoreWhitespace) result = result.replace(/\s+/g, ' ').trim(); if (ignoreCase) result = result.toLowerCase(); return result; };
  const table = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i -= 1) for (let j = b.length - 1; j >= 0; j -= 1) table[i][j] = normalize(a[i]) === normalize(b[j]) ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
  const result = []; let i = 0; let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && normalize(a[i]) === normalize(b[j])) { result.push({ type: 'same', left: a[i], right: b[j] }); i += 1; j += 1; }
    else if (j < b.length && (i === a.length || table[i][j + 1] >= table[i + 1][j])) { result.push({ type: 'add', left: '', right: b[j] }); j += 1; }
    else { result.push({ type: 'remove', left: a[i], right: '' }); i += 1; }
  }
  return result;
}
