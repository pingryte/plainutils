export const SESSION_PREFIX = 'plainutils:session:';
export const MAX_SESSION_SIZE = 250_000;

export function historyReducer(state, action) {
  if (action.type === 'set') { const next = typeof action.value === 'function' ? action.value(state.present) : action.value; if (Object.is(next, state.present)) return state; return { past: [...state.past.slice(-49), state.present], present: next, future: [] }; }
  if (action.type === 'undo' && state.past.length) return { past: state.past.slice(0, -1), present: state.past.at(-1), future: [state.present, ...state.future] };
  if (action.type === 'redo' && state.future.length) return { past: [...state.past, state.present], present: state.future[0], future: state.future.slice(1) };
  if (action.type === 'reset') return { past: [], present: action.value, future: [] };
  return state;
}

export function readSession(storage, key, fallback) {
  try { const parsed = JSON.parse(storage.getItem(`${SESSION_PREFIX}${key}`) || 'null'); return parsed && Date.now() - parsed.savedAt < 86_400_000 ? parsed.value : fallback; } catch { return fallback; }
}
