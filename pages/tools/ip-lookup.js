import { useState } from 'react';
import Layout from '../../components/Layout';
import { iconMap } from '../../lib/iconMap';
import { LocateFixed } from 'lucide-react';

export default function IpLookup() {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLocation = async (targetIp) => {
    setLoading(true);
    setError('');
    setLocation(null);

    try {
      const res = await fetch(`https://ipapi.co/${targetIp}/json/`);
      const data = await res.json();

      if (data.error) throw new Error(data.reason || 'Lookup failed');

      setLocation(data);
    } catch (err) {
      setError(err.message || 'Error fetching location');
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = () => {
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }
    fetchLocation(ip);
  };

  const handleMyIP = async () => {
    setError('');
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip);
      fetchLocation(data.ip);
    } catch {
      setError('Unable to detect your IP address');
    }
  };

  return (
    <Layout title="IP Location Lookup">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">{iconMap['IP Location Lookup']}</div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter IP address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="w-full p-3 border rounded dark:bg-white dark:text-black"
        />
        <button className="btn" onClick={handleLookup}>Lookup</button>
        <button
          className="btn px-3"
          onClick={handleMyIP}
          title="Use your current IP"
        >
          <LocateFixed className="w-5 h-5" />
        </button>
      </div>

      {loading && <p className="text-blue-600">Looking up...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {location && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4 space-y-2">
          <p><strong>IP:</strong> {location.ip}</p>
          <p><strong>City:</strong> {location.city}</p>
          <p><strong>Region:</strong> {location.region}</p>
          <p><strong>Country:</strong> {location.country_name}</p>
          <p><strong>Postal:</strong> {location.postal}</p>
          <p><strong>Org:</strong> {location.org}</p>
        </div>
      )}
    </Layout>
  );
}
