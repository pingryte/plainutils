import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

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
      className="icon-button"
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      aria-pressed={dark}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
