"use client";

import { ApiResponse } from '@/types/api-responses';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  siteName: z.string().min(2, 'Tên trang phải có ít nhất 2 ký tự'),
  contactEmail: z.string().email('Email không hợp lệ'),
  membershipExpiryNotificationDays: z.number().min(1).max(30),
  maintenanceMode: z.boolean().optional(),
  defaultLanguage: z.string().min(2, 'Ngôn ngữ phải có ít nhất 2 ký tự'),
  gymOpenTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Định dạng giờ không hợp lệ (HH:MM)'),
  gymCloseTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Định dạng giờ không hợp lệ (HH:MM)'),
  allowGuestBookings: z.boolean().optional(),
  defaultCurrency: z.string().min(1, 'Tiền tệ không được bỏ trống'),
  taxPercentage: z.number().min(0).max(100),
  automaticRenewalReminders: z.boolean().optional(),
  newMemberWelcomeMessage: z.string().optional(),
  paymentGracePeriodDays: z.number().min(0).max(30),
});

type FormData = z.infer<typeof schema>;

interface Settings {
  id: number;
  siteName: string;
  contactEmail: string;
  membershipExpiryNotificationDays: number;
  maintenanceMode: boolean;
  defaultLanguage: string;
  gymOpenTime: string;
  gymCloseTime: string;
  allowGuestBookings: boolean;
  defaultCurrency: string;
  taxPercentage: number;
  automaticRenewalReminders: boolean;
  newMemberWelcomeMessage: string;
  paymentGracePeriodDays: number;
  updatedAt: string;
}

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      siteName: "Fitness Center",
      contactEmail: "contact@fitnesscenter.com",
      membershipExpiryNotificationDays: 7,
      maintenanceMode: false,
      defaultLanguage: "vi",
      gymOpenTime: "06:00",
      gymCloseTime: "22:00",
      allowGuestBookings: false,
      defaultCurrency: "VND",
      taxPercentage: 10,
      automaticRenewalReminders: true,
      newMemberWelcomeMessage: "Chào mừng bạn đến với Fitness Center!",
      paymentGracePeriodDays: 5
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get<ApiResponse<Settings>>('/api/settings');
        if (res.data.success && res.data.data) {
          reset(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setIsError('Không thể tải thông tin cài đặt');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsError(null);
      const res = await axios.put<ApiResponse<Settings>>('/api/settings', data);
      
      if (res.data.success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setIsError(res.data.message || 'Lỗi khi lưu cài đặt');
      }
    } catch (err: any) {
      setIsError(err.response?.data?.message || 'Lỗi mạng khi lưu cài đặt');
    }
  };

  if (loading) {
    return <p className="text-center py-8">Đang tải thông tin cài đặt...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Cài đặt hệ thống</h2>
      
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Cài đặt đã được lưu thành công!
        </div>
      )}
      
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {isError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên trang</label>
            <input
              type="text"
              {...register('siteName')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.siteName && <p className="text-red-500 text-sm">{errors.siteName.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email liên hệ</label>
            <input
              type="email"
              {...register('contactEmail')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ngôn ngữ mặc định</label>
            <select
              {...register('defaultLanguage')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
            {errors.defaultLanguage && <p className="text-red-500 text-sm">{errors.defaultLanguage.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tiền tệ mặc định</label>
            <select
              {...register('defaultCurrency')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="VND">VND (₫)</option>
              <option value="USD">USD ($)</option>
            </select>
            {errors.defaultCurrency && <p className="text-red-500 text-sm">{errors.defaultCurrency.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Số ngày thông báo sắp hết hạn</label>
            <input
              type="number"
              min="1"
              max="30"
              {...register('membershipExpiryNotificationDays', { valueAsNumber: true })}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.membershipExpiryNotificationDays && <p className="text-red-500 text-sm">{errors.membershipExpiryNotificationDays.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thuế VAT (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              {...register('taxPercentage', { valueAsNumber: true })}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.taxPercentage && <p className="text-red-500 text-sm">{errors.taxPercentage.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thời gian gia hạn thanh toán (ngày)</label>
            <input
              type="number"
              min="0"
              max="30"
              {...register('paymentGracePeriodDays', { valueAsNumber: true })}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.paymentGracePeriodDays && <p className="text-red-500 text-sm">{errors.paymentGracePeriodDays.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Giờ mở cửa</label>
            <input
              type="time"
              {...register('gymOpenTime')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.gymOpenTime && <p className="text-red-500 text-sm">{errors.gymOpenTime.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Giờ đóng cửa</label>
            <input
              type="time"
              {...register('gymCloseTime')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.gymCloseTime && <p className="text-red-500 text-sm">{errors.gymCloseTime.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tin nhắn chào mừng thành viên mới</label>
          <textarea
            rows={3}
            {...register('newMemberWelcomeMessage')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintenanceMode"
              {...register('maintenanceMode')}
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
            />
            <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Kích hoạt chế độ bảo trì
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowGuestBookings"
              {...register('allowGuestBookings')}
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
            />
            <label htmlFor="allowGuestBookings" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Cho phép đặt lịch không cần tài khoản
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="automaticRenewalReminders"
              {...register('automaticRenewalReminders')}
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
            />
            <label htmlFor="automaticRenewalReminders" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Tự động nhắc nhở gia hạn gói
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isSubmitting ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </form>
    </div>
  );
}
