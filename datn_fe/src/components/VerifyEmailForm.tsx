'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setError('Link xác thực không hợp lệ hoặc đã hết hạn.');
                setIsVerifying(false);
                return;
            }

            try {
                // Simulate API call to verify email
                setTimeout(() => {
                    console.log('Verifying email with token:', token);
                    setIsVerifying(false);
                    setIsSuccess(true);
                }, 2000);
            } catch (err) {
                setError('Không thể xác thực email. Vui lòng thử lại sau.');
                setIsVerifying(false);
            }
        };

        verifyEmail();
    }, [token]);

    const redirectToLogin = () => {
        router.push('/login');
    };

    const resendVerification = () => {
        // Simulate API call to resend verification
        setError('');
        setIsVerifying(true);
        
        setTimeout(() => {
            console.log('Resending verification email to:', email);
            setIsVerifying(false);
            setError('Email xác thực mới đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
        }, 1500);
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
                <h2 className="font-bold text-xl">XÁC THỰC EMAIL</h2>
            </div>

            {/* Left side - Image and logo */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <Image 
                    src="/images/gym-background-2.jpg" 
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
                        <p className="text-white/80 text-center mt-2">Xác thực tài khoản của bạn</p>
                    </div>
                </div>
            </div>
            
            {/* Right side - Verification status */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start items-center bg-white px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
                {/* Website Name in Top Left Corner */}
                <div className="self-start mb-6">
                    <Link href="/" className="text-xl font-bold text-primary">
                        GYM<span className="text-secondary">MASTER</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Xác Thực Email</h1>
                        <p className="text-gray-600">{isVerifying ? 'Đang xác thực email của bạn...' : isSuccess ? 'Email đã được xác thực thành công!' : 'Xác thực không thành công'}</p>
                    </div>
                    
                    <div className="p-6 text-center">
                        {isVerifying ? (
                            <div className="flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang xác thực email</h2>
                                <p className="text-gray-600">
                                    Vui lòng đợi trong khi chúng tôi xác thực email của bạn...
                                </p>
                            </div>
                        ) : isSuccess ? (
                            <>
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-green-100 p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực thành công!</h2>
                                <p className="text-gray-600 mb-6">
                                    Email của bạn đã được xác thực thành công. Bạn có thể đăng nhập vào tài khoản của mình ngay bây giờ.
                                </p>
                                <button 
                                    onClick={redirectToLogin}
                                    className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold w-full"
                                >
                                    Đăng nhập ngay
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-red-100 p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực không thành công</h2>
                                <p className="text-gray-600 mb-6">
                                    {error || 'Link xác thực không hợp lệ hoặc đã hết hạn.'}
                                </p>
                                {email && (
                                    <button 
                                        onClick={resendVerification}
                                        className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold w-full mb-4"
                                    >
                                        Gửi lại email xác thực
                                    </button>
                                )}
                                <Link href="/login">
                                    <button className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold w-full">
                                        Quay lại đăng nhập
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                    
                    <div className="mt-6 text-center pb-4 border-t border-gray-100 pt-4">
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
