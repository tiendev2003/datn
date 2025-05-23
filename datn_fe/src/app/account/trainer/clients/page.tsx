'use client';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiAddLine, RiCalendarLine, RiFileChartLine, RiFilterLine, RiSearchLine } from 'react-icons/ri';

interface Client {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  upcomingSessions: number;
  completedSessions: number;
  goals: string[];
  lastSession?: string;
}

export default function ManageClients() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5; // Số học viên trên mỗi trang
  
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Trần Văn B',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      email: 'tranvanb@example.com',
      phone: '0912345678',
      joinDate: '01/03/2025',
      status: 'active',
      upcomingSessions: 3,
      completedSessions: 7,
      goals: ['Tăng cơ', 'Giảm mỡ bụng'],
      lastSession: '15/05/2025'
    },
    {
      id: '2',
      name: 'Lê Thị C',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      email: 'lethic@example.com',
      phone: '0923456789',
      joinDate: '15/04/2025',
      status: 'active',
      upcomingSessions: 2,
      completedSessions: 4,
      goals: ['Tăng sức bền', 'Giảm cân'],
      lastSession: '14/05/2025'
    },
    {
      id: '3',
      name: 'Phạm Văn D',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      email: 'phamvand@example.com',
      phone: '0934567890',
      joinDate: '10/05/2025',
      status: 'pending',
      upcomingSessions: 1,
      completedSessions: 0,
      goals: ['Tăng cân', 'Phát triển cơ bắp']
    },
    {
      id: '4',
      name: 'Nguyễn Thị X',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      email: 'nguyenthix@example.com',
      phone: '0945678901',
      joinDate: '25/02/2025',
      status: 'inactive',
      upcomingSessions: 0,
      completedSessions: 12,
      goals: ['Phục hồi chức năng', 'Tăng độ linh hoạt'],
      lastSession: '01/04/2025'
    },
    {
      id: '5',
      name: 'Trần Văn Y',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      email: 'tranvany@example.com',
      phone: '0956789012',
      joinDate: '05/04/2025',
      status: 'active',
      upcomingSessions: 2,
      completedSessions: 6,
      goals: ['Tăng cơ', 'Tăng sức mạnh'],
      lastSession: '12/05/2025'
    }
  ]);

  useEffect(() => {
    // Reset về trang 1 khi thay đổi bộ lọc hoặc tìm kiếm
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    // Redirect if not authenticated or not a trainer
    if (!isLoading && (!isAuthenticated || user?.role !== 'trainer')) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isLoading, user]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        client.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Tính toán phân trang
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Quản lý học viên" />
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm học viên..."
              className="pl-10 pr-4 py-2 w-full  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive' | 'pending')}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="pending">Chờ xác nhận</option>
              </select>
              <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
            </div>
            
            <Link
              href="/account/trainer/clients/add"
              className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <RiAddLine className="mr-1" />
              <span>Thêm học viên</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Client List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">Danh sách học viên ({filteredClients.length})</h2>
        </div>
        
        {currentClients.length > 0 ? (
          <>
            <div className="divide-y divide-gray-100">
              {currentClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 hover:bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={client.avatar}
                          alt={client.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/account/trainer/clients/${client.id}`} className="font-medium text-lg hover:text-primary">
                          {client.name}
                        </Link>
                        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 text-sm text-gray-500">
                          <span>{client.email}</span>
                          <span className="hidden xs:inline-block">•</span>
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(client.status)}`}>
                        {client.status === 'active' ? 'Hoạt động' : 
                         client.status === 'inactive' ? 'Không hoạt động' : 'Chờ xác nhận'}
                      </span>
                      <div className="flex space-x-4">
                        <Link 
                          href={`/account/trainer/clients/${client.id}/progress`}
                          className="flex items-center text-gray-500 hover:text-primary text-sm"
                        >
                          <RiFileChartLine className="mr-1" />
                          <span>Tiến độ</span>
                        </Link>
                        <Link 
                          href={`/account/trainer/clients/${client.id}/schedule`}
                          className="flex items-center text-gray-500 hover:text-primary text-sm"
                        >
                          <RiCalendarLine className="mr-1" />
                          <span>Lịch tập</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="px-3 py-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-500">Buổi đã hoàn thành:</span>
                      <span className="font-medium ml-2">{client.completedSessions}</span>
                    </div>
                    <div className="px-3 py-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-500">Buổi sắp tới:</span>
                      <span className="font-medium ml-2">{client.upcomingSessions}</span>
                    </div>
                    <div className="px-3 py-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-500">Buổi tập gần nhất:</span>
                      <span className="font-medium ml-2">{client.lastSession || 'Chưa có'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Mục tiêu:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {client.goals.map((goal, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Hiển thị {indexOfFirstClient + 1} đến {Math.min(indexOfLastClient, filteredClients.length)} của {filteredClients.length} học viên
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentPage === i + 1
                          ? "bg-primary text-white"
                          : "border text-gray-700 hover:bg-gray-100"
                      } transition-colors`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">Không tìm thấy học viên nào phù hợp với tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
}
