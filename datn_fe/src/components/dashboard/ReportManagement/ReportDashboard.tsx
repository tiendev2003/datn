"use client";

import { ApiResponse } from '@/types/api-responses';
import { formatDate } from '@/utils/date';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReportChart from './ReportChart';

interface MetricCard {
  title: string;
  value: string | number;
  previousValue?: string | number;
  percentChange?: number;
  icon?: React.ReactNode;
  positive?: boolean;
}

interface ReportSummary {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  revenue: number;
  revenueChange: number;
  classAttendance: number;
  attendanceChange: number;
  ptSessionsCompleted: number;
}

export default function ReportDashboard() {
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({
    start: formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'YYYY-MM-DD'),
    end: formatDate(new Date(), 'YYYY-MM-DD')
  });
  const [periodType, setPeriodType] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [summaryData, setSummaryData] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<ReportSummary>>(`/api/reports/summary`, {
          params: {
            startDate: dateRange.start,
            endDate: dateRange.end
          }
        });

        if (response.data.success && response.data.data) {
          setSummaryData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load summary data');
        }
      } catch (err) {
        console.error('Error loading summary data:', err);
        setError('Failed to load summary data');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, [dateRange, refreshTrigger]);

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const now = new Date();
    let start: Date;
    
    switch (value) {
      case 'last7days':
        start = new Date(now.setDate(now.getDate() - 7));
        setDateRange({
          start: formatDate(start, 'YYYY-MM-DD'),
          end: formatDate(new Date(), 'YYYY-MM-DD')
        });
        setPeriodType('daily');
        break;
      case 'last30days':
        start = new Date(now.setDate(now.getDate() - 30));
        setDateRange({
          start: formatDate(start, 'YYYY-MM-DD'),
          end: formatDate(new Date(), 'YYYY-MM-DD')
        });
        setPeriodType('daily');
        break;
      case 'last3months':
        start = new Date(now.setMonth(now.getMonth() - 3));
        setDateRange({
          start: formatDate(start, 'YYYY-MM-DD'),
          end: formatDate(new Date(), 'YYYY-MM-DD')
        });
        setPeriodType('weekly');
        break;
      case 'last6months':
        start = new Date(now.setMonth(now.getMonth() - 6));
        setDateRange({
          start: formatDate(start, 'YYYY-MM-DD'),
          end: formatDate(new Date(), 'YYYY-MM-DD')
        });
        setPeriodType('monthly');
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1);
        setDateRange({
          start: formatDate(start, 'YYYY-MM-DD'),
          end: formatDate(new Date(), 'YYYY-MM-DD')
        });
        setPeriodType('monthly');
        break;
      case 'lastYear':
        start = new Date(now.getFullYear() - 1, 0, 1);
        const end = new Date(now.getFullYear() - 1, 11, 31);
        setDateRange({
          start: formatDate(start, 'YYYY-MM-DD'),
          end: formatDate(end, 'YYYY-MM-DD')
        });
        setPeriodType('monthly');
        break;
      default:
        break;
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCustomDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      const response = await axios.get(`/api/reports/export`, {
        params: {
          startDate: dateRange.start,
          endDate: dateRange.end,
          format
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${dateRange.start}-to-${dateRange.end}.${format === 'pdf' ? 'pdf' : 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error exporting report:', err);
      alert('Không thể xuất báo cáo. Vui lòng thử lại sau.');
    }
  };

  const renderMetricCard = ({ title, value, previousValue, percentChange, positive }: MetricCard) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {percentChange !== undefined && (
          <p className={`mt-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{percentChange >= 0 ? '+' : ''}{percentChange}%</span>
            <span className="ml-1 text-gray-500">so với kỳ trước</span>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-0">Báo cáo và thống kê</h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div>
              <select
                onChange={handleDateRangeChange}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="last7days">7 ngày qua</option>
                <option value="last30days" selected>30 ngày qua</option>
                <option value="last3months">3 tháng qua</option>
                <option value="last6months">6 tháng qua</option>
                <option value="thisYear">Năm nay</option>
                <option value="lastYear">Năm trước</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => handleCustomDateChange('start', e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <span className="self-center">đến</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => handleCustomDateChange('end', e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleRefresh}
                className="p-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Làm mới
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Excel
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                PDF
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : summaryData ? (
            <>
              {renderMetricCard({
                title: 'Tổng thành viên',
                value: summaryData.totalMembers,
                previousValue: undefined,
                percentChange: undefined
              })}
              {renderMetricCard({
                title: 'Thành viên mới',
                value: summaryData.newMembersThisMonth,
                percentChange: 5.2, // Example value
                positive: true
              })}
              {renderMetricCard({
                title: 'Doanh thu (VND)',
                value: new Intl.NumberFormat('vi-VN').format(summaryData.revenue),
                percentChange: summaryData.revenueChange,
                positive: summaryData.revenueChange > 0
              })}
              {renderMetricCard({
                title: 'Tham gia lớp học',
                value: summaryData.classAttendance,
                percentChange: summaryData.attendanceChange,
                positive: summaryData.attendanceChange > 0
              })}
            </>
          ) : (
            <div className="col-span-4 text-center py-4 text-gray-500 dark:text-gray-400">
              Không có dữ liệu thống kê
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ReportChart
            type="line"
            title="Doanh thu theo thời gian"
            endpoint="/api/reports/revenue"
            dateRange={dateRange}
            filterKey="period"
            filterValue={periodType}
            refreshTrigger={refreshTrigger}
            height={300}
          />
          
          <ReportChart
            type="bar"
            title="Thành viên mới"
            endpoint="/api/reports/new-members"
            dateRange={dateRange}
            filterKey="period"
            filterValue={periodType}
            refreshTrigger={refreshTrigger}
            height={300}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ReportChart
            type="pie"
            title="Phân bố loại thành viên"
            endpoint="/api/reports/membership-distribution"
            refreshTrigger={refreshTrigger}
            height={250}
          />
          
          <ReportChart
            type="bar"
            title="Top 5 huấn luyện viên"
            endpoint="/api/reports/top-trainers"
            refreshTrigger={refreshTrigger}
            height={250}
          />
          
          <ReportChart
            type="doughnut"
            title="Đặt lịch theo loại"
            endpoint="/api/reports/booking-types"
            dateRange={dateRange}
            refreshTrigger={refreshTrigger}
            height={250}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ReportChart
            type="line"
            title="Xu hướng tham gia phòng tập"
            endpoint="/api/reports/attendance-trends"
            dateRange={dateRange}
            filterKey="period"
            filterValue={periodType}
            refreshTrigger={refreshTrigger}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
