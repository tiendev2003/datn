"use client";

import { ApiResponse } from '@/types/api-responses';
import { formatDate } from '@/utils/date';
import { Tab } from '@headlessui/react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Shift type for the schedule view
interface Shift {
  shiftId: number;
  employeeId: number;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

// Generate dates for a week
const generateWeekDates = (startDate: Date = new Date()): Date[] => {
  const dates = [];
  const currentDate = new Date(startDate);
  
  // Start from Monday of current week
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
  currentDate.setDate(diff);
  
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export default function ShiftSchedule() {
  const [currentWeek, setCurrentWeek] = useState<Date[]>(generateWeekDates());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchShifts();
  }, [currentWeek]);
  
  const fetchShifts = async () => {
    setLoading(true);
    try {
      const startDate = formatDate(currentWeek[0], 'YYYY-MM-DD');
      const endDate = formatDate(currentWeek[6], 'YYYY-MM-DD');
      
      const response = await axios.get<ApiResponse<Shift[]>>(`/api/shifts/schedule?startDate=${startDate}&endDate=${endDate}`);
      
      if (response.data.success && response.data.data) {
        setShifts(response.data.data);
      } else {
        setError(response.data.message || 'Failed to load shifts');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prevWeek => {
      const firstDay = new Date(prevWeek[0]);
      const days = direction === 'prev' ? -7 : 7;
      firstDay.setDate(firstDay.getDate() + days);
      return generateWeekDates(firstDay);
    });
  };
  
  // Get shifts for a specific date
  const getShiftsByDate = (date: Date) => {
    const dateStr = formatDate(date, 'YYYY-MM-DD');
    return shifts.filter(shift => shift.date === dateStr);
  };
  
  if (loading && shifts.length === 0) return <p>Đang tải lịch ca...</p>;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lịch ca làm việc</h2>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigateWeek('prev')} 
            className="px-3 py-1 border rounded-md hover:bg-gray-100"
          >
            Tuần trước
          </button>
          <span className="font-medium">
            {formatDate(currentWeek[0], 'DD/MM')} - {formatDate(currentWeek[6], 'DD/MM')}
          </span>
          <button 
            onClick={() => navigateWeek('next')} 
            className="px-3 py-1 border rounded-md hover:bg-gray-100"
          >
            Tuần sau
          </button>
          
          <button className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <PlusIcon className="w-5 h-5 mr-1" /> Thêm ca
          </button>
        </div>
      </div>
      
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-gray-50 dark:bg-gray-900">
            {currentWeek.map((date) => (
              <Tab
                key={formatDate(date, 'YYYY-MM-DD')}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm font-medium leading-5 
                  ${selected 
                    ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-400 hover:bg-white/[0.12] hover:text-gray-900 dark:hover:text-white'}`
                }
              >
                <div className="flex flex-col items-center">
                  <span>{['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()]}</span>
                  <span className="font-bold">{date.getDate()}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {currentWeek.map((date) => (
              <Tab.Panel
                key={formatDate(date, 'YYYY-MM-DD')}
                className="bg-white dark:bg-gray-800 rounded-md p-3"
              >
                <h3 className="text-center font-medium pb-3 border-b">
                  {formatDate(date, 'dddd, DD MMMM YYYY')}
                </h3>
                <div className="mt-4 space-y-2">
                  {getShiftsByDate(date).length > 0 ? (
                    getShiftsByDate(date).map((shift) => (
                      <div 
                        key={shift.shiftId} 
                        className={`p-3 rounded-md border ${shift.isApproved ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{shift.employeeName}</span>
                          <button className="text-gray-500 hover:text-gray-700">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          {shift.startTime} - {shift.endTime}
                        </div>
                        <div className="text-xs mt-1">
                          {shift.isApproved ? (
                            <span className="text-green-700">Đã phê duyệt</span>
                          ) : (
                            <span className="text-yellow-700">Chờ phê duyệt</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      Không có ca làm việc
                    </div>
                  )}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
