import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export interface ShiftData {
  id?: number;
  staffId: number;
  staffName?: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: 'morning' | 'afternoon' | 'evening' | 'night' | 'fullday';
  status: 'scheduled' | 'completed' | 'missed';
  note?: string;
}

interface ShiftScheduleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: ShiftData;
  onSave: (data: ShiftData) => void;
  title: string;
  staffList?: { id: number; name: string }[];
}

export default function ShiftScheduleModal({ 
  isOpen, 
  closeModal, 
  initialData, 
  onSave,
  title,
  staffList = []
}: ShiftScheduleModalProps) {
  // Get current date in YYYY-MM-DD format for default date
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const defaultShift: ShiftData = {
    staffId: staffList.length > 0 ? staffList[0].id : 0,
    date: formattedToday,
    startTime: '08:00',
    endTime: '17:00',
    shiftType: 'fullday',
    status: 'scheduled',
    note: '',
  };
  
  const [formData, setFormData] = useState<ShiftData>(defaultShift);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Presets for different shift types
  const shiftPresets = {
    morning: { startTime: '08:00', endTime: '12:00' },
    afternoon: { startTime: '13:00', endTime: '17:00' },
    evening: { startTime: '17:00', endTime: '22:00' },
    night: { startTime: '22:00', endTime: '06:00' },
    fullday: { startTime: '08:00', endTime: '17:00' },
  };

  useEffect(() => {
    // If initialData is provided, use it
    if (initialData) {
      setFormData(initialData);
    } else {
      // Otherwise, reset to default
      setFormData(defaultShift);
    }
    // Reset errors
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle special case for shift type to automatically set times
    if (name === 'shiftType') {
      const shiftType = value as keyof typeof shiftPresets;
      const preset = shiftPresets[shiftType];
      
      setFormData(prev => ({ 
        ...prev, 
        shiftType: value as ShiftData['shiftType'],
        startTime: preset.startTime,
        endTime: preset.endTime
      }));
    } else if (name === 'staffId') {
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
    
    if (!formData.date) {
      newErrors.date = 'Ngày không được để trống';
      valid = false;
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Giờ bắt đầu không được để trống';
      valid = false;
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'Giờ kết thúc không được để trống';
      valid = false;
    }
    
    // Check if end time is after start time (except for night shifts that cross midnight)
    if (formData.startTime && formData.endTime && formData.shiftType !== 'night') {
      if (formData.startTime >= formData.endTime) {
        newErrors.endTime = 'Giờ kết thúc phải sau giờ bắt đầu';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      closeModal();
    }
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

                    {/* Shift date */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                      )}
                    </div>

                    {/* Shift Type */}
                    <div>
                      <label htmlFor="shiftType" className="block text-sm font-medium text-gray-700 mb-1">
                        Loại ca <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="shiftType"
                        name="shiftType"
                        value={formData.shiftType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="morning">Ca sáng (8:00 - 12:00)</option>
                        <option value="afternoon">Ca chiều (13:00 - 17:00)</option>
                        <option value="evening">Ca tối (17:00 - 22:00)</option>
                        <option value="night">Ca đêm (22:00 - 6:00)</option>
                        <option value="fullday">Ca cả ngày (8:00 - 17:00)</option>
                      </select>
                    </div>

                    {/* Shift times */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Giờ bắt đầu <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        {errors.startTime && (
                          <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Giờ kết thúc <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        {errors.endTime && (
                          <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="scheduled">Đã lên lịch</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="missed">Đã bỏ lỡ</option>
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