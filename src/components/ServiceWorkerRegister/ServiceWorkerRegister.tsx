'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const isLocalhost = ['localhost', '127.0.0.1'].includes(
        location.hostname,
      );
      if (process.env.NODE_ENV === 'production' || isLocalhost) {
        navigator.serviceWorker
          .register('/sw.js')
          .catch(err => console.error('SW register failed', err));
      }
    }
  }, []);
  return null;
}
