// Membership form component
"use client";

import { ApiResponse } from '@/types/api-responses';
import { Membership } from '@/types/models';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  userId: z.number({ invalid_type_error: 'ID người dùng không hợp lệ' }).min(1),
  membershipTypeId: z.number({ invalid_type_error: 'ID loại gói không hợp lệ' }).min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày bắt đầu không hợp lệ'),
  actualPrice: z.number({ invalid_type_error: 'Giá thực không hợp lệ' }).min(0),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function MembershipForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { startDate: new Date().toISOString().slice(0,10) }
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post<ApiResponse<Membership>>('/api/memberships', data);
      if (res.data.success) {
        setShowSuccessModal(true);
      } else {
        setErrorMessage(res.data.message || 'Lỗi khi tạo thành viên');
      }
    } catch {
      setErrorMessage('Lỗi mạng');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6   mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng ký gói thành viên</h2>
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User ID Field */}
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              ID Người dùng <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="userId"
              {...register("userId", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userId && (
              <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
            )}
          </div>

          {/* Membership Type Field */}
          <div>
            <label htmlFor="membershipTypeId" className="block text-sm font-medium text-gray-700 mb-1">
              Loại gói thành viên <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="membershipTypeId"
              {...register("membershipTypeId", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.membershipTypeId && (
              <p className="mt-1 text-sm text-red-600">{errors.membershipTypeId.message}</p>
            )}
          </div>

          {/* Start Date Field */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Ngày bắt đầu <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              {...register("startDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          {/* Actual Price Field */}
          <div>
            <label htmlFor="actualPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Giá thực tế <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="actualPrice"
              {...register("actualPrice", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.actualPrice && (
              <p className="mt-1 text-sm text-red-600">{errors.actualPrice.message}</p>
            )}
          </div>
        </div>

        {/* Notes Field - Full Width */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            id="notes"
            rows={3}
            {...register("notes")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <Dialog
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <Dialog.Title className="text-lg font-medium text-gray-900">Thông báo</Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-500">
              Tạo thành viên thành công
            </Dialog.Description>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Đóng
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
