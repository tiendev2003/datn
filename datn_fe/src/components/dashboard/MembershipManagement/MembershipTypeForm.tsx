// Membership type form
"use client";

import { ApiResponse } from '@/types/api-responses';
import { MembershipType } from '@/types/models';
import { Switch } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  typeName: z.string().min(1, 'Tên gói là bắt buộc'),
  description: z.string().optional(),
  durationDays: z.number().min(1, 'Thời hạn phải lớn hơn 0'),
  price: z.number().min(0, 'Giá phải không âm'),
  maxFreezeDays: z.number().min(0).optional(),
  guestPasses: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function MembershipTypeForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isActive: true }
  });

  const isActive = watch('isActive');

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post<ApiResponse<MembershipType>>('/api/membership-types', data);
      if (res.data.success) alert('Tạo loại thành viên thành công');
      else alert(res.data.message || 'Lỗi khi tạo loại thành viên');
    } catch {
      alert('Lỗi mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">Thông tin gói thành viên</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
        <input 
          type="text" 
          {...register('typeName')} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
        />
        {errors.typeName && <p className="mt-1 text-red-500 text-sm">{errors.typeName.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
        <textarea 
          {...register('description')} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thời hạn (ngày)</label>
          <input 
            type="number" 
            {...register('durationDays', { valueAsNumber: true })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
          />
          {errors.durationDays && <p className="mt-1 text-red-500 text-sm">{errors.durationDays.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND)</label>
          <input 
            type="number" 
            {...register('price', { valueAsNumber: true })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
          />
          {errors.price && <p className="mt-1 text-red-500 text-sm">{errors.price.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số ngày đóng băng tối đa</label>
          <input 
            type="number" 
            {...register('maxFreezeDays', { valueAsNumber: true })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số lượt khách</label>
          <input 
            type="number" 
            {...register('guestPasses', { valueAsNumber: true })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
          />
        </div>
      </div>
      
      <div className="pt-2">
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="text-sm font-medium text-gray-700">Hoạt động</Switch.Label>
            <Switch
              checked={isActive || false}
              onChange={(checked) => setValue('isActive', checked)}
              className={`${
                isActive ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Hoạt động</span>
              <span
                className={`${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
      
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full flex justify-center items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 transition-colors"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-5 w-5 mr-2" /> Tạo loại thành viên
            </>
          )}
        </button>
      </div>
    </form>
  );
}
