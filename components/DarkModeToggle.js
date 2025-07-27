import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = stored === 'dark' || (!stored && prefersDark);
    setDark(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="ml-auto px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
