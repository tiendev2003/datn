'use client';

import ClientDetailsModal from '@/components/ClientDetailsModal';
import PageTitle from '@/components/PageTitle';
import SessionEditModal from '@/components/SessionEditModal';
import { useAuth } from '@/context/AuthContext';
import { mockClients } from '@/utils/mockData';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiAddLine, RiArrowLeftSLine, RiArrowRightSLine, RiCalendarEventLine, RiCheckLine, RiCloseLine, RiEyeLine, RiPencilLine } from 'react-icons/ri';

interface SessionEvent {
  id: string;
  clientName: string;
  clientAvatar: string;
  time: string;
  duration: string;
  sessionType: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  clientId: string; // Add clientId to connect with full client data
  date?: Date;
}

interface ClientData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  goals?: string;
  medicalHistory?: string;
  trainingHistory?: string;
  startDate?: string;
  notes?: string;
}

interface DaySchedule {
  date: Date;
  dayName: string;
  isToday: boolean;
  events: SessionEvent[];
}

export default function TrainerSchedule() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  
  // States for modals
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isSessionEditModalOpen, setIsSessionEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [selectedSession, setSelectedSession] = useState<SessionEvent | null>(null);
    // Function to generate week days starting from Monday
  const generateWeekDays = (inputDate: Date): Date[] => {
    const days: Date[] = [];
    const currentDate = new Date(inputDate);
    
    // Get Monday of the current week
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    
    const monday = new Date(currentDate);
    monday.setDate(diff);
    
    // Generate days from Monday to Sunday
    const startDate = new Date(monday);
    for (let i = 0; i < 7; i++) {
      days.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    
    return days;
  };
  
  const formatDateStr = (date: Date): string => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    });
  };
  
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
    // Navigate to previous week
  const goToPreviousWeek = () => {
    if (currentWeek.length > 0) {
      const prevWeekStart = new Date(currentWeek[0]);
      prevWeekStart.setDate(prevWeekStart.getDate() - 7);
      setCurrentWeek(generateWeekDays(prevWeekStart));
      setSelectedDayIndex(0); // Select Monday by default when changing weeks
    }
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    if (currentWeek.length > 0) {
      const nextWeekStart = new Date(currentWeek[0]);
      nextWeekStart.setDate(nextWeekStart.getDate() + 7);
      setCurrentWeek(generateWeekDays(nextWeekStart));
      setSelectedDayIndex(0); // Select Monday by default when changing weeks
    }
  };
  
  // Go to current week
  const goToCurrentWeek = () => {
    const today = new Date();
    setCurrentWeek(generateWeekDays(today));
    
    // Set today as the selected day
    const todayDayOfWeek = today.getDay();
    const index = todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1; // Convert to 0-6 where 0 is Monday
    setSelectedDayIndex(index);
  };
    // Mock data for trainer sessions with clientId to connect to full client data
  const mockTrainerSessions: SessionEvent[] = [
    {
      id: '1',
      clientName: 'Trần Văn B',
      clientAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '09:00 - 10:30',
      duration: '90 phút',
      sessionType: 'Tập luyện cường độ cao',
      status: 'scheduled',
      clientId: '1'
    },
    {
      id: '2',
      clientName: 'Lê Thị C',
      clientAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '14:00 - 15:00',
      duration: '60 phút',
      sessionType: 'Tập phục hồi chức năng',
      status: 'scheduled',
      clientId: '2'
    },
    {
      id: '3',
      clientName: 'Phạm Văn D',
      clientAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      time: '16:30 - 18:00',
      duration: '90 phút',
      sessionType: 'Tăng cơ giảm mỡ',
      status: 'scheduled',
      clientId: '3'
    },
    {
      id: '4',
      clientName: 'Nguyễn Thị X',
      clientAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      time: '10:00 - 11:30',
      duration: '90 phút',
      sessionType: 'Yoga cá nhân',
      status: 'scheduled',
      notes: 'Lưu ý: Học viên có vấn đề về cột sống',
      clientId: '4'
    },
    {
      id: '5',
      clientName: 'Trần Văn Y',
      clientAvatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      time: '09:00 - 10:30',
      duration: '90 phút',
      sessionType: 'Tập tăng cơ',
      status: 'scheduled',
      clientId: '5'
    }
  ];
    // Initialize current week and set today as selected day on component mount
  useEffect(() => {
    const today = new Date();
    setCurrentWeek(generateWeekDays(today));
    
    // Set today as the default selected day
    const todayDayOfWeek = today.getDay(); 
    const index = todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1; // Convert to 0-6 where 0 is Monday
    setSelectedDayIndex(index);
  }, []);
    // Generate schedule for the current week whenever currentWeek changes
  useEffect(() => {
    if (currentWeek.length > 0) {
      const scheduleData: DaySchedule[] = currentWeek.map(date => {
        // For demo purposes, assign some sessions to days
        let dayEvents: SessionEvent[] = [];
        
        // Add events for all days of the week including Sunday
        // For demo purposes, today gets all sessions, other days get random 1-2 sessions
        if (isToday(date)) {
          dayEvents = [...mockTrainerSessions];
        } else {
          // For other days, randomly add 0-2 sessions
          const randomCount = Math.floor(Math.random() * 3); // 0, 1, or 2 events
          if (randomCount > 0) {
            const shuffled = [...mockTrainerSessions].sort(() => 0.5 - Math.random());
            dayEvents = shuffled.slice(0, randomCount);
          }
        }
        
        // Format the Vietnamese day names
        const dayNamesVi = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
        const viDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Transform to 0 for Monday, 6 for Sunday
        
        return {
          date,
          dayName: dayNamesVi[viDayIndex],
          isToday: isToday(date),
          events: dayEvents
        };
      });
      
      setWeekSchedule(scheduleData);
    }
  }, [currentWeek]);
  
  useEffect(() => {
    // Redirect if not authenticated or not a trainer
    if (!isLoading && (!isAuthenticated || user?.role !== 'trainer')) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isLoading, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'border-blue-200 bg-blue-50';
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'canceled':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  // Functions for handling modals
  const openClientModal = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setIsClientModalOpen(true);
    }
  };
  
  const openSessionEditModal = (session: SessionEvent) => {
    const sessionWithDate = {
      ...session,
      date: weekSchedule.find(day => 
        day.events.some(event => event.id === session.id)
      )?.date || new Date()
    };
    setSelectedSession(sessionWithDate);
    setIsSessionEditModalOpen(true);
  };
  
  const handleSessionUpdate = (updatedSession: SessionEvent) => {
    // In a real app, you'd send this to an API
    // For now, we'll update the local state
    const updatedSchedule = weekSchedule.map(day => {
      const updatedEvents = day.events.map(event => 
        event.id === updatedSession.id ? updatedSession : event
      );
      
      return {
        ...day,
        events: updatedEvents
      };
    });
    
    setWeekSchedule(updatedSchedule);
  };
  
  const completeSession = (sessionId: string) => {
    // Mark a session as completed
    const updatedSchedule = weekSchedule.map(day => {
      const updatedEvents = day.events.map(event => 
        event.id === sessionId ? {...event, status: 'completed' as const} : event
      );
      
      return {
        ...day,
        events: updatedEvents
      };
    });
    
    setWeekSchedule(updatedSchedule);
  };
  
  const cancelSession = (sessionId: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy buổi tập này?')) {
      const updatedSchedule = weekSchedule.map(day => {
        const updatedEvents = day.events.map(event => 
          event.id === sessionId ? {...event, status: 'canceled' as const} : event
        );
        
        return {
          ...day,
          events: updatedEvents
        };
      });
      
      setWeekSchedule(updatedSchedule);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Lịch trình của tôi" />
        <Link
          href="/account/trainer/schedule/create"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <RiAddLine className="mr-1" />
          <span>Tạo lịch mới</span>
        </Link>
      </div>
      
      {/* Week Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={goToPreviousWeek}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <RiArrowLeftSLine size={20} />
          </button>
          
          <div className="text-center">
            <h3 className="text-lg font-bold">
              {currentWeek.length > 0 && (
                <>
                  {currentWeek[0].toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })} - 
                  {currentWeek[6].toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </>
              )}
            </h3>
            <button 
              onClick={goToCurrentWeek}
              className="text-primary text-sm hover:underline mt-1"
            >
              Về tuần hiện tại
            </button>
          </div>
          
          <button 
            onClick={goToNextWeek}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <RiArrowRightSLine size={20} />
          </button>
        </div>
          {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekSchedule.map((day, index) => (
            <div 
              key={index}
              className={`text-center py-2 rounded-lg cursor-pointer transition-colors ${
                selectedDayIndex === index
                  ? 'bg-primary text-white' 
                  : day.isToday
                    ? 'bg-blue text-primary border border-green'
                    : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setSelectedDayIndex(index);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Xem lịch ngày ${day.dayName}`}
            >
              <p className="font-medium">{day.dayName}</p>              <p className={`text-sm ${selectedDayIndex === index ? 'text-white' : day.isToday && selectedDayIndex !== index ? 'text-primary' : 'text-gray-500'}`}>
                {day.date.getDate()}/{day.date.getMonth() + 1}
              </p>
              {day.events.length > 0 && (
                <div 
                  className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                    selectedDayIndex === index || day.isToday ? 'bg-white' : 'bg-primary'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
        {/* Daily Schedule */}
      <div className="space-y-6">
        {weekSchedule.map((day, dayIndex) => (
          <motion.div 
            key={dayIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              selectedDayIndex === null
                ? (!day.isToday && day.events.length === 0 ? 'hidden' : '')
                : selectedDayIndex !== dayIndex ? 'hidden' : ''
            }`}
          >
            <div className={`p-4 ${day.isToday ? 'bg-primary text-white' : 'border-b border-gray-100'}`}>
              <h2 className={`text-lg font-bold flex items-center ${day.isToday ? 'text-white' : ''}`}>
                <RiCalendarEventLine className="mr-2" />
                {day.dayName}, {day.date.getDate()}/{day.date.getMonth() + 1}
                {day.isToday && <span className="ml-2 text-xs bg-white text-primary px-2 py-1 rounded-full">HÔM NAY</span>}
              </h2>
            </div>
            
            {day.events.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {day.events.map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getStatusColor(event.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                          <Image
                            src={event.clientAvatar}
                            alt={event.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{event.clientName}</h3>
                          <p className="text-sm text-gray-600">{event.sessionType}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">{event.time}</p>
                        <p className="text-sm text-gray-600">{event.duration}</p>
                      </div>
                    </div>
                    
                    {event.notes && (
                      <div className="mt-2 p-2 bg-yellow-50 text-yellow-700 text-sm rounded">
                        {event.notes}
                      </div>
                    )}
                      <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => openClientModal(event.clientId)}
                        className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <RiEyeLine className="mr-1" size={12} />
                        Xem hồ sơ
                      </button>
                      <button
                        onClick={() => openSessionEditModal(event)}
                        className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <RiPencilLine className="mr-1" size={12} />
                        Chỉnh sửa
                      </button>
                      {event.status === 'scheduled' && (
                        <>
                          <button 
                            onClick={() => completeSession(event.id)}
                            className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center"
                          >
                            <RiCheckLine className="mr-1" size={12} />
                            Hoàn thành
                          </button>
                          <button 
                            onClick={() => cancelSession(event.id)}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
                          >
                            <RiCloseLine className="mr-1" size={12} />
                            Hủy
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">Không có buổi tập nào được lên lịch cho ngày này.</p>
                <Link
                  href="/account/trainer/schedule/create"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  + Tạo lịch mới
                </Link>
              </div>
            )}
          </motion.div>
        ))}      </div>
      
      {/* Client Details Modal */}
      {selectedClient && (
        <ClientDetailsModal
          isOpen={isClientModalOpen}
          closeModal={() => setIsClientModalOpen(false)}
          client={selectedClient}
        />
      )}
      
      {/* Session Edit Modal */}
      {selectedSession && (
        <SessionEditModal
          isOpen={isSessionEditModalOpen}
          closeModal={() => setIsSessionEditModalOpen(false)}
          session={selectedSession}
          onSave={handleSessionUpdate}
        />
      )}
    </div>
  );
}
