import { useState } from 'react';
import Layout from '../../components/Layout';

export default function TextDiff() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const getDiff = () => {
    if (a === b) return 'No differences.';
    const aLines = a.split('\n');
    const bLines = b.split('\n');
    const max = Math.max(aLines.length, bLines.length);

    return Array.from({ length: max }).map((_, i) => {
      const aLine = aLines[i] || '';
      const bLine = bLines[i] || '';
      if (aLine !== bLine) return `- ${aLine}\n+ ${bLine}`;
      return `  ${aLine}`;
    }).join('\n');
  };

  return (
    <Layout title="Text Diff Checker">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <textarea
          className="w-full h-40 p-4 border rounded font-mono"
          placeholder="Original text..."
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <textarea
          className="w-full h-40 p-4 border rounded font-mono"
          placeholder="Modified text..."
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm font-mono whitespace-pre-wrap">
        {getDiff()}
      </pre>
    </Layout>
  );
}
