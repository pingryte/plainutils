import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJson = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setOutput('Invalid JSON');
    }
  };

  return (
    <Layout
      title="JSON Formatter – Format and Beautify JSON Online | PlainUtils"
      description="Use our free JSON Formatter to quickly format, validate, and beautify your JSON data. Easily readable JSON output with just one click."
    >
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['JSON Formatter']}</div>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="textarea-base h-40 resize-none font-mono"
        placeholder="Paste JSON here..."
      />
      <button className="btn mt-2" onClick={formatJson}>Format</button>
      <textarea
        value={output}
        readOnly
        className="textarea-base h-40 resize-none font-mono mt-4 bg-gray-100 dark:bg-gray-800"
      />
    </Layout>
  );
}
