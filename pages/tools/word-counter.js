import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function WordCounter() {
  const [text, setText] = useState('');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <Layout
      title={{
        title: 'Word Counter',
        description: 'Quickly count the number of words and characters in your text with our simple online word counter tool.',
        keywords: 'word counter, character counter, online text tool, plainutils, text analyzer'
      }}
    >
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['Word Counter']}</div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea-base h-48 resize-none font-mono"
        placeholder="Type or paste your text here..."
      />
      <p className="mt-4 text-lg">
        Word count: <strong>{wordCount}</strong><br />
        Character count: <strong>{charCount}</strong>
      </p>
    </Layout>
  );
}
