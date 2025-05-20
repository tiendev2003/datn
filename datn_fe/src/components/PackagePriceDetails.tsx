'use client';

import { useMemo } from 'react';
import { HiCheck } from 'react-icons/hi';

interface PackageFeature {
  id: string;
  text: string;
  included: boolean;
}

interface PackagePriceDetailsProps {
  packageName: string;
  originalPrice: number;
  durationMonths: number;
  discountPercentage?: number;
  features?: PackageFeature[];
  onSelectPackage: () => void;
  buttonText?: string;
  currency?: string;
  className?: string;
}

export default function PackagePriceDetails({
  packageName,
  originalPrice,
  durationMonths,
  discountPercentage = 0,
  features = [],
  onSelectPackage,
  buttonText = 'Chọn gói này',
  currency = '₫',
  className = '',
}: PackagePriceDetailsProps) {
  
  const discountedPrice = useMemo(() => {
    if (discountPercentage <= 0) return originalPrice;
    return originalPrice * (1 - discountPercentage / 100);
  }, [originalPrice, discountPercentage]);
  
  const monthlyPrice = useMemo(() => {
    return discountedPrice / durationMonths;
  }, [discountedPrice, durationMonths]);
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">{packageName}</h3>
        <div className="mt-4 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary">{formatPrice(discountedPrice)}</span>
          <span className="ml-1 text-lg text-gray-600">{currency}</span>
        </div>
        
        {discountPercentage > 0 && (
          <div className="mt-1 flex items-center justify-center">
            <span className="text-gray-500 line-through text-sm mr-2">
              {formatPrice(originalPrice)}{currency}
            </span>
            <span className="text-green-600 text-sm font-medium">
              -{discountPercentage}%
            </span>
          </div>
        )}
        
        <div className="mt-1 text-gray-500 text-sm">
          ({formatPrice(monthlyPrice)}{currency} / tháng)
        </div>
      </div>
      
      <div className="border-t border-gray-200 my-4"></div>
      
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Thời hạn:</h4>
        <div className="text-gray-600 flex items-center justify-between">
          <div>
            <span className="font-medium">{durationMonths} tháng</span>
            <span className="text-sm text-gray-500 ml-2">
              (đến ngày {calculateEndDate(durationMonths)})
            </span>
          </div>
          <span className="text-primary font-medium">
            {discountPercentage > 0 ? `Tiết kiệm ${discountPercentage}%` : ''}
          </span>
        </div>
      </div>
      
      {features.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Quyền lợi của gói:</h4>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature.id} className="flex items-start">
                <div className={`mt-0.5 mr-3 ${feature.included ? 'text-green-500' : 'text-gray-400'}`}>
                  {feature.included ? <HiCheck size={18} /> : '−'}
                </div>
                <span className={feature.included ? 'text-gray-700' : 'text-gray-500'}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <button
        onClick={onSelectPackage}
        className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </div>
  );
}

function calculateEndDate(durationMonths: number): string {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + durationMonths);
  
  const day = endDate.getDate();
  const month = endDate.getMonth() + 1;
  const year = endDate.getFullYear();
  
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}
