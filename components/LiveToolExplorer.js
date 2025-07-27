import { useRouter } from 'next/router';
import { iconMap } from '../lib/iconMap';

const tools = [
  { title: 'Word Counter', href: '/tools/word-counter' },
  { title: 'JSON Formatter', href: '/tools/json-formatter' },
  { title: 'Base64 Encoder / Decoder', href: '/tools/base64' },
  { title: 'Case Converter', href: '/tools/case-converter' },
  { title: 'Unix Timestamp Converter', href: '/tools/unix-timestamp' },
  { title: 'Text Diff Checker', href: '/tools/text-diff' },
];

export default function LiveToolExplorer() {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 shadow-md">
      <h3 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">🧪 Live Tool Explorer</h3>
      <ul className="space-y-3">
        {tools.map(({ title, href }) => {
          const Icon = iconMap[title];
          return (
            <li
              key={href}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded transition"
              onClick={() => router.push(href)}
            >
              {Icon && <Icon className="w-5 h-5 text-blue-500" aria-hidden="true" />}
              <span className="text-sm font-medium">{title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

