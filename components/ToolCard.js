import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { categoryStyles, defaultCategoryStyle } from '../lib/category-styles';

export default function ToolCard({ tool }) {
  const [favourite, setFavourite] = useState(false);
  useEffect(() => setFavourite(JSON.parse(localStorage.getItem('plainutils:favourites') || '[]').includes(tool.href)), [tool.href]);
  const toggle = () => {
    const favourites = new Set(JSON.parse(localStorage.getItem('plainutils:favourites') || '[]'));
    favourite ? favourites.delete(tool.href) : favourites.add(tool.href);
    localStorage.setItem('plainutils:favourites', JSON.stringify([...favourites]));
    setFavourite(!favourite);
  };
  const Icon = tool.icon;
  const style = categoryStyles[tool.category] || defaultCategoryStyle;
  return (
    <article className="tool-card group relative">
      <Link href={tool.href} className="tool-card-link block rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => localStorage.setItem('plainutils:recent', JSON.stringify([tool.href, ...JSON.parse(localStorage.getItem('plainutils:recent') || '[]').filter((item) => item !== tool.href)].slice(0, 5)))}>
        <span className="flex items-start gap-3 pr-8">
          <span className={`icon-tile ${style.tile}`}><Icon className={`w-5 h-5 ${style.icon}`} aria-hidden="true" /></span>
          <span className="flex-1 min-w-0"><span className={`tool-card-category ${style.icon}`}>{tool.category}</span><strong className="block mt-1.5 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">{tool.title}</strong><span className="block mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{tool.description}</span></span>
        </span>
      </Link>
      <button onClick={toggle} aria-label={`${favourite ? 'Remove' : 'Add'} ${tool.title} ${favourite ? 'from' : 'to'} favourites`} aria-pressed={favourite} className={`favourite-button absolute top-4 right-4 ${favourite ? 'is-favourite' : ''}`}>
        <Star className={`w-4 h-4 ${favourite ? 'fill-amber-400 text-amber-500' : 'text-gray-400'}`} />
      </button>
    </article>
  );
}
