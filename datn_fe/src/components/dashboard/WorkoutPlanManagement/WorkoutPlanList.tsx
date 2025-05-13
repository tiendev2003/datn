"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { PlanStatus, WorkoutPlan } from '@/types/models';
import { formatDate } from '@/utils/date';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WorkoutPlanList() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    fetchWorkoutPlans();
  }, [page]);
  
  const fetchWorkoutPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<WorkoutPlan>>>(`/api/workout-plans?page=${page}&size=10&sort=startDate,desc`);
      if (response.data.success && response.data.data) {
        setPlans(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      } else {
        setError(response.data.message || 'Không thể tải kế hoạch tập');
      }
    } catch (error) {
      setError('Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (planId: number, newStatus: PlanStatus) => {
    try {
      const response = await axios.patch<ApiResponse<WorkoutPlan>>(`/api/workout-plans/${planId}`, {
        planStatus: newStatus
      });
      
      if (response.data.success) {
        // Cập nhật danh sách trong state
        setPlans(plans.map(plan => 
          plan.planId === planId 
            ? { ...plan, planStatus: newStatus } 
            : plan
        ));
      } else {
        setError(response.data.message || 'Không thể cập nhật trạng thái');
      }
    } catch (error) {
      setError('Lỗi kết nối');
    }
  };
  
  const deletePlan = async (planId: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa kế hoạch tập này?')) return;
    
    try {
      const response = await axios.delete<ApiResponse<void>>(`/api/workout-plans/${planId}`);
      
      if (response.data.success) {
        // Xóa khỏi danh sách
        setPlans(plans.filter(plan => plan.planId !== planId));
      } else {
        setError(response.data.message || 'Không thể xóa kế hoạch tập');
      }
    } catch (error) {
      setError('Lỗi kết nối');
    }
  };
  
  const getStatusBadgeClass = (status: PlanStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'ABANDONED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading && plans.length === 0) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }
  
  return (
    <div className="space-y-4">
      {error && <div className="bg-red-50 text-red-800 p-3 rounded">{error}</div>}
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Kế hoạch tập luyện</h2>
        <Link href="/dashboard/workout-plans/create" className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700">
          Tạo kế hoạch mới
        </Link>
      </div>
      
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên kế hoạch
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Học viên
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Huấn luyện viên
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {plans.map((plan) => (
              <tr key={plan.planId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {plan.planName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {plan.user?.username || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {plan.trainer?.user?.username || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(plan.startDate, 'DD/MM/YYYY')} - {plan.endDate ? formatDate(plan.endDate, 'DD/MM/YYYY') : 'Không xác định'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={plan.planStatus}
                    onChange={(e) => handleStatusChange(plan.planId!, e.target.value as PlanStatus)}
                    className={`text-xs inline-flex font-semibold rounded px-2 py-1 ${getStatusBadgeClass(plan.planStatus)}`}
                  >
                    <option value="ACTIVE" className="bg-white text-gray-900">ACTIVE</option>
                    <option value="COMPLETED" className="bg-white text-gray-900">COMPLETED</option>
                    <option value="ABANDONED" className="bg-white text-gray-900">ABANDONED</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/workout-plans/${plan.planId}`} className="text-indigo-600 hover:text-indigo-900">
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link href={`/dashboard/workout-plans/${plan.planId}/edit`} className="text-blue-600 hover:text-blue-900">
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button onClick={() => deletePlan(plan.planId!)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {plans.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Không có kế hoạch tập luyện nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow rounded-lg">
          <div className="flex-1 flex justify-between">
            <button
              onClick={() => setPage(prev => Math.max(0, prev - 1))}
              disabled={page === 0}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Trang {page + 1} trên {totalPages}
            </span>
            <button
              onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={page === totalPages - 1}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
