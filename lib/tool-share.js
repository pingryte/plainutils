export const MAX_TOOL_SHARE_LENGTH = 8192;
export const MAX_SHARED_CONTENT = 100_000;

function encodeUtf8(value) { const bytes = new TextEncoder().encode(value); let binary = ''; bytes.forEach((byte) => { binary += String.fromCharCode(byte); }); return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function decodeUtf8(value) { const normalized = value.replace(/-/g, '+').replace(/_/g, '/'); const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')); return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, (character) => character.charCodeAt(0))); }

export function encodeToolState(tool, settings, content) {
  const payload = { v: 1, tool, settings };
  if (content !== undefined) payload.content = String(content);
  if (payload.content?.length > MAX_SHARED_CONTENT) throw new Error('Shared content must be smaller than 100 KB.');
  const encoded = encodeUtf8(JSON.stringify(payload));
  if (encoded.length > MAX_TOOL_SHARE_LENGTH - 100) throw new Error('This share link would be too long. Try sharing settings only.');
  return encoded;
}

export function decodeToolState(encoded, expectedTool, allowedSettings) {
  let data;
  try { data = JSON.parse(decodeUtf8(encoded)); } catch { throw new Error('The shared tool link is malformed or incomplete.'); }
  if (data?.v !== 1 || data.tool !== expectedTool || !data.settings || typeof data.settings !== 'object' || Array.isArray(data.settings)) throw new Error('This shared tool link is unsupported.');
  const allowed = new Set(allowedSettings);
  if (Object.keys(data.settings).some((key) => !allowed.has(key)) || Object.keys(data.settings).length > 20) throw new Error('The shared tool link contains invalid settings.');
  if (Object.values(data.settings).some((value) => !['string', 'number', 'boolean'].includes(typeof value) || (typeof value === 'string' && value.length > 1000))) throw new Error('The shared tool settings are invalid.');
  if (data.content !== undefined && (typeof data.content !== 'string' || data.content.length > MAX_SHARED_CONTENT)) throw new Error('The shared tool content is invalid.');
  return { settings: data.settings, content: data.content };
}
