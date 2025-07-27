import Link from 'next/link';
import Layout from '../components/Layout';

const tools = [
  { name: 'Word Counter', href: '/tools/word-counter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Base64 Encoder / Decoder', href: '/tools/base64' },
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'Unix Timestamp Converter', href: '/tools/unix-timestamp' },
  { name: 'Text Diff Checker', href: '/tools/text-diff' },
];

export default function Home() {
  return (
    <Layout title="PlainUtils">
      <p className="text-center text-gray-600 mb-10">A collection of simple, useful developer tools</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-5 border rounded-lg shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold text-blue-600">{tool.name}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
