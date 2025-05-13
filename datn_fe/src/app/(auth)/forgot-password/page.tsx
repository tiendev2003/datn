'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setMessage(null);
      
      // TODO: Kết nối API quên mật khẩu thực tế
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi yêu cầu đặt lại mật khẩu');
      }

      setMessage({
        text: 'Chúng tôi đã gửi mã xác nhận đến email của bạn',
        type: 'success',
      });
      
      // Chuyển hướng đến trang xác thực mã
      setTimeout(() => {
        router.push(`/verify?email=${encodeURIComponent(data.email)}&mode=reset-password`);
      }, 2000);
    } catch (error) {
      console.error('Lỗi quên mật khẩu:', error);
      setMessage({
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi yêu cầu đặt lại mật khẩu',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Quên mật khẩu</h2>
          <p className="text-gray-600 mb-8">Nhập email của bạn để nhận mã xác nhận đặt lại mật khẩu</p>
          
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register('email')}
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
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
                    Gửi yêu cầu
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
          <h2 className="text-4xl font-bold mb-6">Khôi phục tài khoản của bạn</h2>
          <p className="text-lg opacity-90">
            Đừng lo lắng về việc quên mật khẩu. Chúng tôi sẽ giúp bạn thiết lập lại mật khẩu một cách an toàn để bạn có thể tiếp tục hành trình tập luyện của mình.
          </p>
          
          <div className="mt-12 bg-white/10 backdrop-blur-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Quy trình đặt lại mật khẩu</h3>
            <ol className="space-y-3 list-decimal ml-5">
              <li>Nhập email đã đăng ký của bạn</li>
              <li>Nhận mã xác thực qua email</li>
              <li>Nhập mã xác thực để xác minh danh tính</li>
              <li>Tạo mật khẩu mới an toàn</li>
            </ol>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute top-10 -left-16 w-72 h-72 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}