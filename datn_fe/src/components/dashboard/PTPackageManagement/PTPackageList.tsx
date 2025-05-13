// PT Package list component
"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { PTPackage } from '@/types/models';
import { formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/formatter';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function PTPackageList() {
  const [packages, setPackages] = useState<PTPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<ApiResponse<PaginatedResponse<PTPackage>>>('/api/pt-packages')
      .then(res => {
        const data = res.data;
        if (data.success && data.data) setPackages(data.data.content);
        else setError(data.message || 'Không tải được gói PT');
      })
      .catch(() => setError('Lỗi mạng'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải gói PT...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên gói PT</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số buổi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hạn dùng (ngày)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giảm giá (%)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tạo lúc</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {packages.map(p => (
            <tr key={p.packageId}>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{p.packageName}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{p.numberOfSessions}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{p.validityDays}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{formatCurrency(p.price)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{p.discountPercentage ?? 0}%</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{formatDate(p.createdAt, 'DD/MM/YYYY')}</td>
              <td className="px-6 py-4 text-sm">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                    <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-1">
                        <Menu.Item>{({ active }) => (
                          <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-gray-700`} onClick={() => console.log('Edit', p.packageId)}>
                            <PencilIcon className="w-5 h-5 mr-2" />Sửa
                          </button>
                        )}</Menu.Item>
                        <Menu.Item>{({ active }) => (
                          <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-gray-700`} onClick={() => console.log('Delete', p.packageId)}>
                            <TrashIcon className="w-5 h-5 mr-2" />Xóa
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
