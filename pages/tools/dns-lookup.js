import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA'];

export default function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('A');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupDNS = async () => {
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
      const data = await res.json();
      if (data.Status !== 0) {
        setError(`DNS lookup failed: ${data.Status === 3 ? 'Domain not found' : 'Error code ' + data.Status}`);
      } else {
        setResult(data.Answer || []);
      }
    } catch (err) {
      setError('Failed to fetch DNS data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="DNS Lookup">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['DNS Lookup']}</div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Domain:</label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="e.g. example.com"
          className="textarea-base mb-2"
        />
        <label className="block font-semibold mb-1">Record Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="textarea-base mb-2"
        >
          {recordTypes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <button className="btn" onClick={lookupDNS} disabled={loading}>
          {loading ? 'Looking up…' : 'Lookup'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 font-medium mt-4">
          {error}
        </div>
      )}

      {result && result.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Results:</h2>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 border rounded text-sm overflow-auto whitespace-pre-wrap font-mono">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </Layout>
  );
}

