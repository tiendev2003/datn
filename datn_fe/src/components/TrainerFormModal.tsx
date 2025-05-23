import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import {
    RiAddLine,
    RiAwardLine,
    RiCalendarLine,
    RiCloseLine,
    RiMailLine,
    RiMoneyCnyBoxLine,
    RiPhoneLine,
    RiProfileLine,
    RiTimeLine,
    RiUser3Fill,
    RiUser3Line,
    RiUserStarLine
} from 'react-icons/ri';

export interface TrainerFormData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bio: string;
  specialization: string;
  certifications: string[];
  experienceYears: number;
  profileImage?: string;
  hourlyRate: number;
  availabilities?: Array<{
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }>;
  status?: 'active' | 'inactive';
}

interface TrainerFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: TrainerFormData;
  onSave: (data: TrainerFormData) => void;
  title: string;
}

export default function TrainerFormModal({ 
  isOpen, 
  closeModal, 
  initialData, 
  onSave,
  title
}: TrainerFormModalProps) {
  const defaultTrainer: TrainerFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'MALE',
    bio: '',
    specialization: 'Fitness',
    certifications: [],
    experienceYears: 1,
    hourlyRate: 200000,
    availabilities: [
      { dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '17:00' }
    ]
  };
  
  const [formData, setFormData] = useState<TrainerFormData>(defaultTrainer);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newCertification, setNewCertification] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'schedule'>('basic');

  // For availability management
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string>('MONDAY');
  const [startTime, setStartTime] = useState<string>('08:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  
  // Animation variants for form sections
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    // If initialData is provided, use it
    if (initialData) {
      setFormData(initialData);
    } else {
      // Otherwise, reset to default
      setFormData(defaultTrainer);
    }
    // Reset errors and certifications input
    setErrors({});
    setNewCertification('');
    // Start at the basic tab when modal opens
    setActiveTab('basic');
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle adding a new certification
  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  // Handle removing a certification
  const handleRemoveCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Handle adding a new availability
  const handleAddAvailability = () => {
    // Validate time range
    if (startTime >= endTime) {
      setErrors(prev => ({
        ...prev,
        timeRange: 'Thời gian bắt đầu phải sớm hơn thời gian kết thúc'
      }));
      return;
    }
    
    // Check for overlapping time slots on the same day
    const overlap = formData.availabilities?.some(avail => 
      avail.dayOfWeek === selectedDayOfWeek && 
      ((startTime >= avail.startTime && startTime < avail.endTime) ||
       (endTime > avail.startTime && endTime <= avail.endTime) ||
       (startTime <= avail.startTime && endTime >= avail.endTime))
    );
    
    if (overlap) {
      setErrors(prev => ({
        ...prev,
        timeRange: 'Lịch này trùng với lịch đã tồn tại'
      }));
      return;
    }
    
    // Clear any previous errors
    if (errors.timeRange) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.timeRange;
        return newErrors;
      });
    }
    
    const newAvailability = {
      dayOfWeek: selectedDayOfWeek,
      startTime,
      endTime
    };
    
    setFormData(prev => ({
      ...prev,
      availabilities: [...(prev.availabilities || []), newAvailability]
    }));
  };

  // Handle removing an availability
  const handleRemoveAvailability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities?.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};
    
    // Required fields for the current tab
    if (activeTab === 'basic') {
      // Basic info validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Họ không được để trống';
        valid = false;
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Tên không được để trống';
        valid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email không được để trống';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
        valid = false;
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Số điện thoại không được để trống';
        valid = false;
      } else if (!/^[0-9]{10}$/.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại phải có 10 chữ số';
        valid = false;
      }
      
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Ngày sinh không được để trống';
        valid = false;
      }
    } else if (activeTab === 'details') {
      // Details validation
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Chuyên môn không được để trống';
        valid = false;
      }
      
      if (!formData.experienceYears || formData.experienceYears < 0) {
        newErrors.experienceYears = 'Số năm kinh nghiệm không hợp lệ';
        valid = false;
      }
      
      if (!formData.hourlyRate || formData.hourlyRate < 0) {
        newErrors.hourlyRate = 'Mức lương theo giờ không hợp lệ';
        valid = false;
      }
    } else if (activeTab === 'schedule') {
      // Schedule validation - at least one availability required
      if (!formData.availabilities || formData.availabilities.length === 0) {
        newErrors.availabilities = 'Cần phải có ít nhất một khung giờ làm việc';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all tabs before submission
    const basicErrors: { [key: string]: string } = {};
    const detailsErrors: { [key: string]: string } = {};
    const scheduleErrors: { [key: string]: string } = {};
    let hasErrors = false;
    
    // Basic info validation
    if (!formData.firstName.trim()) {
      basicErrors['firstName'] = 'Họ không được để trống';
      hasErrors = true;
    }
    
    if (!formData.lastName.trim()) {
      basicErrors['lastName'] = 'Tên không được để trống';
      hasErrors = true;
    }
    
    if (!formData.email.trim()) {
      basicErrors['email'] = 'Email không được để trống';
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      basicErrors['email'] = 'Email không hợp lệ';
      hasErrors = true;
    }
    
    if (!formData.phone.trim()) {
      basicErrors['phone'] = 'Số điện thoại không được để trống';
      hasErrors = true;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      basicErrors['phone'] = 'Số điện thoại phải có 10 chữ số';
      hasErrors = true;
    }
    
    if (!formData.dateOfBirth) {
      basicErrors['dateOfBirth'] = 'Ngày sinh không được để trống';
      hasErrors = true;
    }
    
    // Details validation
    if (!formData.specialization.trim()) {
      detailsErrors['specialization'] = 'Chuyên môn không được để trống';
      hasErrors = true;
    }
    
    if (!formData.experienceYears || formData.experienceYears < 0) {
      detailsErrors['experienceYears'] = 'Số năm kinh nghiệm không hợp lệ';
      hasErrors = true;
    }
    
    if (!formData.hourlyRate || formData.hourlyRate < 0) {
      detailsErrors['hourlyRate'] = 'Mức lương theo giờ không hợp lệ';
      hasErrors = true;
    }
    
    // Schedule validation
    if (!formData.availabilities || formData.availabilities.length === 0) {
      scheduleErrors['availabilities'] = 'Cần phải có ít nhất một khung giờ làm việc';
      hasErrors = true;
    }
    
    if (hasErrors) {
      if (Object.keys(basicErrors).length > 0) {
        setActiveTab('basic');
        setErrors(basicErrors);
      } else if (Object.keys(detailsErrors).length > 0) {
        setActiveTab('details');
        setErrors(detailsErrors);
      } else {
        setActiveTab('schedule');
        setErrors(scheduleErrors);
      }
      return;
    }
    
    onSave(formData);
    closeModal();
  };

  const formatDayOfWeek = (day: string): string => {
    const dayMap: Record<string, string> = {
      'MONDAY': 'Thứ Hai',
      'TUESDAY': 'Thứ Ba',
      'WEDNESDAY': 'Thứ Tư',
      'THURSDAY': 'Thứ Năm',
      'FRIDAY': 'Thứ Sáu',
      'SATURDAY': 'Thứ Bảy',
      'SUNDAY': 'Chủ Nhật'
    };
    return dayMap[day] || day;
  };

  // Function to move to the next tab
  const goToNextTab = () => {
    if (activeTab === 'basic' && validateForm()) {
      setActiveTab('details');
    } else if (activeTab === 'details' && validateForm()) {
      setActiveTab('schedule');
    }
  };

  // Function to move to the previous tab
  const goToPrevTab = () => {
    if (activeTab === 'schedule') {
      setActiveTab('details');
    } else if (activeTab === 'details') {
      setActiveTab('basic');
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900 flex items-center"
                  >
                    <RiUserStarLine className="mr-2 text-primary" size={24} />
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                    onClick={closeModal}
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="mt-4">
                  {/* Progressive Tab UI */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div 
                        className={`flex items-center flex-1 cursor-pointer ${activeTab === 'basic' ? 'text-primary font-medium' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('basic')}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${activeTab === 'basic' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                          1
                        </div>
                        <span>Thông tin cơ bản</span>
                      </div>
                      <div className={`h-1 flex-1 mx-2 ${activeTab === 'basic' ? 'bg-gray-200' : activeTab === 'details' ? 'bg-primary' : 'bg-primary'}`}></div>
                      <div 
                        className={`flex items-center flex-1 cursor-pointer ${activeTab === 'details' ? 'text-primary font-medium' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('details')}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${activeTab === 'details' ? 'bg-primary text-white' : activeTab === 'schedule' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                          2
                        </div>
                        <span>Chi tiết chuyên môn</span>
                      </div>
                      <div className={`h-1 flex-1 mx-2 ${activeTab === 'schedule' ? 'bg-primary' : 'bg-gray-200'}`}></div>
                      <div 
                        className={`flex items-center flex-1 cursor-pointer ${activeTab === 'schedule' ? 'text-primary font-medium' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('schedule')}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${activeTab === 'schedule' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                          3
                        </div>
                        <span>Lịch làm việc</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                      <motion.div
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Họ field */}
                          <div className="space-y-1">
                            <label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiUser3Line className="mr-1.5" /> Họ <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                              placeholder="Nhập họ"
                            />
                            {errors.firstName && (
                              <p className="text-sm text-red-500">{errors.firstName}</p>
                            )}
                          </div>

                          {/* Tên field */}
                          <div className="space-y-1">
                            <label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiUser3Fill className="mr-1.5" /> Tên <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                              placeholder="Nhập tên"
                            />
                            {errors.lastName && (
                              <p className="text-sm text-red-500">{errors.lastName}</p>
                            )}
                          </div>

                          {/* Email field */}
                          <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiMailLine className="mr-1.5" /> Email <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                              placeholder="example@email.com"
                            />
                            {errors.email && (
                              <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                          </div>

                          {/* Phone field */}
                          <div className="space-y-1">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiPhoneLine className="mr-1.5" /> Số điện thoại <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                              placeholder="0901234567"
                            />
                            {errors.phone && (
                              <p className="text-sm text-red-500">{errors.phone}</p>
                            )}
                          </div>

                          {/* Date of Birth field */}
                          <div className="space-y-1">
                            <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiCalendarLine className="mr-1.5" /> Ngày sinh <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                            />
                            {errors.dateOfBirth && (
                              <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                            )}
                          </div>

                          {/* Gender field */}
                          <div className="space-y-1">
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiProfileLine className="mr-1.5" /> Giới tính <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors appearance-none bg-white"
                            >
                              <option value="MALE">Nam</option>
                              <option value="FEMALE">Nữ</option>
                              <option value="OTHER">Khác</option>
                            </select>
                          </div>
                        </div>

                        {/* Bio field */}
                        <div className="space-y-1">
                          <label htmlFor="bio" className="text-sm font-medium text-gray-700 flex items-center">
                            <RiProfileLine className="mr-1.5" /> Tiểu sử
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                            placeholder="Mô tả ngắn về huấn luyện viên..."
                          />
                        </div>

                        {/* Navigation buttons */}
                        <div className="mt-6 flex justify-between">
                          <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={closeModal}
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                            onClick={goToNextTab}
                          >
                            Tiếp theo
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Details Tab */}
                    {activeTab === 'details' && (
                      <motion.div
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Specialization field */}
                          <div className="space-y-1">
                            <label htmlFor="specialization" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiUserStarLine className="mr-1.5" /> Chuyên môn <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="text"
                              id="specialization"
                              name="specialization"
                              value={formData.specialization}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${errors.specialization ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                              placeholder="Fitness, Yoga, CrossFit..."
                            />
                            {errors.specialization && (
                              <p className="text-sm text-red-500">{errors.specialization}</p>
                            )}
                          </div>

                          {/* Experience Years field */}
                          <div className="space-y-1">
                            <label htmlFor="experienceYears" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiUserStarLine className="mr-1.5" /> Số năm kinh nghiệm <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="number"
                              id="experienceYears"
                              name="experienceYears"
                              min="0"
                              value={formData.experienceYears}
                              onChange={(e) => handleNumberChange(e, 'experienceYears')}
                              className={`w-full px-3 py-2 border ${errors.experienceYears ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                            />
                            {errors.experienceYears && (
                              <p className="text-sm text-red-500">{errors.experienceYears}</p>
                            )}
                          </div>

                          {/* Hourly Rate field */}
                          <div className="space-y-1">
                            <label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiMoneyCnyBoxLine className="mr-1.5" /> Chi phí theo giờ (VNĐ) <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                              type="number"
                              id="hourlyRate"
                              name="hourlyRate"
                              min="0"
                              step="10000"
                              value={formData.hourlyRate}
                              onChange={(e) => handleNumberChange(e, 'hourlyRate')}
                              className={`w-full px-3 py-2 border ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                            />
                            {errors.hourlyRate && (
                              <p className="text-sm text-red-500">{errors.hourlyRate}</p>
                            )}
                          </div>

                          {/* Profile Image URL field */}
                          <div className="space-y-1">
                            <label htmlFor="profileImage" className="text-sm font-medium text-gray-700 flex items-center">
                              <RiUser3Line className="mr-1.5" /> URL ảnh đại diện
                            </label>
                            <input
                              type="text"
                              id="profileImage"
                              name="profileImage"
                              value={formData.profileImage || ''}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>

                          {/* Status field (only show if editing) */}
                          {initialData && initialData.id && (
                            <div className="space-y-1">
                              <label htmlFor="status" className="text-sm font-medium text-gray-700 flex items-center">
                                <RiProfileLine className="mr-1.5" /> Trạng thái
                              </label>
                              <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors appearance-none bg-white"
                              >
                                <option value="active">Đang hoạt động</option>
                                <option value="inactive">Ngưng hoạt động</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Certifications field */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 flex items-center">
                            <RiAwardLine className="mr-1.5" /> Chứng chỉ
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                            {formData.certifications?.map((cert, index) => (
                              <motion.div 
                                key={index} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
                              >
                                <span>{cert}</span>
                                <button 
                                  type="button" 
                                  onClick={() => handleRemoveCertification(index)}
                                  className="text-blue-800 hover:text-blue-900 w-5 h-5 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors"
                                >
                                  &times;
                                </button>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newCertification}
                              onChange={(e) => setNewCertification(e.target.value)}
                              placeholder="Nhập tên chứng chỉ"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddCertification();
                                }
                              }}
                            />
                            <button 
                              type="button" 
                              onClick={handleAddCertification}
                              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                            >
                              <RiAddLine /> Thêm
                            </button>
                          </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="mt-6 flex justify-between">
                          <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                            onClick={goToPrevTab}
                          >
                            Quay lại
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                            onClick={goToNextTab}
                          >
                            Tiếp theo
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Schedule Tab */}
                    {activeTab === 'schedule' && (
                      <motion.div
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        {/* Availabilities */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 flex items-center">
                            <RiTimeLine className="mr-1.5" /> Lịch làm việc <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          
                          {errors.availabilities && (
                            <p className="text-sm text-red-500 mb-2">{errors.availabilities}</p>
                          )}
                          
                          <div className="mb-4 space-y-2 max-h-48 overflow-y-auto pr-2">
                            {formData.availabilities?.map((avail, index) => (
                              <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
                              >
                                <span className="font-medium">
                                  {formatDayOfWeek(avail.dayOfWeek)}: {avail.startTime} - {avail.endTime}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveAvailability(index)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors"
                                >
                                  <RiCloseLine size={18} />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Thêm lịch làm việc mới</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <select
                                value={selectedDayOfWeek}
                                onChange={(e) => setSelectedDayOfWeek(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors appearance-none bg-white"
                              >
                                <option value="MONDAY">Thứ Hai</option>
                                <option value="TUESDAY">Thứ Ba</option>
                                <option value="WEDNESDAY">Thứ Tư</option>
                                <option value="THURSDAY">Thứ Năm</option>
                                <option value="FRIDAY">Thứ Sáu</option>
                                <option value="SATURDAY">Thứ Bảy</option>
                                <option value="SUNDAY">Chủ Nhật</option>
                              </select>
                              
                              <div className="flex flex-col space-y-1">
                                <input
                                  type="time"
                                  value={startTime}
                                  onChange={(e) => setStartTime(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                                />
                                <label className="text-xs text-gray-500">Bắt đầu</label>
                              </div>
                              
                              <div className="flex flex-col space-y-1">
                                <input
                                  type="time"
                                  value={endTime}
                                  onChange={(e) => setEndTime(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                                />
                                <label className="text-xs text-gray-500">Kết thúc</label>
                              </div>
                              
                              <button
                                type="button"
                                onClick={handleAddAvailability}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                              >
                                <RiAddLine /> Thêm lịch
                              </button>
                            </div>
                            {errors.timeRange && (
                              <p className="text-sm text-red-500 mt-2">{errors.timeRange}</p>
                            )}
                          </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="mt-6 flex justify-between">
                          <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                            onClick={goToPrevTab}
                          >
                            Quay lại
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          >
                            Hoàn tất
                          </button>
                        </div>
                      </motion.div>
                    )}
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
