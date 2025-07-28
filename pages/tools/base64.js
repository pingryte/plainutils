import { useState } from 'react';
import Head from 'next/head';
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
    <>
      <Head>
        <title>Base64 Encoder / Decoder – PlainUtils</title>
        <meta name="description" content="Encode or decode Base64 text easily using this free developer tool from PlainUtils." />
        <meta property="og:title" content="Base64 Encoder / Decoder – PlainUtils" />
        <meta property="og:description" content="Encode or decode Base64 text easily using this free developer tool from PlainUtils." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plainutils.com/tools/base64" />
        <meta property="og:image" content="https://plainutils.com/og/base64.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Base64 Encoder / Decoder – PlainUtils" />
        <meta name="twitter:description" content="Encode or decode Base64 text easily using this free developer tool from PlainUtils." />
        <meta name="twitter:image" content="https://plainutils.com/og/base64.png" />
      </Head>
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
    </>
  );
}
