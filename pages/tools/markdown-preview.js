import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Clipboard, Download, FileCode2, FileDown, Maximize2, PanelLeft, PanelRight, Printer, Replace, Smartphone, Tablet, Monitor } from 'lucide-react';
import Layout from '../../components/Layout';
import FileDrop from '../../components/FileDrop';
import { downloadText } from '../../lib/tool-utils';
import { markdownStats, replaceAllLiteral, slugifyHeading, standaloneMarkdownHtml } from '../../lib/markdown-utils';

const DRAFT_KEY = 'plainutils:markdown-draft';
const EXAMPLE = `# Markdown Studio

Write **Markdown** on the left and see a safe, live preview on the right.

## What it supports

- [x] GitHub-flavoured Markdown
- [x] Tables and task lists
- [x] Syntax-highlighted code
- [ ] Your next great idea

| Feature | Runs locally |
| --- | :---: |
| Preview | Yes |
| Export | Yes |

\`\`\`javascript
const greeting = 'Hello, Markdown!';
console.log(greeting);
\`\`\`

> Your text stays in this browser. Nothing is uploaded.
`;

const TEMPLATES = {
  'README': `# Project name\n\nA short description of the project.\n\n## Installation\n\n\`\`\`bash\nnpm install\n\`\`\`\n\n## Usage\n\nExplain the main workflow.\n\n## License\n\nMIT\n`,
  'Release notes': `# Release notes\n\n## Highlights\n\n- New feature\n- Performance improvement\n\n## Fixed\n\n- Describe a resolved issue\n\n## Upgrade notes\n\nDocument any breaking changes.\n`,
  'Meeting notes': `# Meeting notes\n\n**Date:** YYYY-MM-DD  \n**Attendees:** Name, Name\n\n## Agenda\n\n1. Topic\n2. Topic\n\n## Decisions\n\n- Decision\n\n## Actions\n\n- [ ] Owner — task\n`,
};

function CopyButton({ value, label, icon: Icon = Clipboard }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500); };
  return <button className="btn-secondary" onClick={copy} disabled={!value}>{copied ? <Check /> : <Icon />}{copied ? 'Copied' : label}</button>;
}

