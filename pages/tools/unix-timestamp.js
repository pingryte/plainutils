import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ToolActions from '../../components/ToolActions';
import ToolShare from '../../components/ToolShare';

const allowedSettings = ['utc', 'inputType'];
const describe = (date, utc) => ({
  iso: date.toISOString(),
  display: utc ? date.toUTCString() : date.toLocaleString(),
  relative: new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(Math.round((date - Date.now()) / 86400000), 'day'),
});

export default function UnixTimestamp() {
  const [timestamp, setTimestamp] = useState(''); const [dateInput, setDateInput] = useState(''); const [result, setResult] = useState(null); const [error, setError] = useState(''); const [utc, setUtc] = useState(false); const [inputType, setInputType] = useState('epoch'); const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => { const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000); return () => clearInterval(id); }, []);
  const fromEpoch = () => { const number = Number(timestamp); const date = new Date(number * (String(Math.trunc(Math.abs(number))).length > 10 ? 1 : 1000)); if (!Number.isFinite(number) || Number.isNaN(date.getTime())) { setError('Enter a valid epoch timestamp.'); return; } setInputType('epoch'); setResult(describe(date, utc)); setError(''); };
  const fromDate = () => { const date = new Date(dateInput); if (Number.isNaN(date.getTime())) { setError('Enter a valid date, preferably ISO 8601.'); return; } setInputType('date'); setTimestamp(String(Math.floor(date.getTime() / 1000))); setResult(describe(date, utc)); setError(''); };
  const loadShare = ({ settings, content }) => {
    if (typeof settings.utc === 'boolean') setUtc(settings.utc);
    if (settings.inputType === 'date') { setInputType('date'); if (content !== undefined) setDateInput(content); }
    else { setInputType('epoch'); if (content !== undefined) setTimestamp(content); }
  };
  return <Layout title="Unix Timestamp Converter" description="Convert epoch seconds or milliseconds and ISO dates with UTC, local, and relative output.">
    <ToolShare toolId="timestamp" settings={{ utc, inputType }} allowedSettings={allowedSettings} content={inputType === 'date' ? dateInput : timestamp} contentLabel={`${inputType} input`} onLoad={loadShare} />
    <div className="panel mb-5 flex justify-between"><span>Current epoch</span><button className="font-mono text-blue-600" onClick={() => setTimestamp(String(now))}>{now}</button></div>
    <div className="grid md:grid-cols-2 gap-5"><div><label className="field-label" htmlFor="epoch">Epoch seconds or milliseconds</label><input id="epoch" className="textarea-base" value={timestamp} onChange={(event) => setTimestamp(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && fromEpoch()} /><button className="btn mt-2" onClick={fromEpoch}>Convert epoch</button></div><div><label className="field-label" htmlFor="date">Date or ISO 8601</label><input id="date" className="textarea-base" value={dateInput} onChange={(event) => setDateInput(event.target.value)} placeholder="2026-07-18T12:00:00Z" onKeyDown={(event) => event.key === 'Enter' && fromDate()} /><button className="btn mt-2" onClick={fromDate}>Convert date</button></div></div>
    <label className="block mt-4"><input type="checkbox" checked={utc} onChange={(event) => setUtc(event.target.checked)} /> Prefer UTC display</label>
    {error && <p className="error-message" role="alert">{error}</p>}
    {result ? <div className="panel mt-5 space-y-2"><p><strong>ISO:</strong> <code>{result.iso}</code></p><p><strong>{utc ? 'UTC' : 'Local'}:</strong> {result.display}</p><p><strong>Relative:</strong> {result.relative}</p></div> : <div className="empty-state mt-5 !p-7"><h2 className="font-bold">Two ways in, one clear result</h2><p className="text-gray-500 mt-1">Enter an epoch value or an ISO-style date. Press Enter to convert.</p></div>}
    <ToolActions value={result?.iso || ''} onClear={() => { setTimestamp(''); setDateInput(''); setResult(null); }} filename="timestamp.txt" />
  </Layout>;
}
