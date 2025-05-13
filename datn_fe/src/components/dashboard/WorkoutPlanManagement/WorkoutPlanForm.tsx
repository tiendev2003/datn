"use client";

import { ApiResponse } from '@/types/api-responses';
import { PlanStatus, TrainerProfile, User, WorkoutPlan } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Schema cho form tạo/chỉnh sửa kế hoạch tập
const schema = z.object({
  userId: z.number().min(1, 'Vui lòng chọn học viên'),
  trainerId: z.number().min(1, 'Vui lòng chọn huấn luyện viên'),
  planName: z.string().min(3, 'Tên kế hoạch phải có ít nhất 3 ký tự'),
  description: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày bắt đầu không hợp lệ'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày kết thúc không hợp lệ').optional(),
  planStatus: z.enum(['ACTIVE', 'COMPLETED', 'ABANDONED']).default('ACTIVE'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface WorkoutPlanFormProps {
  initialData?: WorkoutPlan; // Truyền vào khi mode = edit
  mode: 'create' | 'edit';
}

export default function WorkoutPlanForm({ initialData, mode }: WorkoutPlanFormProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Khởi tạo form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      userId: initialData.user?.id,
      trainerId: initialData.trainer?.trainerId,
      planName: initialData.planName,
      description: initialData.description || '',
      startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().substring(0, 10) : undefined,
      endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().substring(0, 10) : undefined,
      planStatus: initialData.planStatus,
      notes: initialData.notes || '',
    } : {
      startDate: new Date().toISOString().substring(0, 10),
      planStatus: 'ACTIVE' as PlanStatus,
    }
  });
  
  // Tải danh sách người dùng và huấn luyện viên
  useEffect(() => {
    const fetchUsers = axios.get<ApiResponse<User[]>>('/api/users');
    const fetchTrainers = axios.get<ApiResponse<TrainerProfile[]>>('/api/trainers?isActive=true');
    
    Promise.all([fetchUsers, fetchTrainers])
      .then(([usersRes, trainersRes]) => {
        if (usersRes.data.success && usersRes.data.data) {
          setUsers(usersRes.data.data);
        }
        
        if (trainersRes.data.success && trainersRes.data.data) {
          setTrainers(trainersRes.data.data);
        }
      })
      .catch(() => {
        setError('Không thể tải dữ liệu');
      });
  }, []);
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (mode === 'create') {
        response = await axios.post<ApiResponse<WorkoutPlan>>('/api/workout-plans', data);
      } else {
        response = await axios.put<ApiResponse<WorkoutPlan>>(`/api/workout-plans/${initialData?.planId}`, data);
      }
      
      if (response.data.success) {
        // Chuyển hướng về trang danh sách kế hoạch
        router.push('/dashboard/workout-plans');
      } else {
        setError(response.data.message || 'Lỗi khi lưu kế hoạch tập');
      }
    } catch (error) {
      setError('Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            Học viên
          </label>
          <select
            id="userId"
            {...register('userId', { valueAsNumber: true })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            disabled={mode === 'edit'}
          >
            <option value="">-- Chọn học viên --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
          {errors.userId && <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>}
        </div>
        
        <div>
          <label htmlFor="trainerId" className="block text-sm font-medium text-gray-700">
            Huấn luyện viên
          </label>
          <select
            id="trainerId"
            {...register('trainerId', { valueAsNumber: true })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Chọn huấn luyện viên --</option>
            {trainers.map((trainer) => (
              <option key={trainer.trainerId} value={trainer.trainerId}>
                {trainer.user?.username || trainer.user?.email} - {trainer.specialization}
              </option>
            ))}
          </select>
          {errors.trainerId && <p className="mt-1 text-sm text-red-600">{errors.trainerId.message}</p>}
        </div>
        
        <div>
          <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
            Tên kế hoạch
          </label>
          <input
            type="text"
            id="planName"
            {...register('planName')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.planName && <p className="mt-1 text-sm text-red-600">{errors.planName.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              id="startDate"
              {...register('startDate')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>}
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Ngày kết thúc (tùy chọn)
            </label>
            <input
              type="date"
              id="endDate"
              {...register('endDate')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <textarea
            id="notes"
            rows={3}
            {...register('notes')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        {mode === 'edit' && (
          <div>
            <label htmlFor="planStatus" className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              id="planStatus"
              {...register('planStatus')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="COMPLETED">Đã hoàn thành</option>
              <option value="ABANDONED">Đã dừng</option>
            </select>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {loading ? 'Đang xử lý...' : mode === 'create' ? 'Tạo kế hoạch' : 'Cập nhật kế hoạch'}
        </button>
      </div>
    </form>
  );
}
