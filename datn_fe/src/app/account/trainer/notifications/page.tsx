'use client';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    RiBookmarkLine,
    RiCalendarLine,
    RiCheckLine,
    RiDeleteBinLine,
    RiErrorWarningLine,
    RiNotification2Line,
    RiTimeLine,
    RiUserLine
} from 'react-icons/ri';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function TrainerNotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread' | 'booking' | 'payment' | 'system' | 'pt_session' | 'client' | 'availability'>('all');
  
  // Filter notifications based on trainer role and selected filter
  const filteredNotifications = notifications.filter(n => {
    // Only show notifications relevant for trainers
    if (user?.role !== 'trainer') return false;
    
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.category === filter;
  });

  // Format the notification date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${minutes} phút trước`;
    } else if (diffInHours < 24) {  
      return `${Math.floor(diffInHours)} giờ trước`;
    } else {
      return date.toLocaleDateString('vi-VN', { 
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <RiCalendarLine className="h-5 w-5" />;
      case 'payment':
        return <RiBookmarkLine className="h-5 w-5" />;
      case 'system':
        return <RiErrorWarningLine className="h-5 w-5" />;
      case 'client':
        return <RiUserLine className="h-5 w-5" />;
      default:
        return <RiNotification2Line className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle
        title="Thông báo"
        description="Quản lý tất cả thông báo của bạn"
      />
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar mb-4 md:mb-0">
            <button
              onClick={() => setFilter('all')}
              className={`tab-button ${filter === 'all' ? 'tab-active' : ''}`}
            >
              Tất cả {notifications.length > 0 && `(${notifications.length})`}
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`tab-button ${filter === 'unread' ? 'tab-active' : ''}`}
            >
              Chưa đọc {unreadCount > 0 && `(${unreadCount})`}
            </button>
            
            {/* Trainer-specific filters */}
            <button
              onClick={() => setFilter('pt_session')}
              className={`tab-button ${filter === 'pt_session' ? 'tab-active' : ''}`}
            >
              Buổi tập PT
            </button>
            <button
              onClick={() => setFilter('client')}
              className={`tab-button ${filter === 'client' ? 'tab-active' : ''}`}
            >
              Khách hàng
            </button>
            <button
              onClick={() => setFilter('payment')}
              className={`tab-button ${filter === 'payment' ? 'tab-active' : ''}`}
            >
              Thu nhập
            </button>
            <button
              onClick={() => setFilter('availability')}
              className={`tab-button ${filter === 'availability' ? 'tab-active' : ''}`}
            >
              Lịch làm việc
            </button>
            <button
              onClick={() => setFilter('system')}
              className={`tab-button ${filter === 'system' ? 'tab-active' : ''}`}
            >
              Hệ thống
            </button>
          </div>
          
          {unreadCount > 0 && (
            <button
              className="text-primary hover:text-primary-dark font-medium flex items-center"
              onClick={markAllAsRead}
            >
              <RiCheckLine className="w-5 h-5 mr-1" />
              Đánh dấu tất cả là đã đọc
            </button>
          )}
        </div>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={item}
                className={`bg-white rounded-xl border ${!notification.isRead ? 'border-primary/50 shadow-sm' : 'border-gray-200'} overflow-hidden`}
              >
                <div className={`p-4 ${!notification.isRead ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full flex-shrink-0 mr-4 ${
                      notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      notification.type === 'error' ? 'bg-red-100 text-red-600' :
                      notification.type === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getIcon(notification.category || notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      {notification.title && (
                        <h3 className={`${!notification.isRead ? 'font-semibold' : 'font-medium'} text-gray-900 mb-1`}>
                          {notification.title}
                        </h3>
                      )}
                      <p className={`${!notification.isRead ? 'font-medium' : ''} text-gray-800`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <RiTimeLine className="text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {formatDate(notification.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 ml-4">
                      {!notification.isRead && (
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => markAsRead(notification.id)}
                          title="Đánh dấu đã đọc"
                        >
                          <RiCheckLine className="w-5 h-5 text-primary" />
                        </button>
                      )}
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={() => deleteNotification(notification.id)}
                        title="Xóa thông báo"
                      >
                        <RiDeleteBinLine className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 text-gray-400 mb-4">
              <RiNotification2Line className="w-8 h-8" />
            </div>
            <h3 className="text-gray-700 font-medium">Không có thông báo nào</h3>
            <p className="text-gray-500 text-sm mt-1">
              {filter === 'all' 
                ? 'Bạn sẽ nhận được thông báo khi có thông tin quan trọng'
                : filter === 'unread'
                  ? 'Không có thông báo nào chưa đọc'
                  : filter === 'pt_session'
                    ? 'Không có thông báo nào về buổi tập PT'
                    : filter === 'client'
                      ? 'Không có thông báo nào về khách hàng'
                      : filter === 'payment'
                        ? 'Không có thông báo nào về thu nhập'
                        : filter === 'availability'
                          ? 'Không có thông báo nào về lịch làm việc'
                          : 'Không có thông báo nào về hệ thống'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
