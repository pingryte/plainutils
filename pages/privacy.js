import { BarChart3, Database, ExternalLink, HardDrive, LockKeyhole, Network, Share2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import InfoPageHero from '../components/InfoPageHero';

const dataAreas = [
  { icon: HardDrive, title: 'Everyday tool input', status: 'Stays local', text: 'Text, JSON, Markdown, CSV, encoding, date, colour, UUID, JWT, hashing, regex, and minification work is processed in your browser.' },
  { icon: Network, title: 'Network lookups', status: 'Uses named services', text: 'DNS Lookup sends the requested domain and record type to Google Public DNS. IP Location Lookup sends the entered IP to ipapi; “use my IP” also contacts ipify.' },
  { icon: Share2, title: 'Shared links', status: 'Private by default', text: 'Workflow links contain names and transformation steps, not input or output. Shareable tool setups contain settings by default; adding tool content requires an explicit choice and displays a privacy warning.' },
  { icon: Database, title: 'Device storage', status: 'Under your control', text: 'Theme, favourites, recent tools, saved workflows, Markdown drafts, and Library snippets may be kept in this browser’s local storage.' },
];

export default function Privacy() {
  return <Layout title="Privacy" hidePageHeader description="A plain-English explanation of how PlainUtils handles tool inputs, local storage, network requests, and analytics.">
    <InfoPageHero eyebrow="Privacy, in plain English" title="Your work is yours." description="PlainUtils is designed to avoid collecting the content you bring to its tools. Most processing happens entirely on your device, and the exceptions are labelled." icon={LockKeyhole} tone="emerald">
      <span className="info-chip"><LockKeyhole />No account required</span><span className="info-chip"><HardDrive />Local-first processing</span><span className="info-chip"><ExternalLink />External calls disclosed</span>
    </InfoPageHero>

    <section className="privacy-summary mt-10"><ShieldStatement /><p><strong>The short version:</strong> PlainUtils does not receive the content entered into its local tools. Network tools must send the lookup value to their named provider to return an answer.</p></section>

    <section className="mt-14" aria-labelledby="data-map-title"><p className="section-kicker">Data map</p><h2 id="data-map-title" className="section-title">What happens where</h2><div className="grid md:grid-cols-2 gap-4 mt-6">{dataAreas.map(({ icon: Icon, title, status, text }) => <article className="privacy-card" key={title}><div className="flex gap-3 items-start"><span className="privacy-icon"><Icon /></span><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">{status}</p><h3 className="text-lg font-bold mt-1">{title}</h3></div></div><p className="text-gray-600 dark:text-gray-400 leading-7 mt-4">{text}</p></article>)}</div></section>

    <section className="grid md:grid-cols-2 gap-5 mt-14"><article className="panel !p-6"><BarChart3 className="w-7 h-7 text-violet-600 dark:text-violet-300"/><h2 className="text-xl font-bold mt-4">Anonymous analytics</h2><p className="text-gray-600 dark:text-gray-400 leading-7 mt-2">Cloudflare Web Analytics helps us understand aggregate visits without cookies or cross-site tracking. Tool inputs are never added to analytics events.</p></article><article className="panel !p-6"><Trash2 className="w-7 h-7 text-rose-600 dark:text-rose-300"/><h2 className="text-xl font-bold mt-4">Clearing local data</h2><p className="text-gray-600 dark:text-gray-400 leading-7 mt-2">Delete individual Library items inside the Library, or remove all saved preferences, workflows, drafts, and snippets by clearing PlainUtils site data in your browser settings.</p></article></section>

    <section className="cta-card mt-14"><div><p className="section-kicker">Still wondering?</p><h2 className="text-2xl font-bold mt-2">Ask us directly</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Privacy questions and corrections are always welcome.</p></div><a href="mailto:plainutils@pingryte.com?subject=PlainUtils%20privacy%20question" className="btn">Email a privacy question</a></section>
  </Layout>;
}

function ShieldStatement() { return <span className="privacy-summary-icon" aria-hidden="true"><LockKeyhole /></span>; }
