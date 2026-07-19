import { useEffect, useState } from 'react';
import { BookmarkPlus, Check, Clipboard, Copy, Download, Trash2, Workflow, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { downloadText } from '../lib/tool-utils';
import { RETENTION_KEY, RESTORE_KEY, saveSnippet } from '../lib/snippets';
import { toolByHref } from '../lib/tools';
import HandoffMenu from './HandoffMenu';

export default function ToolActions({ value = '', onPaste, onClear, filename = 'plainutils.txt', download = true }) {
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [retention, setRetention] = useState('never');
  const router = useRouter();
  const notify = (text) => { setMessage(text); window.setTimeout(() => setMessage(''), 1800); };
  const copy = async () => { await navigator.clipboard.writeText(value); notify('Copied'); };
  const paste = async () => { onPaste(await navigator.clipboard.readText()); notify('Pasted'); };
  const currentTool = toolByHref[router.pathname];
  useEffect(() => {
    setRetention(localStorage.getItem(RETENTION_KEY) || 'never');
    if (!onPaste) return;
    try {
      const restore = JSON.parse(localStorage.getItem(RESTORE_KEY) || 'null');
      if (restore?.toolHref === router.pathname && typeof restore.value === 'string') { onPaste(restore.value); localStorage.removeItem(RESTORE_KEY); notify('Snippet restored'); }
    } catch { localStorage.removeItem(RESTORE_KEY); }
  }, [router.pathname, onPaste]);
  const save = () => {
    try { saveSnippet(localStorage, { title, value, toolHref: router.pathname, toolTitle: currentTool?.title || 'PlainUtils', retention }); localStorage.setItem(RETENTION_KEY, retention); setSaving(false); setTitle(''); notify('Saved to Library'); }
    catch (error) { notify(error.message); }
  };

  return (
    <div className="tool-action-bar flex flex-wrap items-center gap-2 mt-3" aria-live="polite">
      {onPaste && <button className="btn-secondary" onClick={paste} type="button"><Clipboard aria-hidden="true" /> Paste</button>}
      <button className="btn-secondary" onClick={copy} disabled={!value} type="button"><Copy aria-hidden="true" /> Copy</button>
      {download && <button className="btn-secondary" onClick={() => downloadText(value, filename)} disabled={!value} type="button"><Download aria-hidden="true" /> Download</button>}
      <button className="btn-secondary" onClick={() => { setTitle(`${currentTool?.title || 'PlainUtils'} snippet`); setSaving(true); }} disabled={!value} type="button"><BookmarkPlus aria-hidden="true" /> Save to Library</button>
      <button className="btn-secondary" disabled={!value} type="button" onClick={() => { localStorage.setItem('plainutils:pipeline-input', value); router.push('/workspace'); }}><Workflow aria-hidden="true" /> Pipeline</button>
      <HandoffMenu value={value} currentPath={router.pathname} />
      {onClear && <button className="btn-secondary" onClick={onClear} type="button"><Trash2 aria-hidden="true" /> Clear</button>}
      {message && <span className="text-sm text-green-700 dark:text-green-400 flex items-center gap-1"><Check className="w-4 h-4" />{message}</span>}
      {saving && <div className="dialog-backdrop" onMouseDown={() => setSaving(false)}><section className="save-dialog" role="dialog" aria-modal="true" aria-labelledby="save-snippet-title" onMouseDown={(event) => event.stopPropagation()}><div className="flex justify-between items-center gap-3"><div><p className="section-kicker">Local Library</p><h2 id="save-snippet-title" className="text-xl font-bold mt-1">Save this snippet</h2></div><button className="icon-button" aria-label="Close save dialog" onClick={() => setSaving(false)}><X /></button></div><label className="block mt-5"><span className="field-label">Name</span><input className="textarea-base !p-2.5" value={title} maxLength="100" autoFocus onChange={(event) => setTitle(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && save()} /></label><label className="block mt-4"><span className="field-label">Automatically delete</span><select className="textarea-base !p-2.5" value={retention} onChange={(event) => setRetention(event.target.value)}><option value="never">Never</option><option value="7">After 7 days</option><option value="30">After 30 days</option><option value="90">After 90 days</option></select></label><p className="text-sm text-gray-500 mt-3">Saved only in this browser. Maximum size: 1 MB.</p><div className="flex justify-end gap-2 mt-5"><button className="btn-secondary" onClick={() => setSaving(false)}>Cancel</button><button className="btn" onClick={save}><BookmarkPlus />Save snippet</button></div></section></div>}
    </div>
  );
}
