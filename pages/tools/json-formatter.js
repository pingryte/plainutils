import { useState } from 'react';
import Layout from '../../components/Layout';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setOutput('');
      setError('Invalid JSON');
    }
  };

  return (
    <Layout title="JSON Formatter">
      <textarea
        className="w-full h-48 p-4 border rounded mb-4 font-mono"
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="mb-4">
        <button onClick={formatJSON} className="btn">Format</button>
      </div>
      {error && <p className="text-red-600 font-medium">{error}</p>}
      {output && (
        <pre className="w-full bg-gray-100 p-4 rounded font-mono whitespace-pre-wrap overflow-auto">
          {output}
        </pre>
      )}
    </Layout>
  );
}
