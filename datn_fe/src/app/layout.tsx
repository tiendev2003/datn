import InstallPWA from "@/components/pwa/InstallPWA";
import MobileNavigation from "@/components/pwa/MobileNavigation";
import OfflineDetection from "@/components/pwa/OfflineDetection";
import ScrollToTop from "@/components/pwa/ScrollToTop";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";
import SplashScreen from "@/components/pwa/SplashScreen";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitHub - Modern Gym Management System",
  description: "Experience premium fitness services with our state-of-the-art gym management system offering memberships, personal training, and group classes.",
  keywords: "gym, fitness, workout, training, personal trainer, gym management, memberships, fitness classes",
  manifest: '/manifest.json',

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FitHub",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#e63946",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head suppressHydrationWarning={true}>
        <meta name="application-name" content="FitHub" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FitHub" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/icons/placeholder-icon.svg" />
        <link rel="apple-touch-icon" href="/icons/placeholder-icon.svg" />
        <meta name="theme-color" content="#3367D6" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300" suppressHydrationWarning>
        <Providers>
          <ServiceWorkerRegistration />
          <SplashScreen />
          <OfflineDetection />
          {children}
          <ScrollToTop />
          <InstallPWA />
          <MobileNavigation />
        </Providers>
      </body>
    </html>
  );
}
