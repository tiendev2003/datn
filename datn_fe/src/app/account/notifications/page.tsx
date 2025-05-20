'use client';

import PageTitle from '@/components/PageTitle';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

export default function NotificationsPage() {
  // Mock data - replace with API call later
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Lịch tập của bạn với PT Nguyễn Văn An đã được xác nhận vào ngày 15/05/2025.",
      date: "Hôm nay, 14:30",
      type: "info",
      isRead: false
    },
    {
      id: 2,
      message: "Gói tập của bạn sẽ hết hạn trong 5 ngày. Vui lòng gia hạn để tiếp tục tập luyện.",
      date: "Hôm nay, 09:15",
      type: "warning",
      isRead: false
    },
    {
      id: 3,
      message: "Buổi tập 'Yoga Flow' đã được thêm vào lịch của bạn.",
      date: "Hôm qua, 18:20",
      type: "info",
      isRead: true
    },
    {
      id: 4,
      message: "Thanh toán cho gói tập Gold đã thành công.",
      date: "14/05/2025, 10:45",
      type: "success",
      isRead: true
    },
    {
      id: 5,
      message: "Buổi tập với PT Trần Thị Bình đã bị hủy. Vui lòng đặt lịch lại.",
      date: "13/05/2025, 16:30",
      type: "warning",
      isRead: true
    },
    {
      id: 6,
      message: "Chương trình khuyến mãi giảm 20% cho gói Platinum trong tháng 5.",
      date: "10/05/2025, 08:15",
      type: "info",
      isRead: true
    },
    {
      id: 7,
      message: "Đánh giá của bạn đã được ghi nhận. Cảm ơn bạn đã góp ý!",
      date: "08/05/2025, 14:50",
      type: "success",
      isRead: true
    },
    {
      id: 8,
      message: "Cập nhật lịch tập: Lớp học Zumba vào thứ 7 sẽ bắt đầu lúc 9:00 thay vì 8:30.",
      date: "05/05/2025, 11:20",
      type: "info",
      isRead: true
    },
    {
      id: 9,
      message: "Chúc mừng! Bạn đã hoàn thành 10 buổi tập liên tiếp.",
      date: "01/05/2025, 19:45",
      type: "success",
      isRead: true
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  
  // Filter notifications
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
      ? notifications.filter(n => !n.isRead)
      : notifications.filter(n => n.type === filter);
  
  // Mark a notification as read
interface Notification {
    id: number;
    message: string;
    date: string;
    type: 'info' | 'warning' | 'success';
    isRead: boolean;
}

const markAsRead = (id: number): void => {
    setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
    ));
};
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };
  
  // Delete a notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;
  return (
    <div>
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
            <button
              onClick={() => setFilter('info')}
              className={`tab-button ${filter === 'info' ? 'tab-active' : ''}`}
            >
              Thông tin
            </button>
            <button
              onClick={() => setFilter('success')}
              className={`tab-button ${filter === 'success' ? 'tab-active' : ''}`}
            >
              Thành công
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`tab-button ${filter === 'warning' ? 'tab-active' : ''}`}
            >
              Cảnh báo
            </button>
          </div>
          
          {unreadCount > 0 && (
            <button
              className="text-primary hover:text-primary-dark font-medium flex items-center"
              onClick={markAllAsRead}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
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
                      'bg-green-100 text-green-600'
                    }`}>
                      {notification.type === 'info' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )}
                      {notification.type === 'warning' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                      )}
                      {notification.type === 'success' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`${!notification.isRead ? 'font-medium' : ''} text-gray-900`}>
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.date}
                      </p>
                    </div>
                    
                    <div className="flex space-x-1 ml-4">
                      {!notification.isRead && (
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => markAsRead(notification.id)}
                          title="Đánh dấu đã đọc"
                        >
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </button>
                      )}
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={() => deleteNotification(notification.id)}
                        title="Xóa thông báo"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
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
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <h3 className="text-gray-700 font-medium">Không có thông báo nào</h3>
            <p className="text-gray-500 text-sm mt-1">Bạn sẽ nhận được thông báo khi có thông tin quan trọng</p>
          </div>
        )}
      </motion.div>
      
      <div className="mt-6 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="px-3 py-2 border border-primary bg-primary text-sm font-medium text-white hover:bg-primary-dark">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}
