'use client';

import { useState } from 'react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

interface RatingStarsProps {
  initialRating?: number;
  size?: number;
  color?: string;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

export default function RatingStars({
  initialRating = 0,
  size = 24,
  color = 'text-yellow-400',
  onChange,
  readOnly = false
}: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (readOnly) return;
    
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (readOnly) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-${readOnly ? 'default' : 'pointer'} transition-colors duration-200`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          {star <= displayRating ? (
            <RiStarFill size={size} className={`${color}`} />
          ) : (
            <RiStarLine size={size} className="text-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
