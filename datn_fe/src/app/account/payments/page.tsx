'use client';

import PageTitle from '@/components/PageTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';
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

// Define the Payment interface for type safety
interface Payment {
  id: string;
  date: string;
  amount: number;
  type: string;
  packageName: string;
  status: string;
  paymentMethod: string;
  cardNumber?: string;
  bankAccount?: string;
}

export default function PaymentsPage() {
  // Mock data - replace with API call later
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-001",
      date: "01/05/2025",
      amount: 1500000,
      type: "Membership",
      packageName: "Gói tập Platinum",
      status: "completed",
      paymentMethod: "Credit Card",
      cardNumber: "**** **** **** 1234",
    },
    {
      id: "PAY-002",
      date: "01/04/2025",
      amount: 1200000,
      type: "Membership",
      packageName: "Gói tập Gold",
      status: "completed",
      paymentMethod: "Banking",
      bankAccount: "Techcombank",
    },
    {
      id: "PAY-003",
      date: "01/03/2025",
      amount: 900000,
      type: "Membership",
      packageName: "Gói tập Silver",
      status: "completed",
      paymentMethod: "Cash",
    },
    {
      id: "PAY-004",
      date: "15/02/2025",
      amount: 2400000,
      type: "Personal Training",
      packageName: "Gói PT 12 buổi",
      status: "completed",
      paymentMethod: "Credit Card",
      cardNumber: "**** **** **** 1234",
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState({
    dates: '',
    types: '',
    status: '',
  });
  
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);

  // Filter payments based on active tab
  const filteredPayments = payments.filter(payment => {
    if (activeTab === 'all') return true;
    return payment.type.toLowerCase() === activeTab;
  });

  // Toggle expand payment details
  const toggleExpandPayment = (id: string) => {
    if (expandedPayment === id) {
      setExpandedPayment(null);
    } else {
      setExpandedPayment(id);
    }
  };  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <PageTitle 
          title="Lịch sử thanh toán"
          description="Xem và quản lý các khoản thanh toán của bạn"
        />
        <div className="mt-4 md:mt-0">
          <Link 
            href="/account/payments/new"
            className="btn btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Thanh toán mới
          </Link>
        </div>
      </div>
      
      {/* Tabs & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar mb-4 md:mb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-button ${activeTab === 'all' ? 'tab-active' : ''}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('membership')}
              className={`tab-button ${activeTab === 'membership' ? 'tab-active' : ''}`}
            >
              Gói tập
            </button>
            <button
              onClick={() => setActiveTab('personal training')}
              className={`tab-button ${activeTab === 'personal training' ? 'tab-active' : ''}`}
            >
              Buổi PT
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select 
                className="form-select"
                value={filter.dates}
                onChange={(e) => setFilter({...filter, dates: e.target.value})}
              >
                <option value="">Tất cả thời gian</option>
                <option value="month">Tháng này</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm nay</option>
              </select>
            </div>
            <div className="relative">
              <select 
                className="form-select"
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="completed">Đã thanh toán</option>
                <option value="pending">Đang xử lý</option>
                <option value="failed">Thất bại</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment History */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <motion.div 
                key={payment.id}
                variants={item}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleExpandPayment(payment.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full flex-shrink-0 
                        ${payment.type === 'Membership' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}
                      >
                        {payment.type === 'Membership' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{payment.packageName}</h3>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-2
                            ${payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {payment.status === 'completed' ? 'Đã thanh toán' :
                              payment.status === 'pending' ? 'Đang xử lý' : 'Thất bại'
                            }
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{payment.date}</span>
                          <span className="mx-2">•</span>
                          <span>Mã: {payment.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <p className="text-lg font-bold text-gray-900">{payment.amount.toLocaleString('vi-VN')} VND</p>
                      <p className="text-sm text-gray-600">{payment.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                
                {expandedPayment === payment.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Chi tiết thanh toán</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loại gói</span>
                            <span className="font-medium text-gray-900">{payment.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gói dịch vụ</span>
                            <span className="font-medium text-gray-900">{payment.packageName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ngày thanh toán</span>
                            <span className="font-medium text-gray-900">{payment.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mã thanh toán</span>
                            <span className="font-medium text-gray-900">{payment.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Phương thức thanh toán</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hình thức</span>
                            <span className="font-medium text-gray-900">{payment.paymentMethod}</span>
                          </div>
                          {payment.cardNumber && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Thẻ</span>
                              <span className="font-medium text-gray-900">{payment.cardNumber}</span>
                            </div>
                          )}
                          {payment.bankAccount && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ngân hàng</span>
                              <span className="font-medium text-gray-900">{payment.bankAccount}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tổng cộng</span>
                            <span className="font-medium text-gray-900">{payment.amount.toLocaleString('vi-VN')} VND</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-3">
                      <button className="btn btn-sm btn-outline">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        Xem hóa đơn
                      </button>
                      <button className="btn btn-sm btn-outline">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Tải xuống
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 text-gray-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-gray-700 font-medium">Không có thanh toán nào</h3>
              <p className="text-gray-500 text-sm mt-1">Bạn chưa có khoản thanh toán nào trong thời gian này</p>
              <Link
                href="/account/payments/new"
                className="btn btn-primary mt-4"
              >
                Thanh toán mới
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
