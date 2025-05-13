// User list component
"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { User } from '@/types/models';
import { formatDate } from '@/utils/date';
import { capitalizeFirst } from '@/utils/formatter';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<ApiResponse<PaginatedResponse<User>>>('/api/users')
      .then(res => {
        const data = res.data;
        if (data.success && data.data) setUsers(data.data.content);
        else setError(data.message || 'Failed to load users');
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải người dùng...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">2FA</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roles</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{user.isEmailVerified ? 'Có' : 'Không'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{user.twoFactorEnabled ? 'Có' : 'Không'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {user.roles?.map(r => capitalizeFirst(r.roleName)).join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {user.userProfile?.updatedAt ? formatDate(user.userProfile.updatedAt, 'DD/MM/YYYY') : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-indigo-50 dark:bg-indigo-900' : ''} flex items-center w-full px-3 py-2 text-indigo-600 dark:text-indigo-400 text-sm`}
                              onClick={() => console.log('Edit', user.id)}
                            >
                              <PencilIcon className="w-5 h-5 mr-2" /> Sửa
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-red-50 dark:bg-red-900' : ''} flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 text-sm`}
                              onClick={() => console.log('Delete', user.id)}
                            >
                              <TrashIcon className="w-5 h-5 mr-2" /> Xóa
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
