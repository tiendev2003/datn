// PT Package form component
"use client";

import { ApiResponse } from '@/types/api-responses';
import { PTPackage } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  packageName: z.string().min(1, 'Tên gói PT là bắt buộc'),
  description: z.string().optional(),
  numberOfSessions: z.number().min(1, 'Số buổi tập phải ít nhất là 1'),
  validityDays: z.number().min(1, 'Thời hạn sử dụng phải ít nhất là 1 ngày'),
  price: z.number().min(0, 'Giá không được âm'),
  discountPercentage: z.number().min(0).max(100).optional(),
  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export default function PTPackageForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: true,
      discountPercentage: 0
    }
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setSuccess(null);
    setApiError(null);
    
    try {
      const res = await axios.post<ApiResponse<PTPackage>>('/api/pt-packages', data);
      if (res.data.success) {
        setSuccess('Gói PT đã được tạo thành công');
      } else {
        setApiError(res.data.message || 'Lỗi khi tạo gói PT');
      }
    } catch (err) {
      setApiError('Lỗi kết nối mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      {success && <div className="bg-green-50 text-green-800 p-3 rounded">{success}</div>}
      {apiError && <div className="bg-red-50 text-red-800 p-3 rounded">{apiError}</div>}
      
      <div>
        <label className="block text-sm font-medium">Tên gói PT</label>
        <input type="text" {...register('packageName')} className="mt-1 block w-full p-2 border rounded" />
        {errors.packageName && <p className="text-red-500 text-sm">{errors.packageName.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <textarea {...register('description')} className="mt-1 block w-full p-2 border rounded" rows={3} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Số buổi tập</label>
          <input 
            type="number" 
            {...register('numberOfSessions', { valueAsNumber: true })} 
            className="mt-1 block w-full p-2 border rounded" 
          />
          {errors.numberOfSessions && <p className="text-red-500 text-sm">{errors.numberOfSessions.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Thời hạn sử dụng (ngày)</label>
          <input 
            type="number" 
            {...register('validityDays', { valueAsNumber: true })} 
            className="mt-1 block w-full p-2 border rounded" 
          />
          {errors.validityDays && <p className="text-red-500 text-sm">{errors.validityDays.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Giá (VND)</label>
          <input 
            type="number" 
            {...register('price', { valueAsNumber: true })} 
            className="mt-1 block w-full p-2 border rounded" 
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Giảm giá (%)</label>
          <input 
            type="number"
            min="0"
            max="100"
            {...register('discountPercentage', { valueAsNumber: true })}
            className="mt-1 block w-full p-2 border rounded"
          />
          {errors.discountPercentage && <p className="text-red-500 text-sm">{errors.discountPercentage.message}</p>}
        </div>
      </div>
      
      <div className="flex items-center">
        <input 
          type="checkbox" 
          {...register('isActive')}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">Gói đang hoạt động</label>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Tạo gói PT'}
      </button>
    </form>
  );
}
