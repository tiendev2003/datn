'use client';

import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import PageTitle from '@/components/PageTitle';
import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import {
  RiAddLine,
  RiCloseLine,
  RiEditLine,
  RiFileUserLine,
  RiFilterLine,
  RiRefreshLine,
  RiSearchLine,
  RiUserFollowLine,
  RiUserLine,
  RiUserUnfollowLine,
  RiVipDiamondLine
} from 'react-icons/ri';

export default function CustomerManagement() {
  // Customer interface
  interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    membership: string;
    membershipStatus: string;
    expiryDate: string;
    joinDate: string;
    ptSessions: number;
    totalSpent: string;
    balance?: number;
    paymentStatus?: string;
    visits?: number;
    lastVisit?: string;
  }

  // Sample data for customers
  const [allCustomers, setAllCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Trần Văn Nam",
      email: "tranvannam@example.com",
      phone: "0921234567",
      membership: "Gói Premium",
      membershipStatus: "active",
      expiryDate: "15/08/2025",
      joinDate: "15/02/2023",
      ptSessions: 12,
      totalSpent: "15,600,000₫",
      balance: 0,
      paymentStatus: "paid",
      visits: 45,
      lastVisit: "19/05/2025"
    },
    {
      id: 2,
      name: "Nguyễn Thị Hương",
      email: "nguyenthihuong@example.com",
      phone: "0921234568",
      membership: "Gói Standard",
      membershipStatus: "active",
      expiryDate: "22/09/2025",
      joinDate: "22/03/2023",
      ptSessions: 0,
      totalSpent: "5,400,000₫",
      balance: 0,
      paymentStatus: "paid",
      visits: 28,
      lastVisit: "18/05/2025"
    },
    {
      id: 3,
      name: "Lê Minh Tuấn",
      email: "leminhtuan@example.com",
      phone: "0921234569",
      membership: "Gói PT Basic",
      membershipStatus: "active",
      expiryDate: "N/A",
      joinDate: "10/04/2023",
      ptSessions: 8,
      totalSpent: "2,800,000₫",
      balance: 500000,
      paymentStatus: "overdue",
      visits: 12,
      lastVisit: "10/05/2025"
    },
    {
      id: 4,
      name: "Phạm Thanh Hà",
      email: "phamthanhha@example.com",
      phone: "0921234570",
      membership: "Gói Premium",
      membershipStatus: "expired",
      expiryDate: "05/04/2025",
      joinDate: "05/10/2023",
      ptSessions: 20,
      totalSpent: "20,400,000₫",
      balance: 0,
      paymentStatus: "paid",
      visits: 5,
      lastVisit: "20/03/2025"
    },
    {
      id: 5,
      name: "Hoàng Văn Bình",
      email: "hoangvanbinh@example.com",
      phone: "0921234571",
      membership: "Gói Yoga",
      membershipStatus: "active",
      expiryDate: "20/11/2025",
      joinDate: "20/05/2024",
      ptSessions: 0,
      totalSpent: "6,120,000₫",
      balance: 300000,
      paymentStatus: "pending",
      visits: 30,
      lastVisit: "19/05/2025"
    }
  ]);

  // Component states
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [membershipType, setMembershipType] = useState('all');
  const [status, setStatus] = useState('all');
  const [joinDate, setJoinDate] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  // Filter and pagination logic
  useEffect(() => {
    let filteredData = [...allCustomers];

    // Apply membership filter
    if (membershipType !== 'all') {
      filteredData = filteredData.filter(customer =>
        customer.membership.toLowerCase().includes(membershipType.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filteredData = filteredData.filter(customer => customer.membershipStatus === status);
    }
    
    // Apply join date filter
    if (joinDate !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      if (joinDate === 'last-month') {
        filterDate.setMonth(now.getMonth() - 1);
      } else if (joinDate === 'last-quarter') {
        filterDate.setMonth(now.getMonth() - 3);
      } else if (joinDate === 'last-year') {
        filterDate.setFullYear(now.getFullYear() - 1);
      }
      
      filteredData = filteredData.filter(customer => {
        const parts = customer.joinDate.split('/');
        const customerJoinDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        return customerJoinDate >= filterDate;
      });
    }

    // Apply payment status filter if available
    if (paymentStatus !== 'all' && paymentStatus) {
      filteredData = filteredData.filter(customer => 
        customer.paymentStatus === paymentStatus
      );
    }

    // Apply search term
    if (searchTerm) {
      filteredData = filteredData.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCustomers(filteredData);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [allCustomers, membershipType, status, joinDate, paymentStatus, searchTerm]);

  // Calculate statistics
  const totalCustomers = allCustomers.length;
  const activeCustomers = allCustomers.filter(c => c.membershipStatus === 'active').length;
  const totalPtSessions = allCustomers.reduce((sum, customer) => sum + customer.ptSessions, 0);
  const totalSpent = "50,320,000₫"; // In a real app, calculate this properly

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(i);
  }

  // Handle actions
  const handleAddCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const newId = Math.max(...allCustomers.map(c => c.id), 0) + 1;
    const customerWithId = { ...newCustomer, id: newId } as Customer;
    setAllCustomers([...allCustomers, customerWithId]);
    setIsAddModalOpen(false);
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    setAllCustomers(
      allCustomers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setIsEditModalOpen(false);
  };

  const handleToggleStatus = (id: number) => {
    setAllCustomers(
      allCustomers.map(customer =>
        customer.id === id ? 
          { 
            ...customer, 
            membershipStatus: customer.membershipStatus === 'active' ? 'expired' : 'active' 
          } : customer
      )
    );
  };

  const handleDeleteCustomer = () => {
    if (currentCustomer) {
      setAllCustomers(allCustomers.filter(customer => customer.id !== currentCustomer.id));
      setIsDeleteModalOpen(false);
      setCurrentCustomer(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      <PageTitle title="Quản lý khách hàng" />
      <button 
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition flex items-center gap-1"
        onClick={() => setIsAddModalOpen(true)}
      >
        <RiAddLine size={18} /> <span>Thêm khách hàng</span>
      </button>
    </div>      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">Tổng số khách hàng</p>
          <p className="text-2xl font-bold">{totalCustomers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">Gói tập đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">Buổi PT đã đặt</p>
          <p className="text-2xl font-bold text-blue-600">{totalPtSessions}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-purple-600">{totalSpent}</p>
        </div>
      </div>{/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer flex items-center">
          <div className="bg-blue-500 bg-opacity-10 p-3 rounded-full">
            <RiVipDiamondLine size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Gia hạn gói tập</h3>
            <p className="text-sm text-gray-600">Quản lý gói tập và gia hạn cho khách hàng</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer flex items-center">
          <div className="bg-green-500 bg-opacity-10 p-3 rounded-full">
            <RiUserLine size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Quản lý buổi PT</h3>
            <p className="text-sm text-gray-600">Đặt lịch và quản lý buổi PT cho khách hàng</p>
          </div>
        </div>
      </div>      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="membership-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Loại gói tập
          </label>
          <div className="relative">
            <select
              id="membership-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="standard">Gói Standard</option>
              <option value="premium">Gói Premium</option>
              <option value="pt">Gói PT</option>
              <option value="yoga">Gói Yoga</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <div className='relative'>
            <select
              id="status-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="expired">Hết hạn</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="join-date-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Thời gian tham gia
          </label>
          <div className='relative'>
            <select
              id="join-date-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="last-month">Tháng trước</option>
              <option value="last-quarter">Quý trước</option>
              <option value="last-year">Năm trước</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="payment-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Thanh toán
          </label>
          <div className='relative'>
            <select
              id="payment-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="paid">Đã thanh toán</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="overdue">Quá hạn</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Tìm theo tên, email, số điện thoại..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <RiSearchLine className="text-gray-400" />
            </div>
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm('')}
              >
                <RiCloseLine className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>      {/* Customer List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Họ và tên</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email/SĐT</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Gói tập</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ngày hết hạn</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Buổi PT</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Chi tiêu</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thanh toán</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{customer.name}</td>
                  <td className="px-6 py-4">
                    <div>{customer.email}</div>
                    <div className="text-gray-500 text-sm">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{customer.membership}</div>
                    <div>
                      {customer.membershipStatus === "active" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Đang hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Hết hạn
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.expiryDate}</td>
                  <td className="px-6 py-4">{customer.ptSessions}</td>
                  <td className="px-6 py-4 font-medium">{customer.totalSpent}</td>
                  <td className="px-6 py-4">
                    {customer.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Đã thanh toán
                      </span>
                    ) : customer.paymentStatus === "pending" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Chờ thanh toán
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Quá hạn
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentCustomer(customer);
                            setIsProfileModalOpen(true);
                          }}
                        >
                          <RiFileUserLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Chi tiết
                        </span>
                      </div>

                      <div className="relative group">
                        <button className="text-green-600 hover:text-green-800 p-1.5 rounded-full hover:bg-green-100 transition-colors">
                          <RiRefreshLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Gia hạn
                        </span>
                      </div>

                      <div className="relative group">
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentCustomer(customer);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <RiEditLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Chỉnh sửa
                        </span>
                      </div>

                      {customer.membershipStatus === "active" ? (
                        <div className="relative group">
                          <button
                            className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100 transition-colors"
                            onClick={() => handleToggleStatus(customer.id)}
                          >
                            <RiUserUnfollowLine size={18} />
                          </button>
                          <span className="absolute hidden group-hover:block -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                            Vô hiệu
                          </span>
                        </div>
                      ) : (
                        <div className="relative group">
                          <button
                            className="text-green-600 hover:text-green-800 p-1.5 rounded-full hover:bg-green-100 transition-colors"
                            onClick={() => handleToggleStatus(customer.id)}
                          >
                            <RiUserFollowLine size={18} />
                          </button>
                          <span className="absolute hidden group-hover:block -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                            Kích hoạt
                          </span>
                        </div>
                      )}

                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setCurrentCustomer(customer);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Xóa
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  Không tìm thấy khách hàng nào phù hợp với tiêu chí tìm kiếm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-sm gap-4">
        <div className="text-sm text-gray-700">
          {customers.length > 0 ? (
            <>
              Hiển thị <span className="font-medium">{indexOfFirstCustomer + 1}</span> đến{" "}
              <span className="font-medium">
                {Math.min(indexOfLastCustomer, customers.length)}
              </span>{" "}
              của <span className="font-medium">{customers.length}</span> khách hàng
            </>
          ) : (
            <>
              <span className="font-medium">0</span> khách hàng được hiển thị
            </>
          )}
        </div>
        {totalPages > 0 && (
          <div className="flex items-center space-x-1">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {paginationItems.map(number => (
              <button
                key={number}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentPage === number
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Customer Form Modal - Add/Edit */}
      {(isAddModalOpen || (isEditModalOpen && currentCustomer)) && (
        <Dialog 
          open={isAddModalOpen || isEditModalOpen} 
          onClose={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)} 
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white shadow-xl">
              <div className="flex justify-between items-center p-6 border-b">
                <Dialog.Title as="h3" className="text-xl font-semibold">
                  {isAddModalOpen ? "Thêm khách hàng mới" : "Chỉnh sửa thông tin khách hàng"}
                </Dialog.Title>
                <button
                  onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  
                  if (isAddModalOpen) {
                    const newCustomer = {
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      phone: formData.get('phone') as string,
                      membership: formData.get('membership') as string,
                      membershipStatus: 'active',
                      expiryDate: "31/12/2025",
                      ptSessions: 0,
                      paymentStatus: 'paid',
                      balance: 0,
                      joinDate: new Date().toLocaleDateString('vi-VN'),
                      totalSpent: "0₫",
                      visits: 0,
                      lastVisit: 'N/A'
                    };
                    handleAddCustomer(newCustomer);
                  } else if (currentCustomer) {
                    const updatedCustomer = {
                      ...currentCustomer,
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      phone: formData.get('phone') as string,
                      membership: formData.get('membership') as string,
                      membershipStatus: formData.get('membershipStatus') as string,
                      expiryDate: formData.get('expiryDate') as string,
                      ptSessions: parseInt(formData.get('ptSessions') as string, 10),
                      paymentStatus: formData.get('paymentStatus') as string,
                      balance: parseInt(formData.get('balance') as string, 10)
                    };
                    handleEditCustomer(updatedCustomer);
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={currentCustomer?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={currentCustomer?.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={currentCustomer?.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gói tập
                    </label>
                    <select
                      name="membership"
                      defaultValue={currentCustomer?.membership || "Gói Standard"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="Gói Standard">Gói Standard</option>
                      <option value="Gói Premium">Gói Premium</option>
                      <option value="Gói PT Basic">Gói PT Basic</option>
                      <option value="Gói Yoga">Gói Yoga</option>
                    </select>
                  </div>

                  {!isAddModalOpen && currentCustomer && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Trạng thái
                        </label>
                        <select
                          name="membershipStatus"
                          defaultValue={currentCustomer.membershipStatus}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="active">Đang hoạt động</option>
                          <option value="expired">Hết hạn</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ngày hết hạn
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          defaultValue={currentCustomer.expiryDate}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số buổi PT
                        </label>
                        <input
                          type="number"
                          name="ptSessions"
                          defaultValue={currentCustomer.ptSessions}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Trạng thái thanh toán
                        </label>
                        <select
                          name="paymentStatus"
                          defaultValue={currentCustomer.paymentStatus}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="paid">Đã thanh toán</option>
                          <option value="pending">Chờ thanh toán</option>
                          <option value="overdue">Quá hạn</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số tiền còn nợ (VNĐ)
                        </label>
                        <input
                          type="number"
                          name="balance"
                          defaultValue={currentCustomer.balance}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="pt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Customer Profile Modal */}
      {isProfileModalOpen && currentCustomer && (
        <Dialog open={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title as="h3" className="text-xl font-semibold">
                  Thông tin khách hàng
                </Dialog.Title>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <RiUserFollowLine size={64} className="text-gray-400" />
                    </div>
                  </div>

                  <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800">{currentCustomer.name}</h2>
                    <p className="text-gray-600 italic mb-4">{currentCustomer.membership}</p>

                    <div className="space-y-3">
                      <p><span className="font-medium">Email:</span> {currentCustomer.email}</p>
                      <p><span className="font-medium">Số điện thoại:</span> {currentCustomer.phone}</p>
                      <p><span className="font-medium">Ngày tham gia:</span> {currentCustomer.joinDate}</p>
                      <p><span className="font-medium">Hết hạn:</span> {currentCustomer.expiryDate}</p>
                      <p><span className="font-medium">Số buổi PT còn lại:</span> {currentCustomer.ptSessions}</p>
                      <p><span className="font-medium">Lượt ghé thăm:</span> {currentCustomer.visits || 0}</p>
                      <p><span className="font-medium">Lần cuối ghé thăm:</span> {currentCustomer.lastVisit || 'N/A'}</p>
                      <p><span className="font-medium">Tổng chi tiêu:</span> {currentCustomer.totalSpent}</p>
                      
                      <p>
                        <span className="font-medium">Trạng thái gói tập:</span>{' '}
                        {currentCustomer.membershipStatus === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Hết hạn
                          </span>
                        )}
                      </p>

                      <p>
                        <span className="font-medium">Trạng thái thanh toán:</span>{' '}
                        {currentCustomer.paymentStatus === 'paid' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Đã thanh toán
                          </span>
                        ) : currentCustomer.paymentStatus === 'pending' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Chờ thanh toán
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Quá hạn
                          </span>
                        )}
                      </p>

                      {(currentCustomer.balance && currentCustomer.balance > 0) && (
                        <p className="text-red-600">
                          <span className="font-medium">Số tiền còn nợ:</span> {currentCustomer.balance.toLocaleString('vi-VN')} ₫
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t mt-6 pt-6">
                  <h3 className="text-lg font-semibold mb-2">Lịch sử hoạt động</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Buổi tập đã tham gia</p>
                      <p className="text-xl font-bold">{currentCustomer.visits || 0}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Buổi PT đã sử dụng</p>
                      <p className="text-xl font-bold">{Math.max(0, 20 - (currentCustomer.ptSessions || 0))}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Tổng chi tiêu</p>
                      <p className="text-xl font-bold">{currentCustomer.totalSpent}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 mr-2"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setCurrentCustomer(currentCustomer);
                    setIsEditModalOpen(true);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Chỉnh sửa
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentCustomer && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteCustomer}
          title="Xóa khách hàng"
          message={`Bạn có chắc chắn muốn xóa khách hàng ${currentCustomer.name}? Thao tác này không thể hoàn tác.`}
        />
      )}
    </div>
  );
}
