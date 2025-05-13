"use client";

import useSidebarState from '@/hooks/useAppState';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useMemo } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  user: { email: string; name: string; roles: string[] } | null;
  handleLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  handleLogout
}) => {
  const [{ sidebarOpen }, { toggleSidebar, setSidebarOpen }] = useSidebarState();
  const pathname = usePathname();

  // Determine the page title based on the current path
  const pageTitle = useMemo(() => {
    if (pathname === "/dashboard") return "Tổng quan";
    if (pathname === "/dashboard/users") return "Quản lý người dùng";
    if (pathname === "/dashboard/trainers") return "Quản lý huấn luyện viên";
    if (pathname === "/dashboard/membership-types") return "Quản lý loại gói tập";
    // New admin pages
    if (pathname === "/dashboard/exercises") return "Quản lý bài tập";
    if (pathname === "/dashboard/workout-plans") return "Kế hoạch tập";
    if (pathname === "/dashboard/classes") return "Quản lý lớp học";
    if (pathname === "/dashboard/memberships") return "Quản lý thành viên";
    if (pathname === "/dashboard/pt-packages") return "Quản lý gói PT";
    if (pathname === "/dashboard/payments") return "Quản lý thanh toán";
    if (pathname === "/dashboard/invoices") return "Quản lý hoá đơn";
    if (pathname === "/dashboard/referrals") return "Quản lý giới thiệu";
    if (pathname === "/dashboard/feedback") return "Quản lý phản hồi & đánh giá";
    if (pathname === "/dashboard/shifts") return "Phân ca làm việc";
    if (pathname === "/dashboard/reports") return "Báo cáo & thống kê";
    if (pathname === "/dashboard/settings") return "Cài đặt hệ thống";
    return "Dashboard";
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar component */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        roles={user?.roles || ['Admin']}
      />

      {/* Main content */}
      <div className={`${sidebarOpen ? 'md:pl-64' : 'md:pl-20'} flex flex-col flex-1 transition-all duration-300`}>
        {/* Header component */}
        <DashboardHeader
          user={user}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
          title={pageTitle}
        />

        {/* Main content */}
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;