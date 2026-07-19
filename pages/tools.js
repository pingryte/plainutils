import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import TaskFinder from "../components/TaskFinder";
import { tools } from "../lib/tools";
import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { categoryStyles, defaultCategoryStyle } from "../lib/category-styles";

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      tools.filter((tool) =>
        `${tool.title} ${tool.description} ${tool.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const grouped = Object.groupBy
    ? Object.groupBy(filtered, ({ category }) => category)
    : filtered.reduce(
        (groups, tool) => ({
          ...groups,
          [tool.category]: [...(groups[tool.category] || []), tool],
        }),
        {},
      );
  return (
    <Layout
      title="Explore all tools"
      description="Search PlainUtils developer, text, data, encoding, network, date, and design utilities."
    >
      <TaskFinder compact />
      <div className="search-stage mb-8">
        <span className="text-2xl" aria-hidden="true">
          ⌕
        </span>
        <label htmlFor="tool-search" className="sr-only">
          Search tools
        </label>
        <input
          id="tool-search"
          type="search"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What do you need to get done?"
          className="flex-1 bg-transparent outline-none text-lg min-w-0"
        />
        <span className="hidden sm:inline text-sm text-gray-500">
          {filtered.length} matches
        </span>
      </div>
      <aside
        className="panel mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        aria-labelledby="workflow-callout-title"
      >
        <div className="flex gap-3">
          <Workflow className="w-6 h-6 shrink-0 text-blue-600" />
          <div>
            <h2 id="workflow-callout-title" className="font-bold">
              Need more than one tool?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Choose a ready-made recipe or build a private workflow that chains
              transformations automatically.
            </p>
          </div>
        </div>
        <Link href="/workflows" className="btn-secondary shrink-0">
          Browse Workflows <ArrowRight />
        </Link>
      </aside>
      {Object.entries(grouped).map(([category, categoryTools]) => {
        const style = categoryStyles[category] || defaultCategoryStyle;
        return (
          <section key={category} className="mb-11">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${style.glow}`}
                aria-hidden="true"
              />
              <h2 className="text-xl font-bold">{category}</h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                {categoryTools.length}
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
      {!filtered.length && (
        <div className="empty-state">
          <span className="text-4xl" aria-hidden="true">
            🛸
          </span>
          <h2 className="text-xl font-bold mt-3">
            That tool hasn’t landed yet
          </h2>
          <p className="mt-1 text-gray-500">
            Nothing matches “{query}”. Try another phrase or{" "}
            <a
              className="text-blue-600 underline"
              href="mailto:plainutils@pingryte.com"
            >
              suggest it to us
            </a>
            .
          </p>
        </div>
      )}
    </Layout>
  );
}
