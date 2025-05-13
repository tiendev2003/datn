import React from 'react';
import StatCard from './StatCard';

interface StatsOverviewProps {
  totalMembers: number;
  activeMembers: number;
  totalTrainers: number;
  totalClasses: number;
  monthlyRevenue: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalMembers,
  activeMembers,
  totalTrainers,
  totalClasses,
  monthlyRevenue
}) => {
  // Format tiền VND
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Tổng hội viên"
        value={totalMembers}
        iconBgClass="bg-red-100 dark:bg-red-900"
        icon={
          <svg className="h-6 w-6 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <StatCard
        title="Hội viên hoạt động"
        value={activeMembers}
        iconBgClass="bg-green-100 dark:bg-green-900"
        icon={
          <svg className="h-6 w-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
      />

      <StatCard
        title="Huấn luyện viên"
        value={totalTrainers}
        iconBgClass="bg-blue-100 dark:bg-blue-900"
        icon={
          <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
      />

      <StatCard
        title="Lớp tập nhóm"
        value={totalClasses}
        iconBgClass="bg-purple-100 dark:bg-purple-900"
        icon={
          <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />

      <StatCard
        title="Doanh thu tháng"
        value={monthlyRevenue}
        formatter={formatCurrency}
        iconBgClass="bg-yellow-100 dark:bg-yellow-900"
        icon={
          <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
};

export default StatsOverview;