export const MAX_SHARE_URL_LENGTH = 8192;

function encodeUtf8(value) {
  const bytes = new TextEncoder().encode(value); let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeUtf8(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='));
  return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
}

export function createSharePayload(name, steps) {
  return { v: 1, name: String(name || 'Shared workflow').trim().slice(0, 120) || 'Shared workflow', steps: steps.map(({ transform, enabled }) => ({ transform, enabled: enabled !== false })) };
}

export function encodeSharedWorkflow(payload) {
  return encodeUtf8(JSON.stringify(payload));
}

export function decodeSharedWorkflow(encoded, validTransforms) {
  let data;
  try { data = JSON.parse(decodeUtf8(encoded)); } catch { throw new Error('The shared workflow link is malformed or incomplete.'); }
  if (data?.v !== 1 || typeof data.name !== 'string' || !Array.isArray(data.steps) || data.steps.length < 1 || data.steps.length > 50) throw new Error('This shared workflow format is unsupported.');
  if (data.name.length > 120 || data.steps.some((step) => !step || typeof step.transform !== 'string' || !validTransforms.has(step.transform) || (step.enabled !== undefined && typeof step.enabled !== 'boolean'))) throw new Error('The shared workflow contains invalid steps.');
  return { name: data.name.trim() || 'Shared workflow', steps: data.steps.map(({ transform, enabled }) => ({ transform, enabled: enabled !== false })) };
}
