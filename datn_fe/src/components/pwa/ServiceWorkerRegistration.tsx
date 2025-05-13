'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      
      // Add event listeners to handle updates
      wb.addEventListener('installed', (event:any) => {
        console.log(`Service Worker installed: ${event.type}`);
      });

      wb.addEventListener('controlling', (event:any) => {
        console.log(`Service Worker controlling: ${event.type}`);
      });

      wb.addEventListener('activated', (event: any) => {
        console.log(`Service Worker activated: ${event.type}`);
      });

      // Handle service worker registration errors
    } else if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox === undefined
    ) {
      // Register the service worker manually for browsers that don't support workbox
      navigator.serviceWorker
        .register('/sw.js') // Changed from '/service-worker.js' to '/sw.js'
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    workbox: any;
  }
}