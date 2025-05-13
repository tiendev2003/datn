// User form component
"use client";

import { ApiResponse } from '@/types/api-responses';
import { User } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  username: z.string().min(3, 'Tên người dùng phải có ít nhất 3 ký tự'),
  preferredLanguage: z.string().optional(),
  isEmailVerified: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result: ApiResponse<User> = await res.json();
      if (result.success) {
        alert('Tạo người dùng thành công');
        // optionally reset or update list
      } else {
        alert(result.message || 'Lỗi khi tạo người dùng');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          {...register('username')}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ngôn ngữ ưu tiên</label>
        <input
          type="text"
          {...register('preferredLanguage')}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isEmailVerified')}
          className="h-4 w-4 text-indigo-600"
        />
        <label className="ml-2 text-sm">Email đã xác thực</label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {isSubmitting ? 'Đang gửi...' : 'Lưu'}
      </button>
    </form>
  );
}
