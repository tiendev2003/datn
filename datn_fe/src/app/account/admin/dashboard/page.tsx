'use client';
import PageTitle from '@/components/PageTitle';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiArrowUpLine,
  RiCalendarCheckLine,
  RiCalendarCloseLine,
  RiFileDownloadLine,
  RiFilter3Line,
  RiMoneyDollarCircleLine,
  RiPieChartLine,
  RiRefreshLine,
  RiShoppingBag3Line,
  RiStarLine,
  RiTimerFlashLine,
  RiUserAddLine,
  RiUserHeartLine,
  RiUserStarLine,
} from 'react-icons/ri';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

export default function Dashboard() {
  // State for animations
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // In a real app, these values would come from API calls
  const stats = [
    { 
      label: 'Tổng doanh thu', 
      value: '120.350.000₫', 
      increase: '12%', 
      period: 'so với tháng trước',
      icon: <RiMoneyDollarCircleLine size={24} className="text-green-500" />,
      bgFrom: 'from-green-50',
      bgTo: 'to-green-100',
      borderColor: 'border-green-100',
      progressColor: 'bg-green-600',
      progressWidth: '85%'
    },
    { 
      label: 'Khách hàng mới', 
      value: '42', 
      increase: '8%', 
      period: 'so với tháng trước',
      icon: <RiUserAddLine size={24} className="text-blue-500" />,
      bgFrom: 'from-blue-50',
      bgTo: 'to-blue-100',
      borderColor: 'border-blue-100',
      progressColor: 'bg-blue-600',
      progressWidth: '68%'
    },
    { 
      label: 'Gói tập đã bán', 
      value: '78', 
      increase: '15%', 
      period: 'so với tháng trước',
      icon: <RiShoppingBag3Line size={24} className="text-purple-500" />,
      bgFrom: 'from-purple-50',
      bgTo: 'to-purple-100',
      borderColor: 'border-purple-100',
      progressColor: 'bg-purple-600',
      progressWidth: '75%'
    },
    { 
      label: 'Buổi PT đã đặt', 
      value: '156', 
      increase: '18%', 
      period: 'so với tháng trước',
      icon: <RiCalendarCheckLine size={24} className="text-amber-500" />,
      bgFrom: 'from-amber-50',
      bgTo: 'to-amber-100',
      borderColor: 'border-amber-100',
      progressColor: 'bg-amber-600',
      progressWidth: '90%'
    },
  ];

  const recentActivities = [
    { id: 1, user: 'Nguyễn Văn A', action: 'đã đăng ký gói', target: 'Gói Platinum 12 tháng', time: '10 phút trước', amount: '15.600.000₫', icon: <RiShoppingBag3Line className="text-indigo-500" /> },
    { id: 2, user: 'Trần Thị B', action: 'đặt lịch với', target: 'PT Nguyễn Văn C', time: '30 phút trước', amount: '350.000₫', icon: <RiCalendarCheckLine className="text-green-500" /> },
    { id: 3, user: 'Lê Văn D', action: 'đánh giá', target: 'PT Trần Văn E', time: '1 giờ trước', rating: '5.0', icon: <RiStarLine className="text-amber-500" /> },
    { id: 4, user: 'Phạm Văn F', action: 'gia hạn gói', target: 'Gói Gold 3 tháng', time: '3 giờ trước', amount: '4.500.000₫', icon: <RiTimerFlashLine className="text-blue-500" /> },
    { id: 5, user: 'Hoàng Thị G', action: 'huỷ lịch với', target: 'PT Lê Thị H', time: '5 giờ trước', icon: <RiCalendarCloseLine className="text-red-500" /> },
  ];

  // Revenue data for line chart - similar to finance page
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

  // Revenue distribution for pie chart
  const distributionData = {
    labels: ['Gói tập', 'PT Sessions', 'Phụ phí', 'F&B', 'Sản phẩm'],
    datasets: [
      {
        data: [45, 25, 10, 15, 5],
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

  // Monthly member stats for bar chart
  const memberStatsData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Thành viên mới',
        data: [12, 19, 15, 17, 22, 24, 19, 26, 30, 32, 38, 42],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Thành viên gia hạn',
        data: [8, 15, 12, 14, 16, 19, 22, 25, 28, 30, 34, 36],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 4,
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        boxPadding: 6
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Bảng điều khiển quản trị" />
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors shadow-sm">
            <RiFilter3Line size={18} /> <span>Bộ lọc</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors shadow-sm">
            <RiFileDownloadLine size={18} /> <span>Tải xuống</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-full">
              <RiUserStarLine className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Chào mừng quay trở lại!</h3>
              <p className="text-gray-500">Dưới đây là tổng quan hoạt động của phòng gym</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-white py-2 px-3 rounded-lg shadow-sm border border-gray-100">
            <RiCalendarCheckLine className="mr-2 text-indigo-500" />
            Dữ liệu cập nhật: 20/05/2025
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br ${stat.bgFrom} ${stat.bgTo} p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer border ${stat.borderColor}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium flex items-center gap-1 mb-2">
                  <RiArrowUpLine className="text-green-600" size={18} /> {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-800 flex items-center">
                  {stat.value}
                  <span className="ml-2 text-sm font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                    <RiArrowRightUpLine className="mr-1" />
                    {stat.increase}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
              </div>
              <div className="bg-white/50 p-2 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 h-1 w-full bg-gray-200/50 rounded-full overflow-hidden">
              <div className={`h-1 ${stat.progressColor} rounded-full`} style={{ width: stat.progressWidth }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Revenue and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <RiMoneyDollarCircleLine className="mr-2 text-indigo-600" size={20} />
              Doanh thu theo thời gian
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <RiRefreshLine size={20} />
            </button>
          </div>
          <div className="h-72">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <RiPieChartLine className="mr-2 text-indigo-600" size={20} />
              Phân bố doanh thu
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <RiRefreshLine size={20} />
            </button>
          </div>
          <div className="h-72 flex items-center justify-center">
            <Pie data={distributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Members Stats Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <RiUserHeartLine className="mr-2 text-indigo-600" size={20} />
            Thống kê thành viên hàng tháng
          </h3>
          <div className="flex items-center space-x-2">
            <select className="text-sm border rounded-md px-2 py-1 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <RiRefreshLine size={20} />
            </button>
          </div>
        </div>
        <div className="h-72">
          <Bar data={memberStatsData} options={chartOptions} />
        </div>
      </div>

      {/* Hoạt động gần đây */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Hoạt động gần đây</h3>
          <button className="text-primary hover:text-primary/80 font-medium flex items-center text-sm">
            Xem tất cả <RiArrowRightSLine size={18} />
          </button>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="py-3 px-4 text-left text-sm font-semibold">Người dùng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Hoạt động</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Thời gian</th>
                <th className="py-3 px-4 text-right text-sm font-semibold">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-2">
                        {activity.user.charAt(0)}
                      </div>
                      <span className="font-medium">{activity.user}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">{activity.icon}</span>
                      {activity.action} <span className="font-medium ml-1">{activity.target}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{activity.time}</td>
                  <td className="py-3 px-4 text-right">
                    {activity.amount && <span className="font-semibold text-green-600">{activity.amount}</span>}
                    {activity.rating && (
                      <span className="font-semibold text-amber-500 flex items-center justify-end">
                        <RiStarLine className="mr-1" /> {activity.rating}
                      </span>
                    )}
                    {!activity.amount && !activity.rating && <span className="text-gray-500">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
            Tải thêm <RiArrowDownSLine /> 
          </button>
        </div>
      </div>
    </div>
  );
}
