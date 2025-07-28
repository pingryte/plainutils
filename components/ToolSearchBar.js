// components/ToolSearchBar.js
import { useEffect, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { iconMap } from '../lib/iconMap';

const tools = [
  { title: 'Word Counter', href: '/tools/word-counter' },
  { title: 'JSON Formatter', href: '/tools/json-formatter' },
  { title: 'Base64 Encoder / Decoder', href: '/tools/base64' },
  { title: 'Case Converter', href: '/tools/case-converter' },
  { title: 'Unix Timestamp Converter', href: '/tools/unix-timestamp' },
  { title: 'Text Diff Checker', href: '/tools/text-diff' },
  { title: 'DNS Lookup', href: '/tools/dns-lookup' },
  { title: 'IP Location Lookup', href: '/tools/ip-lookup' },
];

const fuse = new Fuse(tools, {
  keys: ['title'],
  threshold: 0.4,
});

export default function ToolSearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.map((r) => r.item));
    }
  }, [query]);

  return (
    <div className={`relative max-w-md w-full mx-auto mb-8 ${className}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tools (press / to focus)"
        aria-label="Search tools"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
          {results.map(({ title, href }) => {
            const Icon = iconMap[title];
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => setQuery('')}
                >
                  {Icon && <Icon className="w-4 h-4 text-blue-500" />}
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
