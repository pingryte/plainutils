import { useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import ToolActions from '../../components/ToolActions';
import FileDrop from '../../components/FileDrop';
import CharacterDiff from '../../components/CharacterDiff';
import { diffLines } from '../../lib/diff';

function pairRows(rows) {
  const paired = [];
  for (let index = 0; index < rows.length; index += 1) {
    if (rows[index].type === 'remove' && rows[index + 1]?.type === 'add') { paired.push({ type: 'change', left: rows[index].left, right: rows[index + 1].right }); index += 1; }
    else paired.push(rows[index]);
  }
  return paired;
}

export default function TextDiff() {
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [ignoreCase, setIgnoreCase] = useState(false); const [ignoreWhitespace, setIgnoreWhitespace] = useState(false); const [side, setSide] = useState(true);
  const rows = useMemo(() => pairRows(diffLines(a, b, { ignoreCase, ignoreWhitespace })), [a, b, ignoreCase, ignoreWhitespace]);
  const output = rows.filter((row) => row.type !== 'same').flatMap((row) => row.type === 'change' ? [`- ${row.left}`, `+ ${row.right}`] : [row.type === 'add' ? `+ ${row.right}` : `- ${row.left}`]).join('\n') || 'No differences.';
  return <Layout title="Text Diff Checker" description="Compare files or text with line and character-level highlighting, side-by-side views, and normalization controls.">
    <div className="grid md:grid-cols-2 gap-4"><div><FileDrop label="Drop the original file" onFile={({ text }) => setA(text)} /><label className="field-label mt-3" htmlFor="diff-a">Original</label><textarea id="diff-a" className="textarea-base h-52 font-mono" value={a} onChange={(event) => setA(event.target.value)} /></div><div><FileDrop label="Drop the modified file" onFile={({ text }) => setB(text)} /><label className="field-label mt-3" htmlFor="diff-b">Modified</label><textarea id="diff-b" className="textarea-base h-52 font-mono" value={b} onChange={(event) => setB(event.target.value)} /></div></div>
    <div className="flex flex-wrap gap-4 mt-3"><label><input type="checkbox" checked={ignoreCase} onChange={(event) => setIgnoreCase(event.target.checked)} /> Ignore case</label><label><input type="checkbox" checked={ignoreWhitespace} onChange={(event) => setIgnoreWhitespace(event.target.checked)} /> Ignore whitespace</label><label><input type="checkbox" checked={side} onChange={(event) => setSide(event.target.checked)} /> Side by side</label></div>
    <div className="panel mt-4 font-mono text-sm overflow-auto" aria-label="Diff result">{rows.map((row, index) => <div key={index} className={`grid ${side ? 'grid-cols-2' : 'grid-cols-1'} ${row.type === 'add' ? 'bg-green-100 dark:bg-green-950' : row.type === 'remove' ? 'bg-red-100 dark:bg-red-950' : row.type === 'change' ? 'bg-amber-50 dark:bg-gray-900' : ''}`}><span className="px-2 whitespace-pre-wrap">{row.type === 'change' ? <CharacterDiff before={row.left} after={row.right} side="before" /> : <>{row.type === 'remove' ? '- ' : row.type === 'same' ? '  ' : ''}{row.left}</>}</span>{side && <span className="px-2 border-l border-gray-300 dark:border-gray-700 whitespace-pre-wrap">{row.type === 'change' ? <CharacterDiff before={row.left} after={row.right} side="after" /> : <>{row.type === 'add' ? '+ ' : row.type === 'same' ? '  ' : ''}{row.right}</>}</span>}</div>)}</div>
    <ToolActions value={output} onClear={() => { setA(''); setB(''); }} filename="diff.patch" />
  </Layout>;
}
