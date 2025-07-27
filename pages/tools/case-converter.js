import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function CaseConverter() {
  const [text, setText] = useState('');

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitle = () => setText(text.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()));

  return (
    <Layout title="Case Converter">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['Case Converter']}</div>
        <h1 className="text-2xl font-bold">Case Converter</h1>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea-base h-48 resize-none font-mono"
        placeholder="Enter text here..."
      />
      <div className="space-x-2 mt-4">
        <button className="btn" onClick={toUpper}>UPPERCASE</button>
        <button className="btn" onClick={toLower}>lowercase</button>
        <button className="btn" onClick={toTitle}>Title Case</button>
      </div>
    </Layout>
  );
}
