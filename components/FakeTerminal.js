// components/FakeTerminal.js
import { useEffect, useState } from 'react';

const lines = [
  '$ npx create-next-app plainutils',
  '✔ Installing packages...',
  '✔ Setting up Tailwind CSS...',
  '✔ Adding dark mode support...',
  '✔ Deploying to Netlify...',
  '✨ Done in 7.3s!'
];

export default function FakeTerminal() {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleLines((prev) => [...prev, lines[index]]);
      index++;
      if (index >= lines.length) clearInterval(interval);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-md shadow-lg text-sm">
      {visibleLines.map((line, i) => (
        <div key={i} className="whitespace-pre">{line}</div>
      ))}
    </div>
  );
}