export default function MarkdownPreview() {
  const [source, setSource] = useState(EXAMPLE);
  const [rendered, setRendered] = useState('');
  const [toc, setToc] = useState([]);
  const [mode, setMode] = useState('split');
  const [previewSize, setPreviewSize] = useState('desktop');
  const [find, setFind] = useState('');
  const [replacement, setReplacement] = useState('');
  const [saved, setSaved] = useState('Draft autosaves on this device');
  const [renderError, setRenderError] = useState('');
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const syncing = useRef(false);
  const loaded = useRef(false);
  const stats = useMemo(() => markdownStats(source), [source]);
  const matches = find ? source.split(find).length - 1 : 0;
  const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim() || 'Markdown document';

  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft !== null) setSource(draft);
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return undefined;
    setSaved('Saving…');
    const timer = window.setTimeout(() => { localStorage.setItem(DRAFT_KEY, source); setSaved('Draft saved on this device'); }, 450);
    return () => window.clearTimeout(timer);
  }, [source]);

  useEffect(() => {
    let active = true;
    async function renderMarkdown() {
      try {
        const [{ Marked }, { markedHighlight }, highlightModule, purifyModule] = await Promise.all([
          import('marked'), import('marked-highlight'), import('highlight.js'), import('dompurify'),
        ]);
        const hljs = highlightModule.default;
        const parser = new Marked(markedHighlight({
          langPrefix: 'hljs language-',
          highlight(code, language) {
            const selected = language && hljs.getLanguage(language) ? language : 'plaintext';
            return hljs.highlight(code, { language: selected }).value;
          },
        }), { gfm: true, breaks: true });
        const safe = purifyModule.default.sanitize(parser.parse(source), { USE_PROFILES: { html: true } });
        const document = new DOMParser().parseFromString(safe, 'text/html');
        document.body.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
          checkbox.setAttribute('aria-label', `Task: ${checkbox.closest('li')?.textContent?.trim() || 'checklist item'}`);
        });
        const used = new Map();
        const nextToc = [...document.body.querySelectorAll('h1, h2, h3')].map((heading) => {
          const base = slugifyHeading(heading.textContent);
          const count = used.get(base) || 0;
          used.set(base, count + 1);
          const id = count ? `${base}-${count + 1}` : base;
          heading.id = id;
          return { id, text: heading.textContent, level: Number(heading.tagName.slice(1)) };
        });
        if (active) { setRendered(document.body.innerHTML); setToc(nextToc); setRenderError(''); }
      } catch (error) {
        if (active) setRenderError(`Preview unavailable: ${error.message}`);
      }
    }
    renderMarkdown();
    return () => { active = false; };
  }, [source]);

  const syncScroll = (from, to) => {
    if (mode !== 'split' || syncing.current || !from.current || !to.current) return;
    syncing.current = true;
    const maxFrom = from.current.scrollHeight - from.current.clientHeight;
    const maxTo = to.current.scrollHeight - to.current.clientHeight;
    to.current.scrollTop = maxFrom > 0 ? (from.current.scrollTop / maxFrom) * maxTo : 0;
    window.requestAnimationFrame(() => { syncing.current = false; });
  };
  const loadTemplate = (name) => { if (name) setSource(TEMPLATES[name]); };
  const exportHtml = () => downloadText(standaloneMarkdownHtml(title, rendered), `${slugifyHeading(title)}.html`, 'text/html');
  const sizeClass = previewSize === 'mobile' ? 'max-w-[390px]' : previewSize === 'tablet' ? 'max-w-[768px]' : 'max-w-none';

  return <Layout title="Markdown Studio" description="Write, preview, search, and export GitHub-flavoured Markdown locally in your browser.">
    <FileDrop accept=".md,.markdown,.txt,text/markdown,text/plain" label="Drop a Markdown or text file" onFile={({ text }) => setSource(text)} />

    <section className="panel mt-5" aria-label="Markdown controls">
      <div className="flex flex-wrap gap-2 justify-between items-end">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Editor view">
          <button className={mode === 'editor' ? 'btn' : 'btn-secondary'} onClick={() => setMode('editor')}><PanelLeft />Editor</button>
          <button className={mode === 'split' ? 'btn' : 'btn-secondary'} onClick={() => setMode('split')}><Maximize2 />Split</button>
          <button className={mode === 'preview' ? 'btn' : 'btn-secondary'} onClick={() => setMode('preview')}><PanelRight />Preview</button>
        </div>
        <label><span className="field-label" htmlFor="markdown-template">Start from a template</span><select id="markdown-template" className="textarea-base !p-2" defaultValue="" onChange={(event) => loadTemplate(event.target.value)}><option value="">Choose…</option>{Object.keys(TEMPLATES).map((name) => <option key={name}>{name}</option>)}</select></label>
      </div>
      <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 mt-4 items-end">
        <label><span className="field-label" htmlFor="markdown-find">Find ({matches} matches)</span><input id="markdown-find" className="textarea-base !p-2.5" value={find} onChange={(event) => setFind(event.target.value)} /></label>
        <label><span className="field-label" htmlFor="markdown-replace">Replace with</span><input id="markdown-replace" className="textarea-base !p-2.5" value={replacement} onChange={(event) => setReplacement(event.target.value)} /></label>
        <button className="btn-secondary" disabled={!find || !matches} onClick={() => setSource(replaceAllLiteral(source, find, replacement))}><Replace />Replace all</button>
      </div>
    </section>

    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4" aria-label="Document statistics">
      <div className="panel text-center"><strong className="text-xl block">{stats.words}</strong><span className="text-sm text-gray-500">Words</span></div>
      <div className="panel text-center"><strong className="text-xl block">{stats.characters}</strong><span className="text-sm text-gray-500">Characters</span></div>
      <div className="panel text-center"><strong className="text-xl block">{stats.headings}</strong><span className="text-sm text-gray-500">Headings</span></div>
      <div className="panel text-center"><strong className="text-xl block">{stats.readingMinutes} min</strong><span className="text-sm text-gray-500">Read time</span></div>
    </section>

    <div className={`mt-4 grid gap-4 ${mode === 'split' ? 'lg:grid-cols-2' : ''}`}>
      {mode !== 'preview' && <section><div className="flex justify-between gap-3 mb-1"><label className="field-label" htmlFor="markdown-source">Markdown</label><span className="text-xs text-gray-500" aria-live="polite">{saved}</span></div><textarea ref={editorRef} id="markdown-source" className="textarea-base h-[36rem] font-mono resize-y" value={source} spellCheck="false" onChange={(event) => setSource(event.target.value)} onScroll={() => syncScroll(editorRef, previewRef)} /></section>}
      {mode !== 'editor' && <section className="min-w-0"><div className="flex flex-wrap justify-between gap-2 mb-1"><h2 className="field-label">Preview</h2><div className="flex gap-1" role="group" aria-label="Preview width"><button className={previewSize === 'desktop' ? 'btn' : 'btn-secondary'} onClick={() => setPreviewSize('desktop')} aria-label="Desktop preview"><Monitor /></button><button className={previewSize === 'tablet' ? 'btn' : 'btn-secondary'} onClick={() => setPreviewSize('tablet')} aria-label="Tablet preview"><Tablet /></button><button className={previewSize === 'mobile' ? 'btn' : 'btn-secondary'} onClick={() => setPreviewSize('mobile')} aria-label="Mobile preview"><Smartphone /></button></div></div><div ref={previewRef} tabIndex="0" aria-label="Scrollable Markdown preview" onScroll={() => syncScroll(previewRef, editorRef)} className="h-[36rem] overflow-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 focus:outline-none focus:ring-2 focus:ring-blue-500"><article className={`markdown-preview markdown-print-area mx-auto ${sizeClass}`} aria-label="Rendered Markdown preview" dangerouslySetInnerHTML={{ __html: rendered }} />{renderError && <p className="error-message" role="alert">{renderError}</p>}</div></section>}
    </div>

    {toc.length > 0 && <section className="panel mt-5"><h2 className="text-xl font-bold">Table of contents</h2><nav aria-label="Generated table of contents" className="mt-3 grid gap-1">{toc.map((item) => <a key={item.id} href={`#${item.id}`} className="text-blue-600 dark:text-blue-400 hover:underline" style={{ paddingLeft: `${item.level - 1}rem` }}>{item.text}</a>)}</nav></section>}

    <section className="panel mt-5"><h2 className="text-xl font-bold">Export</h2><p className="text-sm text-gray-500 mt-1">Download the source, export a standalone web page, copy either format, or print the preview to PDF.</p><div className="flex flex-wrap gap-2 mt-4"><button className="btn-secondary" onClick={() => downloadText(source, `${slugifyHeading(title)}.md`, 'text/markdown')}><FileDown />Markdown</button><button className="btn-secondary" onClick={exportHtml} disabled={!rendered}><Download />HTML page</button><CopyButton value={source} label="Copy Markdown" /><CopyButton value={rendered} label="Copy HTML" icon={FileCode2} /><button className="btn-secondary" onClick={() => window.print()}><Printer />Print / PDF</button></div></section>

    <p className="mt-4 text-sm text-gray-500">Privacy: rendering, files, exports, and draft autosave all stay on this device. HTML is sanitized before preview or export.</p>
  </Layout>;
}
