'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // Đăng ký service worker khi component được mount
      registerServiceWorker();
    }
  }, []);

  // Hàm đăng ký service worker
  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker đăng ký thành công với phạm vi:', registration.scope);

        // Kiểm tra xem đã có update không
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Service Worker đang cài đặt:', newWorker);
          
          newWorker?.addEventListener('statechange', () => {
            console.log('Service Worker state:', newWorker.state);
          });
        });

        // Khi phát hiện có phiên bản mới của service worker
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Service Worker controller changed');
        });
      } catch (error) {
        console.error('Đăng ký Service Worker thất bại:', error);
      }
    }
  };

  return null; // Không render gì cả
}