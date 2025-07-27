import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  return (
    <Layout title="Base64 Encoder / Decoder">
      <div>
        <textarea
          className="w-full h-32 p-4 border rounded mb-4 font-mono"
          placeholder="Enter text or base64..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2 mb-4">
          <button onClick={() => setResult(btoa(input))} className="btn">Encode</button>
          <button
            onClick={() => {
              try {
                setResult(atob(input));
              } catch {
                setResult('Invalid base64');
              }
            }}
            className="btn"
          >
            Decode
          </button>
        </div>
        <textarea
          className="w-full h-32 p-4 border rounded font-mono bg-gray-50"
          readOnly
          value={result}
        />
      </div>
    </Layout>
  );
}
