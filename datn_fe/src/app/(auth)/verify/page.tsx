'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiLock } from 'react-icons/fi';
import { z } from 'zod';

const verifySchema = z.object({
  code: z.string().min(4, 'Mã xác thực phải có ít nhất 4 ký tự').max(8, 'Mã xác thực không được quá 8 ký tự'),
});

type VerifyFormData = z.infer<typeof verifySchema>;

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const mode = searchParams.get('mode') || 'reset-password';
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    if (!email) {
      router.replace('/forgot-password');
      return;
    }

    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timer, canResend, email, router]);

  const onSubmit = async (data: VerifyFormData) => {
    try {
      setIsLoading(true);
      setMessage(null);

      // TODO: Kết nối API xác thực mã
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: data.code,
          mode,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Mã xác thực không hợp lệ');
      }

      setMessage({
        text: 'Xác thực thành công!',
        type: 'success',
      });
      
      // Chuyển hướng dựa trên chế độ xác thực
      setTimeout(() => {
        if (mode === 'reset-password') {
          router.push(`/reset-password?email=${encodeURIComponent(email as string)}&token=${data.code}`);
        } else {
          router.push('/login?verified=true');
        }
      }, 1500);
    } catch (error) {
      console.error('Lỗi xác thực:', error);
      setMessage({
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi xác thực mã',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      setMessage(null);
      
      // TODO: Kết nối API gửi lại mã
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          mode,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Không thể gửi lại mã');
      }

      setMessage({
        text: 'Đã gửi lại mã xác thực mới',
        type: 'success',
      });
      
      // Reset timer
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      console.error('Lỗi gửi lại mã:', error);
      setMessage({
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi lại mã',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu không có email hoặc không rõ chế độ, hiển thị trạng thái tải
  if (!email) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  const title = mode === 'reset-password' 
    ? 'Xác thực mã đặt lại mật khẩu'
    : 'Xác thực tài khoản';
  
  const description = mode === 'reset-password'
    ? 'Nhập mã xác thực đã được gửi đến email của bạn để tiếp tục đặt lại mật khẩu'
    : 'Nhập mã xác thực đã được gửi đến email của bạn để xác minh tài khoản';

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-2">{description}</p>
          <p className="text-gray-600 mb-8">
            Mã xác thực đã được gửi đến: <span className="font-semibold">{email}</span>
          </p>
          
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Mã xác thực
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="code"
                  type="text"
                  placeholder="Nhập mã xác thực"
                  {...register('code')}
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.code ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                />
              </div>
              {errors.code && (
                <p className="text-sm text-red-600">{errors.code.message}</p>
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
                    Đang xác thực...
                  </div>
                ) : (
                  <>
                    Xác nhận
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Gửi lại mã
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">
                    Gửi lại sau {timer} giây
                  </span>
                )}
              </div>
              <div>
                <Link 
                  href={mode === 'reset-password' ? '/forgot-password' : '/login'}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  {mode === 'reset-password' ? 'Quay lại' : 'Đăng nhập'}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-red-800 hidden md:flex items-center justify-center relative overflow-hidden">
        <div className="z-10 p-12 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Bảo mật là ưu tiên hàng đầu</h2>
          <p className="text-lg opacity-90">
            {mode === 'reset-password' 
              ? 'Việc xác thực này giúp đảm bảo chỉ có bạn mới có thể đặt lại mật khẩu cho tài khoản của mình.'
              : 'Việc xác thực này giúp bảo vệ tài khoản của bạn và cộng đồng thành viên của chúng tôi.'}
          </p>
          
          <div className="mt-12 bg-white/10 backdrop-blur-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Lưu ý về mã xác thực</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mã xác thực có hiệu lực trong vòng 10 phút</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Kiểm tra cả thư mục spam nếu bạn không thấy email</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Không chia sẻ mã xác thực với người khác</span>
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