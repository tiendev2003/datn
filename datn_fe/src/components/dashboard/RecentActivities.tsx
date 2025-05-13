import React from 'react';
import ActivityItem from './ActivityItem';

// Định nghĩa kiểu dữ liệu cho một hoạt động
export type Activity = {
  id: number;
  type: 'new-member' | 'class-booking' | 'package-purchase' | 'check-in' | 'trainer-schedule';
  user?: string;
  time: string;
  class?: string;
  package?: string;
  amount?: number;
  trainer?: string;
  action?: string;
};

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Hoạt động gần đây
        </h3>
        <button type="button" className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
          Xem tất cả
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 divide-y divide-gray-200 dark:divide-gray-700">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;