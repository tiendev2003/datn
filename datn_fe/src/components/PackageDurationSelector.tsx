'use client';

import { HiCheckCircle } from 'react-icons/hi';

interface PackageDuration {
  id: string;
  durationMonths: number;
  label: string;
  discountPercentage?: number;
  isPopular?: boolean;
}

interface PackageDurationSelectorProps {
  durations: PackageDuration[];
  selectedDurationId?: string;
  onSelect: (durationId: string) => void;
  className?: string;
}

export default function PackageDurationSelector({
  durations,
  selectedDurationId,
  onSelect,
  className = '',
}: PackageDurationSelectorProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {durations.map((duration) => {
        const isSelected = selectedDurationId === duration.id;
        return (
          <button
            key={duration.id}
            type="button"
            onClick={() => onSelect(duration.id)}
            className={`relative flex flex-col p-5 rounded-xl border-2 ${
              isSelected 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
            } transition-all`}
          >
            {duration.isPopular && (
              <div className="absolute -top-3 -right-2">
                <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Phổ biến
                </span>
              </div>
            )}
            
            <div className="text-xl font-bold text-gray-900">
              {duration.durationMonths} tháng
            </div>
            
            <div className="text-gray-500 text-sm mb-2">
              {duration.label}
            </div>
            
            {duration.discountPercentage && (
              <div className="text-primary font-medium">
                Tiết kiệm {duration.discountPercentage}%
              </div>
            )}
            
            {isSelected && (
              <div className="absolute bottom-2 right-2 text-primary">
                <HiCheckCircle size={24} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
