'use client';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    RiArrowDownSLine,
    RiArrowUpSLine,
    RiCalendarEventLine,
    RiDownloadLine,
    RiFilterLine,
    RiMoneyDollarCircleLine,
} from 'react-icons/ri';

interface Transaction {
  id: string;
  clientName: string;
  date: string;
  amount: number;
  sessionType: string;
  status: 'completed' | 'pending' | 'canceled';
  paymentMethod: string;
}

interface IncomeStats {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  sessionsCompleted: number;
  commissionsRate: number;
}

export default function TrainerIncome() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [periodFilter, setPeriodFilter] = useState<'all' | 'month' | 'week'>('month');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  
  // Mock data for income statistics
  const [incomeStats, setIncomeStats] = useState<IncomeStats>({
    daily: 1200000,
    weekly: 5500000,
    monthly: 23500000,
    yearly: 230000000,
    sessionsCompleted: 32,
    commissionsRate: 70, // 70%
  });
  
  // Mock data for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      clientName: 'Trần Văn B',
      date: '15/05/2025',
      amount: 800000,
      sessionType: 'Tập cường độ cao',
      status: 'completed',
      paymentMethod: 'Tiền mặt'
    },
    {
      id: '2',
      clientName: 'Lê Thị C',
      date: '14/05/2025',
      amount: 600000,
      sessionType: 'Tập phục hồi chức năng',
      status: 'completed',
      paymentMethod: 'Chuyển khoản'
    },
    {
      id: '3',
      clientName: 'Phạm Văn D',
      date: '13/05/2025',
      amount: 800000,
      sessionType: 'Tăng cơ giảm mỡ',
      status: 'completed',
      paymentMethod: 'Tiền mặt'
    },
    {
      id: '4',
      clientName: 'Nguyễn Thị X',
      date: '12/05/2025',
      amount: 900000,
      sessionType: 'Yoga cá nhân',
      status: 'completed',
      paymentMethod: 'Chuyển khoản'
    },
    {
      id: '5',
      clientName: 'Trần Văn Y',
      date: '11/05/2025',
      amount: 800000,
      sessionType: 'Tập tăng cơ',
      status: 'completed',
      paymentMethod: 'Tiền mặt'
    },
    {
      id: '6',
      clientName: 'Trần Thị H',
      date: '30/04/2025',
      amount: 700000,
      sessionType: 'Tập cardio',
      status: 'completed',
      paymentMethod: 'Chuyển khoản'
    },
    {
      id: '7',
      clientName: 'Nguyễn Văn M',
      date: '28/04/2025',
      amount: 800000,
      sessionType: 'Tập cường độ cao',
      status: 'completed',
      paymentMethod: 'Tiền mặt'
    }
  ]);

  useEffect(() => {
    // Redirect if not authenticated or not a trainer
    if (!isLoading && (!isAuthenticated || user?.role !== 'trainer')) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isLoading, user]);
  
  // Filter transactions based on period
  const filteredTransactions = transactions.filter(transaction => {
    if (periodFilter === 'all') return true;
    
    const today = new Date();
    const transactionDate = new Date(
      transaction.date.split('/')[2] + '-' + 
      transaction.date.split('/')[1] + '-' + 
      transaction.date.split('/')[0]
    );
    
    if (periodFilter === 'week') {
      // Get start of week (Monday)
      const startOfWeek = new Date(today);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);
      
      return transactionDate >= startOfWeek;
    }
    
    if (periodFilter === 'month') {
      // Start of current month
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return transactionDate >= startOfMonth;
    }
    
    return true;
  });
  
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(
        a.date.split('/')[2] + '-' + 
        a.date.split('/')[1] + '-' + 
        a.date.split('/')[0]
      ).getTime();
      const dateB = new Date(
        b.date.split('/')[2] + '-' + 
        b.date.split('/')[1] + '-' + 
        b.date.split('/')[0]
      ).getTime();
      
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });
  
  // Calculate total income for filtered transactions
  const totalFilteredIncome = filteredTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', '') + 'đ';
  };
  
  const handleSortChange = (column: 'date' | 'amount') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  // Generate monthly income data for chart (just mock data)
  const monthlyIncomeData = [
    { month: 'T1', income: 18000000 },
    { month: 'T2', income: 20000000 },
    { month: 'T3', income: 19000000 },
    { month: 'T4', income: 22000000 },
    { month: 'T5', income: 23500000 },
    { month: 'T6', income: 0 },
    { month: 'T7', income: 0 },
    { month: 'T8', income: 0 },
    { month: 'T9', income: 0 },
    { month: 'T10', income: 0 },
    { month: 'T11', income: 0 },
    { month: 'T12', income: 0 }
  ];
  
  // Find max income for chart scaling
  const maxIncome = Math.max(...monthlyIncomeData.map(item => item.income));

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Quản lý thu nhập" />
      
      {/* Income Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="bg-white rounded-lg p-5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="p-2 rounded-lg bg-blue-50">
              <RiMoneyDollarCircleLine size={24} className="text-blue-500" />
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Hôm nay</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{formatCurrency(incomeStats.daily)}</h3>
          <p className="text-gray-600 text-sm">Thu nhập hôm nay</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg p-5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="p-2 rounded-lg bg-green-50">
              <RiMoneyDollarCircleLine size={24} className="text-green-500" />
            </div>
            <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Tuần này</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{formatCurrency(incomeStats.weekly)}</h3>
          <p className="text-gray-600 text-sm">Thu nhập tuần này</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg p-5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="p-2 rounded-lg bg-purple-50">
              <RiMoneyDollarCircleLine size={24} className="text-purple-500" />
            </div>
            <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">Tháng này</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{formatCurrency(incomeStats.monthly)}</h3>
          <p className="text-gray-600 text-sm">Thu nhập tháng này</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg p-5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="p-2 rounded-lg bg-yellow-50">
              <RiCalendarEventLine size={24} className="text-yellow-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mt-2">{incomeStats.sessionsCompleted}</h3>
          <p className="text-gray-600 text-sm">Buổi tập đã hoàn thành</p>
        </motion.div>
      </div>
      
      {/* Monthly Income Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold mb-4">Thu nhập theo tháng trong năm 2025</h2>
        
        <div className="h-64 mt-4">
          <div className="flex items-end h-48 space-x-6">
            {monthlyIncomeData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full">
                  <div
                    className={`w-full bg-primary hover:bg-primary-dark transition-all duration-300 rounded-t-sm ${
                      item.income === 0 ? 'h-0' : ''
                    }`}
                    style={{ 
                      height: item.income ? `${(item.income / maxIncome) * 100}%` : '0%',
                    }}
                  />
                  {item.income > 0 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      {formatCurrency(item.income).split('₫')[0]}
                    </div>
                  )}
                </div>
                <div className="text-xs mt-2 text-gray-600">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <div>* Thu nhập đã bao gồm hoa hồng {incomeStats.commissionsRate}%</div>
          <div>Năm 2025</div>
        </div>
      </motion.div>
      
      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-lg font-bold">Lịch sử giao dịch</h2>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value as 'all' | 'month' | 'week')}
                >
                  <option value="all">Tất cả</option>
                  <option value="month">Tháng này</option>
                  <option value="week">Tuần này</option>
                </select>
                <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
              </div>
              
              <button 
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                <RiDownloadLine className="mr-1" />
                <span>Xuất Excel</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">Tổng cộng: {formatCurrency(totalFilteredIncome)}</p>
            <p className="text-gray-600">Hiển thị {sortedTransactions.length} kết quả</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-gray-500 font-medium">Học viên</th>
                <th 
                  className="px-6 py-3 text-gray-500 font-medium cursor-pointer" 
                  onClick={() => handleSortChange('date')}
                >
                  <div className="flex items-center">
                    Ngày
                    {sortBy === 'date' && (
                      sortOrder === 'asc' ? <RiArrowUpSLine className="ml-1" /> : <RiArrowDownSLine className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-gray-500 font-medium">Loại buổi tập</th>
                <th 
                  className="px-6 py-3 text-gray-500 font-medium cursor-pointer" 
                  onClick={() => handleSortChange('amount')}
                >
                  <div className="flex items-center">
                    Số tiền
                    {sortBy === 'amount' && (
                      sortOrder === 'asc' ? <RiArrowUpSLine className="ml-1" /> : <RiArrowDownSLine className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-gray-500 font-medium">Phương thức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{transaction.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.sessionType}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedTransactions.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">Không có dữ liệu giao dịch nào trong khoảng thời gian đã chọn.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
