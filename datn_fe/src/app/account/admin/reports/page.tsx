'use client';
import PageTitle from '@/components/PageTitle';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  RiArrowRightUpLine,
  RiBarChartBoxLine,
  RiCalendarCheckLine,
  RiFileDownloadLine,
  RiFilterLine,
  RiPieChartLine,
  RiSettings4Line,
  RiStarFill,
  RiTimeLine,
  RiUserStarLine
} from 'react-icons/ri';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

export default function Reports() {
  // State for animations
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Mock data for reports
  const membershipStats = [
    { name: "Gói Standard", count: 120, percentage: 40, color: '#4F46E5' },
    { name: "Gói Premium", count: 75, percentage: 25, color: '#10B981' },
    { name: "Gói PT", count: 60, percentage: 20, color: '#F59E0B' },
    { name: "Gói Yoga", count: 45, percentage: 15, color: '#EC4899' }
  ];

  const trainerPerformance = [
    {
      name: "Hoàng Văn A",
      sessions: 42,
      rating: 4.8,
      reviews: 32,
      earnings: "14,700,000₫",
      utilization: 85
    },
    {
      name: "Lê Thị B",
      sessions: 38,
      rating: 4.9,
      reviews: 30,
      earnings: "13,300,000₫",
      utilization: 82
    },
    {
      name: "Trần Văn C",
      sessions: 35,
      rating: 4.7,
      reviews: 28,
      earnings: "12,250,000₫",
      utilization: 75
    },
    {
      name: "Nguyễn Văn E",
      sessions: 32,
      rating: 4.6,
      reviews: 25,
      earnings: "11,200,000₫",
      utilization: 70
    }
  ];

  // Revenue data for line chart
  const revenueData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Doanh thu 2023',
        data: [65, 78, 82, 75, 90, 95, 92, 110, 115, 100, 120, 125],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Doanh thu 2022',
        data: [60, 65, 70, 65, 80, 85, 80, 95, 100, 90, 100, 110],
        borderColor: '#9CA3AF',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderDashed: [5, 5],
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Revenue distribution data for pie chart
  const revenueDistributionData = {
    labels: membershipStats.map(stat => stat.name),
    datasets: [
      {
        data: membershipStats.map(stat => stat.count),
        backgroundColor: membershipStats.map(stat => stat.color),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  // Monthly performance data
  const monthlyPerformanceData = {
    labels: ['Khách mới', 'Lịch đặt', 'Tái ký', 'Hủy tập'],
    datasets: [
      {
        label: 'Tháng này',
        data: [42, 58, 34, 8],
        backgroundColor: '#4F46E5',
      },
      {
        label: 'Tháng trước',
        data: [38, 52, 30, 12],
        backgroundColor: '#10B981',
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
        <PageTitle title="Báo cáo thống kê" />
        <div className="flex space-x-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-all flex items-center shadow-sm">
            <RiFileDownloadLine className="mr-2" />
            Xuất báo cáo
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
            <RiSettings4Line size={18} /> Tùy chỉnh báo cáo
          </button>
        </div>
      </div>

      {/* Date Range Selector - Improved UI */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-4 items-end">
            <div>
              <label htmlFor="report-period" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <RiCalendarCheckLine className="text-indigo-600" size={18} /> Khoảng thời gian
              </label>
              <div className="relative">
                <select
                  id="report-period"
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

      {/* Key Performance Indicators - Enhanced Design */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiUserStarLine className="text-blue-600" size={18} /> Khách hàng mới
              </p>
              <p className="text-3xl font-bold text-blue-700 flex items-center">
                42
                <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                  <RiArrowRightUpLine className="mr-1" />
                  +8%
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
            </div>
            <div className="bg-blue-200/50 p-2 rounded-lg">
              <RiUserStarLine size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-1 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-green-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiBarChartBoxLine className="text-green-600" size={18} /> Tổng doanh thu
              </p>
              <p className="text-3xl font-bold text-green-700 flex items-center">
                120,350,000₫
                <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                  <RiArrowRightUpLine className="mr-1" />
                  +12%
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
            </div>
            <div className="bg-green-200/50 p-2 rounded-lg">
              <RiBarChartBoxLine size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-green-200 rounded-full overflow-hidden">
            <div className="h-1 bg-green-600 rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-purple-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiPieChartLine className="text-purple-600" size={18} /> Tỷ lệ chuyển đổi
              </p>
              <p className="text-3xl font-bold text-purple-700 flex items-center">
                68%
                <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                  <RiArrowRightUpLine className="mr-1" />
                  +5%
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
            </div>
            <div className="bg-purple-200/50 p-2 rounded-lg">
              <RiPieChartLine size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-purple-200 rounded-full overflow-hidden">
            <div className="h-1 bg-purple-600 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border border-yellow-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                <RiStarFill className="text-yellow-600" size={18} /> Điểm đánh giá trung bình
              </p>
              <p className="text-3xl font-bold text-yellow-700 flex items-center">
                4.7/5
                <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                  <RiArrowRightUpLine className="mr-1" />
                  +0.2
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
            </div>
            <div className="bg-yellow-200/50 p-2 rounded-lg">
              <RiStarFill size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-yellow-200 rounded-full overflow-hidden">
            <div className="h-1 bg-yellow-600 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </div>

      {/* Revenue Chart - With actual chart implementation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <RiBarChartBoxLine className="mr-2 text-indigo-600" size={20} />
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
            Phân bổ doanh thu
          </h3>
          <div className="h-72 flex items-center justify-center">
            <Pie data={revenueDistributionData} options={options} />
          </div>
        </div>
      </div>

      {/* Monthly Performance Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <RiBarChartBoxLine className="mr-2 text-indigo-600" size={20} />
          So sánh hiệu suất hàng tháng
        </h3>
        <div className="h-72">
          <Bar data={monthlyPerformanceData} options={{
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

      {/* Membership Distribution - Enhanced table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <RiPieChartLine className="mr-2 text-indigo-600" size={20} />
          Phân bổ gói tập
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="py-3 px-4 text-left rounded-l-lg">Tên gói</th>
                <th className="py-3 px-4 text-left">Số lượng</th>
                <th className="py-3 px-4 text-left">Tỷ lệ</th>
                <th className="py-3 px-4 text-left rounded-r-lg">Phân bổ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {membershipStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: stat.color }}></div>
                    {stat.name}
                  </td>
                  <td className="py-3 px-4">{stat.count}</td>
                  <td className="py-3 px-4">{stat.percentage}%</td>
                  <td className="py-3 px-4 w-1/3">
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainer Performance - Enhanced table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <RiUserStarLine className="mr-2 text-indigo-600" size={20} />
            Hiệu suất huấn luyện viên
          </h3>
          <button className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium transition-colors flex items-center">
            Xem tất cả
            <RiArrowRightUpLine className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="py-3 px-4 text-left rounded-l-lg">Huấn luyện viên</th>
                <th className="py-3 px-4 text-left">Số buổi tập</th>
                <th className="py-3 px-4 text-left">Đánh giá</th>
                <th className="py-3 px-4 text-left">Thu nhập</th>
                <th className="py-3 px-4 text-left rounded-r-lg">Tỷ lệ sử dụng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trainerPerformance.map((trainer, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-2">
                        {trainer.name.charAt(0)}
                      </div>
                      {trainer.name}
                    </div>
                  </td>
                  <td className="py-4 px-4">{trainer.sessions}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{trainer.rating}</span>
                      <span className="text-yellow-500 ml-1">★</span>
                      <span className="text-gray-500 text-sm ml-1">({trainer.reviews})</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">{trainer.earnings}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-100 rounded-full h-2.5 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${trainer.utilization >= 80 ? 'bg-green-500' :
                            trainer.utilization >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          style={{ width: `${trainer.utilization}%` }}
                        ></div>
                      </div>
                      <span>{trainer.utilization}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Reports Section - Enhanced cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-blue-100 transform hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <RiCalendarCheckLine className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium ml-3 text-gray-800">Báo cáo lịch tập</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Thống kê buổi tập, tỷ lệ đặt lịch và hủy lịch theo thời gian thực</p>
          <div className="mt-3 text-blue-700 text-sm font-medium flex items-center">
            Xem báo cáo chi tiết
            <RiArrowRightUpLine className="ml-1" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-green-100 transform hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <RiTimeLine className="text-green-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium ml-3 text-gray-800">Báo cáo khách hàng</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Phân tích khách hàng mới, tỷ lệ giữ chân và xu hướng gia hạn hợp đồng</p>
          <div className="mt-3 text-green-700 text-sm font-medium flex items-center">
            Xem báo cáo chi tiết
            <RiArrowRightUpLine className="ml-1" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-purple-100 transform hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <RiUserStarLine className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium ml-3 text-gray-800">Báo cáo nhân sự</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Thống kê hiệu suất huấn luyện viên, đánh giá khách hàng và tiền lương</p>
          <div className="mt-3 text-purple-700 text-sm font-medium flex items-center">
            Xem báo cáo chi tiết
            <RiArrowRightUpLine className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
