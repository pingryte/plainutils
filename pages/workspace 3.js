import { useEffect, useState } from 'react';
import { ArrowDown, Play, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import FileDrop from '../components/FileDrop';
import ToolActions from '../components/ToolActions';
import { applyTransform, pipelineTransforms } from '../lib/transforms';

const newStep = (transform = 'json-format') => ({ id: crypto.randomUUID(), transform });

export default function Workspace() {
  const [input, setInput] = useState(''); const [steps, setSteps] = useState([]); const [results, setResults] = useState([]); const [error, setError] = useState(''); const [running, setRunning] = useState(false);
  useEffect(() => { const saved = localStorage.getItem('plainutils:pipeline-input'); if (saved) { setInput(saved); localStorage.removeItem('plainutils:pipeline-input'); } const savedSteps = localStorage.getItem('plainutils:pipeline-steps'); if (savedSteps) try { setSteps(JSON.parse(savedSteps)); } catch {} }, []);
  useEffect(() => { if (steps.length) localStorage.setItem('plainutils:pipeline-steps', JSON.stringify(steps)); else localStorage.removeItem('plainutils:pipeline-steps'); }, [steps]);
  const run = async () => { setRunning(true); setError(''); const next = []; let value = input; try { for (const step of steps) { value = await applyTransform(step.transform, value); next.push(value); } setResults(next); } catch (caught) { setError(`Step ${next.length + 1}: ${caught.message}`); setResults(next); } finally { setRunning(false); } };
  const loadExample = () => { setInput('{"name":"PlainUtils","version":2.1,"local":true}'); setSteps([newStep('json-format'), newStep('json-sort'), newStep('base64-encode')]); setResults([]); setError(''); };
  const output = results.at(-1) || input;

  return <Layout title="Pipeline Workspace" metaTitle="Local Tool Pipeline Workspace | PlainUtils" description="Chain multiple PlainUtils transformations into a reusable local workflow.">
    <section className="panel mb-6" aria-labelledby="pipeline-guide-title">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
        <div><h2 id="pipeline-guide-title" className="text-xl font-bold">How pipelines work</h2><p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">A pipeline passes your input through each transformation in order. The output from step 1 becomes the input for step 2, continuing until the final result is produced.</p></div>
        <button className="btn-secondary shrink-0" onClick={loadExample}>Load example pipeline</button>
      </div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {[['1', 'Add input', 'Type, paste, drop a file, or use the Pipeline button from another tool.'], ['2', 'Choose steps', 'Add transformations in the exact order they should run.'], ['3', 'Run', 'PlainUtils processes every step locally and reports where an error occurs.'], ['4', 'Use the result', 'Copy, download, or send the final output into another pipeline.']].map(([number, title, text]) => <li key={number} className="flex gap-3"><span className="w-7 h-7 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{number}</span><span><strong className="block">{title}</strong><span className="text-sm text-gray-600 dark:text-gray-400">{text}</span></span></li>)}
      </ol>
      <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"><ShieldCheck className="w-5 h-5 shrink-0 text-green-600"/><p><strong>Private by design:</strong> pipeline inputs and results never leave your browser. Your selected steps are saved on this device so you can reuse the workflow; input and output are not saved.</p></div>
    </section>

    <div className="grid lg:grid-cols-[1fr_22rem] gap-6">
      <section><FileDrop accept=".txt,.json,.yaml,.yml,.csv,.md,.html,.css,.js" onFile={({ text }) => setInput(text)} /><label className="field-label mt-4" htmlFor="pipeline-input">Pipeline input</label><textarea id="pipeline-input" className="textarea-base h-52 font-mono" value={input} onChange={(event) => setInput(event.target.value)} /><ToolActions value={output} onClear={() => { setInput(''); setResults([]); }} filename="pipeline-output.txt" /><label className="field-label mt-5" htmlFor="pipeline-output">Final output</label><textarea id="pipeline-output" className="textarea-base h-64 font-mono" value={output} readOnly /></section>
      <aside><div className="flex justify-between items-center mb-3"><h2 className="text-xl font-bold">Transformation steps</h2><button className="btn-secondary" onClick={() => setSteps([...steps, newStep()])}><Plus /> Add</button></div>{!steps.length && <p className="panel text-sm text-gray-500">No steps yet. Add a transformation or load the example above. Available operations include JSON formatting, Base64, URL encoding, text case, whitespace cleanup, and YAML conversion.</p>}<div className="space-y-2">{steps.map((step, index) => <div key={step.id}><div className="panel flex gap-2 items-center"><span className="font-bold">{index + 1}</span><select aria-label={`Transformation ${index + 1}`} className="textarea-base !p-2" value={step.transform} onChange={(event) => setSteps(steps.map((item) => item.id === step.id ? { ...item, transform: event.target.value } : item))}>{pipelineTransforms.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><button className="icon-button" aria-label={`Remove step ${index + 1}`} onClick={() => setSteps(steps.filter((item) => item.id !== step.id))}><Trash2 /></button></div>{index < steps.length - 1 && <ArrowDown className="w-4 h-4 mx-auto text-gray-400" />}</div>)}</div><button className="btn w-full mt-4" onClick={run} disabled={running || !steps.length}><Play />{running ? 'Running…' : 'Run pipeline'}</button>{error && <p className="error-message" role="alert">{error}</p>}</aside>
    </div>
  </Layout>;
}
