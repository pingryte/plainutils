import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { iconMap } from '../lib/iconMap';
import RateThisStack from './RateThisStack';

function ToolSwitcher() {
  const router = useRouter();

  const tools = [
    { title: 'Word Counter', href: '/tools/word-counter' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Base64 Encoder / Decoder', href: '/tools/base64' },
    { title: 'Case Converter', href: '/tools/case-converter' },
    { title: 'Unix Timestamp Converter', href: '/tools/unix-timestamp' },
    { title: 'Text Diff Checker', href: '/tools/text-diff' },
    { title: 'DNS Lookup', href: '/tools/dns-lookup' },
    { title: 'IP Location Lookup', href: '/tools/ip-lookup' }, // ✅ Added
  ];

  return (
    <nav className="w-60 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 sticky top-0">
      <h2 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">Tools</h2>
      <ul className="space-y-3">
        {tools.map(({ title, href }) => {
          const isActive = router.pathname === href;
          const Icon = iconMap[title];
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 p-2 rounded-md ${isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Layout({ title, children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = router.pathname === '/';
  const isToolPage = router.pathname.startsWith('/tools/');
  const isAboutPage = router.pathname === '/about';
  const toolSlug = isToolPage ? router.pathname.split('/').pop() : null;
  const Icon = title ? iconMap[title] : null;

  const formattedTitle =
    title ||
    (toolSlug
      ? toolSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      : 'PlainUtils');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Head>
        <title>{formattedTitle}</title>
        <meta name="description" content="PlainUtils – simple web tools for developers and everyday tasks" />
        <meta property="og:title" content={formattedTitle} />
        <meta property="og:description" content="PlainUtils – simple web tools for developers and everyday tasks" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plainutils.pingryte.com" />
        <meta property="og:image" content="https://plainutils.pingryte.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              PlainUtils
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400">Tools</Link>
              <Link href="/about" className="hover:text-blue-500 dark:hover:text-blue-400">About</Link>
              <Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400">Contact</Link>
              <a
                href="https://github.com/pingryte/plainutils"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400"
              >
                Contribute
              </a>
            </nav>
          </div>

          {/* Dark Mode + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link href="/" className="block hover:text-blue-500 dark:hover:text-blue-400">Tools</Link>
            <Link href="/about" className="block hover:text-blue-500 dark:hover:text-blue-400">About</Link>
            <Link href="/contact" className="block hover:text-blue-500 dark:hover:text-blue-400">Contact</Link>
            <a
              href="https://github.com/pingryte/plainutils"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-blue-500 dark:hover:text-blue-400"
            >
              Contribute
            </a>
          </div>
        )}
      </header>

      <main className="flex w-full max-w-6xl mx-auto gap-8 px-6 py-10">
        {isToolPage && <ToolSwitcher />}
        <div className="flex-1">
          {!isHome && (
            <div className="flex items-center gap-2 mb-6">
              {Icon && <Icon className="w-6 h-6 text-blue-500" />}
              <h1 className="text-3xl font-bold">{formattedTitle}</h1>
            </div>
          )}
          {children}

          {isAboutPage && (
            <div className="mt-16">
              <RateThisStack />
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
        © 2025 PlainUtils ·{' '}
        <a
          href="https://github.com/pingryte/plainutils"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          GitHub
        </a>{' '}
        ·{' '}
        <a
          href="https://coff.ee/pingryte"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-500"
        >
          Buy Me a Coffee
        </a>{' '}
        ·{' '}
        <Link href="/about" className="underline hover:text-blue-600">
          About
        </Link>
      </footer>
    </div>
  );
}
