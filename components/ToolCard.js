import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

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
  return (
    <Link href={tool.href} className="tool-card group" onClick={() => localStorage.setItem('plainutils:recent', JSON.stringify([tool.href, ...JSON.parse(localStorage.getItem('plainutils:recent') || '[]').filter((item) => item !== tool.href)].slice(0, 5)))}>
      <span className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <span className="flex-1"><strong className="block group-hover:text-blue-600 dark:group-hover:text-blue-400">{tool.title}</strong><span className="block mt-1 text-sm text-gray-600 dark:text-gray-400">{tool.description}</span></span>
        <button onClick={toggle} aria-label={`${favourite ? 'Remove' : 'Add'} ${tool.title} ${favourite ? 'from' : 'to'} favourites`} aria-pressed={favourite} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <Star className={`w-4 h-4 ${favourite ? 'fill-amber-400 text-amber-500' : 'text-gray-400'}`} />
        </button>
      </span>
    </Link>
  );
}
