'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function OtpVerification() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null, null, null]);
    
    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return;
        
        const timer = setTimeout(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [timeLeft]);
    
    // Format remaining time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    // Handle OTP input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        
        if (value.length > 1) {
            // If pasting multiple digits, distribute them across inputs
            const values = value.split('').slice(0, 6);
            const newOtp = [...otp];
            
            values.forEach((val, idx) => {
                if (idx + index < 6) {
                    newOtp[idx + index] = val;
                }
            });
            
            setOtp(newOtp);
            
            // Focus on the next empty input or the last one
            const nextIndex = Math.min(index + values.length, 5);
            inputRefs.current[nextIndex]?.focus();
        } else {
            // Handle single digit input
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            // Auto-focus next input after filling current one
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };
    
    // Handle backspace key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move to previous input when backspace is pressed on empty input
            inputRefs.current[index - 1]?.focus();
        }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const otpValue = otp.join('');
        
        if (otpValue.length !== 6) {
            setError('Vui lòng nhập đầy đủ 6 chữ số mã OTP.');
            setIsLoading(false);
            return;
        }
        
        try {
            // Simulate API call to verify OTP
            setTimeout(() => {
                console.log('Verifying OTP:', otpValue);
                // Successful verification
                router.push('/');
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Mã OTP không đúng. Vui lòng kiểm tra lại.');
            setIsLoading(false);
        }
    };
    
    const resendOtp = () => {
        setTimeLeft(60);
        setOtp(['', '', '', '', '', '']);
        setError('');
        
        // Simulate resending OTP
        console.log('Resending OTP');
        // Here you would call your API to resend the OTP
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
                <h2 className="font-bold text-xl">XÁC THỰC OTP</h2>
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
                        <p className="text-white/80 text-center mt-2">Xác thực tài khoản của bạn</p>
                    </div>
                </div>
            </div>

            {/* Right side - OTP verification form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start items-center bg-white px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
                {/* Website Name in Top Left Corner */}
                <div className="self-start mb-6">
                    <Link href="/" className="text-xl font-bold text-primary">
                        GYM<span className="text-secondary">MASTER</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Xác Thực OTP</h1>
                        <p className="text-gray-600">Nhập mã OTP đã được gửi đến số điện thoại của bạn</p>
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
                        <div className="text-center mb-4">
                            <p className="text-gray-700 mb-2">Nhập mã 6 chữ số</p>
                            <div className="flex justify-center space-x-2 sm:space-x-4">
                                {[0, 1, 2, 3, 4, 5].map((index) => (                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                            return undefined;
                                        }}
                                        type="text"
                                        maxLength={1}
                                        value={otp[index]}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        autoComplete="one-time-code"
                                        required
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-500 mb-2">Không nhận được mã?</p>
                            {timeLeft > 0 ? (
                                <p className="text-gray-500">Gửi lại sau {formatTime(timeLeft)}</p>
                            ) : (
                                <button 
                                    type="button" 
                                    onClick={resendOtp}
                                    className="text-primary hover:text-primary-dark font-semibold"
                                >
                                    Gửi lại mã OTP
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || otp.join('').length !== 6}
                            className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold text-lg flex items-center justify-center shadow-lg mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xác thực...
                                </>
                            ) : (
                                'XÁC THỰC'
                            )}
                        </button>
                    </form>                    <div className="mt-6 text-center pb-2 border-t border-gray-100 pt-4">
                        <div className="flex justify-center space-x-4 text-sm mb-4">
                            <Link href="/terms" className="text-gray-500 hover:text-primary">
                                Điều khoản sử dụng
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/privacy" className="text-gray-500 hover:text-primary">
                                Chính sách bảo mật
                            </Link>
                        </div>
                        <Link href="/login" className="text-gray-500 hover:text-primary flex items-center justify-center space-x-1 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Quay lại đăng nhập</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
