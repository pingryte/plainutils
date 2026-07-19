export const SNIPPETS_KEY = 'plainutils:snippets-v1';
export const RETENTION_KEY = 'plainutils:snippet-retention';
export const RESTORE_KEY = 'plainutils:snippet-restore';
export const MAX_SNIPPETS = 100;
export const MAX_SNIPPET_SIZE = 1_000_000;

export function expiryFromRetention(retention, now = Date.now()) {
  const days = Number(retention);
  return Number.isFinite(days) && days > 0 ? now + days * 86_400_000 : null;
}

export function cleanSnippets(items, now = Date.now()) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string' && typeof item.value === 'string' && item.value.length <= MAX_SNIPPET_SIZE && (!item.expiresAt || item.expiresAt > now)).slice(0, MAX_SNIPPETS).map((item) => ({
    id: item.id,
    title: item.title.slice(0, 100) || 'Untitled snippet',
    value: item.value,
    toolHref: typeof item.toolHref === 'string' && item.toolHref.startsWith('/') ? item.toolHref : '',
    toolTitle: typeof item.toolTitle === 'string' ? item.toolTitle.slice(0, 100) : '',
    createdAt: Number(item.createdAt) || now,
    updatedAt: Number(item.updatedAt) || Number(item.createdAt) || now,
    expiresAt: Number(item.expiresAt) || null,
    pinned: Boolean(item.pinned),
  }));
}

export function readSnippets(storage, now = Date.now()) {
  try {
    const snippets = cleanSnippets(JSON.parse(storage.getItem(SNIPPETS_KEY) || '[]'), now);
    storage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
    return snippets;
  } catch {
    return [];
  }
}

export function saveSnippet(storage, { title, value, toolHref = '', toolTitle = '', retention = 'never' }, now = Date.now()) {
  if (!String(value).trim()) throw new Error('There is no content to save.');
  if (String(value).length > MAX_SNIPPET_SIZE) throw new Error('Snippets must be smaller than 1 MB.');
  const current = readSnippets(storage, now);
  const snippet = { id: globalThis.crypto?.randomUUID?.() || `${now}-${Math.random()}`, title: String(title).trim().slice(0, 100) || `${toolTitle || 'PlainUtils'} snippet`, value: String(value), toolHref, toolTitle, createdAt: now, updatedAt: now, expiresAt: expiryFromRetention(retention, now), pinned: false };
  storage.setItem(SNIPPETS_KEY, JSON.stringify([snippet, ...current].slice(0, MAX_SNIPPETS)));
  return snippet;
}

export function parseSnippetBackup(value, now = Date.now()) {
  let parsed;
  try { parsed = JSON.parse(value); } catch { throw new Error('That file is not valid JSON.'); }
  const items = Array.isArray(parsed) ? parsed : parsed?.snippets;
  if (!Array.isArray(items)) throw new Error('The backup does not contain a snippets list.');
  const cleaned = cleanSnippets(items, now);
  if (items.length && !cleaned.length) throw new Error('The backup contains no valid snippets.');
  return cleaned;
}
