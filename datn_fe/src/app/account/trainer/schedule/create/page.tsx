'use client';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiArrowLeftLine, RiCalendarEventLine, RiInformationLine, RiTimeLine, RiUser3Line } from 'react-icons/ri';

interface Client {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
}

interface SessionType {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
}

export default function CreateSchedule() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  // Form states
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<string>('');
  const [duration, setDuration] = useState<string>('60');
  const [notes, setNotes] = useState<string>('');
  
  // Mock data
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Trần Văn B',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      email: 'tranvanb@example.com',
      phone: '0912345678'
    },
    {
      id: '2',
      name: 'Lê Thị C',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      email: 'lethic@example.com',
      phone: '0923456789'
    },
    {
      id: '3',
      name: 'Phạm Văn D',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      email: 'phamvand@example.com',
      phone: '0934567890'
    },
    {
      id: '4',
      name: 'Nguyễn Thị X',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      email: 'nguyenthix@example.com',
      phone: '0945678901'
    }
  ]);
  
  const sessionTypes: SessionType[] = [
    {
      id: 'strength',
      name: 'Tập luyện sức mạnh',
      description: 'Tập trung vào phát triển sức mạnh cơ bắp và sức bền.',
      duration: 90
    },
    {
      id: 'cardio',
      name: 'Cardio & Đốt mỡ',
      description: 'Tập trung vào đốt cháy calo và nâng cao sức bền tim mạch.',
      duration: 60
    },
    {
      id: 'flexibility',
      name: 'Tăng độ linh hoạt',
      description: 'Cải thiện sự linh hoạt của cơ thể và phạm vi vận động.',
      duration: 60
    },
    {
      id: 'rehab',
      name: 'Phục hồi chức năng',
      description: 'Tập luyện nhẹ nhàng cho người đang hồi phục sau chấn thương.',
      duration: 45
    },
    {
      id: 'consultation',
      name: 'Tư vấn dinh dưỡng',
      description: 'Tư vấn về chế độ ăn uống và dinh dưỡng phù hợp.',
      duration: 30
    }
  ];

  useEffect(() => {
    // Redirect if not authenticated or not a trainer
    if (!isLoading && (!isAuthenticated || user?.role !== 'trainer')) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isLoading, user]);
  
  // Calculate tomorrow's date for min date attribute
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  // Update duration when session type changes
  useEffect(() => {
    if (sessionType) {
      const selected = sessionTypes.find(type => type.id === sessionType);
      if (selected) {
        setDuration(selected.duration.toString());
      }
    }
  }, [sessionType]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient || !selectedDate || !startTime || !sessionType) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
    
    setFormSubmitting(true);
    
    try {
      // Here you would normally make an API call to create the schedule
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Redirect back to schedule page after successful creation
      router.push('/account/trainer/schedule');
    } catch (error) {
      console.error('Lỗi khi tạo lịch:', error);
      alert('Có lỗi xảy ra khi tạo lịch. Vui lòng thử lại sau.');
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Find selected client details
  const selectedClientDetails = clients.find(client => client.id === selectedClient);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Tạo lịch mới" />
        <Link 
          href="/account/trainer/schedule"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <RiArrowLeftLine className="mr-1" />
          <span>Quay lại</span>
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Client Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                <span className="flex items-center mb-2">
                  <RiUser3Line className="mr-2" /> 
                  Học viên <span className="text-red-500">*</span>
                </span>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  required
                >
                  <option value="">-- Chọn học viên --</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </option>
                  ))}
                </select>
              </label>
            </motion.div>
            
            {/* Date & Time Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                <span className="flex items-center mb-2">
                  <RiCalendarEventLine className="mr-2" /> 
                  Ngày <span className="text-red-500">*</span>
                </span>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={getTomorrowDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </label>
              
              <label className="block text-gray-700 font-medium">
                <span className="flex items-center mb-2">
                  <RiTimeLine className="mr-2" /> 
                  Thời gian bắt đầu <span className="text-red-500">*</span>
                </span>
                <input 
                  type="time" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </label>
            </motion.div>
            
            {/* Session Type Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                <span className="flex items-center mb-2">
                  <RiCalendarEventLine className="mr-2" /> 
                  Loại buổi tập <span className="text-red-500">*</span>
                </span>
              </label>
              
              <div className="grid grid-cols-1 gap-3">
                {sessionTypes.map(type => (
                  <div 
                    key={type.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      sessionType === type.id 
                        ? 'border-primary bg-primary bg-opacity-5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSessionType(type.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-gray-500 text-sm">{type.duration} phút</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{type.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Client Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg p-4"
            >
              <h3 className="font-medium text-lg mb-4">Chi tiết học viên</h3>
              
              {selectedClientDetails ? (
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={selectedClientDetails.avatar}
                      alt={selectedClientDetails.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedClientDetails.name}</h4>
                    <p className="text-gray-600 text-sm">{selectedClientDetails.email}</p>
                    <p className="text-gray-600 text-sm">{selectedClientDetails.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Vui lòng chọn học viên</p>
              )}
            </motion.div>
            
            {/* Session Duration */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                <span className="flex items-center mb-2">
                  <RiTimeLine className="mr-2" /> 
                  Thời lượng (phút)
                </span>
                <input 
                  type="number" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min="15"
                  max="180"
                  step="15"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </label>
            </motion.div>
            
            {/* Notes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                <span className="flex items-center mb-2">
                  <RiInformationLine className="mr-2" /> 
                  Ghi chú
                </span>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="Nhập ghi chú hoặc hướng dẫn đặc biệt cho buổi tập này..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </motion.div>
            
            {/* Schedule Summary */}
            {selectedClient && selectedDate && startTime && sessionType && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="border border-green-200 bg-green-50 rounded-lg p-4"
              >
                <h3 className="font-medium text-green-800 mb-2">Tóm tắt lịch</h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li><strong>Học viên:</strong> {selectedClientDetails?.name || 'Chưa chọn'}</li>
                  <li><strong>Ngày:</strong> {selectedDate}</li>
                  <li><strong>Thời gian:</strong> {startTime}</li>
                  <li><strong>Buổi tập:</strong> {sessionTypes.find(t => t.id === sessionType)?.name || 'Chưa chọn'}</li>
                  <li><strong>Thời lượng:</strong> {duration} phút</li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8 flex justify-end"
        >
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={formSubmitting || !selectedClient || !selectedDate || !startTime || !sessionType}
          >
            {formSubmitting ? 'Đang xử lý...' : 'Tạo lịch'}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
