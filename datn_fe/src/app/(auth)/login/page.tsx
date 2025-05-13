"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Kiểm tra nếu đã đăng nhập thì chuyển hướng đến dashboard
    const user = localStorage.getItem("fithub-user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: call login API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem(
        "fithub-user",
        JSON.stringify({
          email: email,
          name: "Demo User",
          id: "user-123"
        })
      );
      router.push("/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Chào mừng trở lại</h2>
          <p className="text-gray-600 mb-8">Vui lòng nhập thông tin để đăng nhập</p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-800">
                  Quên mật khẩu?
                </Link>
              </div>
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
                    Đang đăng nhập...
                  </div>
                ) : (
                  <>
                    Đăng nhập
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-medium text-red-600 hover:text-red-800">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-red-800 hidden md:flex items-center justify-center relative overflow-hidden">
        <div className="z-10 p-12 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Hành trình thể dục bắt đầu từ bước đầu tiên</h2>
          <p className="text-lg opacity-90">
            Đăng nhập để quản lý hành trình thể dục của bạn, đặt lịch tập luyện và theo dõi tiến độ của bạn.
          </p>

          <div className="mt-12 flex space-x-6">
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <p className="text-4xl font-bold">500+</p>
              <p className="text-sm opacity-80">Lớp học hàng tuần</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <p className="text-4xl font-bold">50+</p>
              <p className="text-sm opacity-80">Huấn luyện viên</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
              <p className="text-4xl font-bold">10k+</p>
              <p className="text-sm opacity-80">Thành viên</p>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute top-10 -left-16 w-72 h-72 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}