'use client';

import { useEffect, useState } from 'react';
import PackageDurationSelector from './PackageDurationSelector';
import PackagePriceDetails from './PackagePriceDetails';

interface PackageDuration {
  id: string;
  durationMonths: number;
  label: string;
  discountPercentage?: number;
  isPopular?: boolean;
}

interface PackageFeature {
  id: string;
  text: string;
  included: boolean;
}

interface GymPackage {
  id: string;
  name: string;
  basePrice: number;
  description?: string;
  features: PackageFeature[];
  durations: PackageDuration[];
}

interface PackageSelectionProps {
  availablePackages: GymPackage[];
  onPackageSelected: (packageId: string, durationId: string) => void;
  initialPackageId?: string;
  initialDurationId?: string;
  className?: string;
}

export default function PackageSelection({
  availablePackages,
  onPackageSelected,
  initialPackageId,
  initialDurationId,
  className = '',
}: PackageSelectionProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(initialPackageId);
  const [selectedDurationId, setSelectedDurationId] = useState<string | undefined>(initialDurationId);
  
  const selectedPackage = availablePackages.find(pkg => pkg.id === selectedPackageId);
  
  // Set default package if none selected and packages are available
  useEffect(() => {
    if (!selectedPackageId && availablePackages.length > 0) {
      setSelectedPackageId(availablePackages[0].id);
      
      // Also set default duration if available
      const defaultPackage = availablePackages[0];
      if (defaultPackage.durations.length > 0) {
        // Try to find a "popular" option first, otherwise use the first one
        const popularDuration = defaultPackage.durations.find(d => d.isPopular);
        setSelectedDurationId(popularDuration?.id || defaultPackage.durations[0].id);
      }
    }
  }, [availablePackages, selectedPackageId]);
  
  const handlePackageClick = (packageId: string) => {
    setSelectedPackageId(packageId);
    
    // Reset duration selection when changing package
    const newPackage = availablePackages.find(pkg => pkg.id === packageId);
    if (newPackage && newPackage.durations.length > 0) {
      const popularDuration = newPackage.durations.find(d => d.isPopular);
      setSelectedDurationId(popularDuration?.id || newPackage.durations[0].id);
    } else {
      setSelectedDurationId(undefined);
    }
  };
  
  const handleDurationSelect = (durationId: string) => {
    setSelectedDurationId(durationId);
  };
  
  const handleSelectPackage = () => {
    if (selectedPackageId && selectedDurationId) {
      onPackageSelected(selectedPackageId, selectedDurationId);
    }
  };
  
  if (!selectedPackage) return null;
  
  const selectedDuration = selectedPackage.durations.find(
    duration => duration.id === selectedDurationId
  );

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chọn gói tập</h2>
        <div className="flex flex-wrap gap-3">
          {availablePackages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePackageClick(pkg.id)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedPackageId === pkg.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              {pkg.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Chọn thời hạn</h3>
        {selectedPackage && (
          <PackageDurationSelector
            durations={selectedPackage.durations}
            selectedDurationId={selectedDurationId}
            onSelect={handleDurationSelect}
          />
        )}
      </div>
      
      {selectedPackage && selectedDuration && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Chi tiết gói tập</h3>
          <PackagePriceDetails
            packageName={selectedPackage.name}
            originalPrice={selectedPackage.basePrice}
            durationMonths={selectedDuration.durationMonths}
            discountPercentage={selectedDuration.discountPercentage}
            features={selectedPackage.features}
            onSelectPackage={handleSelectPackage}
            buttonText="Đăng ký ngay"
          />
        </div>
      )}
    </div>
  );
}
