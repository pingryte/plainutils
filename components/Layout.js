import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkModeToggle from './DarkModeToggle';

export default function Layout({ title, children }) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="PlainUtils – simple web tools for developers and everyday tasks" />
        <meta property="og:title" content={title} />
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
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
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
