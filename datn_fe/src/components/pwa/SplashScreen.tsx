"use client";

import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the app is running in standalone mode (installed as PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      
      // Hide splash screen after 2 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      // Not in standalone mode, don't show splash screen
      setShowSplash(false);
    }
  }, []);
  
  if (!showSplash || !isStandalone) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-primary z-[9999] flex flex-col items-center justify-center">
      <div className="w-32 h-32 relative mb-6">
        <div className="w-full h-full flex items-center justify-center bg-white rounded-full">
          <span className="text-4xl font-bold text-primary">FH</span>
        </div>
      </div>
      <h1 className="text-white text-3xl font-bold mb-2">FitHub</h1>
      <p className="text-white/80">Your Fitness Journey Starts Here</p>
      
      <div className="mt-8">
        <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;