import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { tools } from '../lib/tools';

export default function ToolsPage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => tools.filter((tool) => `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const grouped = Object.groupBy ? Object.groupBy(filtered, ({ category }) => category) : filtered.reduce((groups, tool) => ({ ...groups, [tool.category]: [...(groups[tool.category] || []), tool] }), {});
  return <Layout title="Explore all tools" description="Search PlainUtils developer, text, data, encoding, network, date, and design utilities.">
    <label htmlFor="tool-search" className="sr-only">Search tools</label><input id="tool-search" type="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, category, or task…" className="textarea-base mb-8" />
    {Object.entries(grouped).map(([category, categoryTools]) => <section key={category} className="mb-10"><h2 className="text-xl font-bold mb-4">{category}</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{categoryTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}</div></section>)}
    {!filtered.length && <p className="panel text-center">No tools match “{query}”. <a className="text-blue-600 underline" href="mailto:plainutils@pingryte.com">Suggest one?</a></p>}
  </Layout>;
}
