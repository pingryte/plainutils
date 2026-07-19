import { useEffect, useRef, useState } from 'react';
import { Check, Link2, Share2, ShieldAlert, X } from 'lucide-react';
import { decodeToolState, encodeToolState } from '../lib/tool-share';
import { RESTORE_KEY } from '../lib/snippets';

export default function ToolShare({ toolId, settings, allowedSettings, content, contentLabel = 'input content', onLoad }) {
  const [open, setOpen] = useState(false); const [includeContent, setIncludeContent] = useState(false); const [message, setMessage] = useState(''); const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return; loaded.current = true;
    const encoded = new URLSearchParams(window.location.hash.slice(1)).get('tool');
    if (!encoded) { try { const restore = JSON.parse(localStorage.getItem(RESTORE_KEY) || 'null'); if (restore?.toolHref === window.location.pathname && typeof restore.value === 'string') { onLoad({ settings: {}, content: restore.value }); localStorage.removeItem(RESTORE_KEY); setMessage('Content handed off locally'); } } catch { localStorage.removeItem(RESTORE_KEY); } return; }
    try { const state = decodeToolState(encoded, toolId, allowedSettings); onLoad(state); setMessage(state.content === undefined ? 'Shared settings loaded' : 'Shared settings and content loaded'); }
    catch (error) { setMessage(error.message); }
  }, [toolId, allowedSettings, onLoad]);
  const copy = async () => {
    try { const encoded = encodeToolState(toolId, settings, includeContent ? content : undefined); const url = `${window.location.origin}${window.location.pathname}#tool=${encoded}`; window.history.replaceState(null, '', url); await navigator.clipboard.writeText(url); setMessage('Private share link copied'); setOpen(false); }
    catch (error) { setMessage(error.message); }
  };
  return <><div className="tool-share-row"><button className="btn-secondary" onClick={() => setOpen(true)}><Share2 />Share setup</button>{message && <span className={message.includes('invalid') || message.includes('malformed') || message.includes('unsupported') || message.includes('too long') ? 'error-message !mt-0' : 'success-message !mt-0'} role="status">{message}</span>}</div>{open && <div className="dialog-backdrop" onMouseDown={() => setOpen(false)}><section className="save-dialog" role="dialog" aria-modal="true" aria-labelledby={`${toolId}-share-title`} onMouseDown={(event) => event.stopPropagation()}><div className="flex justify-between gap-3"><div><p className="section-kicker">Privacy-safe sharing</p><h2 id={`${toolId}-share-title`} className="text-xl font-bold mt-1">Share this setup</h2></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close share dialog"><X /></button></div><div className="share-option mt-5"><Check /><div><strong>Tool settings</strong><p className="text-sm text-gray-500">Included by default.</p></div></div><label className="share-option mt-2 cursor-pointer"><input type="checkbox" checked={includeContent} onChange={(event) => setIncludeContent(event.target.checked)} /><div><strong>Include {contentLabel}</strong><p className="text-sm text-gray-500">Anyone with the link can read it.</p></div></label>{includeContent && <p className="flex gap-2 text-sm text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-lg p-3 mt-3"><ShieldAlert className="w-5 h-5 shrink-0"/>Remove secrets, personal data, and private content before sharing.</p>}<p className="text-sm text-gray-500 mt-4">The data is stored in the URL fragment and loaded by the recipient’s browser.</p><div className="flex justify-end gap-2 mt-5"><button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn" onClick={copy}><Link2 />Copy share link</button></div></section></div>}</>;
}
