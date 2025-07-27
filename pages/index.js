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
      <section className="mb-12 text-center max-w-2xl mx-auto relative">
        {/* Background SVG */}
        <svg
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 opacity-10 pointer-events-none"
          width="400"
          height="200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="100" r="100" fill="url(#gradient)" />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(200 100) rotate(90) scale(100)"
            >
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#9333ea" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <h1 className="relative text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          PlainUtils
        </h1>

        <p className="relative text-gray-600 dark:text-gray-300 text-lg mb-6">
          A collection of simple, useful developer tools to make your work easier.
          No sign-up required — just open and use.
        </p>
        <p className="relative text-blue-600 dark:text-blue-400 font-semibold">
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

      {/* Suggest a tool button */}
      <div className="text-center">
        <a
          href="mailto:plainutils@pingryte.com"
          className="inline-block mt-6 px-6 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          Suggest a tool
        </a>
      </div>
    </Layout>
  );
}
