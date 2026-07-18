import { useState } from 'react';
import { Check, Clipboard, Copy, Download, Trash2, Workflow } from 'lucide-react';
import { useRouter } from 'next/router';
import { downloadText } from '../lib/tool-utils';

export default function ToolActions({ value = '', onPaste, onClear, filename = 'plainutils.txt', download = true }) {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const notify = (text) => { setMessage(text); window.setTimeout(() => setMessage(''), 1800); };
  const copy = async () => { await navigator.clipboard.writeText(value); notify('Copied'); };
  const paste = async () => { onPaste(await navigator.clipboard.readText()); notify('Pasted'); };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3" aria-live="polite">
      {onPaste && <button className="btn-secondary" onClick={paste} type="button"><Clipboard aria-hidden="true" /> Paste</button>}
      <button className="btn-secondary" onClick={copy} disabled={!value} type="button"><Copy aria-hidden="true" /> Copy</button>
      {download && <button className="btn-secondary" onClick={() => downloadText(value, filename)} disabled={!value} type="button"><Download aria-hidden="true" /> Download</button>}
      <button className="btn-secondary" disabled={!value} type="button" onClick={() => { localStorage.setItem('plainutils:pipeline-input', value); router.push('/workspace'); }}><Workflow aria-hidden="true" /> Pipeline</button>
      {onClear && <button className="btn-secondary" onClick={onClear} type="button"><Trash2 aria-hidden="true" /> Clear</button>}
      {message && <span className="text-sm text-green-700 dark:text-green-400 flex items-center gap-1"><Check className="w-4 h-4" />{message}</span>}
    </div>
  );
}
