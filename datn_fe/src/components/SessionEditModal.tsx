import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { RiCalendarLine, RiCloseLine, RiInformationLine, RiTimeLine } from 'react-icons/ri';

interface SessionEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  session: {
    id: string;
    clientName: string;
    clientAvatar: string;
    time: string;
    duration: string;
    sessionType: string;
    status: 'scheduled' | 'completed' | 'canceled';
    notes?: string;
    date?: Date;
  };
  onSave: (updatedSession: any) => void;
}

export default function SessionEditModal({ isOpen, closeModal, session, onSave }: SessionEditModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    duration: '',
    sessionType: '',
    notes: '',
    status: ''
  });

  useEffect(() => {
    if (session) {
      // Parse time string from "09:00 - 10:30" format
      const timeParts = session.time.split(' - ');
      const startTime = timeParts[0];
      
      // Format date to YYYY-MM-DD for date input
      const dateFormatted = session.date ? 
        `${session.date.getFullYear()}-${String(session.date.getMonth() + 1).padStart(2, '0')}-${String(session.date.getDate()).padStart(2, '0')}` :
        '';
      
      setFormData({
        date: dateFormatted,
        startTime,
        duration: session.duration,
        sessionType: session.sessionType,
        notes: session.notes || '',
        status: session.status
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate end time based on start time and duration
    const [hours, minutes] = formData.startTime.split(':').map(Number);
    const durationMinutes = parseInt(formData.duration);
    
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + durationMinutes);
    
    const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
    
    // Format time as "09:00 - 10:30"
    const timeFormatted = `${formData.startTime} - ${endTime}`;
    
    const updatedSession = {
      ...session,
      time: timeFormatted,
      duration: `${durationMinutes} phút`,
      sessionType: formData.sessionType,
      notes: formData.notes,
      status: formData.status as 'scheduled' | 'completed' | 'canceled',
      // Parse date string to Date object
      date: formData.date ? new Date(formData.date) : session.date
    };
    
    onSave(updatedSession);
    closeModal();
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
                    Chỉnh sửa buổi tập
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
                  <div className="flex items-center mb-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={session.clientAvatar || '/images/default-avatar.png'}
                        alt={session.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{session.clientName}</h4>
                      <p className="text-sm text-gray-500">ID buổi tập: {session.id}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <RiCalendarLine className="mr-1" /> Ngày tập
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <RiTimeLine className="mr-1" /> Thời gian bắt đầu
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng (phút)</label>
                        <select
                          name="duration"
                          value={formData.duration.replace(' phút', '')}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="30">30</option>
                          <option value="45">45</option>
                          <option value="60">60</option>
                          <option value="90">90</option>
                          <option value="120">120</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại buổi tập</label>
                      <input
                        type="text"
                        name="sessionType"
                        value={formData.sessionType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <RiInformationLine className="mr-1" /> Trạng thái
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="scheduled">Đã lên lịch</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="canceled">Đã hủy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
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
                        Lưu thay đổi
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
