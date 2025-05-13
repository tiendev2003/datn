'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiLock } from 'react-icons/fi';
import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
          'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận lại mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!email || !token) {
      router.replace('/forgot-password');
    }
  }, [email, token, router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setMessage(null);

      // TODO: Kết nối API đặt lại mật khẩu
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          token,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
      }

      setMessage({
        text: 'Mật khẩu của bạn đã được đặt lại thành công!',
        type: 'success',
      });
      
      // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu thành công
      setTimeout(() => {
        router.push('/login?resetSuccess=true');
      }, 2000);
    } catch (error) {
      console.error('Lỗi đặt lại mật khẩu:', error);
      setMessage({
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt lại mật khẩu',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu không có email hoặc token, hiển thị trạng thái tải
  if (!email || !token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Đặt lại mật khẩu</h2>
          <p className="text-gray-600 mb-8">Tạo mật khẩu mới cho tài khoản của bạn</p>
          
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-2.5 px-4 text-white rounded-lg transition-all
                  ${isLoading 
                    ? 'bg-red-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300'}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Đang xử lý...
                  </div>
                ) : (
                  <>
                    Đặt lại mật khẩu
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
            
            <div className="pt-4 text-center">
              <Link href="/login" className="text-sm font-medium text-red-600 hover:text-red-800">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-red-800 hidden md:flex items-center justify-center relative overflow-hidden">
        <div className="z-10 p-12 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Bảo mật tài khoản của bạn</h2>
          <p className="text-lg opacity-90">
            Tạo một mật khẩu mạnh để bảo vệ tài khoản và dữ liệu cá nhân của bạn. Hãy chọn mật khẩu duy nhất mà bạn chưa sử dụng cho các tài khoản khác.
          </p>
          
          <div className="mt-12 bg-white/10 backdrop-blur-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Mẹo tạo mật khẩu an toàn</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Sử dụng ít nhất 12 ký tự</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Tránh sử dụng thông tin cá nhân hoặc cụm từ phổ biến</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Không sử dụng lại mật khẩu từ các trang web khác</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute top-10 -left-16 w-72 h-72 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}