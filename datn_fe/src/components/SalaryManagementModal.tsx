import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export interface SalaryData {
  id?: number;
  staffId: number;
  staffName?: string;
  baseSalary: number;
  bonus: number;
  deduction: number;
  netSalary?: number;
  month: number;
  year: number;
  paymentStatus: 'pending' | 'paid';
  paymentDate?: string;
  note?: string;
}

interface SalaryManagementModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: SalaryData;
  onSave: (data: SalaryData) => void;
  title: string;
  staffList?: { id: number; name: string }[];
}

export default function SalaryManagementModal({ 
  isOpen, 
  closeModal, 
  initialData, 
  onSave,
  title,
  staffList = []
}: SalaryManagementModalProps) {
  const defaultSalary: SalaryData = {
    staffId: staffList.length > 0 ? staffList[0].id : 0,
    baseSalary: 0,
    bonus: 0,
    deduction: 0,
    month: new Date().getMonth() + 1, // Current month
    year: new Date().getFullYear(), // Current year
    paymentStatus: 'pending',
    note: '',
  };
  
  const [formData, setFormData] = useState<SalaryData>(defaultSalary);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [calculatedSalary, setCalculatedSalary] = useState<number>(0);

  // Calculate net salary whenever base salary, bonus or deduction changes
  useEffect(() => {
    const net = (formData.baseSalary || 0) + (formData.bonus || 0) - (formData.deduction || 0);
    setCalculatedSalary(net > 0 ? net : 0);
  }, [formData.baseSalary, formData.bonus, formData.deduction]);

  useEffect(() => {
    // If initialData is provided, use it
    if (initialData) {
      setFormData(initialData);
    } else {
      // Otherwise, reset to default
      setFormData(defaultSalary);
    }
    // Reset errors
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'baseSalary' || name === 'bonus' || name === 'deduction') {
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else if (name === 'month' || name === 'year' || name === 'staffId') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};
    
    // Required fields
    if (!formData.staffId) {
      newErrors.staffId = 'Vui lòng chọn nhân viên';
      valid = false;
    }
    
    if (formData.baseSalary <= 0) {
      newErrors.baseSalary = 'Lương cơ bản phải lớn hơn 0';
      valid = false;
    }
    
    if (formData.month < 1 || formData.month > 12) {
      newErrors.month = 'Tháng không hợp lệ';
      valid = false;
    }
    
    if (formData.year < 2000 || formData.year > 2100) {
      newErrors.year = 'Năm không hợp lệ';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const salaryData = { 
        ...formData,
        netSalary: calculatedSalary
      };
      
      // If payment status is paid and we don't have a payment date, set it to today
      if (salaryData.paymentStatus === 'paid' && !salaryData.paymentDate) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        salaryData.paymentDate = `${day}/${month}/${year}`;
      }
      
      onSave(salaryData);
      closeModal();
    }
  };

  // Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `Tháng ${i + 1}`
  }));

  // Generate year options (current year and 3 years before and after)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 7 }, (_, i) => ({
    value: currentYear - 3 + i,
    label: `${currentYear - 3 + i}`
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Staff selection field */}
                    <div>
                      <label htmlFor="staffId" className="block text-sm font-medium text-gray-700 mb-1">
                        Nhân viên <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="staffId"
                        name="staffId"
                        value={formData.staffId}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.staffId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                        disabled={!!initialData} // Disable if editing existing record
                      >
                        {staffList.length === 0 && (
                          <option value="0">Không có nhân viên nào</option>
                        )}
                        {staffList.map(staff => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                      {errors.staffId && (
                        <p className="mt-1 text-sm text-red-500">{errors.staffId}</p>
                      )}
                    </div>

                    {/* Period (Month/Year) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                          Tháng <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="month"
                          name="month"
                          value={formData.month}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.month ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          disabled={!!initialData} // Disable if editing existing record
                        >
                          {monthOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.month && (
                          <p className="mt-1 text-sm text-red-500">{errors.month}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                          Năm <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          disabled={!!initialData} // Disable if editing existing record
                        >
                          {yearOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.year && (
                          <p className="mt-1 text-sm text-red-500">{errors.year}</p>
                        )}
                      </div>
                    </div>

                    {/* Base salary */}
                    <div>
                      <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700 mb-1">
                        Lương cơ bản (VNĐ) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="baseSalary"
                        name="baseSalary"
                        value={formData.baseSalary}
                        onChange={handleChange}
                        min="0"
                        step="100000"
                        className={`w-full px-3 py-2 border ${errors.baseSalary ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.baseSalary && (
                        <p className="mt-1 text-sm text-red-500">{errors.baseSalary}</p>
                      )}
                    </div>

                    {/* Bonus */}
                    <div>
                      <label htmlFor="bonus" className="block text-sm font-medium text-gray-700 mb-1">
                        Thưởng (VNĐ)
                      </label>
                      <input
                        type="number"
                        id="bonus"
                        name="bonus"
                        value={formData.bonus}
                        onChange={handleChange}
                        min="0"
                        step="50000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Deduction */}
                    <div>
                      <label htmlFor="deduction" className="block text-sm font-medium text-gray-700 mb-1">
                        Khấu trừ (VNĐ)
                      </label>
                      <input
                        type="number"
                        id="deduction"
                        name="deduction"
                        value={formData.deduction}
                        onChange={handleChange}
                        min="0"
                        step="50000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Calculated net salary */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Tổng lương:</span>
                        <span className="font-semibold text-lg text-primary">
                          {formatCurrency(calculatedSalary)}
                        </span>
                      </div>
                    </div>

                    {/* Payment Status */}
                    <div>
                      <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái thanh toán
                      </label>
                      <select
                        id="paymentStatus"
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="pending">Chưa thanh toán</option>
                        <option value="paid">Đã thanh toán</option>
                      </select>
                    </div>

                    {/* Note */}
                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        value={formData.note || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={closeModal}
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}