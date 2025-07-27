import Link from 'next/link';
import Layout from '../components/Layout';
import {
  FileText,
  Code,
  Image as ImageIcon,
  CaseSensitive,
  Clock,
  Diff,
} from 'lucide-react';

const tools = [
  { title: 'Word Counter', href: '/tools/word-counter', icon: FileText },
  { title: 'JSON Formatter', href: '/tools/json-formatter', icon: Code },
  { title: 'Base64 Encoder / Decoder', href: '/tools/base64', icon: ImageIcon },
  { title: 'Case Converter', href: '/tools/case-converter', icon: CaseSensitive },
  { title: 'Unix Timestamp Converter', href: '/tools/unix-timestamp', icon: Clock },
  { title: 'Text Diff Checker', href: '/tools/text-diff', icon: Diff },
];

export default function Home() {
  return (
    <Layout title="PlainUtils">
      {/* Hero Section */}
      <section className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          PlainUtils
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          A collection of simple, useful developer tools to make your work easier.
          No sign-up required — just open and use.
        </p>
        <p className="text-blue-600 dark:text-blue-400 font-semibold">
          Choose a tool below to get started.
        </p>
      </section>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group block p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-900 transition-transform transition-shadow duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110 group-focus:scale-110" />
              <span className="relative after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full group-focus-visible:after:w-full">
                {title}
              </span>
            </h2>
          </Link>
        ))}
      </div>

      {/* Suggest a tool link */}
      <div className="text-center">
        <a
          href="mailto:plainutils@pingryte.com"
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-600"
        >
          Suggest a tool
        </a>
      </div>
    </Layout>
  );
}
