// Class form component
"use client";

import { ApiResponse } from '@/types/api-responses';
import { ClassType } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  typeName: z.string().min(1, 'Tên loại lớp là bắt buộc'),
  description: z.string().optional(),
  durationMinutes: z.number().min(1, 'Thời lượng phải lớn hơn 0'),
  maxCapacity: z.number().min(1, 'Sức chứa tối đa phải lớn hơn 0'),
  intensity: z.string().optional(),
  imageUrl: z.string().url('URL không hợp lệ').optional(),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ClassForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { isActive: true } });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post<ApiResponse<ClassType>>('/api/class-types', data);
      if (res.data.success) alert('Tạo loại lớp thành công');
      else alert(res.data.message || 'Lỗi khi tạo loại lớp');
    } catch {
      alert('Lỗi mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium">Tên loại lớp</label>
        <input type="text" {...register('typeName')} className="mt-1 block w-full p-2 border rounded" />
        {errors.typeName && <p className="text-red-500 text-sm">{errors.typeName.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <textarea {...register('description')} className="mt-1 block w-full p-2 border rounded" rows={3} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Thời lượng (phút)</label>
          <input type="number" {...register('durationMinutes', { valueAsNumber: true })} className="mt-1 block w-full p-2 border rounded" />
          {errors.durationMinutes && <p className="text-red-500 text-sm">{errors.durationMinutes.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Sức chứa tối đa</label>
          <input type="number" {...register('maxCapacity', { valueAsNumber: true })} className="mt-1 block w-full p-2 border rounded" />
          {errors.maxCapacity && <p className="text-red-500 text-sm">{errors.maxCapacity.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Cường độ</label>
        <input type="text" {...register('intensity')} className="mt-1 block w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">URL hình ảnh</label>
        <input type="url" {...register('imageUrl')} className="mt-1 block w-full p-2 border rounded" />
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
      </div>
      <div className="flex items-center">
        <input type="checkbox" {...register('isActive')} className="h-4 w-4" />
        <label className="ml-2 text-sm">Hoạt động</label>
      </div>
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        {isSubmitting ? 'Đang gửi...' : 'Tạo loại lớp'}
      </button>
    </form>
  );
}
