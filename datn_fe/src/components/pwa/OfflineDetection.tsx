"use client";

import { useEffect, useState } from "react";

export const OfflineDetection = () => {
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => {
    // Set the initial online status
    setIsOffline(!navigator.onLine);
    
    // Event handlers for network status changes
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (!isOffline) {
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white p-2 text-center z-50">
      <p className="text-sm font-medium">
        You are currently offline. Some features may be limited.
      </p>
    </div>
  );
};

export default OfflineDetection;