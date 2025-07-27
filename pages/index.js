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
  {
    title: 'Word Counter',
    href: '/tools/word-counter',
    icon: FileText, // just the component name (no < />)
  },
  {
    title: 'JSON Formatter',
    href: '/tools/json-formatter',
    icon: Code,
  },
  {
    title: 'Base64 Encoder / Decoder',
    href: '/tools/base64',
    icon: ImageIcon,
  },
  {
    title: 'Case Converter',
    href: '/tools/case-converter',
    icon: CaseSensitive,
  },
  {
    title: 'Unix Timestamp Converter',
    href: '/tools/unix-timestamp',
    icon: Clock,
  },
  {
    title: 'Text Diff Checker',
    href: '/tools/text-diff',
    icon: Diff,
  },
];

export default function Home() {
  return (
    <Layout title="PlainUtils">
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        A collection of simple, useful developer tools
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="block p-5 border rounded-lg shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Icon className="w-5 h-5" />
              {title}
            </h2>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
