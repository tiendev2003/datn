'use client';

import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import PageTitle from '@/components/PageTitle';
import TrainerFormModal from '@/components/TrainerFormModal';
import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import {
  RiAddLine,
  RiCloseLine,
  RiEditLine,
  RiFileUserLine,
  RiFilterLine,
  RiSearchLine,
  RiStarFill,
  RiUserFollowLine,
  RiUserUnfollowLine
} from 'react-icons/ri';

export default function TrainerManagement() {
  // States for trainers and filters
  const [allTrainers, setAllTrainers] = useState([
    {
      id: 1,
      name: "Hoàng Văn A",
      specialty: "Fitness, Tăng cơ",
      email: "hoangvana@example.com",
      phone: "0911234567",
      rating: 4.8,
      reviews: 42,
      status: "active",
      joinDate: "10/01/2023",
      availability: "Thứ 2-6, 8:00-19:00"
    },
    {
      id: 2,
      name: "Lê Thị B",
      specialty: "Yoga, Giảm cân",
      email: "lethib@example.com",
      phone: "0911234568",
      rating: 4.9,
      reviews: 38,
      status: "active",
      joinDate: "15/03/2023",
      availability: "Thứ 3-7, 9:00-20:00"
    },
    {
      id: 3,
      name: "Trần Văn C",
      specialty: "Powerlifting, Thể hình",
      email: "tranvanc@example.com",
      phone: "0911234569",
      rating: 4.5,
      reviews: 27,
      status: "active",
      joinDate: "20/05/2023",
      availability: "Thứ 2-4-6-CN, 10:00-21:00"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      specialty: "Yoga, Pilates",
      email: "phamthid@example.com",
      phone: "0911234570",
      rating: 4.7,
      reviews: 31,
      status: "inactive",
      joinDate: "08/07/2023",
      availability: "N/A"
    },
    {
      id: 5,
      name: "Nguyễn Văn E",
      specialty: "Crossfit, Cardio",
      email: "nguyenvane@example.com",
      phone: "0911234571",
      rating: 4.6,
      reviews: 23,
      status: "active",
      joinDate: "12/09/2023",
      availability: "Thứ 2-3-5-7, 7:00-18:00"
    }]);

  // Define trainer interface
  interface Trainer {
    id: number;
    name: string;
    specialty: string;
    email: string;
    phone: string;
    rating: number;
    reviews: number;
    status: string;
    joinDate: string;
    availability: string;
  }

  // Additional states for the component
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [specialty, setSpecialty] = useState('all');
  const [status, setStatus] = useState('all');
  const [rating, setRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [trainersPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>(null);

  // Filter and pagination logic
  useEffect(() => {
    let filteredData = [...allTrainers];

    // Apply specialty filter
    if (specialty !== 'all') {
      filteredData = filteredData.filter(trainer =>
        trainer.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filteredData = filteredData.filter(trainer => trainer.status === status);
    }

    // Apply rating filter
    if (rating !== 'all') {
      const minRating = parseFloat(rating.replace('+', ''));
      filteredData = filteredData.filter(trainer => trainer.rating >= minRating);
    }

    // Apply search term
    if (searchTerm) {
      filteredData = filteredData.filter(trainer =>
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTrainers(filteredData);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [allTrainers, specialty, status, rating, searchTerm]);

  // Calculate statistics
  const totalTrainers = allTrainers.length;
  const activeTrainers = allTrainers.filter(t => t.status === 'active').length;
  const averageRating = allTrainers.length > 0 ?
    (allTrainers.reduce((sum, trainer) => sum + trainer.rating, 0) / allTrainers.length).toFixed(1) :
    '0.0';

  // Pagination logic
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);
  const totalPages = Math.ceil(trainers.length / trainersPerPage);
  // Handle actions
  const handleAddTrainer = (newTrainer: Omit<Trainer, 'id'>) => {
    const newId = Math.max(...allTrainers.map(t => t.id), 0) + 1;
    const trainerWithId = { ...newTrainer, id: newId } as Trainer;
    setAllTrainers([...allTrainers, trainerWithId]);
    setIsAddModalOpen(false);
  };

  const handleEditTrainer = (updatedTrainer: Trainer) => {
    setAllTrainers(
      allTrainers.map(trainer =>
        trainer.id === updatedTrainer.id ? updatedTrainer : trainer
      )
    );
    setIsEditModalOpen(false);
  };

  const handleToggleStatus = (id: number) => {
    setAllTrainers(
      allTrainers.map(trainer =>
        trainer.id === id ? { ...trainer, status: trainer.status === 'active' ? 'inactive' : 'active' } : trainer
      )
    );
  };

  const handleDeleteTrainer = () => {
    if (currentTrainer) {
      setAllTrainers(allTrainers.filter(trainer => trainer.id !== currentTrainer.id));
      setIsDeleteModalOpen(false);
      setCurrentTrainer(null);
    }
  };

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(i);
  }

  return (
    <div className="space-y-6">      <div className="flex justify-between items-center">
      <PageTitle title="Quản lý huấn luyện viên" />
      <button
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition flex items-center gap-1"
        onClick={() => setIsAddModalOpen(true)}
      >
        <RiAddLine size={18} /> <span>Thêm huấn luyện viên</span>
      </button>
    </div>      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">Tổng số PT</p>
          <p className="text-2xl font-bold">{totalTrainers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">PT đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600">{activeTrainers}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <p className="text-gray-600 text-sm">Đánh giá trung bình</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold">{averageRating}</p>
            <RiStarFill className="ml-1 text-yellow-500" size={24} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Chuyên môn
          </label>
          <div className="relative">
            <select
              id="specialty-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="fitness">Fitness</option>
              <option value="yoga">Yoga</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="crossfit">Crossfit</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <div className="relative">
            <select
              id="status-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Đánh giá
          </label>
          <div className="relative">
            <select
              id="rating-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="4.5+">4.5 sao trở lên</option>
              <option value="4+">4 sao trở lên</option>
              <option value="3.5+">3.5 sao trở lên</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Tìm theo tên, email, chuyên môn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <RiSearchLine className="text-gray-400" />
            </div>
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm('')}
              >
                <RiCloseLine className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trainer List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Họ và tên</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Chuyên môn</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Đánh giá</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Lịch làm việc</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Trạng thái</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentTrainers.length > 0 ? (
              currentTrainers.map((trainer) => (
                <tr key={trainer.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{trainer.name}</td>
                  <td className="px-6 py-4">{trainer.specialty}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="font-medium">{trainer.rating}</span>
                      <RiStarFill className="ml-1 text-yellow-500" />
                      <span className="text-gray-500 text-sm ml-1">({trainer.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{trainer.availability}</td>
                  <td className="px-6 py-4 text-sm">{trainer.email}</td>
                  <td className="px-6 py-4">
                    {trainer.status === "active" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Ngừng hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentTrainer(trainer);
                            setIsProfileModalOpen(true);
                          }}
                        >
                          <RiFileUserLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Hồ sơ
                        </span>
                      </div>

                      <div className="relative group">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentTrainer(trainer);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <RiEditLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Chỉnh sửa
                        </span>
                      </div>
                      {trainer.status === "active" ? (
                        <div className="relative group">
                          <button
                            className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100 transition-colors"
                            onClick={() => handleToggleStatus(trainer.id)}
                          >
                            <RiUserUnfollowLine size={18} />
                          </button>
                          <span className="absolute hidden group-hover:block -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                            Vô hiệu
                          </span>
                        </div>
                      ) : (
                        <div className="relative group">
                          <button
                            className="text-green-600 hover:text-green-800 p-1.5 rounded-full hover:bg-green-100 transition-colors"
                            onClick={() => handleToggleStatus(trainer.id)}
                          >
                            <RiUserFollowLine size={18} />
                          </button>
                          <span className="absolute hidden group-hover:block -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                            Kích hoạt
                          </span>
                        </div>
                      )}

                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setCurrentTrainer(trainer);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Xóa
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Không tìm thấy huấn luyện viên nào phù hợp với tiêu chí tìm kiếm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-sm gap-4">
        <div className="text-sm text-gray-700">
          {trainers.length > 0 ? (
            <>
              Hiển thị <span className="font-medium">{indexOfFirstTrainer + 1}</span> đến{" "}
              <span className="font-medium">
                {Math.min(indexOfLastTrainer, trainers.length)}
              </span>{" "}
              của <span className="font-medium">{trainers.length}</span> huấn luyện viên
            </>
          ) : (
            <>
              <span className="font-medium">0</span> huấn luyện viên được hiển thị
            </>
          )}
        </div>
        {totalPages > 0 && (
          <div className="flex items-center space-x-1">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {paginationItems.map(number => (
              <button
                key={number}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentPage === number
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}      </div>
      {/* Modals */}
      {isAddModalOpen && (
        <TrainerFormModal
          isOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          onSave={(data) => {
            const newId = Math.max(...allTrainers.map(t => t.id), 0) + 1;
            // Convert from TrainerFormData to our simplified model
            const newTrainer = {
              id: newId,
              name: `${data.firstName} ${data.lastName}`,
              specialty: data.specialization,
              email: data.email,
              phone: data.phone,
              rating: 5.0, // Default for new trainers
              reviews: 0,
              status: data.status || 'active',
              joinDate: new Date().toLocaleDateString('vi-VN'),
              availability: data.availabilities ?
                data.availabilities.map(a => `${a.dayOfWeek}: ${a.startTime}-${a.endTime}`).join(', ') :
                'Chưa cập nhật'
            };
            setAllTrainers([...allTrainers, newTrainer]);
            setIsAddModalOpen(false);
          }}
          title="Thêm huấn luyện viên mới"
        />
      )}

      {isEditModalOpen && currentTrainer && (
        <TrainerFormModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          initialData={{
            id: currentTrainer.id,
            firstName: currentTrainer.name.split(' ')[0],
            lastName: currentTrainer.name.split(' ').slice(1).join(' '),
            email: currentTrainer.email,
            phone: currentTrainer.phone,
            specialization: currentTrainer.specialty,
            dateOfBirth: '',
            gender: 'MALE',
            bio: '',
            certifications: [],
            experienceYears: 0,
            hourlyRate: 0,
            status: currentTrainer.status === 'active' ? 'active' : 'inactive'
          }}
          onSave={(data) => {
            // Convert from TrainerFormData back to our simplified model
            const updatedTrainer = {
              ...currentTrainer,
              name: `${data.firstName} ${data.lastName}`,
              specialty: data.specialization,
              email: data.email,
              phone: data.phone,
              status: data.status || 'active',
              availability: data.availabilities ?
                data.availabilities.map(a => `${a.dayOfWeek}: ${a.startTime}-${a.endTime}`).join(', ') :
                currentTrainer.availability
            };
            setAllTrainers(
              allTrainers.map(trainer =>
                trainer.id === updatedTrainer.id ? updatedTrainer : trainer
              )
            );
            setIsEditModalOpen(false);
          }}
          title={`Chỉnh sửa: ${currentTrainer.name}`}
        />
      )}
      {isProfileModalOpen && currentTrainer && (
        <Dialog open={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title as="h3" className="text-xl font-semibold">
                  Thông tin huấn luyện viên
                </Dialog.Title>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <RiUserFollowLine size={64} className="text-gray-400" />
                    </div>
                  </div>

                  <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800">{currentTrainer.name}</h2>
                    <p className="text-gray-600 italic mb-4">{currentTrainer.specialty}</p>

                    <div className="mb-4 flex items-center">
                      <div className="flex items-center">
                        <span className="font-medium text-lg">{currentTrainer.rating}</span>
                        <RiStarFill className="ml-1 text-yellow-500" size={20} />
                      </div>
                      <span className="text-gray-500 text-sm ml-2">({currentTrainer.reviews} đánh giá)</span>
                    </div>

                    <div className="space-y-3">
                      <p><span className="font-medium">Email:</span> {currentTrainer.email}</p>
                      <p><span className="font-medium">Điện thoại:</span> {currentTrainer.phone}</p>
                      <p><span className="font-medium">Ngày tham gia:</span> {currentTrainer.joinDate}</p>
                      <p><span className="font-medium">Lịch làm việc:</span> {currentTrainer.availability || 'Chưa cập nhật'}</p>
                      <p>
                        <span className="font-medium">Trạng thái:</span>{' '}
                        {currentTrainer.status === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Ngừng hoạt động
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t mt-6 pt-6">
                  <h3 className="text-lg font-semibold mb-2">Thống kê huấn luyện</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Khách hàng</p>
                      <p className="text-xl font-bold">0</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Buổi tập đã hoàn thành</p>
                      <p className="text-xl font-bold">0</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Thu nhập tháng này</p>
                      <p className="text-xl font-bold">0 ₫</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 mr-2"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setCurrentTrainer(currentTrainer);
                    setIsEditModalOpen(true);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Chỉnh sửa
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      {isDeleteModalOpen && currentTrainer && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteTrainer}
          title="Xóa huấn luyện viên"
          message={`Bạn có chắc chắn muốn xóa huấn luyện viên ${currentTrainer.name}? Thao tác này không thể hoàn tác.`}
        />
      )}
    </div>
  );
}
