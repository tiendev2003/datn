'use client';

import { useMessage } from '@/context/MessageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiMessage2Line } from 'react-icons/ri';

interface MessageNotificationBadgeProps {
  className?: string;
}

export default function MessageNotificationBadge({ className }: MessageNotificationBadgeProps) {
  const { totalUnreadCount } = useMessage();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate the badge when unread count changes
  useEffect(() => {
    if (totalUnreadCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalUnreadCount]);

  const handleClick = () => {
    router.push('/account/messages');
  };

  return (
    <button 
      className={`relative p-2 rounded-full transition-transform hover:bg-gray-100 ${className || ''}`}
      onClick={handleClick}
      title="Tin nhắn của bạn"
      aria-label={`Tin nhắn của bạn, ${totalUnreadCount} tin chưa đọc`}
    >
      <RiMessage2Line size={24} className="text-gray-700" />
      
      {totalUnreadCount > 0 && (
        <span 
          className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1 ${
            isAnimating ? 'animate-pulse scale-110' : ''
          }`}
        >
          {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
        </span>
      )}
    </button>
  );
}
