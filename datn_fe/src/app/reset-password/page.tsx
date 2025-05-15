'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [isValid, setIsValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = searchParams.get('token');
    
    useEffect(() => {
        // Validate token
        if (!token) {
            setError('Link khôi phục mật khẩu không hợp lệ hoặc đã hết hạn.');
            return;
        }

        // Here you would typically verify the token with your backend
        setIsValid(true);
    }, [token]);

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

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.');
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            setTimeout(() => {
                console.log('Reset password with token:', token);
                console.log('New password:', formData.password);
                setIsSubmitted(true);
                setIsLoading(false);
            }, 1000);
        } catch (err: any) {
            setError('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.');
            setIsLoading(false);
        }
    };

    const redirectToLogin = () => {
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Header - Only visible on mobile */}
            <div className="lg:hidden flex items-center justify-between bg-primary text-white p-4 shadow-md">
                <div className="flex items-center space-x-2">
                    <Image 
                        src="/images/logo.png" 
                        alt="Gym Logo" 
                        width={40} 
                        height={40}
                    />
                    <h2 className="font-bold text-xl">GYMMASTER</h2>
                </div>
                <h2 className="font-bold text-xl">ĐẶT LẠI MẬT KHẨU</h2>
            </div>

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
                        <p className="text-white/80 text-center mt-2">Cài đặt mật khẩu mới cho tài khoản của bạn</p>
                    </div>
                </div>
            </div>            {/* Right side - Reset password form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start items-center bg-white px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
                {/* Website Name in Top Left Corner */}
                <div className="self-start mb-6">
                    <Link href="/" className="text-xl font-bold text-primary">
                        GYM<span className="text-secondary">MASTER</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Đặt Lại Mật Khẩu</h1>
                        <p className="text-gray-600">Tạo mật khẩu mới cho tài khoản của bạn</p>
                    </div>                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}                    {isValid && !isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Mật khẩu mới <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                                    minLength={8}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự</p>
                            </div>

                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                    Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Nhập lại mật khẩu mới để xác nhận"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold text-lg flex items-center justify-center shadow-lg mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    'ĐẶT LẠI MẬT KHẨU'
                                )}
                            </button>
                        </form>                    ) : isSubmitted ? (
                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-green-100 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đặt lại mật khẩu thành công!</h2>
                            <p className="text-gray-600 mb-6">
                                Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập vào tài khoản của mình với mật khẩu mới.
                            </p>
                            <button 
                                onClick={redirectToLogin}
                                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold w-full"
                            >
                                Đăng nhập ngay
                            </button>
                        </div>                    ) : (
                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-red-100 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Link không hợp lệ</h2>
                            <p className="text-gray-600 mb-6">
                                Link khôi phục mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu link mới.
                            </p>
                            <Link href="/forgot-password">
                                <button className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold w-full mb-4">
                                    Yêu cầu link mới
                                </button>
                            </Link>
                            <Link href="/login">
                                <button className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold w-full">
                                    Quay lại đăng nhập
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className="mt-6 text-center pb-4">
                        <Link href="/" className="text-gray-500 hover:text-primary flex items-center justify-center space-x-1 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Quay lại trang chủ</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
