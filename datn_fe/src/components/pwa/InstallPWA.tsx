"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }

    promptInstall.prompt();

    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the installation');
      setIsInstalled(true);
    } else {
      console.log('User dismissed the installation');
    }
  };

  // Don't show the button if PWA is not supported or already installed
  if (!supportsPWA || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-primary text-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-2 hover:bg-primary-dark transition-colors"
        onClick={handleInstallClick}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Install App</span>
      </button>
    </div>
  );
};

export default InstallPWA;