import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BookMarked, Menu, Search, Workflow, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { toolByHref, tools } from '../lib/tools';
import CommandPalette from './CommandPalette';

const SITE = 'https://plainutils.com';

function ToolNavigation({ onNavigate }) {
  const router = useRouter();
  return (
    <nav aria-label="Tool navigation" className="space-y-1">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return <Link key={tool.href} href={tool.href} onClick={onNavigate} aria-current={router.pathname === tool.href ? 'page' : undefined} className={`flex gap-2 items-center p-2 rounded text-sm ${router.pathname === tool.href ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}><Icon className="w-4 h-4 shrink-0" />{tool.title}</Link>;
      })}
    </nav>
  );
}

export default function Layout({ title, metaTitle, description = 'Fast, free and privacy-conscious browser tools for developers and everyday tasks.', keywords, canonical, hidePageHeader = false, children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const currentTool = toolByHref[router.pathname];
  const pageTitle = metaTitle || (title && title !== 'PlainUtils' ? `${title} | PlainUtils` : 'PlainUtils – Fast, Free Browser Tools');
  const canonicalPath = canonical || (router.pathname === '/' ? '' : router.asPath.split('?')[0]);
  const canonicalUrl = `${SITE}${canonicalPath}`;
  const Icon = currentTool?.icon;
  const relatedTools = currentTool ? tools.filter((tool) => tool.category === currentTool.category && tool.href !== currentTool.href).slice(0, 3) : [];

  useEffect(() => { setMenuOpen(false); setToolsOpen(false); }, [router.asPath]);
  useEffect(() => { const open = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen(true); } }; window.addEventListener('keydown', open); return () => window.removeEventListener('keydown', open); }, []);

  return (
    <div className="site-shell min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta property="og:url" content={canonicalUrl} /><meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="theme-color" content="#2563eb" />
      </Head>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800 sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-6"><Link href="/" className="brand-mark"><span className="brand-spark" aria-hidden="true">✦</span><span>PlainUtils</span></Link>
            <nav className="hidden md:flex gap-5 text-sm font-medium" aria-label="Main navigation"><Link href="/tools">Tools</Link><Link href="/workflows" className="flex items-center gap-1.5"><Workflow className="w-4 h-4"/>Workflows</Link><Link href="/library" className="flex items-center gap-1.5"><BookMarked className="w-4 h-4"/>Library</Link><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav>
          </div>
          <div className="flex items-center gap-2"><Link href="/workspace" aria-label="Open pipeline workspace" className="icon-button"><Workflow /></Link><button onClick={() => setPaletteOpen(true)} aria-label="Search tools, Command K" className="icon-button flex items-center gap-2"><Search /><span className="hidden lg:inline text-xs text-gray-500">⌘K</span></button><DarkModeToggle /><button onClick={() => setMenuOpen(!menuOpen)} className="icon-button md:hidden" aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
        {menuOpen && <nav className="md:hidden px-6 pb-4 grid gap-3" aria-label="Mobile navigation"><Link href="/tools">Tools</Link><Link href="/workflows" className="flex items-center gap-2"><Workflow className="w-4 h-4"/>Workflows</Link><Link href="/library" className="flex items-center gap-2"><BookMarked className="w-4 h-4"/>Library</Link><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav>}
      </header>
      {currentTool && <div className="md:hidden px-4 pt-4"><button className="btn-secondary" onClick={() => setToolsOpen(!toolsOpen)} aria-expanded={toolsOpen}>{toolsOpen ? 'Hide tools' : 'Browse tools'}</button>{toolsOpen && <div className="mt-2 max-h-80 overflow-auto panel"><ToolNavigation /></div>}</div>}
      <main id="main-content" className="flex w-full max-w-7xl mx-auto gap-8 px-4 sm:px-6 py-8 flex-1">
        {currentTool && <aside className="hidden md:block w-64 shrink-0 max-h-[calc(100vh-7rem)] overflow-auto sticky top-24 self-start"><ToolNavigation /></aside>}
        <div className="flex-1 min-w-0">
          {!hidePageHeader && title && title !== 'PlainUtils' && <header className="mb-6"><div className="flex items-center gap-3">{Icon && <span className="page-icon"><Icon className="w-6 h-6" aria-hidden="true" /></span>}<h1 className="text-3xl font-extrabold tracking-tight">{title}</h1></div>{description && currentTool && <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-3xl leading-7">{description}</p>}{currentTool?.external && <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">Privacy note: requests from this tool are sent to {currentTool.external}.</p>}</header>}
          {children}
          {relatedTools.length > 0 && <aside className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800" aria-label="Related tools"><h2 className="text-xl font-bold mb-3">Related tools</h2><div className="flex flex-wrap gap-2">{relatedTools.map((tool) => <Link key={tool.href} href={tool.href} className="btn-secondary">{tool.title}</Link>)}</div></aside>}
        </div>
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm py-5 px-4">© {new Date().getFullYear()} PlainUtils · <Link href="/privacy" className="underline">Privacy</Link> · <a href="https://github.com/pingryte/plainutils" className="underline" target="_blank" rel="noreferrer">GitHub</a> · <a href="https://coff.ee/pingryte" className="underline" target="_blank" rel="noreferrer">Support</a></footer>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
