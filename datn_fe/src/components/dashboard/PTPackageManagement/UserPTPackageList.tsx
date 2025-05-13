
"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { UserPTPackage } from '@/types/models';
import { formatDate } from '@/utils/date';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { CalendarIcon, ClipboardDocumentIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function UserPTPackageList() {
  const [packages, setPackages] = useState<UserPTPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<ApiResponse<PaginatedResponse<UserPTPackage>>>('/api/user-pt-packages')
      .then(res => {
        const data = res.data;
        if (data.success && data.data) setPackages(data.data.content);
        else setError(data.message || 'Không tải được gói PT của người dùng');
      })
      .catch(() => setError('Lỗi mạng'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Huấn luyện viên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gói PT</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày mua</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày hết hạn</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buổi tập</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Còn lại</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {packages.map(pkg => (
            <tr key={pkg.userPackageId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {pkg.user?.username || pkg.user?.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {pkg.trainer?.user?.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {pkg.ptPackage?.packageName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {formatDate(pkg.purchaseDate, 'DD/MM/YYYY')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {formatDate(pkg.expiryDate, 'DD/MM/YYYY')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {pkg.totalSessions}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {pkg.remainingSessions}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${pkg.packageStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                    pkg.packageStatus === 'EXPIRED' ? 'bg-red-100 text-red-800' : 
                    pkg.packageStatus === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {pkg.packageStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                    <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-1">
                        <Menu.Item>{({ active }) => (
                          <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-gray-700`} onClick={() => console.log('View sessions', pkg.userPackageId)}>
                            <ClipboardDocumentIcon className="w-5 h-5 mr-2" />Xem lịch sử buổi tập
                          </button>
                        )}</Menu.Item>
                        <Menu.Item>{({ active }) => (
                          <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-gray-700`} onClick={() => console.log('Schedule session', pkg.userPackageId)}>
                            <CalendarIcon className="w-5 h-5 mr-2" />Đặt lịch buổi tập mới
                          </button>
                        )}</Menu.Item>
                        <Menu.Item>{({ active }) => (
                          <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-red-700`} onClick={() => console.log('Cancel package', pkg.userPackageId)}>
                            <TrashIcon className="w-5 h-5 mr-2" />Hủy gói
                          </button>
                        )}</Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
