'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaClock, FaInfoCircle, FaRegCalendarAlt, FaRegCreditCard } from 'react-icons/fa';

interface PaymentMethod {
  id: string;
  name: string;
  iconUrl: string;
  description?: string;
}

interface PackageCheckoutProps {
  packageName: string;
  packagePrice: number;
  durationMonths: number;
  discountPercentage: number;
  startDate?: Date;
  endDate?: Date;
  availablePaymentMethods: PaymentMethod[];
  onCheckout: (paymentMethodId: string) => Promise<void>;
  onCancel: () => void;
}

export default function PackageCheckout({
  packageName,
  packagePrice,
  durationMonths,
  discountPercentage,
  startDate = new Date(),
  endDate,
  availablePaymentMethods,
  onCheckout,
  onCancel
}: PackageCheckoutProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(
    availablePaymentMethods.length > 0 ? availablePaymentMethods[0].id : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Calculate discounted price
  const discountedPrice = packagePrice * (1 - discountPercentage / 100);
  const discountAmount = packagePrice - discountedPrice;
  
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  // Calculate end date if not provided
  const calculatedEndDate = endDate || (() => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + durationMonths);
    return date;
  })();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };
  
  const handlePaymentMethodChange = (id: string) => {
    setSelectedPaymentMethod(id);
  };
  
  const handleCheckout = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsLoading(true);
    try {
      await onCheckout(selectedPaymentMethod);
      setIsSuccess(true);
    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle error here
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto text-center">
        <div className="text-green-500 flex justify-center mb-6">
          <BsCheckCircleFill size={60} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thanh toán thành công!</h2>
        <p className="text-gray-600 mb-6">
          Gói {packageName} của bạn đã được kích hoạt. Cảm ơn bạn đã chọn chúng tôi!
        </p>
        <div className="bg-gray-50 p-5 rounded-lg mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-500">Gói tập:</div>
            <div className="font-semibold">{packageName}</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-500">Thời hạn:</div>
            <div className="font-semibold">{durationMonths} tháng</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Hiệu lực:</div>
            <div className="font-semibold">
              {formatDate(startDate)} - {formatDate(calculatedEndDate)}
            </div>
          </div>
        </div>
        <button
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold"
          onClick={() => window.location.href = '/dashboard'}
        >
          Đi đến trang quản lý
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Thanh toán</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Chi tiết gói tập
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">{packageName}</div>
                  <div className="text-gray-700">{formatCurrency(packagePrice)} ₫</div>
                </div>
                
                {discountPercentage > 0 && (
                  <div className="flex items-center justify-between text-green-600 mb-3">
                    <div>Giảm giá ({discountPercentage}%)</div>
                    <div>-{formatCurrency(discountAmount)} ₫</div>
                  </div>
                )}
                
                <div className="border-t border-gray-200 my-2"></div>
                
                <div className="flex items-center justify-between font-bold">
                  <div>Tổng thanh toán</div>
                  <div className="text-xl text-primary">{formatCurrency(discountedPrice)} ₫</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Thời hạn sử dụng</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <FaRegCalendarAlt className="text-primary" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Ngày bắt đầu</div>
                    <div className="font-medium">{formatDate(startDate)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <FaClock className="text-primary" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Thời hạn</div>
                    <div className="font-medium">{durationMonths} tháng</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaRegCalendarAlt className="text-primary" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Ngày kết thúc</div>
                    <div className="font-medium">{formatDate(calculatedEndDate)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Phương thức thanh toán</h3>
              <div className="space-y-3">
                {availablePaymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPaymentMethod === method.id 
                        ? 'border-primary bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePaymentMethodChange(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-6">
                        <Image
                          src={method.iconUrl}
                          alt={method.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{method.name}</div>
                        {method.description && (
                          <div className="text-sm text-gray-500">{method.description}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              disabled={!selectedPaymentMethod || isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <FaRegCreditCard />
                  <span>Thanh toán</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Đơn hàng của bạn</h3>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="font-bold text-xl mb-1">{packageName}</div>
            <div className="text-gray-500">Thời hạn: {durationMonths} tháng</div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <div className="text-gray-600">Giá gốc:</div>
              <div className="font-medium">{formatCurrency(packagePrice)} ₫</div>
            </div>
            
            {discountPercentage > 0 && (
              <div className="flex justify-between text-green-600">
                <div>Giảm giá:</div>
                <div>-{formatCurrency(discountAmount)} ₫</div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
              <div>Tổng thanh toán:</div>
              <div className="text-primary">{formatCurrency(discountedPrice)} ₫</div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <div className="text-blue-500 mt-1">
              <FaInfoCircle />
            </div>
            <div className="text-sm text-gray-700">
              Với việc thanh toán, bạn đồng ý với <a href="/terms" className="text-blue-600 hover:underline">điều khoản sử dụng</a> và <a href="/privacy" className="text-blue-600 hover:underline">chính sách bảo mật</a> của chúng tôi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
