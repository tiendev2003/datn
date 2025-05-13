"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowRight, FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: call register API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Đăng ký không thành công. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Decorative */}
      <div className="md:w-1/2 bg-gradient-to-tr from-red-800 to-red-600 hidden md:flex items-center justify-center relative overflow-hidden">
        <div className="z-10 p-12 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Tham gia cộng đồng thể hình của chúng tôi</h2>
          <p className="text-lg opacity-90">
            Tạo tài khoản để bắt đầu hành trình thể dục của bạn, đăng ký lớp học, đặt lịch với huấn luyện viên và hơn thế nữa.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Đặt lớp học</h3>
              <p className="opacity-80">Đặt chỗ trong bất kỳ lớp học nhóm nào</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Huấn luyện cá nhân</h3>
              <p className="opacity-80">Lên lịch với huấn luyện viên chuyên nghiệp</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Theo dõi tiến độ</h3>
              <p className="opacity-80">Giám sát hành trình tập luyện của bạn</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Cộng đồng</h3>
              <p className="opacity-80">Tham gia sự kiện và thử thách</p>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute top-10 -right-16 w-72 h-72 rounded-full bg-white/10"></div>
      </div>

      {/* Right side - Registration form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Tạo tài khoản</h2>
          <p className="text-gray-600 mb-8">Nhập thông tin của bạn để bắt đầu</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  placeholder="Nguyễn Văn A"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Số điện thoại (không bắt buộc)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+84 123 456 789"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Mật khẩu phải có ít nhất 6 ký tự
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
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-red-600 hover:text-red-800">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-red-600 hover:text-red-800">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <div className="pt-4">
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
                    Đang tạo tài khoản...
                  </div>
                ) : (
                  <>
                    Tạo tài khoản
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-medium text-red-600 hover:text-red-800">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}