"use client";

import { ApiResponse } from '@/types/api-responses';
import { Referral, ReferralStatus, RewardStatus, User } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import axios from 'axios';

const schema = z.object({
  referrerId: z.number().min(1, "Vui lòng chọn người giới thiệu"),
  referredEmail: z.string().email('Email không hợp lệ'),
  referralCode: z.string().min(6, "Mã giới thiệu phải có ít nhất 6 ký tự"),
  notes: z.string().optional(),
  status: z.enum([
    ReferralStatus.PENDING, 
    ReferralStatus.REGISTERED, 
    ReferralStatus.CONVERTED, 
    ReferralStatus.EXPIRED
  ]),
  rewardStatus: z.enum([
    RewardStatus.PENDING, 
    RewardStatus.ISSUED, 
    RewardStatus.CLAIMED
  ]).optional(),
  rewardDetails: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ReferralFormProps {
  referralId?: number;
  onSuccess?: () => void;
}

export default function ReferralForm({ referralId, onSuccess }: ReferralFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [referralLoading, setReferralLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!referralId;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: ReferralStatus.PENDING,
      rewardStatus: RewardStatus.PENDING,
      referralCode: generateRandomCode(8),
    }
  });

  function generateRandomCode(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<User[]>>('/api/users');
        if (response.data.success && response.data.data) {
          setUsers(response.data.data);
        }
      } catch (err) {
        setError("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (referralId) {
      const fetchReferral = async () => {
        try {
          setReferralLoading(true);
          const response = await axios.get<ApiResponse<Referral>>(`/api/referrals/${referralId}`);
          if (response.data.success && response.data.data) {
            const referral = response.data.data;
            reset({
              referrerId: referral.referrer?.id,
              referredEmail: referral.referred?.email || '',
              referralCode: referral.referralCode,
              status: referral.status,
              rewardStatus: referral.rewardStatus,
              rewardDetails: referral.rewardDetails,
              notes: referral.notes,
            });
          }
        } catch (err) {
          setError("Không thể tải thông tin giới thiệu");
        } finally {
          setReferralLoading(false);
        }
      };

      fetchReferral();
    }
  }, [referralId, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      let response;
      
      if (isEditMode) {
        response = await axios.put<ApiResponse<Referral>>(`/api/referrals/${referralId}`, data);
      } else {
        response = await axios.post<ApiResponse<Referral>>('/api/referrals', data);
      }
      
      if (response.data.success) {
        setSuccess(true);
        setError(null);
        if (!isEditMode) {
          reset({
            ...data,
            referredEmail: '',
            notes: '',
            referralCode: generateRandomCode(8),
          });
        }
        setTimeout(() => setSuccess(false), 3000);
        if (onSuccess) onSuccess();
      } else {
        setError(response.data.message || 'Lỗi khi lưu thông tin giới thiệu');
        setSuccess(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi mạng');
      setSuccess(false);
    }
  };

  if (referralLoading) {
    return <p className="text-center py-8">Đang tải thông tin giới thiệu...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {isEditMode ? 'Chỉnh sửa giới thiệu' : 'Tạo giới thiệu mới'}
      </h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {isEditMode ? 'Giới thiệu đã được cập nhật thành công!' : 'Giới thiệu đã được tạo thành công!'}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Người giới thiệu</label>
          <select
            disabled={loading || isEditMode}
            {...register('referrerId', { valueAsNumber: true })}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">-- Chọn người giới thiệu --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
          {errors.referrerId && <p className="text-red-500 text-sm">{errors.referrerId.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email người được giới thiệu</label>
          <input
            type="email"
            disabled={isEditMode}
            {...register('referredEmail')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.referredEmail && <p className="text-red-500 text-sm">{errors.referredEmail.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mã giới thiệu</label>
          <input
            type="text"
            {...register('referralCode')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.referralCode && <p className="text-red-500 text-sm">{errors.referralCode.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái</label>
          <select
            {...register('status')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={ReferralStatus.PENDING}>Chờ xác nhận</option>
            <option value={ReferralStatus.REGISTERED}>Đã đăng ký</option>
            <option value={ReferralStatus.CONVERTED}>Đã chuyển đổi</option>
            <option value={ReferralStatus.EXPIRED}>Đã hết hạn</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái phần thưởng</label>
          <select
            {...register('rewardStatus')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={RewardStatus.PENDING}>Chờ xử lý</option>
            <option value={RewardStatus.ISSUED}>Đã phát hành</option>
            <option value={RewardStatus.CLAIMED}>Đã nhận</option>
          </select>
          {errors.rewardStatus && <p className="text-red-500 text-sm">{errors.rewardStatus.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chi tiết phần thưởng</label>
          <textarea
            rows={3}
            {...register('rewardDetails')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Nhập chi tiết phần thưởng (ví dụ: giảm 10% gói tập)"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú</label>
          <textarea
            rows={3}
            {...register('notes')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Nhập ghi chú nếu có"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isSubmitting ? 'Đang xử lý...' : isEditMode ? 'Cập nhật giới thiệu' : 'Tạo giới thiệu'}
        </button>
      </form>
    </div>
  );
}
