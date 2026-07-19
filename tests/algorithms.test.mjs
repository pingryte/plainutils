import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

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
