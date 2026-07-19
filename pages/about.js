import Link from 'next/link';
import { ArrowRight, Code2, Gauge, Github, Heart, Laptop, ShieldCheck, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import InfoPageHero from '../components/InfoPageHero';
import { tools } from '../lib/tools';
import { workflowRecipes } from '../lib/workflow-recipes';

const principles = [
  { icon: Laptop, title: 'Local by default', text: 'Most tools do their work inside your browser, so everyday input does not need a trip to our servers.' },
  { icon: ShieldCheck, title: 'Privacy you can see', text: 'When a tool contacts an outside service, it says so clearly on the page—before you use it.' },
  { icon: Gauge, title: 'Quick, not flimsy', text: 'Tools should open fast and still include the validation, export options, and details needed for real work.' },
  { icon: Heart, title: 'Made for humans', text: 'Keyboard access, responsive layouts, dark mode, plain language, and a little personality all belong in utility software.' },
];

export default function About() {
  return <Layout title="About PlainUtils" hidePageHeader description="Meet the principles, technology, and people-first thinking behind PlainUtils.">
    <InfoPageHero eyebrow="Why we exist" title="Small tools should still feel thoughtfully made." description="PlainUtils is an open-source collection of focused browser utilities for developers, writers, students, and anyone who just wants to finish a task without an account, an advert maze, or a ten-step setup." icon={Sparkles} tone="violet">
      <span className="info-chip"><Code2 />{tools.length} focused tools</span><span className="info-chip"><Sparkles />{workflowRecipes.length} workflow recipes</span><span className="info-chip"><ShieldCheck />Local-first</span>
    </InfoPageHero>

    <section className="info-section"><div><p className="section-kicker">The idea</p><h2 className="section-title">Useful depth, minus the ceremony</h2></div><div className="info-copy"><p>There are plenty of websites that can format JSON or count words. Too many also bury the answer under pop-ups, demand a login, or quietly send everything elsewhere.</p><p>PlainUtils takes a simpler position: a utility should explain what it does, do it well, and get out of your way. That means sensible defaults for quick jobs and enough control when the details matter.</p></div></section>

    <section aria-labelledby="principles-title" className="mt-14"><p className="section-kicker">How we build</p><h2 id="principles-title" className="section-title">Four principles, used everywhere</h2><div className="grid sm:grid-cols-2 gap-4 mt-6">{principles.map(({ icon: Icon, title, text }, index) => <article className="value-card" key={title}><span className={`value-icon value-icon-${index + 1}`}><Icon /></span><h3 className="text-lg font-bold mt-4">{title}</h3><p className="text-gray-600 dark:text-gray-400 leading-7 mt-2">{text}</p></article>)}</div></section>

    <section className="info-band mt-14"><div><p className="section-kicker !text-cyan-200">Under the hood</p><h2 className="text-2xl sm:text-3xl font-bold mt-2">Modern web technology, intentionally lightweight</h2><p className="text-blue-100 leading-7 mt-3 max-w-2xl">PlainUtils is built with Next.js, React, Tailwind CSS, Lucide icons, browser Web APIs, and focused open-source parsers. Pages are statically generated and deployed on Netlify.</p></div><Code2 className="hidden sm:block w-20 h-20 text-white/20 shrink-0" /></section>

    <section className="cta-card mt-14"><div><p className="section-kicker">Open source, open door</p><h2 className="text-2xl font-bold mt-2">Help make the next small thing better</h2><p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">Bug reports, thoughtful feature ideas, clearer documentation, and focused new tools are all welcome.</p></div><div className="flex flex-wrap gap-3"><a href="https://github.com/pingryte/plainutils" target="_blank" rel="noreferrer" className="btn"><Github />View on GitHub</a><Link href="/contact" className="btn-secondary">Get in touch <ArrowRight /></Link></div></section>
  </Layout>;
}
