'use client';

import PageTitle from '@/components/PageTitle';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function SchedulePage() {
  // Current date
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Mock data - replace with API call later
  const [workoutSchedule, setWorkoutSchedule] = useState([
    {
      id: 1,
      name: "Tập luyện cường độ cao",
      trainer: "Nguyễn Văn An", 
      type: "Buổi tập PT",
      day: "15/05/2025",
      time: "07:00 - 08:30",
      location: "Phòng tập chính",
      imageUrl: ""
    },
    {
      id: 2,
      name: "Yoga Flow",
      trainer: "Trần Thị Bình",
      type: "Lớp học",
      day: "17/05/2025",
      time: "17:30 - 18:30",
      location: "Phòng Yoga",
      imageUrl: ""
    },
    {
      id: 3,
      name: "Cardio & Strength",
      trainer: "Lê Văn Cường",
      type: "Buổi tập PT",
      day: "20/05/2025",
      time: "19:00 - 20:30",
      location: "Khu vực cardio",
      imageUrl: ""
    }
  ]);

  const [calendarDays, setCalendarDays] = useState(() => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isToday: i === today.getDate(),
        hasWorkout: [15, 17, 20].includes(i) // Simplified for demo, should match workoutSchedule
      });
    }
    
    return days;
  });

  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  // Delete a workout
  const handleDeleteWorkout = (id: number) => {
    if (confirm('Bạn có chắc muốn hủy buổi tập này không?')) {
      setWorkoutSchedule(workouts => workouts.filter(workout => workout.id !== id));
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <PageTitle 
          title="Lịch tập"
          description="Quản lý lịch tập và đặt buổi tập mới"
        />
        <div className="mt-4 md:mt-0">
          <Link 
            href="/account/schedule/create"
            className="btn btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Đặt lịch tập mới
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`tab-button ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
            >
              Sắp tới
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`tab-button ${activeTab === 'past' ? 'tab-active' : ''}`}
            >
              Đã qua
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-button ${activeTab === 'all' ? 'tab-active' : ''}`}
            >
              Tất cả
            </button>
          </div>
          
          <div className="flex bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-700'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 ${viewMode === 'calendar' ? 'bg-primary text-white' : 'text-gray-700'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {viewMode === 'list' && (
          <div className="p-4">
            {workoutSchedule.length > 0 ? (
              <div className="space-y-4">
                {workoutSchedule.map((workout) => (
                  <div key={workout.id} className="workout-card border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {workout.imageUrl ? (
                          <Image
                            src={workout.imageUrl}
                            alt={workout.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-primary/10 text-primary">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                          <div className="flex items-center mt-2 md:mt-0">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                              {workout.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>{workout.day}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{workout.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>{workout.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-2">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span>{workout.trainer}</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button 
                          className="action-button edit" 
                          title="Chỉnh sửa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                        <button 
                          className="action-button delete" 
                          title="Hủy"
                          onClick={() => handleDeleteWorkout(workout.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-gray-700 font-medium">Không có lịch tập nào</h3>
                <p className="text-gray-500 text-sm mt-1">Đặt lịch tập ngay để đạt được mục tiêu của bạn</p>
                <Link
                  href="/account/schedule/create"
                  className="btn btn-primary mt-4"
                >
                  Đặt lịch ngay
                </Link>
              </div>
            )}
          </div>
        )}
        
        {viewMode === 'calendar' && (
          <div className="p-4">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</h3>
              <div className="flex space-x-2">
                <button className="p-2 rounded hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
                <div key={index} className="text-center text-sm text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Add empty cells for days before first day of month */}
              {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="h-24 bg-gray-50 rounded"></div>
              ))}
              
              {calendarDays.map((day) => (
                <div 
                  key={day.day} 
                  className={`h-24 rounded border ${day.isToday ? 'border-primary' : 'border-gray-200'} p-2 relative`}
                >
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm ${day.isToday ? 'bg-primary text-white' : 'text-gray-700'}`}>
                    {day.day}
                  </div>
                  
                  {day.hasWorkout && (
                    <div className="absolute bottom-2 left-0 right-0 px-2">
                      <div className="bg-primary/10 text-primary text-xs p-1 rounded truncate">
                        Buổi tập
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
