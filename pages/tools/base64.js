import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function Base64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => setOutput(btoa(input));
  const decode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput('Invalid base64 string');
    }
  };

  return (
    <Layout title="Base64 Encoder / Decoder">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['Base64 Encoder / Decoder']}</div>
       
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or base64..."
        className="textarea-base h-40 resize-none font-mono"
      />
      <div className="space-x-2 mt-2">
        <button className="btn" onClick={encode}>Encode</button>
        <button className="btn" onClick={decode}>Decode</button>
      </div>
      <textarea
        value={output}
        readOnly
        className="textarea-base h-40 resize-none font-mono mt-4"
      />
    </Layout>
  );
}
