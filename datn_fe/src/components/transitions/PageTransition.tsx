"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Các biến thể cho các hiệu ứng chuyển động
  const variants = {
    initial: {
      opacity: 0,
      y: 8,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -8,
    },
  };

  // Skip animation on first render to prevent animation on page load
  if (isFirstRender) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}