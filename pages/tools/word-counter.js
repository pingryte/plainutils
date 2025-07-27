import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function WordCounter() {
  const [text, setText] = useState('');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <Layout title="Word Counter">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['Word Counter']}</div>
        <h1 className="text-2xl font-bold">Word Counter</h1>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-48 p-4 border rounded resize-none font-mono"
        placeholder="Type or paste your text here..."
      />
      <p className="mt-4 text-lg">
        Word count: <strong>{wordCount}</strong><br />
        Character count: <strong>{charCount}</strong>
      </p>
    </Layout>
  );
}
