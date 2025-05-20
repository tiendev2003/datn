'use client';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiCalendarEventLine, RiGroupLine, RiMoneyDollarCircleLine, RiStarLine, RiUserLine } from 'react-icons/ri';

interface ClientSession {
  id: number;
  clientName: string;
  clientAvatar: string;
  time: string;
  date: string;
  duration: string;
  sessionType: string;
  status: 'scheduled' | 'completed' | 'canceled';
}

interface PTStatistic {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  change?: number;
}

interface ClientRequest {
  id: number;
  clientName: string;
  clientAvatar: string;
  sessionType: string;
  requestDate: string;
  message: string;
}

interface Rating {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
  hasReplied: boolean;
}

export default function TrainerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for PT dashboard
  const [upcomingSessions, setUpcomingSessions] = useState<ClientSession[]>([
    {
      id: 1,
      clientName: 'Trần Văn B',
      clientAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '09:00 - 10:30',
      date: '17/05/2025',
      duration: '90 phút',
      sessionType: 'Tập luyện cường độ cao',
      status: 'scheduled'
    },
    {
      id: 2,
      clientName: 'Lê Thị C',
      clientAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '14:00 - 15:00',
      date: '17/05/2025',
      duration: '60 phút',
      sessionType: 'Tập phục hồi chức năng',
      status: 'scheduled'
    },
    {
      id: 3,
      clientName: 'Phạm Văn D',
      clientAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      time: '16:30 - 18:00',
      date: '17/05/2025',
      duration: '90 phút',
      sessionType: 'Tăng cơ giảm mỡ',
      status: 'scheduled'
    }
  ]);
  
  const [ptStatistics, setPTStatistics] = useState<PTStatistic[]>([
    {
      label: 'Tổng số khách hàng',
      value: 24,
      icon: <RiGroupLine size={24} className="text-blue-500" />,
      trend: 'up',
      change: 8.5
    },
    {
      label: 'Buổi tập hoàn thành',
      value: 187,
      icon: <RiCalendarEventLine size={24} className="text-green-500" />,
      trend: 'up',
      change: 12.3
    },
    {
      label: 'Đánh giá trung bình',
      value: '4.8',
      icon: <RiStarLine size={24} className="text-yellow-500" />,
      trend: 'up',
      change: 0.2
    },
    {
      label: 'Thu nhập tháng này',
      value: '12.800.000đ',
      icon: <RiMoneyDollarCircleLine size={24} className="text-purple-500" />,
      trend: 'up',
      change: 15.7
    }
  ]);
  
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([
    {
      id: 1,
      clientName: 'Nguyễn Thị X',
      clientAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      sessionType: 'Tập luyện cá nhân',
      requestDate: '16/05/2025',
      message: 'Tôi muốn đặt lịch tập luyện vào thứ 2 tuần sau, bạn có thể sắp xếp được không?'
    },
    {
      id: 2,
      clientName: 'Trần Văn Y',
      clientAvatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      sessionType: 'Tư vấn chế độ ăn',
      requestDate: '15/05/2025',
      message: 'Tôi cần được tư vấn về chế độ ăn phù hợp cho mục tiêu tăng cơ.'
    }
  ]);
  
  const [recentRatings, setRecentRatings] = useState<Rating[]>([
    {
      id: '1',
      userName: 'Nguyễn Văn Z',
      userAvatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      rating: 5,
      comment: 'HLV rất chuyên nghiệp và tận tình. Tôi đã đạt được kết quả tốt sau 1 tháng tập luyện.',
      createdAt: new Date('2025-05-14'),
      hasReplied: false
    },
    {
      id: '2',
      userName: 'Lê Thị M',
      userAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4,
      comment: 'HLV có phương pháp giảng dạy rất dễ hiểu. Tuy nhiên, tôi mong muốn có thêm các bài tập đa dạng hơn.',
      createdAt: new Date('2025-05-12'),
      hasReplied: true
    }
  ]);  useEffect(() => {
    // First check if authentication has finished loading
    if (!isLoading) {
      // Then check if user is authenticated and has the correct role
      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        router.push('/login');
      } else if (user?.role !== 'trainer') {
        console.log('User is not a trainer, redirecting to login');
        router.push('/login');
      }
    }
  }, [isAuthenticated, router, isLoading, user]);
  
  // Separate effect just to handle the loading state
  useEffect(() => {
    // Set loading to false after a short delay to ensure auth is checked
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <PageTitle title="Bảng điều khiển huấn luyện viên" />
      
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ptStatistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
              {stat.trend && (
                <div 
                  className={`text-xs px-2 py-1 rounded-full flex items-center ${
                    stat.trend === 'up' ? 'bg-green-50 text-green-600' : 
                    stat.trend === 'down' ? 'bg-red-50 text-red-600' : 
                    'bg-gray-50 text-gray-600'
                  }`}
                >
                  {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : ''}
                  {stat.change && ` ${stat.change}%`}
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Today's Sessions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Buổi tập hôm nay</h2>
          <Link href="/account/trainer/schedule" className="text-primary hover:underline text-sm">
            Xem lịch đầy đủ
          </Link>
        </div>
        
        {upcomingSessions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                    <Image
                      src={session.clientAvatar}
                      alt={session.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{session.clientName}</h3>
                    <p className="text-sm text-gray-600">{session.sessionType}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">{session.time}</p>
                  <p className="text-sm text-gray-600">{session.duration}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Không có buổi tập nào được lên lịch hôm nay.</p>
        )}
      </motion.div>
      
      {/* Recent Ratings and Client Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Đánh giá gần đây</h2>
            <Link href="/account/trainer/ratings" className="text-primary hover:underline text-sm">
              Xem tất cả
            </Link>
          </div>
          
          {recentRatings.length > 0 ? (
            <div className="space-y-4">
              {recentRatings.map((rating) => (
                <div key={rating.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                        <Image
                          src={rating.userAvatar}
                          alt={rating.userName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{rating.userName}</span>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <RiStarLine
                          key={i}
                          className={`${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{rating.comment}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 text-xs">
                      {new Date(rating.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    {!rating.hasReplied && (
                      <Link href={`/account/trainer/ratings/${rating.id}`} className="text-primary text-xs hover:underline">
                        Trả lời
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Chưa có đánh giá nào.</p>
          )}
        </motion.div>
        
        {/* Client Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Yêu cầu từ học viên</h2>
            <Link href="/account/trainer/requests" className="text-primary hover:underline text-sm">
              Xem tất cả
            </Link>
          </div>
          
          {clientRequests.length > 0 ? (
            <div className="space-y-4">
              {clientRequests.map((request) => (
                <div key={request.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={request.clientAvatar}
                        alt={request.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{request.clientName}</h3>
                      <p className="text-xs text-gray-500">{request.requestDate} • {request.sessionType}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{request.message}</p>
                  <div className="flex justify-end space-x-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Từ chối
                    </button>
                    <button className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                      Chấp nhận
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Không có yêu cầu nào từ học viên.</p>
          )}
        </motion.div>
      </div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link href="/account/trainer/schedule/create" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <RiCalendarEventLine size={24} className="text-primary mb-2" />
            <span className="text-sm text-center">Tạo lịch mới</span>
          </Link>
          <Link href="/account/trainer/clients" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <RiUserLine size={24} className="text-primary mb-2" />
            <span className="text-sm text-center">Quản lý học viên</span>
          </Link>
          <Link href="/account/trainer/income" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <RiMoneyDollarCircleLine size={24} className="text-primary mb-2" />
            <span className="text-sm text-center">Thu nhập</span>
          </Link>
          <Link href="/account/settings" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <RiStarLine size={24} className="text-primary mb-2" />
            <span className="text-sm text-center">Hồ sơ PT</span>
          </Link>
          <Link href="/account/trainer/availability" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <RiCalendarEventLine size={24} className="text-primary mb-2" />
            <span className="text-sm text-center">Đặt lịch rảnh</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
