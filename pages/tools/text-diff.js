import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function TextDiff() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const diff = () => {
    if (a === b) return 'No differences.';
    const linesA = a.split('\n');
    const linesB = b.split('\n');
    const max = Math.max(linesA.length, linesB.length);
    const result = [];

    for (let i = 0; i < max; i++) {
      if (linesA[i] !== linesB[i]) {
        result.push(`- ${linesA[i] || ''}`);
        result.push(`+ ${linesB[i] || ''}`);
      }
    }
    return result.join('\n');
  };

  return (
    <Layout title="Text Diff Checker">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['Text Diff Checker']}</div>
        <h1 className="text-2xl font-bold">Text Diff Checker</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Original text..."
          className="w-full h-48 p-3 border rounded resize-none font-mono"
        />
        <textarea
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Modified text..."
          className="w-full h-48 p-3 border rounded resize-none font-mono"
        />
      </div>
      <pre className="mt-4 p-4 bg-gray-100 border rounded overflow-auto whitespace-pre-wrap font-mono text-sm">
        {diff()}
      </pre>
    </Layout>
  );
}
