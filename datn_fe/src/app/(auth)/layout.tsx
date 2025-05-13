"use client";

import PageTransition from "@/components/transitions/PageTransition";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}