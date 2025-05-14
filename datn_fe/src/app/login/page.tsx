'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Here you would typically make an API call to authenticate the user
        try {
            // Simulate API call
            setTimeout(() => {
                console.log('Login data:', { ...formData, rememberMe });
                // If login successful, redirect to home page
                router.push('/');
                setIsLoading(false);
            }, 1000);
        } catch (err: any) {
            setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left side - Image and logo */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <Image 
                    src="/images/gym-background.jpg" 
                    alt="Gym Background" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                        <Image 
                            src="/images/logo.png" 
                            alt="Gym Logo" 
                            width={180} 
                            height={180}
                            className="mx-auto"
                        />
                        <h2 className="text-white text-3xl font-bold mt-6 text-center">GYMMASTER</h2>
                        <p className="text-white/80 text-center mt-2">Thay đổi cuộc sống với từng bước tập luyện</p>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Đăng Nhập</h1>
                        <p className="text-gray-600">Chào mừng trở lại! Đăng nhập để tiếp tục</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Nhập địa chỉ email của bạn"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Nhập mật khẩu của bạn"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="text-primary hover:text-primary-dark font-medium">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-medium flex items-center justify-center shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" className="text-primary font-semibold hover:text-primary-dark">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                            ← Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
