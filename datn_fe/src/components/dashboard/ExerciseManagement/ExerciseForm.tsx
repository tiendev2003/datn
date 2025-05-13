// Exercise form component
"use client";

import { ApiResponse } from '@/types/api-responses';
import { DifficultyLevel, Exercise, ExerciseCategory } from '@/types/models';
import { capitalizeFirst } from '@/utils/formatter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  exerciseName: z.string().min(1, 'Tên bài tập là bắt buộc'),
  description: z.string().optional(),
  category: z.nativeEnum(ExerciseCategory, { errorMap: () => ({ message: 'Chọn danh mục' }) }),
  difficultyLevel: z.nativeEnum(DifficultyLevel, { errorMap: () => ({ message: 'Chọn độ khó' }) }),
  demoVideoUrl: z.string().url('URL không hợp lệ').optional(),
  imageUrl: z.string().url('URL không hợp lệ').optional(),
  targetMuscles: z.string().optional(),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ExerciseForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { isActive: true } });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/exercises', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result: ApiResponse<Exercise> = await res.json();
      if (result.success) alert('Tạo bài tập thành công');
      else alert(result.message || 'Lỗi khi tạo bài tập');
    } catch {
      alert('Lỗi mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium">Tên bài tập</label>
        <input type="text" {...register('exerciseName')} className="mt-1 block w-full p-2 border rounded" />
        {errors.exerciseName && <p className="text-red-500 text-sm">{errors.exerciseName.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Danh mục</label>
          <select {...register('category')} className="mt-1 block w-full p-2 border rounded">
            {Object.values(ExerciseCategory).map(val => (
              <option key={val} value={val}>{capitalizeFirst(val.toLowerCase())}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Độ khó</label>
          <select {...register('difficultyLevel')} className="mt-1 block w-full p-2 border rounded">
            {Object.values(DifficultyLevel).map(val => (
              <option key={val} value={val}>{capitalizeFirst(val.toLowerCase())}</option>
            ))}
          </select>
          {errors.difficultyLevel && <p className="text-red-500 text-sm">{errors.difficultyLevel.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <textarea {...register('description')} className="mt-1 block w-full p-2 border rounded" rows={3} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">URL video demo</label>
          <input type="url" {...register('demoVideoUrl')} className="mt-1 block w-full p-2 border rounded" />
          {errors.demoVideoUrl && <p className="text-red-500 text-sm">{errors.demoVideoUrl.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">URL hình ảnh</label>
          <input type="url" {...register('imageUrl')} className="mt-1 block w-full p-2 border rounded" />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Cơ nhóm mục tiêu</label>
        <input type="text" {...register('targetMuscles')} className="mt-1 block w-full p-2 border rounded" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" {...register('isActive')} className="h-4 w-4" />
        <label className="ml-2 text-sm">Hoạt động</label>
      </div>
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        {isSubmitting ? 'Đang gửi...' : 'Tạo bài tập'}
      </button>
    </form>
  );
}
