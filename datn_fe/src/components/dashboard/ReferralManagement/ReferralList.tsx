"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { Referral, ReferralStatus, RewardStatus } from '@/types/models';
import { formatDate } from '@/utils/date';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function ReferralList() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<ReferralStatus | ''>('');
  const [rewardStatusFilter, setRewardStatusFilter] = useState<RewardStatus | ''>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const statusColors = {
    [ReferralStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [ReferralStatus.REGISTERED]: 'bg-blue-100 text-blue-800',
    [ReferralStatus.CONVERTED]: 'bg-green-100 text-green-800',
    [ReferralStatus.EXPIRED]: 'bg-gray-100 text-gray-800',
  };

  const rewardStatusColors = {
    [RewardStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [RewardStatus.ISSUED]: 'bg-purple-100 text-purple-800',
    [RewardStatus.CLAIMED]: 'bg-green-100 text-green-800',
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        let url = '/api/referrals';
        const params = new URLSearchParams();

        if (searchTerm) params.append('search', searchTerm);
        if (statusFilter) params.append('status', statusFilter);
        if (rewardStatusFilter) params.append('rewardStatus', rewardStatusFilter);

        if (params.toString()) url += `?${params.toString()}`;

        const response = await axios.get<ApiResponse<PaginatedResponse<Referral>>>(url);
        if (response.data.success && response.data.data) {
          setReferrals(response.data.data.content);
        } else {
          setError(response.data.message || 'Không thể tải dữ liệu giới thiệu');
        }
      } catch (error) {
        setError('Lỗi khi tải dữ liệu giới thiệu');
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [searchTerm, statusFilter, rewardStatusFilter]);

  const handleDeleteReferral = async (referralId: number) => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete<ApiResponse<unknown>>(`/api/referrals/${referralId}`);
      if (response.data.success) {
        setReferrals(referrals.filter(referral => referral.referralId !== referralId));
      } else {
        setError(response.data.message || 'Không thể xóa giới thiệu');
      }
    } catch (error) {
      setError('Lỗi khi xóa giới thiệu');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(null);
    }
  };

  const handleMarkAsConverted = async (referralId: number) => {
    try {
      const response = await axios.patch<ApiResponse<Referral>>(`/api/referrals/${referralId}/convert`, {});
      if (response.data.success && response.data.data) {
        setReferrals(referrals.map(referral => 
          referral.referralId === referralId ? response.data.data! : referral
        ));
      } else {
        setError(response.data.message || 'Không thể cập nhật trạng thái giới thiệu');
      }
    } catch (error) {
      setError('Lỗi khi cập nhật trạng thái giới thiệu');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will trigger the fetch with the updated searchTerm
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setRewardStatusFilter('');
  };

  if (loading) return <p>Đang tải giới thiệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Danh sách giới thiệu</h2>
        <button
          onClick={() => window.location.href = '/dashboard/referrals/new'}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Tạo giới thiệu mới
        </button>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tìm kiếm</label>
            <input 
              type="text"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Email, mã giới thiệu..." 
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ReferralStatus | '')}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Tất cả</option>
              <option value={ReferralStatus.PENDING}>Chờ xác nhận</option>
              <option value={ReferralStatus.REGISTERED}>Đã đăng ký</option>
              <option value={ReferralStatus.CONVERTED}>Đã chuyển đổi</option>
              <option value={ReferralStatus.EXPIRED}>Đã hết hạn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trạng thái phần thưởng</label>
            <select
              value={rewardStatusFilter}
              onChange={(e) => setRewardStatusFilter(e.target.value as RewardStatus | '')}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Tất cả</option>
              <option value={RewardStatus.PENDING}>Chờ xử lý</option>
              <option value={RewardStatus.ISSUED}>Đã phát hành</option>
              <option value={RewardStatus.CLAIMED}>Đã nhận</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button 
              type="submit"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Tìm kiếm
            </button>
            <button 
              type="button" 
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Đặt lại
            </button>
          </div>
        </form>
      </div>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã giới thiệu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người giới thiệu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email được giới thiệu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phần thưởng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {referrals.length > 0 ? (
            referrals.map(referral => (
              <tr key={referral.referralId} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                  {referral.referralCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {referral.referrer?.username || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {referral.referred?.email || referral.referred?.username || 'Chưa đăng ký'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[referral.status]}`}>
                    {referral.status === ReferralStatus.PENDING && 'Chờ xác nhận'}
                    {referral.status === ReferralStatus.REGISTERED && 'Đã đăng ký'}
                    {referral.status === ReferralStatus.CONVERTED && 'Đã chuyển đổi'}
                    {referral.status === ReferralStatus.EXPIRED && 'Đã hết hạn'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {referral.rewardStatus && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${rewardStatusColors[referral.rewardStatus]}`}>
                      {referral.rewardStatus === RewardStatus.PENDING && 'Chờ xử lý'}
                      {referral.rewardStatus === RewardStatus.ISSUED && 'Đã phát hành'}
                      {referral.rewardStatus === RewardStatus.CLAIMED && 'Đã nhận'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {referral.createdAt && formatDate(referral.createdAt, 'DD/MM/YYYY HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {showDeleteConfirm === referral.referralId ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-red-600">Xác nhận xóa?</span>
                      <button 
                        className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                        onClick={() => handleDeleteReferral(referral.referralId!)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? 'Đang xóa...' : 'Xóa'}
                      </button>
                      <button 
                        className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-600' : ''} flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                  onClick={() => window.location.href = `/dashboard/referrals/${referral.referralId}`}
                                >
                                  <EyeIcon className="w-5 h-5 mr-2" /> Chi tiết
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-indigo-50 dark:bg-indigo-900' : ''} flex items-center w-full px-3 py-2 text-indigo-600 dark:text-indigo-400 text-sm`}
                                  onClick={() => window.location.href = `/dashboard/referrals/edit/${referral.referralId}`}
                                >
                                  <PencilIcon className="w-5 h-5 mr-2" /> Sửa
                                </button>
                              )}
                            </Menu.Item>
                            {referral.status !== ReferralStatus.CONVERTED && (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? 'bg-green-50 dark:bg-green-900' : ''} flex items-center w-full px-3 py-2 text-green-600 dark:text-green-400 text-sm`}
                                    onClick={() => handleMarkAsConverted(referral.referralId!)}
                                  >
                                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Đánh dấu đã chuyển đổi
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-red-50 dark:bg-red-900' : ''} flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 text-sm`}
                                  onClick={() => setShowDeleteConfirm(referral.referralId!)}
                                >
                                  <TrashIcon className="w-5 h-5 mr-2" /> Xóa
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                Không có dữ liệu giới thiệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
