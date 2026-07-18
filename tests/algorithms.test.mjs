import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

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

test('simple YAML mappings round-trip through JSON', async () => {
  const { parseSimpleYaml, jsonToYaml } = await sourceModule('../lib/yaml.js');
  const value = parseSimpleYaml('name: PlainUtils\nsettings:\n  free: true\n  count: 18');
  assert.deepEqual(value, { name: 'PlainUtils', settings: { free: true, count: 18 } });
  assert.match(jsonToYaml(value), /free: true/);
});

test('UTF-8 Base64 handles non-ASCII text', async () => {
  globalThis.btoa = (value) => Buffer.from(value, 'binary').toString('base64');
  globalThis.atob = (value) => Buffer.from(value, 'base64').toString('binary');
  const { utf8ToBase64, base64ToUtf8 } = await sourceModule('../lib/tool-utils.js');
  const value = 'Hello 👋 مرحبا';
  assert.equal(base64ToUtf8(utf8ToBase64(value)), value);
});
