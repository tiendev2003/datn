"use client";

import { ApiResponse } from '@/types/api-responses';
import { Payment, PaymentMethod, PaymentStatus, PaymentType, User } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface PaymentFormProps {
  paymentId?: number;
  onSuccess?: () => void;
}

const schema = z.object({
  userId: z.number().min(1, "Vui lòng chọn người dùng"),
  paymentType: z.nativeEnum(PaymentType, {
    errorMap: () => ({ message: "Vui lòng chọn loại thanh toán" })
  }),
  referenceId: z.number().optional(),
  amount: z.number().min(0.01, "Số tiền phải lớn hơn 0"),
  currency: z.string().min(1, "Vui lòng chọn loại tiền tệ"),
  paymentStatus: z.nativeEnum(PaymentStatus, {
    errorMap: () => ({ message: "Vui lòng chọn trạng thái thanh toán" })
  }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    errorMap: () => ({ message: "Vui lòng chọn phương thức thanh toán" })
  }),
  transactionId: z.string().optional(),
  paymentDetails: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PaymentForm({ paymentId, onSuccess }: PaymentFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!paymentId;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentType: PaymentType.MEMBERSHIP,
      paymentStatus: PaymentStatus.PENDING,
      paymentMethod: PaymentMethod.CASH,
      currency: 'VND',
      amount: 0
    }
  });

  const watchPaymentType = watch('paymentType');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<User[]>>('/api/users');
        if (response.data.success && response.data.data) {
          setUsers(response.data.data);
        }
      } catch (err) {
        setError("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (paymentId) {
      const fetchPayment = async () => {
        try {
          setPaymentLoading(true);
          const response = await axios.get<ApiResponse<Payment>>(`/api/payments/${paymentId}`);
          if (response.data.success && response.data.data) {
            const payment = response.data.data;
            reset({
              userId: payment.user?.id,
              paymentType: payment.paymentType,
              referenceId: payment.referenceId,
              amount: payment.amount,
              currency: payment.currency,
              paymentStatus: payment.paymentStatus,
              paymentMethod: payment.paymentMethod,
              transactionId: payment.transactionId,
              paymentDetails: payment.paymentDetails,
              notes: payment.notes
            });
          }
        } catch (err) {
          setError("Không thể tải thông tin thanh toán");
        } finally {
          setPaymentLoading(false);
        }
      };

      fetchPayment();
    }
  }, [paymentId, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      let response;
      
      if (isEditMode) {
        response = await axios.put<ApiResponse<Payment>>(`/api/payments/${paymentId}`, data);
      } else {
        response = await axios.post<ApiResponse<Payment>>('/api/payments', data);
      }
      
      if (response.data.success) {
        setSuccess(true);
        setError(null);
        if (!isEditMode) {
          reset({
            ...data,
            referenceId: undefined,
            transactionId: '',
            paymentDetails: '',
            notes: ''
          });
        }
        setTimeout(() => setSuccess(false), 3000);
        if (onSuccess) onSuccess();
      } else {
        setError(response.data.message || 'Lỗi khi lưu thông tin thanh toán');
        setSuccess(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi mạng');
      setSuccess(false);
    }
  };

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(number);
  };

  if (paymentLoading) {
    return <p className="text-center py-8">Đang tải thông tin thanh toán...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {isEditMode ? 'Chỉnh sửa thanh toán' : 'Tạo thanh toán mới'}
      </h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {isEditMode ? 'Thanh toán đã được cập nhật thành công!' : 'Thanh toán đã được tạo thành công!'}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Người dùng</label>
          <select
            disabled={loading || isEditMode}
            {...register('userId', { valueAsNumber: true })}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">-- Chọn người dùng --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
          {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loại thanh toán</label>
            <select
              {...register('paymentType')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {Object.values(PaymentType).map((type) => (
                <option key={type} value={type}>
                  {type === PaymentType.MEMBERSHIP && 'Thành viên'}
                  {type === PaymentType.PT_PACKAGE && 'Gói PT'}
                  {type === PaymentType.PRODUCT && 'Sản phẩm'}
                  {type === PaymentType.SERVICE && 'Dịch vụ'}
                  {type === PaymentType.REFUND && 'Hoàn tiền'}
                  {type === PaymentType.OTHER && 'Khác'}
                </option>
              ))}
            </select>
            {errors.paymentType && <p className="text-red-500 text-sm">{errors.paymentType.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID tham chiếu</label>
            <input
              type="number"
              {...register('referenceId', { valueAsNumber: true })}
              placeholder={
                watchPaymentType === PaymentType.MEMBERSHIP ? "ID thành viên" : 
                watchPaymentType === PaymentType.PT_PACKAGE ? "ID gói PT" : 
                "ID tham chiếu"
              }
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.referenceId && <p className="text-red-500 text-sm">{errors.referenceId.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Số tiền</label>
            <input
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            <p className="text-sm text-gray-500 mt-1">
              {watch('amount') > 0 && formatCurrency(watch('amount'))}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tiền tệ</label>
            <select
              {...register('currency')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="VND">VND (₫)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
            {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái thanh toán</label>
            <select
              {...register('paymentStatus')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {Object.values(PaymentStatus).map((status) => (
                <option key={status} value={status}>
                  {status === PaymentStatus.PENDING && 'Đang xử lý'}
                  {status === PaymentStatus.COMPLETED && 'Đã hoàn thành'}
                  {status === PaymentStatus.FAILED && 'Thất bại'}
                  {status === PaymentStatus.REFUNDED && 'Đã hoàn tiền'}
                  {status === PaymentStatus.CANCELLED && 'Đã hủy'}
                </option>
              ))}
            </select>
            {errors.paymentStatus && <p className="text-red-500 text-sm">{errors.paymentStatus.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phương thức thanh toán</label>
            <select
              {...register('paymentMethod')}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {Object.values(PaymentMethod).map((method) => (
                <option key={method} value={method}>
                  {method === PaymentMethod.CASH && 'Tiền mặt'}
                  {method === PaymentMethod.CREDIT_CARD && 'Thẻ tín dụng'}
                  {method === PaymentMethod.DEBIT_CARD && 'Thẻ ghi nợ'}
                  {method === PaymentMethod.BANK_TRANSFER && 'Chuyển khoản ngân hàng'}
                  {method === PaymentMethod.E_WALLET && 'Ví điện tử'}
                  {method === PaymentMethod.OTHER && 'Khác'}
                </option>
              ))}
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mã giao dịch</label>
          <input
            type="text"
            {...register('transactionId')}
            placeholder="Mã giao dịch từ cổng thanh toán (nếu có)"
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chi tiết thanh toán</label>
          <textarea
            rows={3}
            {...register('paymentDetails')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Thông tin chi tiết về thanh toán (nếu có)"
          ></textarea>
          {errors.paymentDetails && <p className="text-red-500 text-sm">{errors.paymentDetails.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú</label>
          <textarea
            rows={3}
            {...register('notes')}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ghi chú thanh toán (nếu có)"
          ></textarea>
          {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isSubmitting ? 'Đang xử lý...' : isEditMode ? 'Cập nhật thanh toán' : 'Tạo thanh toán'}
        </button>
      </form>
    </div>
  );
}
