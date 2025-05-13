"use client";

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface DashboardHeaderProps {
  user: { email: string; name: string } | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  user, 
  sidebarOpen, 
  toggleSidebar,
  handleLogout,
  title
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  // Đảm bảo component đã được mount để tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mẫu danh sách thông báo
  const notifications = [
    { id: 1, text: 'Có một tài liệu mới được tải lên', time: '5 phút trước', read: false },
    { id: 2, text: 'Có một bình luận mới trên tài liệu của bạn', time: '1 giờ trước', read: false },
    { id: 3, text: 'Bạn đã được thêm vào nhóm "Dự án DATN"', time: '3 giờ trước', read: true },
    { id: 4, text: 'Tài liệu của bạn đã được phê duyệt', time: '1 ngày trước', read: true },
  ];

  // Toggle thông báo function
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Toggle theme function
  const toggleDarkMode = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Nếu component chưa được mount, hiển thị skeleton hoặc placeholder để tránh hydration mismatch
  if (!mounted) {
    return (
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
        {/* Placeholder content */}
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <button
            type="button"
            onClick={toggleSidebar}
            className="px-4 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 cursor-pointer"
          >
            <span className="sr-only">{sidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              )}
            </svg>
          </button>
          <div className="ml-4 md:ml-0">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
          >
            <span className="sr-only">{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            {resolvedTheme === 'dark' ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notification button */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleNotifications}
              className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
            >
              <span className="sr-only">Xem thông báo</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Hiển thị số thông báo chưa đọc */}
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            {/* Dropdown thông báo */}
            {showNotifications && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Thông báo</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 flex items-start hover:bg-gray-50 dark:hover:bg-gray-600 ${!notification.read ? 'bg-blue-50 dark:bg-gray-600' : ''} cursor-pointer`}
                        >
                          <div className="flex-shrink-0">
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                          <div className="ml-3 w-full">
                            <p className="text-sm text-gray-900 dark:text-gray-200">{notification.text}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">Không có thông báo mới</p>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600 text-center">
                      <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer">
                        Đánh dấu tất cả đã đọc
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="hidden md:block ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{user?.name || "Admin"}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                <span className="sr-only">Đăng xuất</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;