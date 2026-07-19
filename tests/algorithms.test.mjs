import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import Papa from 'papaparse';

async function sourceModule(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
}

test('line diff preserves following lines after an insertion', async () => {
  const { diffLines } = await sourceModule('../lib/diff.js');
  assert.deepEqual(diffLines('one\ntwo', 'one\ninserted\ntwo').map(({ type }) => type), ['same', 'add', 'same']);
});

test('line diff supports case and whitespace normalization', async () => {
  const { diffLines } = await sourceModule('../lib/diff.js');
  assert.equal(diffLines(' Hello   world ', 'hello world', { ignoreCase: true, ignoreWhitespace: true })[0].type, 'same');
});

test('full YAML documents support arrays and nested mappings', () => {
  const value = parseYaml('name: PlainUtils\ntools:\n  - JSON\n  - YAML\nsettings:\n  free: true');
  assert.deepEqual(value, { name: 'PlainUtils', tools: ['JSON', 'YAML'], settings: { free: true } });
  assert.match(stringifyYaml(value), /- YAML/);
});

test('UTF-8 Base64 handles non-ASCII text', async () => {
  globalThis.btoa = (value) => Buffer.from(value, 'binary').toString('base64');
  globalThis.atob = (value) => Buffer.from(value, 'base64').toString('binary');
  const { utf8ToBase64, base64ToUtf8 } = await sourceModule('../lib/tool-utils.js');
  const value = 'Hello 👋 مرحبا';
  assert.equal(base64ToUtf8(utf8ToBase64(value)), value);
});

test('shared workflows round-trip without input or output data', async () => {
  globalThis.btoa = (value) => Buffer.from(value, 'binary').toString('base64');
  globalThis.atob = (value) => Buffer.from(value, 'base64').toString('binary');
  const { createSharePayload, encodeSharedWorkflow, decodeSharedWorkflow } = await sourceModule('../lib/workflow-share.js');
  const payload = createSharePayload('Unicode 👋', [{ transform: 'trim', enabled: true }]);
  const decoded = decodeSharedWorkflow(encodeSharedWorkflow(payload), new Set(['trim']));
  assert.deepEqual(decoded, { name: 'Unicode 👋', steps: [{ transform: 'trim', enabled: true }] });
  assert.equal('input' in payload, false);
  assert.equal('output' in payload, false);
});

test('shared workflows reject unknown transformations', async () => {
  globalThis.btoa = (value) => Buffer.from(value, 'binary').toString('base64');
  globalThis.atob = (value) => Buffer.from(value, 'base64').toString('binary');
  const { encodeSharedWorkflow, decodeSharedWorkflow } = await sourceModule('../lib/workflow-share.js');
  const encoded = encodeSharedWorkflow({ v: 1, name: 'Unsafe', steps: [{ transform: 'unknown', enabled: true }] });
  assert.throws(() => decodeSharedWorkflow(encoded, new Set(['trim'])), /invalid steps/);
});

test('CSV parser preserves quoted commas and multiline values', () => {
  const result = Papa.parse('name,notes\nAda,"Uses commas, safely"\nGrace,"Line one\nLine two"', { header: true });
  assert.equal(result.errors.length, 0);
  assert.deepEqual(result.data, [
    { name: 'Ada', notes: 'Uses commas, safely' },
    { name: 'Grace', notes: 'Line one\nLine two' },
  ]);
});

test('CSV parser detects inconsistent row widths', () => {
  const result = Papa.parse('name,role\nAda,Engineer,Unexpected', { header: true });
  assert.equal(result.errors.some((error) => error.code === 'TooManyFields'), true);
});

test('Markdown helpers count content and replace literal special characters', async () => {
  const { markdownStats, replaceAllLiteral, slugifyHeading } = await sourceModule('../lib/markdown-utils.js');
  assert.deepEqual(markdownStats('# Hello world\n\nA **small** test.'), { words: 5, characters: 32, headings: 1, readingMinutes: 1 });
  assert.equal(replaceAllLiteral('a.* a.*', '.*', '$&'), 'a$& a$&');
  assert.equal(slugifyHeading('Café & APIs'), 'cafe-apis');
});

test('snippet backups are validated and expired items are removed', async () => {
  const { cleanSnippets, expiryFromRetention, parseSnippetBackup } = await sourceModule('../lib/snippets.js');
  const now = 1_000_000;
  const current = { id: 'current', title: 'Useful', value: 'hello', createdAt: now, expiresAt: now + 1000 };
  const expired = { id: 'old', title: 'Old', value: 'gone', createdAt: now - 2000, expiresAt: now - 1 };
  assert.deepEqual(cleanSnippets([current, expired], now).map((item) => item.id), ['current']);
  assert.equal(expiryFromRetention('7', now), now + 7 * 86_400_000);
  assert.equal(expiryFromRetention('never', now), null);
  assert.equal(parseSnippetBackup(JSON.stringify({ snippets: [current] }), now)[0].title, 'Useful');
  assert.throws(() => parseSnippetBackup('{broken', now), /not valid JSON/);
});

test('tool share links round-trip settings and reject wrong tools', async () => {
  globalThis.btoa = (value) => Buffer.from(value, 'binary').toString('base64');
  globalThis.atob = (value) => Buffer.from(value, 'base64').toString('binary');
  const { encodeToolState, decodeToolState } = await sourceModule('../lib/tool-share.js');
  const encoded = encodeToolState('regex', { pattern: '[a-z]+', flags: 'gi' }, 'Hello');
  assert.deepEqual(decodeToolState(encoded, 'regex', ['pattern', 'flags']), { settings: { pattern: '[a-z]+', flags: 'gi' }, content: 'Hello' });
  assert.throws(() => decodeToolState(encoded, 'json', ['view']), /unsupported/);
  assert.throws(() => encodeToolState('regex', {}, 'x'.repeat(100001)), /100 KB/);
});

test('task discovery understands plain-language intent', async () => {
  const { findTasks } = await sourceModule('../lib/task-discovery.js');
  assert.equal(findTasks('clean API json response')[0].href, '/tools/json-formatter');
  assert.equal(findTasks('compare two files')[0].href, '/tools/text-diff');
});
