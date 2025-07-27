import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ title, children }) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>{title}</title>
      </Head>

      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PlainUtils
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
        {!isHome && (
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
        )}
        {children}
      </main>

      <footer className="text-center text-gray-500 text-sm py-4">
        © 2025 PlainUtils
      </footer>
    </div>
  );
}
