import { useState } from 'react';
import Layout from '../../components/Layout';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const toCamelCase = str =>
    str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

  const toSnakeCase = str =>
    str.trim().toLowerCase().replace(/\s+/g, '_');

  const convert = (type) => {
    switch (type) {
      case 'upper': return setResult(text.toUpperCase());
      case 'lower': return setResult(text.toLowerCase());
      case 'camel': return setResult(toCamelCase(text));
      case 'snake': return setResult(toSnakeCase(text));
    }
  };

  return (
    <Layout title="Case Converter">
      <textarea
        className="w-full h-32 p-4 border rounded mb-4 font-mono"
        placeholder="Enter text to convert..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn" onClick={() => convert('upper')}>UPPERCASE</button>
        <button className="btn" onClick={() => convert('lower')}>lowercase</button>
        <button className="btn" onClick={() => convert('camel')}>camelCase</button>
        <button className="btn" onClick={() => convert('snake')}>snake_case</button>
      </div>
      <textarea
        className="w-full h-32 p-4 border rounded font-mono bg-gray-50"
        readOnly
        value={result}
      />
    </Layout>
  );
}
