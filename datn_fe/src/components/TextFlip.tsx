'use client';

import { textFlipHover } from '@/utils/animations';
import { motion } from 'framer-motion';

interface TextFlipProps {
  text: string;
  className?: string;
  delay?: number; // Delay between each character animation in seconds
}

const TextFlip = ({ text, className = '', delay = 0.05 }: TextFlipProps) => {
  // Split text into individual characters
  const chars = text.split('');
  
  return (
    <span className={`inline-block ${className}`}>
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={textFlipHover}
          initial="initial"
          whileHover="hover"
          custom={(index + 1) * delay}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default TextFlip;
