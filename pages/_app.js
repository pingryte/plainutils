import '../styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);
  return <Component {...pageProps} />;
}
