import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ReportData {
  name: string;
  revenue: number;
  members: number;
  classes: number;
}

interface ReportsContentProps {
  // Có thể thêm các props cần thiết tại đây
}

const revenueData: ReportData[] = [
  { name: 'T1', revenue: 40000000, members: 120, classes: 45 },
  { name: 'T2', revenue: 45000000, members: 130, classes: 48 },
  { name: 'T3', revenue: 48000000, members: 140, classes: 50 },
  { name: 'T4', revenue: 52000000, members: 145, classes: 52 },
  { name: 'T5', revenue: 58000000, members: 155, classes: 58 },
  { name: 'T6', revenue: 62000000, members: 165, classes: 60 },
  { name: 'T7', revenue: 60000000, members: 160, classes: 59 },
  { name: 'T8', revenue: 65000000, members: 168, classes: 62 },
  { name: 'T9', revenue: 70000000, members: 175, classes: 65 },
  { name: 'T10', revenue: 75000000, members: 180, classes: 68 },
  { name: 'T11', revenue: 80000000, members: 190, classes: 70 },
  { name: 'T12', revenue: 90000000, members: 200, classes: 75 },
];

const membershipData = [
  { name: 'Gói Tiêu Chuẩn', value: 45 },
  { name: 'Gói Premium', value: 30 },
  { name: 'Gói VIP', value: 15 },
  { name: 'Gói PT Cá Nhân', value: 10 },
];

const ReportsContent: React.FC<ReportsContentProps> = () => {
  const [reportType, setReportType] = useState<'revenue' | 'members' | 'classes'>('revenue');
  const [timeFrame, setTimeFrame] = useState<'month' | 'quarter' | 'year'>('month');

  // Format tiền VND
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Báo cáo & Thống kê
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Theo dõi hiệu suất kinh doanh qua các biểu đồ và số liệu thống kê
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-2">
            <button
              onClick={() => window.print()}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              In báo cáo
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Xuất Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loại báo cáo
            </label>
            <select
              id="report-type"
              name="report-type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
            >
              <option value="revenue">Doanh thu</option>
              <option value="members">Thành viên</option>
              <option value="classes">Lớp học</option>
            </select>
          </div>
          <div>
            <label htmlFor="time-frame" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thời gian
            </label>
            <select
              id="time-frame"
              name="time-frame"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as any)}
            >
              <option value="month">Theo tháng</option>
              <option value="quarter">Theo quý</option>
              <option value="year">Theo năm</option>
            </select>
          </div>
          <div>
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Khoảng thời gian
            </label>
            <select
              id="date-range"
              name="date-range"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="current-year">Năm 2025</option>
              <option value="previous-year">Năm 2024</option>
              <option value="custom">Tùy chỉnh...</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-gray-800 shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
          {reportType === 'revenue' && 'Báo cáo doanh thu'}
          {reportType === 'members' && 'Báo cáo thành viên'}
          {reportType === 'classes' && 'Báo cáo lớp học'}
        </h3>
        
        {/* Main Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {reportType === 'revenue' ? (
              <BarChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('vi-VN', { 
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 1
                    }).format(value)
                  }
                />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8" />
              </BarChart>
            ) : (
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={reportType} 
                  name={reportType === 'members' ? "Thành viên" : "Lớp học"} 
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                {reportType === 'revenue' ? 'Tổng doanh thu' : reportType === 'members' ? 'Tổng thành viên mới' : 'Tổng lớp học'}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {reportType === 'revenue' 
                  ? formatCurrency(revenueData.reduce((sum, item) => sum + item.revenue, 0))
                  : reportType === 'members'
                    ? revenueData.reduce((sum, item) => sum + item.members, 0)
                    : revenueData.reduce((sum, item) => sum + item.classes, 0)
                }
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                {reportType === 'revenue' ? 'Doanh thu trung bình' : reportType === 'members' ? 'Thành viên trung bình' : 'Lớp học trung bình'}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {reportType === 'revenue' 
                  ? formatCurrency(revenueData.reduce((sum, item) => sum + item.revenue, 0) / revenueData.length)
                  : reportType === 'members'
                    ? Math.round(revenueData.reduce((sum, item) => sum + item.members, 0) / revenueData.length)
                    : Math.round(revenueData.reduce((sum, item) => sum + item.classes, 0) / revenueData.length)
                }
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                {reportType === 'revenue' ? 'Tăng trưởng' : reportType === 'members' ? 'Tỉ lệ giữ chân' : 'Tỉ lệ lấp đầy'}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {reportType === 'revenue' ? '18.5%' : reportType === 'members' ? '78%' : '92%'}
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Dữ liệu chi tiết
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Bảng dữ liệu chi tiết theo từng tháng
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tháng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Doanh thu
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Thành viên
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Lớp học
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {revenueData.map((month, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {month.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatCurrency(month.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {month.members}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {month.classes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;