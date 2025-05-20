'use client';

import { useAuth } from '@/context/AuthContext';
import { isValidEmail } from '@/utils/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login, user, isAuthenticated, redirectToDashboard } = useAuth();
    
    // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng họ đến trang dashboard
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log('Already authenticated, redirecting...');
            
            // Kiểm tra cookies và localStorage để đảm bảo token được lưu ở cả hai nơi
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('authToken');
                if (token) {
                    document.cookie = `authToken=${token}; path=/; max-age=${60*60*24*7}; SameSite=Lax`;
                }
            }
            
            // Chuyển hướng người dùng dựa vào vai trò
            setTimeout(() => {
                if (user.role === 'admin') {
                    router.push('/account/admin/dashboard');
                } else if (user.role === 'trainer') {
                    router.push('/account/trainer/dashboard');
                } else {
                    router.push('/account/dashboard');
                }
            }, 100);
        }
    }, [isAuthenticated, user, router]);

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

        // Validate email format
        if (!isValidEmail(formData.email)) {
            setError('Địa chỉ email không hợp lệ.');
            setIsLoading(false);
            return;
        }

        try {
            await login(formData.email, formData.password);
            
            // If remember me is checked, we could store additional data
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            console.log('Login successful, redirecting...');
            // Use the redirectToDashboard function from the auth context
            // Add a small delay to ensure authentication state is updated
            setTimeout(() => {
                redirectToDashboard(); 
            }, 100);
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async (role: 'user' | 'trainer' | 'admin') => {
        setIsLoading(true);
        setError('');
        
        // Demo account credentials
        let email, password;
        switch(role) {
            case 'admin':
                email = 'admin@example.com';
                password = 'adminpass';
                break;
            case 'trainer':
                email = 'trainer@example.com';
                password = 'trainerpass';
                break;
            default:
                email = 'user@example.com';
                password = 'userpass';
        }
        
        // Set form data to show the credentials in the form
        setFormData({ email, password });
        
        try {
            await login(email, password);
            console.log(`Demo login as ${role} successful, redirecting...`);
            
            // Small delay to ensure auth state is updated
            setTimeout(() => {
                redirectToDashboard();
            }, 100);
        } catch (err: any) {
            console.error('Demo login error:', err);
            setError(`Demo đăng nhập thất bại: ${err.message || 'Vui lòng kiểm tra lại thông tin.'}`);
            setIsLoading(false);
        }
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
                <h2 className="font-bold text-xl">ĐĂNG NHẬP</h2>
            </div>

            {/* Left side - Image and logo */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <Image 
                    src="/images/login-background.svg" 
                    alt="Login Background" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                        <Image 
                            src="/images/login-logo.svg" 
                            alt="Login Logo" 
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
            <div className="w-full lg:w-1/2 flex flex-col justify-start items-center bg-white px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
                {/* Website Name in Top Left Corner */}
                <div className="self-start mb-6">
                    <Link href="/" className="text-xl font-bold text-primary">
                        GYM<span className="text-secondary">MASTER</span>
                    </Link>
                </div>
                
                <div className="w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Đăng Nhập</h1>
                        <p className="text-gray-600">Chào mừng trở lại! Đăng nhập để tiếp tục</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email <span className="text-red-500">*</span>
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

                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Mật khẩu <span className="text-red-500">*</span>
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

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
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
                            className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold text-lg flex items-center justify-center shadow-lg mt-6"
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
                                'ĐĂNG NHẬP'
                            )}
                        </button>
                    </form>

                    {/* Demo Accounts Section */}
                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <h3 className="text-center text-gray-700 font-medium mb-4">Đăng nhập nhanh với tài khoản demo</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('user')}
                                disabled={isLoading}
                                className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-300 text-sm font-medium shadow-md"
                            >
                                Demo User
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('trainer')}
                                disabled={isLoading}
                                className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition duration-300 text-sm font-medium shadow-md"
                            >
                                Demo Trainer
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('admin')}
                                disabled={isLoading}
                                className="bg-purple-500 text-white py-2 px-3 rounded-lg hover:bg-purple-600 transition duration-300 text-sm font-medium shadow-md"
                            >
                                Demo Admin
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Nhấn vào nút để đăng nhập nhanh với vai trò tương ứng
                        </p>
                    </div>

                    <div className="text-center mt-6 py-4 border-t border-gray-100">
                        <p className="text-gray-600">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" className="text-primary font-semibold hover:text-primary-dark">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 text-center pb-2">
                        <div className="flex justify-center space-x-4 text-sm mb-4">
                            <Link href="/terms" className="text-gray-500 hover:text-primary">
                                Điều khoản sử dụng
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/privacy" className="text-gray-500 hover:text-primary">
                                Chính sách bảo mật
                            </Link>
                        </div>
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
