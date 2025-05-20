'use client';

import { motion } from 'framer-motion';
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

export default function CreateSchedulePage() {
  // Mock data - replace with API call later
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      specialization: "Strength & Conditioning",
      rating: 4.9,
      imageUrl: "",
      availability: [
        { date: "15/05/2025", slots: ["07:00", "09:00", "15:00", "17:00"] },
        { date: "16/05/2025", slots: ["08:00", "10:00", "14:00", "16:00"] },
        { date: "17/05/2025", slots: ["07:00", "09:00", "11:00", "13:00"] }
      ]
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      specialization: "Yoga & Flexibility",
      rating: 4.8,
      imageUrl: "",
      availability: [
        { date: "15/05/2025", slots: ["08:00", "10:00", "16:00", "18:00"] },
        { date: "16/05/2025", slots: ["07:00", "09:00", "15:00", "17:00"] },
        { date: "17/05/2025", slots: ["08:00", "10:00", "14:00", "16:00"] }
      ]
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      specialization: "Cardio & HIIT",
      rating: 4.7,
      imageUrl: "",
      availability: [
        { date: "15/05/2025", slots: ["09:00", "11:00", "17:00", "19:00"] },
        { date: "16/05/2025", slots: ["10:00", "12:00", "16:00", "18:00"] },
        { date: "17/05/2025", slots: ["09:00", "11:00", "15:00", "17:00"] }
      ]
    }
  ]);

  const [workoutTypes, setWorkoutTypes] = useState([
    {
      id: 1,
      name: "Personal Training",
      description: "Buổi tập 1-1 với huấn luyện viên",
      duration: 60,
      icon: "🏋️‍♂️"
    },
    {
      id: 2,
      name: "Yoga Class",
      description: "Lớp học yoga theo nhóm",
      duration: 60,
      icon: "🧘‍♀️"
    },
    {
      id: 3,
      name: "HIIT",
      description: "Tập luyện cường độ cao ngắt quãng",
      duration: 45,
      icon: "⚡"
    },
    {
      id: 4,
      name: "Strength Training",
      description: "Tập luyện sức mạnh với tạ",
      duration: 60,
      icon: "💪"
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    workoutTypeId: null as number | null,
    trainerId: null as number | null,
    date: "",
    timeSlot: "",
    notes: ""
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle workout type selection
  const handleSelectWorkoutType = (id: number) => {
    setFormData(prev => ({ ...prev, workoutTypeId: id }));
    setStep(2);
  };

  // Handle trainer selection
  const handleSelectTrainer = (id: number) => {
    setFormData(prev => ({ ...prev, trainerId: id }));
    setStep(3);
  };

  // Handle date selection
  const handleSelectDate = (date: string) => {
    setFormData(prev => ({ ...prev, date: date, timeSlot: "" }));
  };

  // Handle time slot selection
  const handleSelectTimeSlot = (slot: string) => {
    setFormData(prev => ({ ...prev, timeSlot: slot }));
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        window.location.href = '/account/schedule';
      }, 2000);
    }, 1500);
  };

  // Get selected workout type
  const selectedWorkoutType = workoutTypes.find(type => type.id === formData.workoutTypeId);
  
  // Get selected trainer
  const selectedTrainer = trainers.find(trainer => trainer.id === formData.trainerId);
  
  // Get available time slots for selected date and trainer
  const availableTimeSlots = selectedTrainer ? 
    selectedTrainer.availability.find(a => a.date === formData.date)?.slots || [] 
    : [];

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/account/schedule" className="flex items-center text-primary font-medium mb-2">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Đặt lịch tập mới</h1>
        <p className="text-gray-600">Chọn loại buổi tập, huấn luyện viên và thời gian phù hợp</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="progress-step-number">1</div>
            <div className="progress-step-label">Loại tập</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="progress-step-number">2</div>
            <div className="progress-step-label">Huấn luyện viên</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="progress-step-number">3</div>
            <div className="progress-step-label">Thời gian</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
            <div className="progress-step-number">4</div>
            <div className="progress-step-label">Xác nhận</div>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="card max-w-3xl mx-auto text-center p-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h2>
          <p className="text-gray-600 mb-6">Bạn đã đặt lịch tập thành công. Thông tin chi tiết đã được gửi vào email của bạn.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/account/schedule" className="btn btn-primary">
              Xem lịch tập
            </Link>
            <Link href="/account/dashboard" className="btn btn-outline">
              Về trang chủ
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Step 1: Select Workout Type */}
          {step === 1 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="card max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Bước 1: Chọn loại buổi tập</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workoutTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    variants={item}
                    className={`workout-type-card border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition ${formData.workoutTypeId === type.id ? 'border-primary ring-1 ring-primary bg-primary/5' : ''}`}
                    onClick={() => handleSelectWorkoutType(type.id)}
                  >
                    <div className="flex items-start">
                      <span className="text-3xl mr-4">{type.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{type.name}</h3>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="text-primary font-medium">{type.duration} phút</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Trainer */}
          {step === 2 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="card max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Bước 2: Chọn huấn luyện viên</h2>
              
              <div className="space-y-4">
                {trainers.map((trainer) => (
                  <motion.div
                    key={trainer.id}
                    variants={item}
                    className={`trainer-card border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition ${formData.trainerId === trainer.id ? 'border-primary ring-1 ring-primary bg-primary/5' : ''}`}
                    onClick={() => handleSelectTrainer(trainer.id)}
                  >
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        {trainer.imageUrl ? (
                          <Image
                            src={trainer.imageUrl}
                            alt={trainer.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-primary/10 text-primary">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{trainer.name}</h3>
                        <p className="text-gray-600 text-sm">{trainer.specialization}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(trainer.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">{trainer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  className="btn btn-outline"
                  onClick={() => setStep(1)}
                >
                  Quay lại
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Select Date and Time */}
          {step === 3 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="card max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Bước 3: Chọn ngày và giờ</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Chọn ngày</label>
                <div className="grid grid-cols-3 gap-3">
                  {selectedTrainer?.availability.map((day) => (
                    <div
                      key={day.date}
                      className={`date-card p-3 border rounded-lg text-center cursor-pointer hover:border-primary transition ${formData.date === day.date ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-gray-200'}`}
                      onClick={() => handleSelectDate(day.date)}
                    >
                      <p className="text-gray-900 font-medium">{day.date}</p>
                      <p className="text-gray-500 text-sm">{day.slots.length} khung giờ</p>
                    </div>
                  ))}
                </div>
              </div>

              {formData.date && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <label className="block text-gray-700 font-medium mb-2">Chọn giờ</label>
                  <div className="grid grid-cols-4 gap-3">
                    {availableTimeSlots.map((slot) => (
                      <div
                        key={slot}
                        className={`time-card p-2 border rounded-lg text-center cursor-pointer hover:border-primary transition ${formData.timeSlot === slot ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => handleSelectTimeSlot(slot)}
                      >
                        <p className="text-gray-900">{slot}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Ghi chú bổ sung (không bắt buộc)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                   rows={4}
                  placeholder="Nhập yêu cầu đặc biệt hoặc thông tin bổ sung..."
                ></textarea>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  className="btn btn-outline"
                  onClick={() => setStep(2)}
                >
                  Quay lại
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => formData.date && formData.timeSlot ? setStep(4) : null}
                  disabled={!formData.date || !formData.timeSlot}
                >
                  Tiếp tục
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review and Confirm */}
          {step === 4 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="card max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Bước 4: Xác nhận thông tin</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Chi tiết buổi tập</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Loại buổi tập</p>
                      <p className="text-gray-900 font-medium">{selectedWorkoutType?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Huấn luyện viên</p>
                      <p className="text-gray-900 font-medium">{selectedTrainer?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Ngày tập</p>
                      <p className="text-gray-900 font-medium">{formData.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Giờ tập</p>
                      <p className="text-gray-900 font-medium">{formData.timeSlot} ({selectedWorkoutType?.duration} phút)</p>
                    </div>
                  </div>

                  {formData.notes && (
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600">Ghi chú</p>
                        <p className="text-gray-900 font-medium">{formData.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Thông tin thanh toán</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trừ vào gói PT</span>
                    <span className="text-gray-900 font-medium">1 buổi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Buổi còn lại</span>
                    <span className="text-gray-900 font-medium">7 buổi</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  className="btn btn-outline"
                  onClick={() => setStep(3)}
                >
                  Quay lại
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : 'Xác nhận đặt lịch'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
