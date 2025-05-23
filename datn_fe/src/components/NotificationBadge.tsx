'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiNotification2Line } from 'react-icons/ri';

interface NotificationBadgeProps {
  className?: string;
}

type Notification = {
  id: string;
  type: 'booking' | 'packageExpiry' | 'announcement' | 'system';
  title: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export default function NotificationBadge({ className }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  // Demo notifications - will be replaced with actual API calls
  useEffect(() => {
    const checkNotifications = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/notifications/unread');
        // const data = await response.json();
        // setUnreadCount(data.count);

        // For demo purposes:
        setUnreadCount(prev => {
          const newCount = Math.min(prev + Math.floor(Math.random() * 2), 99);
          if (newCount > prev) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);
          }
          return newCount;
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Initial check
    checkNotifications();

    // Set up polling interval
    const intervalId = setInterval(checkNotifications, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    router.push('/account/notifications');
  };

  return (
    <button 
      className={`relative p-2 rounded-full transition-colors duration-200 ${className || ''}`}
      onClick={handleClick}
      title="Thông báo của bạn"
      aria-label={`Thông báo của bạn ${unreadCount} thông báo chưa đọc`}
    >
      <RiNotification2Line 
        size={24} 
        className={`transition-transform ${isAnimating ? 'animate-bounce' : ''}`}
      />
      {unreadCount > 0 && (
        <span 
          className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs font-medium rounded-full h-5 min-w-[1.25rem] flex items-center justify-center px-1 ${
            isAnimating ? 'animate-pulse' : ''
          }`}
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
}
