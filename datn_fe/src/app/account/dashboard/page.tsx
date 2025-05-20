'use client';

import DashboardMessages from '@/components/DashboardMessages';
import MessageSearch from '@/components/MessageSearch';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface WorkoutProgram {
  id: number;
  name: string;
  day: string;
  type: string;
  time: string;
  trainer: string;
  imageUrl?: string;
}

interface Notification {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success';
}

interface ProgressData {
  label: string;
  current: number;
  previous: number;
  unit: string;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMessageSearch, setShowMessageSearch] = useState(false);

  // Mock data for dashboard
  const [membershipData, setMembershipData] = useState({
    packageName: 'Gói Thành Viên Cao Cấp',
    startDate: '01/05/2025',
    endDate: '01/06/2025',
    daysRemaining: 30,
    totalDays: 31,
    ptPackage: 'Gói PT 10 Buổi',
    ptRemaining: 7
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'Buổi tập với HLV Nguyễn Văn A vào ngày mai lúc 9:00',
      date: '15/05/2025',
      isRead: false,
      type: 'info'
    },
    {
      id: 2,
      message: 'Gói tập của bạn sẽ hết hạn trong 30 ngày',
      date: '15/05/2025',
      isRead: false,
      type: 'warning'
    },
    {
      id: 3,
      message: 'Thanh toán gói tập thành công',
      date: '01/05/2025',
      isRead: true,
      type: 'success'
    }
  ]);

  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutProgram[]>([
    {
      id: 1,
      name: 'Tập Ngực & Vai',
      day: 'Thứ Hai',
      type: 'Cá nhân với HLV',
      time: '9:00 - 10:30',
      trainer: 'Nguyễn Văn A',
      imageUrl: '/images/workout-chest.jpg'
    },
    {
      id: 2,
      name: 'Tập Lưng & Tay',
      day: 'Thứ Tư',
      type: 'Cá nhân với HLV',
      time: '9:00 - 10:30',
      trainer: 'Nguyễn Văn A',
      imageUrl: '/images/workout-back.jpg'
    },
    {
      id: 3,
      name: 'Tập Chân',
      day: 'Thứ Sáu',
      type: 'Cá nhân với HLV',
      time: '9:00 - 10:30',
      trainer: 'Nguyễn Văn A',
      imageUrl: '/images/workout-legs.jpg'
    }
  ]);

  const [progressData, setProgressData] = useState<ProgressData[]>([
    {
      label: 'Cân nặng',
      current: 75,
      previous: 78,
      unit: 'kg',
      change: -3.85, // percentage decrease
      trend: 'down'
    },
    {
      label: 'Mỡ cơ thể',
      current: 18,
      previous: 20,
      unit: '%',
      change: -10, // percentage decrease
      trend: 'down'
    },
    {
      label: 'Khối lượng cơ',
      current: 32,
      previous: 30,
      unit: 'kg',
      change: 6.67, // percentage increase
      trend: 'up'
    },
    {
      label: 'Squat PR',
      current: 120,
      previous: 110,
      unit: 'kg',
      change: 9.09, // percentage increase
      trend: 'up'
    }
  ]);

  useEffect(() => {
    // Check if user is authenticated, otherwise redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  const markNotificationAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }  return (
    <div className="min-h-screen">
      <PageTitle 
        title="Dashboard" 
        description="Manage your gym activities and track your fitness journey"
      />
      
      {/* Hero section with greeting & stats */}
      <div className="relative bg-gradient-to-r from-primary to-secondary overflow-hidden rounded-xl mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
          >
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Chào mừng trở lại, {user?.fullName}
              </h1>
              <p className="text-white/80">
                {new Date().toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/account/schedule"
                className="btn btn-glass"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Lịch tập
              </Link>
              <Link
                href="/account/membership"
                className="btn btn-white"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
                Gói tập của tôi
              </Link>
            </div>
          </motion.div>

          {/* Quick stats bar */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            <motion.div variants={item} className="stat-card">
              <div className="text-white/70 text-sm">Buổi tập đã hoàn thành</div>
              <div className="text-2xl font-bold text-white mt-2">12</div>
              <div className="text-white/70 text-xs mt-1">Tháng này</div>
            </motion.div>
            <motion.div variants={item} className="stat-card">
              <div className="text-white/70 text-sm">Thời gian tập luyện</div>
              <div className="text-2xl font-bold text-white mt-2">18 giờ</div>
              <div className="text-white/70 text-xs mt-1">Tháng này</div>
            </motion.div>
            <motion.div variants={item} className="stat-card">
              <div className="text-white/70 text-sm">Calories đã đốt</div>
              <div className="text-2xl font-bold text-white mt-2">8,540</div>
              <div className="text-white/70 text-xs mt-1">Tháng này</div>
            </motion.div>
            <motion.div variants={item} className="stat-card">
              <div className="text-white/70 text-sm">Ngày tập liên tiếp</div>
              <div className="text-2xl font-bold text-white mt-2">4</div>
              <div className="text-white/70 text-xs mt-1">
                <span className="inline-flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  Cao nhất: 8 ngày
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-20">
        <div className="container">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`tab-button ${activeTab === 'overview' ? 'tab-active' : ''}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`tab-button ${activeTab === 'schedule' ? 'tab-active' : ''}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Lịch tập
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`tab-button ${activeTab === 'progress' ? 'tab-active' : ''}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Tiến độ
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`tab-button ${activeTab === 'notifications' ? 'tab-active' : ''}`}
            >
              <div className="relative">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </div>
              Thông báo
            </button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {/* Membership info */}
              <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Thông tin hội viên</h3>
                  <Link href="/account/membership" className="text-sm text-primary hover:text-primary-dark">
                    Chi tiết
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Gói hiện tại</p>
                    <p className="font-medium">{membershipData.packageName}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                      <p>{membershipData.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày kết thúc</p>
                      <p>{membershipData.endDate}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">Ngày còn lại</p>
                      <p className="text-sm font-medium">{membershipData.daysRemaining}/{membershipData.totalDays}</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{width: `${(membershipData.daysRemaining / membershipData.totalDays) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  {membershipData.ptPackage && (
                    <div>
                      <p className="text-sm text-gray-500">Gói PT</p>
                      <div className="flex justify-between">
                        <p>{membershipData.ptPackage}</p>
                        <p className="font-semibold">{membershipData.ptRemaining} buổi</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Recent messages */}
              <motion.div variants={fadeInUp}>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Tin nhắn gần đây</h3>                    <button 
                      onClick={() => setShowMessageSearch(true)} 
                      className="text-sm text-red-600 font-medium flex items-center hover:text-red-700 transition-colors"
                    >
                      <RiSearchLine className="mr-1" /> Tìm kiếm tin nhắn
                    </button>
                  </div>
                  <DashboardMessages maxMessages={3} showHeader={false} className="mt-2" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="mt-2">
            <h2 className="text-xl font-bold mb-6">Lịch tập của bạn</h2>
            {/* Calendar view would go here */}
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600">Chưa phát triển chức năng này</p>
              <p className="text-gray-500 text-sm mt-2">Tính năng xem lịch tập chi tiết sẽ sớm được cập nhật</p>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="mt-2">
            <h2 className="text-xl font-bold mb-6">Tiến độ của bạn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {progressData.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{item.label}</h3>
                    <div className="text-sm text-gray-500">
                      {item.previous !== 0 && (
                        <span className={`flex items-center ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.change > 0 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"}></path>
                          </svg>
                          {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.unit}</span>
                      <span className="text-sm text-gray-500">Tháng trước: {item.previous} {item.unit}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{width: `${(item.current / (item.previous !== 0 ? item.previous : 1)) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Thông báo của bạn</h2>
              {notifications.filter(n => !n.isRead).length > 0 && (
                <button className="text-sm text-primary font-medium hover:text-primary-dark">
                  Đánh dấu tất cả là đã đọc
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full flex-shrink-0 ${notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                        } mr-4`}
                      >
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
                        <p className={`${!notification.isRead ? 'font-medium' : ''}`}>{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
                      </div>
                      {!notification.isRead && (
                        <button
                          className="text-primary hover:text-primary-dark"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 text-gray-400 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  </div>
                  <h3 className="text-gray-700 font-medium">Không có thông báo nào</h3>
                  <p className="text-gray-500 text-sm mt-1">Bạn sẽ nhận được thông báo khi có thông tin quan trọng</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Message Search Modal */}
      {showMessageSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tìm kiếm tin nhắn</h3>
              <button
                onClick={() => setShowMessageSearch(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <MessageSearch />

            <div className="mt-4">
              <button
                onClick={() => setShowMessageSearch(false)}
                className="btn btn-primary w-full"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
