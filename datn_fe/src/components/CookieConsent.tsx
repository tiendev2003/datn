'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Check if user has already consented to cookies
        const hasConsented = localStorage.getItem('cookieConsent');
        
        if (!hasConsented) {
            // Show banner after a slight delay to not interrupt initial page load experience
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, []);
    
    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };
    
    if (!isVisible) return null;
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm md:text-base">
                    <p>
                        Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn. Bằng cách tiếp tục sử dụng trang web này, 
                        bạn đồng ý với việc sử dụng cookie theo{' '}
                        <Link href="/privacy" className="text-primary underline hover:text-primary-dark">
                            Chính sách bảo mật
                        </Link>{' '}
                        của chúng tôi.
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <Link 
                        href="/privacy" 
                        className="text-sm underline hover:text-primary"
                    >
                        Tìm hiểu thêm
                    </Link>
                    <button 
                        onClick={acceptCookies} 
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors duration-300"
                    >
                        Chấp nhận
                    </button>
                </div>
            </div>
        </div>
    );
}
