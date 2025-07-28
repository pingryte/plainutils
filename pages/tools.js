import ToolSearchBar from '../components/ToolSearchBar';
import Layout from '../components/Layout';
import Link from 'next/link';
import { iconMap } from '../lib/iconMap';

const tools = [
  { name: 'Word Counter', description: 'Count words and characters.', path: '/tools/word-counter', category: 'Text Tools' },
  { name: 'JSON Formatter', description: 'Format and validate JSON.', path: '/tools/json-formatter', category: 'Developer Tools' },
  { name: 'Base64 Encoder / Decoder', description: 'Encode/decode Base64 text.', path: '/tools/base64-encoder-decoder', category: 'Encoding Tools' },
  { name: 'Case Converter', description: 'Convert case styles.', path: '/tools/case-converter', category: 'Text Tools' },
  { name: 'Unix Timestamp Converter', description: 'Convert timestamps to dates.', path: '/tools/unix-timestamp-converter', category: 'Developer Tools' },
  { name: 'Text Diff Checker', description: 'Compare text.', path: '/tools/text-diff-checker', category: 'Developer Tools' },
  { name: 'DNS Lookup', description: 'DNS queries.', path: '/tools/dns-lookup', category: 'Network Tools' },
  { name: 'IP Location Lookup', description: 'IP geolocation.', path: '/tools/ip-location-lookup', category: 'Network Tools' },
];

export default function ToolsPage() {
  const grouped = tools.reduce((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <Layout title="">
      <div className="mb-8 max-w-xl mx-auto">
        <ToolSearchBar />
      </div>
      <h1 className="text-4xl font-extrabold mb-6 text-center">🧰 Explore All Tools</h1>
      <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
        From quick word counts to developer utilities, find everything you need in one place.
      </p>
      {Object.entries(grouped).map(([category, group]) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4 text-gray-900 dark:text-white">
            {category}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {group.map((tool) => {
              const Icon = iconMap[tool.name];
              return (
                <li
                  key={tool.name}
                  className="group p-4 border rounded-lg transition-all duration-200 bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 hover:shadow-xl hover:scale-[1.02] border-gray-200 dark:border-gray-700"
                >
                  <Link href={tool.path} className="flex items-center mb-1">
                    {Icon && (
                      <Icon className="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-300 transition" />
                    )}
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:underline">{tool.name}</span>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300">{tool.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </Layout>
  );
}
