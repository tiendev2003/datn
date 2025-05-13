
// Membership list component
"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { Membership } from '@/types/models';
import { formatDate } from '@/utils/date';
import { capitalizeFirst, formatCurrency } from '@/utils/formatter';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function MembershipList() {
  const [items, setItems] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<ApiResponse<PaginatedResponse<Membership>>>('/api/memberships')
      .then(res => {
        const data = res.data;
        if (data.success && data.data) setItems(data.data.content);
        else setError(data.message || 'Không tải được thành viên');
      })
      .catch(() => setError('Lỗi mạng'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải thành viên...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày bắt đầu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày kết thúc</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thanh toán</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá thực</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {items.map(m => (
            <tr key={m.membershipId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{m.user?.username || m.user?.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{m.membershipType?.typeName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatDate(m.startDate, 'DD/MM/YYYY')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatDate(m.endDate, 'DD/MM/YYYY')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{capitalizeFirst(m.membershipStatus.toLowerCase())}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{capitalizeFirst(m.paymentStatus.toLowerCase())}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatCurrency(m.actualPrice)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                    <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-gray-700`} onClick={() => console.log('Edit', m.membershipId)}>
                              <PencilIcon className="w-5 h-5 mr-2" />Sửa
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-2 py-2 text-sm text-gray-700`} onClick={() => console.log('Delete', m.membershipId)}>
                              <TrashIcon className="w-5 h-5 mr-2" />Xóa
                            </button>
                          )}
                        </Menu.Item>
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

