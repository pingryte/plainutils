export function downloadText(value, filename, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([value], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function utf8ToBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

export function base64ToUtf8(value) {
  const normalized = value.trim().replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return new TextDecoder('utf-8', { fatal: true }).decode(
    Uint8Array.from(binary, (character) => character.charCodeAt(0)),
  );
}

export function sortedJson(value) {
  if (Array.isArray(value)) return value.map(sortedJson);
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().reduce((result, key) => {
      result[key] = sortedJson(value[key]);
      return result;
    }, {});
  }
  return value;
}

export function getJsonError(error) {
  const match = error.message.match(/position (\d+)/i);
  return match ? `${error.message} (character ${Number(match[1]) + 1})` : error.message;
}
