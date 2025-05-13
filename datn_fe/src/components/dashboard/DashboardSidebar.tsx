"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  roles: string[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  roles,
}) => {
  const pathname = usePathname();

  const isAdmin = roles.includes('Admin');
  const isStaff = roles.includes('Staff');
  const isPT = roles.includes('PT') || roles.includes('Trainer');

  // Helper to determine if a route is active
  const isActive = (path: string) => {
    if (path === '/dashboard/membership-types' && pathname === '/dashboard/membership-types') {
      return true;
    }
    return pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 flex flex-col z-30 w-64 max-w-xs bg-white dark:bg-gray-800 transform transition duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-red-600 dark:text-red-400">FitHub Admin</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {/* Overview - all roles */}
            <Link
              href="/dashboard"
              className={`${isActive("/dashboard")
                ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
            >
              <svg
                className={`${isActive("/dashboard") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  } mr-3 flex-shrink-0 h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Tổng quan
            </Link>

            {/* User management - admin & staff */}
            {(isAdmin || isStaff) && (
              <Link
                href="/dashboard/users"
                className={`${isActive("/dashboard/users")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard/users") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Quản lý người dùng
              </Link>
            )}

            {/* Trainer management - admin & staff */}
            {(isAdmin || isStaff) && (
              <Link
                href="/dashboard/trainers"
                className={`${isActive("/dashboard/trainers")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard/trainers") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Quản lý huấn luyện viên
              </Link>
            )}

            {/* Exercises & Workout Plans - PT & admin */}
            {(isPT || isAdmin) && (
              <>
                <Link
                  href="/dashboard/exercises"
                  className={`${isActive("/dashboard/exercises")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/exercises") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
                  Quản lý bài tập
                </Link>
                <Link
                  href="/dashboard/workout-plans"
                  className={`${isActive("/dashboard/workout-plans")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/workout-plans") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h10M8 18h7" /></svg>
                  Kế hoạch tập
                </Link>
              </>
            )}

            {/* Class management - PT, staff, admin */}
            {(isPT || isStaff || isAdmin) && (
              <Link
                href="/dashboard/classes"
                className={`${isActive("/dashboard/classes")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg className={`${isActive("/dashboard/classes") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
                Quản lý lớp học
              </Link>
            )}

            {/* Membership management - staff & admin */}
            {(isStaff || isAdmin) && (
              <>
                <Link
                  href="/dashboard/membership-types"
                  className={`${isActive("/dashboard/membership-types")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/membership-types") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Loại gói tập
                </Link>
                <Link
                  href="/dashboard/memberships"
                  className={`${isActive("/dashboard/memberships")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/memberships") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Quản lý thành viên
                </Link>
              </>
            )}

            {/* PT Packages - admin only */}
            {isAdmin && (
              <Link
                href="/dashboard/pt-packages"
                className={`${isActive("/dashboard/pt-packages")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg className={`${isActive("/dashboard/pt-packages") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                Quản lý gói PT
              </Link>
            )}

            {/* Payments & Invoices - staff & admin */}
            {(isStaff || isAdmin) && (
              <>
                <Link
                  href="/dashboard/payments"
                  className={`${isActive("/dashboard/payments")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/payments") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a3 3 0 00-6 0v2m-4 4h10" /></svg>
                  Quản lý thanh toán
                </Link>
                <Link
                  href="/dashboard/invoices"
                  className={`${isActive("/dashboard/invoices")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/invoices") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                  Quản lý hoá đơn
                </Link>
              </>
            )}

            {/* Referrals - admin only */}
            {isAdmin && (
              <Link
                href="/dashboard/referrals"
                className={`${isActive("/dashboard/referrals")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg className={`${isActive("/dashboard/referrals") ? "text-red-500" : "text-gray-400"} mr-3 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9a3 3 0 11-6 0 3 3 0 016 0zm-6 6v4m6-4v4" /></svg>
                Quản lý giới thiệu
              </Link>
            )}

            {/* Feedback & Ratings - PT, staff, admin */}
            {(isPT || isStaff || isAdmin) && (
              <Link
                href="/dashboard/feedback"
                className={`${isActive("/dashboard/feedback")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard/feedback") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Phản hồi & đánh giá
              </Link>
            )}

            {/* Shifts/Schedule - staff & admin */}
            {(isStaff || isAdmin) && (
              <Link
                href="/dashboard/shifts"
                className={`${isActive("/dashboard/shifts")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard/shifts") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Phân ca làm việc
              </Link>
            )}

            {/* Reports & Stats - admin only */}
            {isAdmin && (
              <Link
                href="/dashboard/reports"
                className={`${isActive("/dashboard/reports")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard/reports") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Báo cáo & thống kê
              </Link>
            )}

            {/* Settings - admin only */}
            {isAdmin && (
              <Link
                href="/dashboard/settings"
                className={`${isActive("/dashboard/settings")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard/settings") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cài đặt hệ thống
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 ${sidebarOpen ? 'md:w-64' : 'md:w-20'} transition-all duration-300`}>
        <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-700 pt-5 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            {sidebarOpen ? (
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">FitHub Admin</span>
            ) : (
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">FH</span>
            )}
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {/* Overview - all roles */}
              <Link
                href="/dashboard"
                className={`${isActive("/dashboard")
                  ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
              >
                <svg
                  className={`${isActive("/dashboard") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {sidebarOpen && <span>Tổng quan</span>}
              </Link>

              {/* User management - admin & staff */}
              {(isAdmin || isStaff) && (
                <Link
                  href="/dashboard/users"
                  className={`${isActive("/dashboard/users")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/users") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {sidebarOpen && <span>Quản lý người dùng</span>}
                </Link>
              )}

              {/* Trainer management - admin & staff */}
              {(isAdmin || isStaff) && (
                <Link
                  href="/dashboard/trainers"
                  className={`${isActive("/dashboard/trainers")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/trainers") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {sidebarOpen && <span>Quản lý huấn luyện viên</span>}
                </Link>
              )}

              {/* Exercises & Workout Plans - PT & admin */}
              {(isPT || isAdmin) && (
                <>
                  <Link
                    href="/dashboard/exercises"
                    className={`${isActive("/dashboard/exercises")
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                  >
                    <svg className={`${isActive("/dashboard/exercises") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
                    {sidebarOpen && <span>Quản lý bài tập</span>}
                  </Link>
                  <Link
                    href="/dashboard/workout-plans"
                    className={`${isActive("/dashboard/workout-plans")
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                  >
                    <svg className={`${isActive("/dashboard/workout-plans") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h10M8 18h7" /></svg>
                    {sidebarOpen && <span>Kế hoạch tập</span>}
                  </Link>
                </>
              )}

              {/* Class management - PT, staff, admin */}
              {(isPT || isStaff || isAdmin) && (
                <Link
                  href="/dashboard/classes"
                  className={`${isActive("/dashboard/classes")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/classes") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
                  {sidebarOpen && <span>Quản lý lớp học</span>}
                </Link>
              )}

              {/* Membership management - staff & admin */}
              {(isStaff || isAdmin) && (
                <>
                  <Link
                    href="/dashboard/membership-types"
                    className={`${isActive("/dashboard/membership-types")
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                  >
                    <svg
                      className={`${isActive("/dashboard/membership-types") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                        } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {sidebarOpen && <span>Loại gói tập</span>}
                  </Link>
                  <Link
                    href="/dashboard/memberships"
                    className={`${isActive("/dashboard/memberships")
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                  >
                    <svg className={`${isActive("/dashboard/memberships") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {sidebarOpen && <span>Quản lý thành viên</span>}
                  </Link>
                </>
              )}

              {/* PT Packages - admin only */}
              {isAdmin && (
                <Link
                  href="/dashboard/pt-packages"
                  className={`${isActive("/dashboard/pt-packages")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/pt-packages") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  {sidebarOpen && <span>Quản lý gói PT</span>}
                </Link>
              )}

              {/* Payments & Invoices - staff & admin */}
              {(isStaff || isAdmin) && (
                <>
                  <Link
                    href="/dashboard/payments"
                    className={`${isActive("/dashboard/payments")
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                  >
                    <svg className={`${isActive("/dashboard/payments") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a3 3 0 00-6 0v2m-4 4h10" /></svg>
                    {sidebarOpen && <span>Quản lý thanh toán</span>}
                  </Link>
                  <Link
                    href="/dashboard/invoices"
                    className={`${isActive("/dashboard/invoices")
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                  >
                    <svg className={`${isActive("/dashboard/invoices") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                    {sidebarOpen && <span>Quản lý hoá đơn</span>}
                  </Link>
                </>
              )}

              {/* Referrals - admin only */}
              {isAdmin && (
                <Link
                  href="/dashboard/referrals"
                  className={`${isActive("/dashboard/referrals")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg className={`${isActive("/dashboard/referrals") ? "text-red-500" : "text-gray-400"} ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9a3 3 0 11-6 0 3 3 0 016 0zm-6 6v4m6-4v4" /></svg>
                  {sidebarOpen && <span>Quản lý giới thiệu</span>}
                </Link>
              )}

              {/* Feedback & Ratings - PT, staff, admin */}
              {(isPT || isStaff || isAdmin) && (
                <Link
                  href="/dashboard/feedback"
                  className={`${isActive("/dashboard/feedback")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/feedback") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  {sidebarOpen && <span>Phản hồi & đánh giá</span>}
                </Link>
              )}

              {/* Shifts/Schedule - staff & admin */}
              {(isStaff || isAdmin) && (
                <Link
                  href="/dashboard/shifts"
                  className={`${isActive("/dashboard/shifts")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/shifts") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {sidebarOpen && <span>Phân ca làm việc</span>}
                </Link>
              )}

              {/* Reports & Stats - admin only */}
              {isAdmin && (
                <Link
                  href="/dashboard/reports"
                  className={`${isActive("/dashboard/reports")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/reports") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {sidebarOpen && <span>Báo cáo & thống kê</span>}
                </Link>
              )}

              {/* Settings - admin only */}
              {isAdmin && (
                <Link
                  href="/dashboard/settings"
                  className={`${isActive("/dashboard/settings")
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    } group flex items-center ${sidebarOpen ? 'px-2 py-2 text-sm' : 'justify-center p-3'} font-medium rounded-md w-full`}
                >
                  <svg
                    className={`${isActive("/dashboard/settings") ? "text-red-500 dark:text-red-300" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      } ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {sidebarOpen && <span>Cài đặt hệ thống</span>}
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;