'use client';
import PageTitle from '@/components/PageTitle';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    RiAddLine,
    RiArrowDownLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiArrowRightUpLine,
    RiArrowUpLine,
    RiCalendarCheckLine,
    RiFileDownloadLine,
    RiFilePdfLine,
    RiFilterLine,
    RiMoneyDollarCircleLine,
    RiPieChartLine
} from 'react-icons/ri';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

export default function FinancialManagement() {
  // State for animations
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Mock data for financial transactions
  const transactions = [
    {
      id: 1,
      date: "18/05/2025",
      customer: "Trần Văn Nam",
      description: "Thanh toán gói Premium 12 tháng",
      amount: "15,600,000₫",
      method: "VNPay",
      status: "completed",
      type: "income"
    },
    {
      id: 2,
      date: "17/05/2025",
      customer: "Nguyễn Thị Hương",
      description: "Thanh toán gói Standard 6 tháng",
      amount: "5,400,000₫",
      method: "MoMo",
      status: "completed",
      type: "income"
    },
    {
      id: 3,
      date: "16/05/2025",
      customer: "Lê Minh Tuấn",
      description: "Thanh toán 8 buổi PT",
      amount: "2,800,000₫",
      method: "Tiền mặt",
      status: "completed",
      type: "income"
    },
    {
      id: 4,
      date: "15/05/2025",
      customer: "N/A",
      description: "Thanh toán thiết bị",
      amount: "25,000,000₫",
      method: "Chuyển khoản",
      status: "completed",
      type: "expense"
    },
    {
      id: 5,
      date: "14/05/2025",
      customer: "Hoàng Văn Bình",
      description: "Thanh toán gói Yoga 6 tháng",
      amount: "6,120,000₫",
      method: "ZaloPay",
      status: "pending",
      type: "income"
    }
  ];

  // Financial summary mock data
  const summary = {
    income: "54,920,000₫",
    expense: "25,000,000₫",
    profit: "29,920,000₫",
    percentChange: "+12%"
  };

  // Revenue data for line chart
  const revenueData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Doanh thu 2025',
        data: [35, 42, 49, 53, 58, 62, 68, 72, 75, 79, 82, 86],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Doanh thu 2024',
        data: [28, 32, 36, 41, 45, 52, 56, 60, 65, 68, 72, 78],
        borderColor: '#9CA3AF',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderDashed: [5, 5],
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Distribution data for pie chart
  const expenseDistributionData = {
    labels: ['Thiết bị', 'Lương nhân viên', 'Tiện ích', 'Marketing', 'Khác'],
    datasets: [
      {
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          '#4F46E5', // Indigo
          '#10B981', // Green
          '#F59E0B', // Amber
          '#EC4899', // Pink
          '#6B7280', // Gray
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý tài chính" />
        <div className="flex space-x-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-all flex items-center shadow-sm">
            <RiFileDownloadLine className="mr-2" />
            Xuất Excel
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-all flex items-center shadow-sm">
            <RiFilePdfLine className="mr-2" />
            Xuất PDF
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
            <RiAddLine size={18} /> Thêm giao dịch
          </button>
        </div>
      </div>

      {/* Date Range Selector - Improved UI */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-4 items-end">
            <div>
              <label htmlFor="date-filter" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <RiCalendarCheckLine className="text-indigo-600" size={18} /> Khoảng thời gian
              </label>
              <div className="relative">
                <select
                  id="date-filter"
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 min-w-[200px] shadow-sm"
                  defaultValue="this-month"
                >
                  <option value="this-month">Tháng này</option>
                  <option value="last-month">Tháng trước</option>
                  <option value="this-quarter">Quý này</option>
                  <option value="last-quarter">Quý trước</option>
                  <option value="this-year">Năm nay</option>
                  <option value="custom">Tùy chỉnh</option>
                </select>
                <RiFilterLine className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="type-filter" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <RiMoneyDollarCircleLine className="text-indigo-600" size={18} /> Loại giao dịch
              </label>
              <div className="relative">
                <select
                  id="type-filter"
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 shadow-sm"
                  defaultValue="all"
                >
                  <option value="all">Tất cả</option>
                  <option value="income">Thu</option>
                  <option value="expense">Chi</option>
                </select>
                <RiFilterLine className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-sm font-medium">
              Áp dụng
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-600 bg-white py-2 px-3 rounded-lg shadow-sm border border-gray-100">
            <RiCalendarCheckLine className="mr-2 text-indigo-500" />
            Dữ liệu cập nhật: 20/05/2025
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-green-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiArrowUpLine className="text-green-600" size={18} /> Tổng thu
              </p>
              <p className="text-3xl font-bold text-green-700 flex items-center">
                {summary.income}
                <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                  <RiArrowRightUpLine className="mr-1" />
                  {summary.percentChange}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
            </div>
            <div className="bg-green-200/50 p-2 rounded-lg">
              <RiArrowUpLine size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-green-200 rounded-full overflow-hidden">
            <div className="h-1 bg-green-600 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-red-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiArrowDownLine className="text-red-600" size={18} /> Tổng chi
              </p>
              <p className="text-3xl font-bold text-red-700 flex items-center">
                {summary.expense}
              </p>
              <p className="text-xs text-gray-500 mt-1">Tháng 5/2025</p>
            </div>
            <div className="bg-red-200/50 p-2 rounded-lg">
              <RiArrowDownLine size={24} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-red-200 rounded-full overflow-hidden">
            <div className="h-1 bg-red-600 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiMoneyDollarCircleLine className="text-blue-600" size={18} /> Lợi nhuận
              </p>
              <p className="text-3xl font-bold text-blue-700 flex items-center">
                {summary.profit}
                <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                  <RiArrowRightUpLine className="mr-1" />
                  {summary.percentChange}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
            </div>
            <div className="bg-blue-200/50 p-2 rounded-lg">
              <RiMoneyDollarCircleLine size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-1 bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-purple-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Hoàn thành mục tiêu</p>
              <p className="text-3xl font-bold text-purple-700">75%</p>
              <p className="text-xs text-gray-500 mt-1">Mục tiêu: 40,000,000₫</p>
            </div>
            <div className="bg-purple-200/50 p-2 rounded-lg">
              <RiPieChartLine size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-purple-200 rounded-full overflow-hidden">
            <div className="h-1 bg-purple-600 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* Charts Section - Revenue and Expense Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <RiMoneyDollarCircleLine className="mr-2 text-indigo-600" size={20} />
            Doanh thu theo thời gian
          </h3>
          <div className="h-72">
            <Line data={revenueData} options={{
              ...options,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <RiPieChartLine className="mr-2 text-indigo-600" size={20} />
            Phân bổ chi phí
          </h3>
          <div className="h-72 flex items-center justify-center">
            <Pie data={expenseDistributionData} options={options} />
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <RiFilterLine className="mr-2 text-indigo-600" size={20} />
          Lọc giao dịch
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <div className="relative">
              <select
                id="status-filter"
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue="all"
              >
                <option value="all">Tất cả</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="pending">Đang chờ</option>
                <option value="failed">Thất bại</option>
              </select>
              <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700 mb-2">
              Phương thức thanh toán
            </label>
            <div className="relative">
              <select
                id="payment-method"
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue="all"
              >
                <option value="all">Tất cả</option>
                <option value="vnpay">VNPay</option>
                <option value="momo">MoMo</option>
                <option value="zalopay">ZaloPay</option>
                <option value="cash">Tiền mặt</option>
                <option value="transfer">Chuyển khoản</option>
              </select>
              <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="amount-range" className="block text-sm font-medium text-gray-700 mb-2">
              Khoảng tiền
            </label>
            <div className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder="Từ"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span>-</span>
              <input
                type="text"
                placeholder="Đến"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <input
              type="text"
              id="search"
              placeholder="Tìm theo mô tả, khách hàng..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all mr-2">
            Đặt lại
          </button>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-1">
            <RiFilterLine /> Lọc kết quả
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <RiMoneyDollarCircleLine className="mr-2 text-indigo-600" size={20} />
            Danh sách giao dịch
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-6 py-3 text-left text-sm font-semibold">Ngày</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Mô tả</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Khách hàng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phương thức</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Số tiền</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm">{transaction.date}</td>
                  <td className="px-6 py-4 font-medium">{transaction.description}</td>
                  <td className="px-6 py-4">
                    {transaction.customer !== 'N/A' ? (
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-2">
                          {transaction.customer.charAt(0)}
                        </div>
                        {transaction.customer}
                      </div>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.status === "completed" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Đã hoàn thành
                      </span>
                    ) : transaction.status === "pending" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Đang chờ
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Thất bại
                      </span>
                    )}
                  </td>
                  <td className={`px-6 py-4 font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      <button className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                      </button>
                      {transaction.status === "pending" && (
                        <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>
                        </button>
                      )}
                      <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">5</span> nội dung
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white" disabled>
            <RiArrowLeftSLine size={16} />
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
            1
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white" disabled>
            <RiArrowRightSLine size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
