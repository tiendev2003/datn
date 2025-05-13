"use client";

import { ApiResponse, PaginatedResponse } from '@/types/api-responses';
import { Payment, PaymentMethod, PaymentStatus, PaymentType } from '@/types/models';
import { formatDate } from '@/utils/date';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, ReceiptRefundIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<PaymentType | ''>('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus | ''>('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<PaymentMethod | ''>('');
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({
    start: '',
    end: ''
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const statusColors: Record<PaymentStatus, string> = {
    [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [PaymentStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [PaymentStatus.FAILED]: 'bg-red-100 text-red-800',
    [PaymentStatus.REFUNDED]: 'bg-blue-100 text-blue-800',
    [PaymentStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      let url = '/api/payments';
      const params = new URLSearchParams();

      params.append('page', currentPage.toString());
      params.append('size', pageSize.toString());

      if (searchTerm) params.append('search', searchTerm);
      if (paymentTypeFilter) params.append('type', paymentTypeFilter);
      if (paymentStatusFilter) params.append('status', paymentStatusFilter);
      if (paymentMethodFilter) params.append('method', paymentMethodFilter);
      if (dateRange.start) params.append('startDate', dateRange.start);
      if (dateRange.end) params.append('endDate', dateRange.end);

      url += `?${params.toString()}`;

      const response = await axios.get<ApiResponse<PaginatedResponse<Payment>>>(url);
      if (response.data.success && response.data.data) {
        setPayments(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      } else {
        setError(response.data.message || 'Không thể tải danh sách thanh toán');
      }
    } catch (error) {
      setError('Lỗi khi tải danh sách thanh toán');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchPayments();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPaymentTypeFilter('');
    setPaymentStatusFilter('');
    setPaymentMethodFilter('');
    setDateRange({ start: '', end: '' });
    setCurrentPage(0);
    fetchPayments();
  };

  const handleDeletePayment = async (paymentId: number) => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete<ApiResponse<unknown>>(`/api/payments/${paymentId}`);
      if (response.data.success) {
        setPayments(payments.filter(payment => payment.paymentId !== paymentId));
      } else {
        setError(response.data.message || 'Không thể xóa thanh toán');
      }
    } catch (error) {
      setError('Lỗi khi xóa thanh toán');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(null);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency || 'VND'
    }).format(amount);
  };

  const getPaymentTypeName = (type: PaymentType): string => {
    switch (type) {
      case PaymentType.MEMBERSHIP: return 'Thành viên';
      case PaymentType.PT_PACKAGE: return 'Gói PT';
      case PaymentType.PRODUCT: return 'Sản phẩm';
      case PaymentType.SERVICE: return 'Dịch vụ';
      case PaymentType.REFUND: return 'Hoàn tiền';
      case PaymentType.OTHER: return 'Khác';
    }
  };

  const getPaymentStatusName = (status: PaymentStatus): string => {
    switch (status) {
      case PaymentStatus.PENDING: return 'Đang xử lý';
      case PaymentStatus.COMPLETED: return 'Đã hoàn thành';
      case PaymentStatus.FAILED: return 'Thất bại';
      case PaymentStatus.REFUNDED: return 'Đã hoàn tiền';
      case PaymentStatus.CANCELLED: return 'Đã hủy';
    }
  };

  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch (method) {
      case PaymentMethod.CASH: return 'Tiền mặt';
      case PaymentMethod.CREDIT_CARD: return 'Thẻ tín dụng';
      case PaymentMethod.DEBIT_CARD: return 'Thẻ ghi nợ';
      case PaymentMethod.BANK_TRANSFER: return 'Chuyển khoản';
      case PaymentMethod.E_WALLET: return 'Ví điện tử';
      case PaymentMethod.OTHER: return 'Khác';
    }
  };

  if (loading && payments.length === 0) {
    return <p className="text-center py-8">Đang tải danh sách thanh toán...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Danh sách thanh toán</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => window.location.href = '/dashboard/payments/new'}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Tạo thanh toán mới
          </button>
          <button
            onClick={() => fetchPayments()}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            title="Làm mới"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tìm kiếm</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã giao dịch, người dùng..."
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loại thanh toán</label>
            <select
              value={paymentTypeFilter}
              onChange={(e) => setPaymentTypeFilter(e.target.value as PaymentType | '')}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Tất cả</option>
              {Object.values(PaymentType).map(type => (
                <option key={type} value={type}>{getPaymentTypeName(type)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trạng thái</label>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value as PaymentStatus | '')}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Tất cả</option>
              {Object.values(PaymentStatus).map(status => (
                <option key={status} value={status}>{getPaymentStatusName(status)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phương thức</label>
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value as PaymentMethod | '')}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Tất cả</option>
              {Object.values(PaymentMethod).map(method => (
                <option key={method} value={method}>{getPaymentMethodName(method)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Từ ngày</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Đến ngày</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex items-end md:col-span-7 gap-2">
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phương thức</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày thanh toán</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {payments.length > 0 ? (
              payments.map(payment => (
                <tr key={payment.paymentId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {payment.paymentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {payment.user?.username || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {getPaymentTypeName(payment.paymentType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(payment.amount, payment.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[payment.paymentStatus]}`}>
                      {getPaymentStatusName(payment.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {getPaymentMethodName(payment.paymentMethod)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {payment.paymentDate && formatDate(payment.paymentDate, 'DD/MM/YYYY HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {showDeleteConfirm === payment.paymentId ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-600">Xác nhận xóa?</span>
                        <button
                          className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                          onClick={() => handleDeletePayment(payment.paymentId!)}
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
                          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? 'bg-gray-100 dark:bg-gray-600' : ''} flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                    onClick={() => window.location.href = `/dashboard/payments/${payment.paymentId}`}
                                  >
                                    <ReceiptRefundIcon className="w-5 h-5 mr-2" /> Chi tiết
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? 'bg-indigo-50 dark:bg-indigo-900' : ''} flex items-center w-full px-3 py-2 text-indigo-600 dark:text-indigo-400 text-sm`}
                                    onClick={() => window.location.href = `/dashboard/payments/edit/${payment.paymentId}`}
                                  >
                                    <PencilIcon className="w-5 h-5 mr-2" /> Sửa
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? 'bg-red-50 dark:bg-red-900' : ''} flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 text-sm`}
                                    onClick={() => setShowDeleteConfirm(payment.paymentId!)}
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
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Không có dữ liệu thanh toán
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Trang {currentPage + 1} / {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Trước
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              const pageNum = currentPage < 2 ? idx :
                currentPage > totalPages - 3 ? totalPages - 5 + idx :
                  currentPage - 2 + idx;

              if (pageNum >= 0 && pageNum < totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded ${pageNum === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
