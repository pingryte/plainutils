import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkModeToggle from './DarkModeToggle';
import { iconMap } from '../lib/iconMap';


export default function Layout({ title, children }) {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isToolPage = router.pathname.startsWith('/tools/');
  const toolSlug = isToolPage ? router.pathname.split('/').pop() : null;
  const Icon = toolSlug ? iconMap[toolSlug] : null;

  const formattedTitle = title || (
    toolSlug
      ? toolSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : 'PlainUtils'
  );

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
        <div className="px-6 py-4 max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            PlainUtils
          </Link>
          <DarkModeToggle />
        </div>
      </header>

      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
        {!isHome && (
          <div className="flex items-center gap-2 mb-6">
            {Icon && <Icon className="w-6 h-6 text-blue-500" />}
            <h1 className="text-3xl font-bold">{formattedTitle}</h1>
          </div>
        )}
        {children}
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
        </a>
      </footer>
    </div>
  );
}
