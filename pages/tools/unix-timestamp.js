import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';

export default function UnixTimestamp() {
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');

  const convertToDate = () => {
    const ms = parseInt(timestamp) * 1000;
    const d = new Date(ms);
    setDate(!isNaN(d) ? d.toISOString() : 'Invalid timestamp');
  };

  const convertToTimestamp = () => {
    const d = new Date(date);
    setTimestamp(!isNaN(d) ? Math.floor(d.getTime() / 1000) : 'Invalid date');
  };

  return (
    <Layout title="Unix Timestamp Converter">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['Unix Timestamp Converter']}</div>
        <h1 className="text-2xl font-bold">Unix Timestamp Converter</h1>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Unix Timestamp:</label>
        <input
          type="text"
          className="w-full p-3 border rounded mb-2"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <button onClick={convertToDate} className="btn">Convert to Date</button>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">ISO Date:</label>
        <input
          type="text"
          className="w-full p-3 border rounded mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={convertToTimestamp} className="btn">Convert to Timestamp</button>
      </div>
    </Layout>
  );
}
