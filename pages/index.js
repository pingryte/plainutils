import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { toolByHref, tools } from '../lib/tools';

export default function Home() {
  const [recent, setRecent] = useState([]);
  useEffect(() => setRecent(JSON.parse(localStorage.getItem('plainutils:recent') || '[]').map((href) => toolByHref[href]).filter(Boolean)), []);
  return <Layout title="PlainUtils">
    <section className="text-center max-w-3xl mx-auto py-10 sm:py-16"><h1 className="text-5xl sm:text-6xl font-extrabold animated-gradient mb-5">Useful tools, kept plain.</h1><p className="text-xl text-gray-600 dark:text-gray-300">Fast, free browser utilities for developers and everyday work. No account required; most processing stays on your device.</p><div className="mt-7 flex justify-center gap-3"><Link href="/tools" className="btn">Explore all tools</Link><a href="https://github.com/pingryte/plainutils" className="btn-secondary" target="_blank" rel="noreferrer">Contribute</a></div></section>
    {recent.length > 0 && <section className="mb-12"><h2 className="text-2xl font-bold mb-4">Recently used</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{recent.map((tool) => <ToolCard key={tool.href} tool={tool} />)}</div></section>}
    <section><div className="flex justify-between items-end mb-5"><div><h2 className="text-2xl font-bold">Popular utilities</h2><p className="text-gray-600 dark:text-gray-400 mt-1">Start with the essentials.</p></div><Link href="/tools" className="text-blue-600 dark:text-blue-400 font-medium">View all {tools.length} →</Link></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{tools.slice(0, 9).map((tool) => <ToolCard key={tool.href} tool={tool} />)}</div></section>
    <section className="panel mt-14 text-center"><h2 className="text-2xl font-bold">Have an idea?</h2><p className="mt-2 text-gray-600 dark:text-gray-400">Suggest a tool or help improve one on GitHub.</p><a href="mailto:plainutils@pingryte.com" className="btn mt-5">Suggest a tool</a></section>
  </Layout>;
}
