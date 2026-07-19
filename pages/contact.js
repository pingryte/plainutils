import { ArrowUpRight, Bug, Coffee, Github, Lightbulb, Mail, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import InfoPageHero from '../components/InfoPageHero';

const contactRoutes = [
  { icon: Bug, title: 'Found something broken?', text: 'Open a GitHub issue with the page, what you expected, and what happened.', action: 'Report a bug', href: 'https://github.com/pingryte/plainutils/issues/new', external: true, tone: 'rose' },
  { icon: Lightbulb, title: 'Have a tool idea?', text: 'Tell us the task, the input you start with, and the result that would save you time.', action: 'Suggest a feature', href: 'mailto:plainutils@pingryte.com?subject=PlainUtils%20tool%20idea', tone: 'amber' },
  { icon: Github, title: 'Want to contribute?', text: 'Browse the source, improve documentation, or propose a focused new utility.', action: 'Visit the repository', href: 'https://github.com/pingryte/plainutils', external: true, tone: 'blue' },
];

export default function Contact() {
  return <Layout title="Contact" hidePageHeader description="Report a bug, suggest a PlainUtils feature, contribute code, or simply say hello.">
    <InfoPageHero eyebrow="Let’s talk" title="Ideas, bugs, and hellos are all welcome." description="Choose the route that fits best. Helpful context is appreciated, but you do not need to write a perfect report before getting in touch." icon={MessageCircle} tone="pink">
      <span className="info-chip"><Mail />plainutils@pingryte.com</span><span className="info-chip"><Github />Open-source project</span>
    </InfoPageHero>

    <section className="mt-12" aria-labelledby="contact-options-title"><p className="section-kicker">Pick a route</p><h2 id="contact-options-title" className="section-title">How can we help?</h2><div className="grid md:grid-cols-3 gap-4 mt-6">{contactRoutes.map(({ icon: Icon, title, text, action, href, external, tone }) => <article className={`contact-card contact-${tone}`} key={title}><span className="contact-icon"><Icon /></span><h3 className="text-xl font-bold mt-5">{title}</h3><p className="text-gray-600 dark:text-gray-400 leading-7 mt-2 flex-1">{text}</p><a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="mt-5 font-bold inline-flex items-center gap-1.5 hover:underline">{action}<ArrowUpRight className="w-4 h-4"/></a></article>)}</div></section>

    <section className="email-feature mt-14"><div className="email-feature-icon"><Mail /></div><div className="flex-1"><p className="section-kicker">The direct line</p><h2 className="text-2xl font-bold mt-2">Prefer email? That works too.</h2><p className="text-gray-600 dark:text-gray-400 leading-7 mt-2">Use a clear subject line and include screenshots or examples when they help. Please avoid sending passwords, access tokens, or other sensitive data.</p><a href="mailto:plainutils@pingryte.com" className="text-blue-600 dark:text-blue-400 font-bold inline-block mt-4 hover:underline">plainutils@pingryte.com</a></div></section>

    <section className="support-strip mt-8"><Coffee className="w-7 h-7 text-amber-700 dark:text-amber-300"/><div className="flex-1"><h2 className="font-bold">PlainUtils saved you some time?</h2><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">You can support continued development with a coffee. It is appreciated, never expected.</p></div><a href="https://coff.ee/pingryte" target="_blank" rel="noreferrer" className="btn-secondary">Buy a coffee <ArrowUpRight /></a></section>
  </Layout>;
}
