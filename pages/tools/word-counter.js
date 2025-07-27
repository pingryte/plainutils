import { useState } from 'react';
import Layout from '../../components/Layout';

export default function WordCounter() {
  const [text, setText] = useState('');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  const downloadTextFile = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plainutils-wordcount.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title="Word Counter">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-48 p-4 border rounded resize-none font-mono"
        placeholder="Type or paste your text here..."
      />
      <div className="mt-4 text-lg space-y-1">
        <p>Word count: <strong>{wordCount}</strong></p>
        <p>Character count: <strong>{charCount}</strong></p>
      </div>
      <button
        onClick={downloadTextFile}
        className="btn mt-4"
        disabled={!text.trim()}
      >
        Export to .txt
      </button>
    </Layout>
  );
}
