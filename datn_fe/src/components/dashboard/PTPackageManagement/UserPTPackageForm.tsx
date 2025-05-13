
"use client";

import { ApiResponse } from '@/types/api-responses';
import { PaymentStatus, PTPackage, TrainerProfile, UserPTPackage } from '@/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  userId: z.number().min(1, 'ID người dùng là bắt buộc'),
  packageId: z.number().min(1, 'Vui lòng chọn gói PT'),
  trainerId: z.number().min(1, 'Vui lòng chọn huấn luyện viên'),
  purchaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày mua không hợp lệ'),
  paymentStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']).default('PENDING'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function UserPTPackageForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      purchaseDate: new Date().toISOString().slice(0, 10),
      paymentStatus: 'PENDING' as PaymentStatus
    }
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [packages, setPackages] = useState<PTPackage[]>([]);
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PTPackage | null>(null);

  useEffect(() => {
    // Fetch available PT packages
    axios.get<ApiResponse<PTPackage[]>>('/api/pt-packages?isActive=true')
      .then(res => {
        if (res.data.success && res.data.data) {
          setPackages(res.data.data);
        }
      })
      .catch(() => {
        setApiError('Không thể tải danh sách gói PT');
      });
    
    // Fetch active trainers
    axios.get<ApiResponse<TrainerProfile[]>>('/api/trainers?isActive=true')
      .then(res => {
        if (res.data.success && res.data.data) {
          setTrainers(res.data.data);
        }
      })
      .catch(() => {
        setApiError('Không thể tải danh sách huấn luyện viên');
      });
  }, []);

  // Handle package selection to update UI
  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const packageId = parseInt(e.target.value);
    const selected = packages.find(p => p.packageId === packageId) || null;
    setSelectedPackage(selected);
  };

  const onSubmit = async (data: FormData) => {
    setSuccess(null);
    setApiError(null);
    
    try {
      const res = await axios.post<ApiResponse<UserPTPackage>>('/api/user-pt-packages', data);
      if (res.data.success) {
        setSuccess('Đăng ký gói PT thành công');
      } else {
        setApiError(res.data.message || 'Lỗi khi đăng ký gói PT');
      }
    } catch (err) {
      setApiError('Lỗi kết nối mạng');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      {success && <div className="bg-green-50 text-green-800 p-3 rounded">{success}</div>}
      {apiError && <div className="bg-red-50 text-red-800 p-3 rounded">{apiError}</div>}
      
      <div>
        <label className="block text-sm font-medium">Người dùng (ID)</label>
        <input type="number" {...register('userId', { valueAsNumber: true })} className="mt-1 block w-full p-2 border rounded" />
        {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Gói PT</label>
          <select 
            {...register('packageId', { valueAsNumber: true })} 
            onChange={handlePackageChange}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="">-- Chọn gói PT --</option>
            {packages.map(pkg => (
              <option key={pkg.packageId} value={pkg.packageId}>
                {pkg.packageName} - {pkg.numberOfSessions} buổi - {pkg.validityDays} ngày
              </option>
            ))}
          </select>
          {errors.packageId && <p className="text-red-500 text-sm">{errors.packageId.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Huấn luyện viên</label>
          <select 
            {...register('trainerId', { valueAsNumber: true })} 
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="">-- Chọn huấn luyện viên --</option>
            {trainers.map(trainer => (
              <option key={trainer.trainerId} value={trainer.trainerId}>
                {trainer.user?.username || trainer.user?.email} - {trainer.specialization}
              </option>
            ))}
          </select>
          {errors.trainerId && <p className="text-red-500 text-sm">{errors.trainerId.message}</p>}
        </div>
      </div>
      
      {selectedPackage && (
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-medium">Thông tin gói đã chọn</h3>
          <ul className="mt-2 space-y-1">
            <li><span className="font-medium">Tên gói:</span> {selectedPackage.packageName}</li>
            <li><span className="font-medium">Số buổi:</span> {selectedPackage.numberOfSessions}</li>
            <li><span className="font-medium">Thời hạn:</span> {selectedPackage.validityDays} ngày</li>
            <li><span className="font-medium">Giá:</span> {selectedPackage.price.toLocaleString()} VND</li>
            {selectedPackage.discountPercentage && selectedPackage.discountPercentage > 0 && (
              <li><span className="font-medium">Giảm giá:</span> {selectedPackage.discountPercentage}%</li>
            )}
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Ngày mua</label>
          <input type="date" {...register('purchaseDate')} className="mt-1 block w-full p-2 border rounded" />
          {errors.purchaseDate && <p className="text-red-500 text-sm">{errors.purchaseDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Trạng thái thanh toán</label>
          <select {...register('paymentStatus')} className="mt-1 block w-full p-2 border rounded">
            <option value="PENDING">Đang chờ</option>
            <option value="COMPLETED">Đã hoàn tất</option>
            <option value="FAILED">Thất bại</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium">Ghi chú</label>
        <textarea {...register('notes')} className="mt-1 block w-full p-2 border rounded" rows={3} />
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Đăng ký gói PT'}
      </button>
    </form>
  );
}
