import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { categoryStyles, defaultCategoryStyle } from '../lib/category-styles';

export default function ToolCard({ tool }) {
  const [favourite, setFavourite] = useState(false);
  useEffect(() => setFavourite(JSON.parse(localStorage.getItem('plainutils:favourites') || '[]').includes(tool.href)), [tool.href]);
  const toggle = (event) => {
    event.preventDefault();
    const favourites = new Set(JSON.parse(localStorage.getItem('plainutils:favourites') || '[]'));
    favourite ? favourites.delete(tool.href) : favourites.add(tool.href);
    localStorage.setItem('plainutils:favourites', JSON.stringify([...favourites]));
    setFavourite(!favourite);
  };
  const Icon = tool.icon;
  const style = categoryStyles[tool.category] || defaultCategoryStyle;
  return (
    <Link href={tool.href} className="tool-card group relative overflow-hidden" onClick={() => localStorage.setItem('plainutils:recent', JSON.stringify([tool.href, ...JSON.parse(localStorage.getItem('plainutils:recent') || '[]').filter((item) => item !== tool.href)].slice(0, 5)))}>
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.glow} opacity-70 group-hover:opacity-100`} aria-hidden="true" />
      <span className="flex items-start gap-3 pt-1">
        <span className={`icon-tile ${style.tile}`}><Icon className={`w-5 h-5 ${style.icon}`} aria-hidden="true" /></span>
        <span className="flex-1 min-w-0"><span className={`inline-flex text-[0.68rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>{tool.category}</span><strong className="block mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.title}</strong><span className="block mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{tool.description}</span></span>
        <button onClick={toggle} aria-label={`${favourite ? 'Remove' : 'Add'} ${tool.title} ${favourite ? 'from' : 'to'} favourites`} aria-pressed={favourite} className={`favourite-button ${favourite ? 'is-favourite' : ''}`}>
          <Star className={`w-4 h-4 ${favourite ? 'fill-amber-400 text-amber-500' : 'text-gray-400'}`} />
        </button>
      </span>
      <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Open tool <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
