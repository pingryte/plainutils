export default function InfoPageHero({ eyebrow, title, description, icon: Icon, tone = 'blue', children }) {
  return <header className={`info-hero info-hero-${tone}`}>
    <div className="info-hero-grid" aria-hidden="true" />
    <div className="relative z-10 max-w-3xl">
      <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">{Icon && <Icon className="w-4 h-4" />}{eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">{title}</h1>
      <p className="text-lg sm:text-xl leading-8 text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">{description}</p>
      {children && <div className="flex flex-wrap gap-2 mt-6">{children}</div>}
    </div>
  </header>;
}
