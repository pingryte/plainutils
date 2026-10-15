import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import TaskFinder from "../components/TaskFinder";
import { toolByHref, tools } from "../lib/tools";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export default function Home() {
  const [recent, setRecent] = useState([]);
  useEffect(
    () =>
      setRecent(
        JSON.parse(localStorage.getItem("plainutils:recent") || "[]")
          .map((href) => toolByHref[href])
          .filter(Boolean),
      ),
    [],
  );
  return (
    <Layout title="PlainUtils">
      <section className="hero-stage hero-v2">
        <div className="hero-copy">
        <p className="hero-pill"><Sparkles /> The useful corner of the internet</p>
        <h1 className="hero-title">Get the fiddly stuff <span>done.</span></h1>
        <p className="hero-description">A sharp set of browser tools for data, text, code, and everyday problem-solving. Private by default. Ready before you are.</p>
        <div className="hero-actions mt-8 flex flex-wrap items-center gap-4">
          <Link href="/tools" className="btn !px-6 !py-3">
            Explore {tools.length} tools <ArrowRight />
          </Link>
          <a href="#task-finder" className="hero-text-link">Describe a task ↓</a>
        </div>
        <div className="hero-proof-row mt-8 text-sm text-gray-500 dark:text-gray-400">
          <span className="hero-proof">
            <ShieldCheck />
            Runs locally in your browser
          </span>
        </div>
        </div>
        <div className="hero-visual" aria-label="PlainUtils tool preview">
          <div className="hero-window">
            <div className="hero-window-bar"><span/><span/><span/><p>plainutils / transform</p></div>
            <div className="hero-window-body"><p className="code-muted">// messy input</p><pre>{'{ "hello" : "world", "fast":true }'}</pre><div className="hero-process"><span>FORMAT</span><i/><Sparkles/></div><p className="code-muted">// clean result</p><pre className="code-result">{'{\n  "fast": true,\n  "hello": "world"\n}'}</pre></div>
          </div>
        </div>
      </section>
      <TaskFinder />
      {recent.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Recently used</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </section>
      )}
      <section>
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-2xl font-bold">Popular utilities</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Start with the essentials.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-blue-600 dark:text-blue-400 font-medium"
          >
            View all {tools.length} →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.slice(0, 9).map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>
      <section className="workflow-banner mt-12 p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="workflow-banner-icon"><Workflow className="w-6 h-6" /></span>
            <div>
              <p className="section-kicker">PlainUtils Workflows</p>
              <h2 className="text-2xl font-bold mt-1">Start with a recipe. Make it yours.</h2>
              <p className="workflow-banner-copy mt-2 max-w-2xl">Chain transformations together without sending your content to a server.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link href="/workflows" className="btn">Browse recipes <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/workspace" className="btn-secondary">Build your own</Link>
          </div>
        </div>
      </section>
      <section className="idea-card mt-14 text-center">
        <span className="text-3xl" aria-hidden="true">
          💡
        </span>
        <h2 className="text-2xl font-bold mt-2">Got a useful little idea?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Tell us what would save you time. The best utilities often start tiny.
        </p>
        <a href="mailto:plainutils@pingryte.com" className="btn mt-5">
          Suggest a tool
        </a>
      </section>
    </Layout>
  );
}
