import React from 'react';

interface ActivityItemProps {
  id: number;
  type: 'new-member' | 'class-booking' | 'package-purchase' | 'check-in' | 'trainer-schedule';
  user?: string;
  time: string;
  class?: string;
  package?: string;
  amount?: number;
  trainer?: string;
  action?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = (props) => {
  const { type, user, time, class: className, package: packageName, trainer, action } = props;

  // Render icon dựa trên loại hoạt động
  const renderIcon = () => {
    switch (type) {
      case 'new-member':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'class-booking':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'package-purchase':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
            <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        );
      case 'check-in':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <svg className="h-5 w-5 text-purple-600 dark:text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      case 'trainer-schedule':
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg className="h-5 w-5 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // Render nội dung hoạt động
  const renderActivityContent = () => {
    switch (type) {
      case 'new-member':
        return `${user} đã đăng ký thành viên mới`;
      case 'class-booking':
        return `${user} đã đăng ký lớp ${className}`;
      case 'package-purchase':
        return `${user} đã mua ${packageName}`;
      case 'check-in':
        return `${user} đã check-in`;
      case 'trainer-schedule':
        return `HLV ${trainer} đã ${action}`;
      default:
        return '';
    }
  };

  return (
    <div className="py-3">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {renderActivityContent()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {time}
          </p>
        </div>
        <div>
          <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;