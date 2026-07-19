import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import TaskFinder from "../components/TaskFinder";
import { toolByHref, tools } from "../lib/tools";
import {
  ArrowRight,
  Command,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools" className="btn !px-6 !py-3">
            Explore {tools.length} tools <ArrowRight />
          </Link>
          <button
            className="btn-secondary !px-5 !py-3"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              )
            }
          >
            <Command />
            Quick search <kbd>⌘K</kbd>
          </button>
        </div>
        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="hero-proof">
            <Zap />
            Instant results
          </span>
          <span className="hero-proof">
            <ShieldCheck />
            Local-first privacy
          </span>
          <span className="hero-proof">
            <Sparkles />
            Free to use
          </span>
        </div>
        </div>
        <div className="hero-visual" aria-label="PlainUtils tool preview">
          <div className="hero-visual-glow" aria-hidden="true" />
          <div className="hero-window">
            <div className="hero-window-bar"><span/><span/><span/><p>plainutils / transform</p></div>
            <div className="hero-window-body"><p className="code-muted">// messy input</p><pre>{'{ "hello" : "world", "fast":true }'}</pre><div className="hero-process"><span>FORMAT</span><i/><Sparkles/></div><p className="code-muted">// clean result</p><pre className="code-result">{'{\n  "fast": true,\n  "hello": "world"\n}'}</pre></div>
          </div>
          <div className="float-card float-card-one"><ShieldCheck/><span><strong>Local-first</strong><small>Your data stays put</small></span></div>
          <div className="float-card float-card-two"><Zap/><span><strong>Instant</strong><small>No waiting around</small></span></div>
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
      <section className="workflow-banner mb-12 overflow-hidden rounded-2xl text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-xl bg-white/15 ring-1 ring-white/20">
              <Workflow className="w-7 h-7" />
            </span>
            <div>
              <p className="text-sm font-semibold text-cyan-100 uppercase tracking-wide">
                PlainUtils Workflows
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                Start with a recipe. Make it yours.
              </h2>
              <p className="mt-2 text-blue-100 max-w-2xl">
                Chain transformations together without sending your content to a
                server.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/workflows"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Browse recipes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/workspace"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold border border-white/40 hover:bg-white/10"
            >
              Build your own
            </Link>
          </div>
        </div>
      </section>
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
