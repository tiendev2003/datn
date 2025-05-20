'use client';

import { motion } from 'framer-motion';

interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {description && (
        <p className="mt-1 text-gray-600">{description}</p>
      )}
      <div className="h-1 w-20 bg-primary mt-2"></div>
    </motion.div>
  );
}
