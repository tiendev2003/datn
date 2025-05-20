'use client';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    RiAddLine,
    RiCalendarCheckLine,
    RiCalendarEventLine,
    RiDeleteBinLine,
    RiInformationLine,
    RiSaveLine
} from 'react-icons/ri';

interface TimeSlot {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

const daysOfWeek = [
  { id: 'monday', label: 'Thứ 2' },
  { id: 'tuesday', label: 'Thứ 3' },
  { id: 'wednesday', label: 'Thứ 4' },
  { id: 'thursday', label: 'Thứ 5' },
  { id: 'friday', label: 'Thứ 6' },
  { id: 'saturday', label: 'Thứ 7' },
  { id: 'sunday', label: 'Chủ nhật' },
];

export default function TrainerAvailability() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [availabilitySlots, setAvailabilitySlots] = useState<TimeSlot[]>([
    { id: '1', day: 'monday', startTime: '08:00', endTime: '12:00' },
    { id: '2', day: 'monday', startTime: '14:00', endTime: '18:00' },
    { id: '3', day: 'tuesday', startTime: '09:00', endTime: '13:00' },
    { id: '4', day: 'wednesday', startTime: '08:00', endTime: '12:00' },
    { id: '5', day: 'wednesday', startTime: '15:00', endTime: '19:00' },
    { id: '6', day: 'friday', startTime: '08:00', endTime: '12:00' },
    { id: '7', day: 'saturday', startTime: '10:00', endTime: '15:00' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Omit<TimeSlot, 'id'>>({
    day: 'monday',
    startTime: '09:00',
    endTime: '10:00',
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated or not a trainer
    if (!isLoading && (!isAuthenticated || user?.role !== 'trainer')) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isLoading, user]);

  const handleAddSlot = () => {
    // Validate time slot
    if (formData.startTime >= formData.endTime) {
      alert('Thời gian bắt đầu phải trước thời gian kết thúc');
      return;
    }

    // Check for overlap
    const hasOverlap = availabilitySlots.some(
      (slot) =>
        slot.day === formData.day &&
        ((formData.startTime >= slot.startTime && formData.startTime < slot.endTime) ||
          (formData.endTime > slot.startTime && formData.endTime <= slot.endTime) ||
          (formData.startTime <= slot.startTime && formData.endTime >= slot.endTime))
    );

    if (hasOverlap) {
      alert('Thời gian này đã bị trùng với một khung giờ khác');
      return;
    }

    const newSlot = {
      id: Date.now().toString(),
      ...formData,
    };

    setAvailabilitySlots([...availabilitySlots, newSlot]);
    setUnsavedChanges(true);
    setShowAddForm(false);
    setFormData({
      day: 'monday',
      startTime: '09:00',
      endTime: '10:00',
    });
  };

  const handleDeleteSlot = (id: string) => {
    setAvailabilitySlots(availabilitySlots.filter((slot) => slot.id !== id));
    setUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real app, send data to backend API
    // For now, just simulate saving
    setTimeout(() => {
      setUnsavedChanges(false);
      setSuccessMessage('Lưu thời gian làm việc thành công!');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }, 1000);
  };

  const translateDay = (day: string) => {
    const dayItem = daysOfWeek.find((d) => d.id === day);
    return dayItem ? dayItem.label : day;
  };

  // Group slots by day
  const slotsByDay = daysOfWeek.map((day) => ({
    dayId: day.id,
    dayLabel: day.label,
    slots: availabilitySlots.filter(
      (slot) => slot.day === day.id
    ).sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Quản lý thời gian làm việc" />

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border-l-4 border-primary p-4 rounded-lg"
      >
        <div className="flex items-start">
          <RiInformationLine className="text-primary text-xl mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium">Thiết lập thời gian làm việc của bạn</h3>
            <p className="text-sm text-gray-600 mt-1">
              Thiết lập khung giờ bạn có thể làm việc mỗi ngày. Học viên chỉ có thể đặt lịch trong 
              khung giờ bạn đã đăng ký. Bạn có thể thêm nhiều khung giờ trong một ngày.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          {showAddForm ? 'Hủy' : <><RiAddLine className="mr-1" /> Thêm khung giờ</>}
        </button>

        {unsavedChanges && (
          <button
            onClick={handleSaveChanges}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <RiSaveLine className="mr-1" /> Lưu thay đổi
          </button>
        )}
      </div>

      {/* Add New Time Slot Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="font-bold mb-4">Thêm khung giờ làm việc mới</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">
                Ngày trong tuần
              </label>
              <select
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value as TimeSlot['day'] })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {daysOfWeek.map((day) => (
                  <option key={day.id} value={day.id}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian bắt đầu
              </label>
              <input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian kết thúc
              </label>
              <input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddSlot}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Thêm khung giờ
            </button>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Availability Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold">Lịch thời gian làm việc</h2>
          <div className="flex items-center text-sm text-gray-500">
            <RiCalendarCheckLine className="mr-1" />
            <span>Tổng khung giờ: {availabilitySlots.length}</span>
          </div>
        </div>

        <div>
          {slotsByDay.map((dayGroup) => (
            <div key={dayGroup.dayId} className="border-b border-gray-100 last:border-b-0">
              <div className="p-4 bg-gray-50 font-medium flex items-center">
                <RiCalendarEventLine className="mr-2 text-primary" />
                {dayGroup.dayLabel}
                <span className="ml-2 text-sm text-gray-500">
                  ({dayGroup.slots.length} khung giờ)
                </span>
              </div>

              {dayGroup.slots.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm">Không có khung giờ nào cho ngày này</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {dayGroup.slots.map((slot) => (
                    <motion.li
                      key={slot.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <div>
                        <div className="font-medium">
                          {slot.startTime} - {slot.endTime}
                        </div>
                        <div className="text-sm text-gray-500">
                          {translateDay(slot.day)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {availabilitySlots.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <RiCalendarEventLine className="mx-auto mb-2 text-3xl text-gray-400" />
            <p>Bạn chưa có khung giờ làm việc nào.</p>
            <p className="text-sm mt-1">
              Hãy thêm khung giờ làm việc để học viên có thể đặt lịch tập với bạn.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
