// Trainer form component
"use client";

import { ApiResponse } from '@/types/api-responses';
import { TrainerProfile } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  specialization: z.string().min(2, 'Chuyên môn không hợp lệ'),
  certification: z.string().optional(),
  experienceYears: z.number().min(0, 'Năm kinh nghiệm không hợp lệ'),
  biography: z.string().optional(),
  hourlyRate: z.number().min(0, 'Giá giờ không hợp lệ'),
  availableHoursPerWeek: z.number().min(0, 'Giờ rảnh không hợp lệ'),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function TrainerForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/trainers', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result: ApiResponse<TrainerProfile> = await res.json();
      if (result.success) alert('Tạo huấn luyện viên thành công');
      else alert(result.message || 'Lỗi khi tạo huấn luyện viên');
    } catch {
      alert('Lỗi mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium">Chuyên môn</label>
        <input type="text" {...register('specialization')} className="mt-1 block w-full p-2 border rounded" />
        {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Chứng chỉ</label>
        <input type="text" {...register('certification')} className="mt-1 block w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Năm kinh nghiệm</label>
        <input type="number" {...register('experienceYears', { valueAsNumber: true })} className="mt-1 block w-full p-2 border rounded" />
        {errors.experienceYears && <p className="text-red-500 text-sm">{errors.experienceYears.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Tiểu sử</label>
        <textarea {...register('biography')} className="mt-1 block w-full p-2 border rounded" rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium">Giá/giờ (VND)</label>
        <input type="number" {...register('hourlyRate', { valueAsNumber: true })} className="mt-1 block w-full p-2 border rounded" />
        {errors.hourlyRate && <p className="text-red-500 text-sm">{errors.hourlyRate.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Giờ có thể làm/tuần</label>
        <input type="number" {...register('availableHoursPerWeek', { valueAsNumber: true })} className="mt-1 block w-full p-2 border rounded" />
        {errors.availableHoursPerWeek && <p className="text-red-500 text-sm">{errors.availableHoursPerWeek.message}</p>}
      </div>
      <div className="flex items-center">
        <input type="checkbox" {...register('isActive')} className="h-4 w-4" />
        <label className="ml-2 text-sm">Hoạt động</label>
      </div>
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        {isSubmitting ? 'Đang gửi...' : 'Lưu'}
      </button>
    </form>
  );
}
