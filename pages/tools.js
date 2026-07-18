import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { tools } from '../lib/tools';
import Link from 'next/link';
import { ArrowRight, Workflow } from 'lucide-react';

export default function ToolsPage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => tools.filter((tool) => `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const grouped = Object.groupBy ? Object.groupBy(filtered, ({ category }) => category) : filtered.reduce((groups, tool) => ({ ...groups, [tool.category]: [...(groups[tool.category] || []), tool] }), {});
  return <Layout title="Explore all tools" description="Search PlainUtils developer, text, data, encoding, network, date, and design utilities.">
    <label htmlFor="tool-search" className="sr-only">Search tools</label><input id="tool-search" type="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, category, or task…" className="textarea-base mb-8" />
    <aside className="panel mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" aria-labelledby="workflow-callout-title"><div className="flex gap-3"><Workflow className="w-6 h-6 shrink-0 text-blue-600"/><div><h2 id="workflow-callout-title" className="font-bold">Need more than one tool?</h2><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Build a private workflow that passes output through several transformations automatically.</p></div></div><Link href="/workspace" className="btn-secondary shrink-0">Open Workflows <ArrowRight/></Link></aside>
    {Object.entries(grouped).map(([category, categoryTools]) => <section key={category} className="mb-10"><h2 className="text-xl font-bold mb-4">{category}</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{categoryTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}</div></section>)}
    {!filtered.length && <p className="panel text-center">No tools match “{query}”. <a className="text-blue-600 underline" href="mailto:plainutils@pingryte.com">Suggest one?</a></p>}
  </Layout>;
}
