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

export default function MembershipPage() {
  // Mock data - replace with API call later
  const [membershipData, setMembershipData] = useState({
    id: "mem-001",
    packageName: "Gói tập Platinum",
    startDate: "01/05/2025",
    endDate: "01/06/2025",
    daysRemaining: 16,
    totalDays: 31,
    status: "active",
    price: 1500000,
    features: ["Sử dụng tất cả thiết bị", "Tham gia tất cả lớp học", "Phòng tắm sang trọng", "Tủ đồ cá nhân"],
    ptPackage: "Gói PT 12 buổi",
    ptRemaining: 8,
    ptSessionsHistory: [
      { id: 1, date: "02/05/2025", trainer: "Nguyễn Văn An", status: "completed" },
      { id: 2, date: "04/05/2025", trainer: "Nguyễn Văn An", status: "completed" },
      { id: 3, date: "06/05/2025", trainer: "Nguyễn Văn An", status: "completed" },
      { id: 4, date: "09/05/2025", trainer: "Trần Thị Bình", status: "completed" },
    ]
  });

  const [previousMemberships, setPreviousMemberships] = useState([
    {
      id: "mem-002",
      packageName: "Gói tập Gold",
      startDate: "01/04/2025",
      endDate: "30/04/2025",
      status: "expired",
      price: 1200000
    },
    {
      id: "mem-003",
      packageName: "Gói tập Silver",
      startDate: "01/03/2025",
      endDate: "31/03/2025",
      status: "expired",
      price: 900000
    }
  ]);

  const [activeTab, setActiveTab] = useState('details');

  // Calculate the membership progress percentage
  const daysUsed = membershipData.totalDays - membershipData.daysRemaining;
  const progressPercentage = (daysUsed / membershipData.totalDays) * 100;
  return (
    <div>
      <PageTitle 
        title="Thông tin gói tập"
        description="Quản lý thông tin gói tập và theo dõi tiến độ sử dụng"
      />

      {/* Tab Navigation */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg mb-6">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-5 py-4 font-medium text-sm flex items-center border-b-2 ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Chi tiết gói tập
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-4 font-medium text-sm flex items-center border-b-2 ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Lịch sử gói tập
          </button>
          <button
            onClick={() => setActiveTab('pt')}
            className={`px-5 py-4 font-medium text-sm flex items-center border-b-2 ${activeTab === 'pt' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Buổi tập với PT
          </button>
        </div>
      </div>

      {activeTab === 'details' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          <motion.div variants={item} className="col-span-1 md:col-span-8">
            <div className="card">
              <h2 className="card-title">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
                Thông tin gói tập hiện tại
              </h2>

              <div className="mt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{membershipData.packageName}</h3>
                    <p className="text-primary font-medium mt-1">Còn {membershipData.daysRemaining} ngày</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
                      Đang hoạt động
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-gray-600">Tiến độ sử dụng</span>
                    <span className="text-sm font-medium text-gray-800">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Bắt đầu: {membershipData.startDate}</span>
                    <span>Kết thúc: {membershipData.endDate}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {membershipData.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Link href="/account/payments/new" className="btn btn-primary flex-1">
                    Gia hạn gói tập
                  </Link>
                  <button className="btn btn-outline flex-1">
                    Nâng cấp gói
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-1 md:col-span-4">
            <div className="card">
              <h2 className="card-title">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Thông tin thanh toán
              </h2>

              <div className="mt-4 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Tổng tiền</span>
                  <span className="font-medium text-gray-900">{membershipData.price.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán</span>
                  <span className="font-medium text-gray-900">Thẻ tín dụng</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Ngày thanh toán</span>
                  <span className="font-medium text-gray-900">01/05/2025</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Mã hóa đơn</span>
                  <span className="font-medium text-gray-900">INV-2025001</span>
                </div>
              </div>

              <div className="mt-4">
                <button className="w-full btn btn-outline btn-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Xem hóa đơn
                </button>
              </div>
            </div>

            <div className="card mt-6">
              <h2 className="card-title">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Hỗ trợ
              </h2>

              <div className="mt-4">
                <p className="text-gray-600 text-sm">Bạn cần hỗ trợ về gói tập? Liên hệ với chúng tôi.</p>
                
                <div className="mt-4 space-y-3">
                  <button className="w-full btn btn-sm btn-outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    Nhắn tin hỗ trợ
                  </button>
                  <button className="w-full btn btn-sm btn-outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Gọi điện: 0123.456.789
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item}>
            <div className="card">
              <h2 className="card-title">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Lịch sử gói tập
              </h2>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 bg-gray-50">Tên gói</th>
                      <th className="px-6 py-3 bg-gray-50">Thời gian</th>
                      <th className="px-6 py-3 bg-gray-50">Giá</th>
                      <th className="px-6 py-3 bg-gray-50">Trạng thái</th>
                      <th className="px-6 py-3 bg-gray-50">Hóa đơn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{membershipData.packageName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {membershipData.startDate} - {membershipData.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {membershipData.price.toLocaleString('vi-VN')} VND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          Đang hoạt động
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <button className="text-primary hover:text-primary-dark">Xem</button>
                      </td>
                    </tr>
                    
                    {previousMemberships.map((membership) => (
                      <tr key={membership.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-gray-900">{membership.packageName}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {membership.startDate} - {membership.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {membership.price.toLocaleString('vi-VN')} VND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Hết hạn
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <button className="text-primary hover:text-primary-dark">Xem</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'pt' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item}>
            <div className="card">
              <div className="flex justify-between items-center">
                <h2 className="card-title">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Buổi tập với huấn luyện viên cá nhân
                </h2>
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center bg-primary/10 text-primary w-8 h-8 rounded-full font-bold mr-1">{membershipData.ptRemaining}</span>
                  <span className="text-gray-600 text-sm">buổi còn lại</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900">{membershipData.ptPackage}</h3>
                    <p className="text-sm text-gray-600 mt-1">Tổng cộng: 12 buổi</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link href="/account/schedule/create" className="btn btn-primary btn-sm">
                      Đặt lịch buổi tập
                    </Link>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Lịch sử các buổi tập</h3>
                  
                  <div className="space-y-4">
                    {membershipData.ptSessionsHistory.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{session.trainer}</p>
                            <p className="text-sm text-gray-600">{session.date}</p>
                          </div>
                        </div>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          Hoàn thành
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
