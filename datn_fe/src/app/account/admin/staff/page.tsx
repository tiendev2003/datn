'use client';

import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import PageTitle from '@/components/PageTitle';
import SalaryManagementModal, { SalaryData } from '@/components/SalaryManagementModal';
import ShiftScheduleModal, { ShiftData } from '@/components/ShiftScheduleModal';
import StaffFormModal, { StaffFormData } from '@/components/StaffFormModal';
import { useState } from 'react';
import {
  RiAddLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarCheckLine,
  RiDeleteBinLine,
  RiEditLine,
  RiFilterLine,
  RiLoaderLine,
  RiMoneyDollarBoxLine,
  RiTimeLine,
  RiUserFollowLine,
  RiUserUnfollowLine,
  RiWalletLine
} from 'react-icons/ri';

export default function StaffManagement() {
  // Mock data for staff
  const [staffMembers, setStaffMembers] = useState<StaffFormData[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "receptionist",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      status: "active",
      joinDate: "15/04/2023",
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "receptionist",
      email: "tranthib@example.com",
      phone: "0901234568",
      status: "active",
      joinDate: "20/05/2023",
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "cleaning",
      email: "levanc@example.com",
      phone: "0901234569",
      status: "active",
      joinDate: "10/01/2024",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      position: "maintenance",
      email: "phamthid@example.com",
      phone: "0901234570",
      status: "inactive",
      joinDate: "05/02/2024",
    },
    {
      id: 5,
      name: "Vũ Văn E",
      position: "security",
      email: "vuvane@example.com",
      phone: "0901234571",
      status: "active",
      joinDate: "30/03/2024",
    }
  ]);
  
  // State for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<StaffFormData | null>(null);
  
  // State for filters and search
  const [positionFilter, setPositionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Filtered staff based on filters and search
  const filteredStaff = staffMembers.filter(staff => {
    // Position filter
    if (positionFilter !== 'all' && staff.position !== positionFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter === 'active' && staff.status !== 'active') {
      return false;
    }
    
    if (statusFilter === 'inactive' && staff.status !== 'inactive') {
      return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        staff.name.toLowerCase().includes(query) ||
        staff.email.toLowerCase().includes(query) ||
        staff.phone.includes(query)
      );
    }
    
    return true;
  });
  
  // Handler functions for CRUD operations
  const handleCreateStaff = (newStaff: StaffFormData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate a new ID by finding the max ID and adding 1
      const maxId = Math.max(...staffMembers.map(staff => staff.id || 0));
      const staffWithId = { ...newStaff, id: maxId + 1 };
      
      setStaffMembers(prev => [...prev, staffWithId]);
      setLoading(false);
      setIsCreateModalOpen(false);
    }, 500);
  };
  
  const handleUpdateStaff = (updatedStaff: StaffFormData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStaffMembers(prev => 
        prev.map(staff => staff.id === updatedStaff.id ? updatedStaff : staff)
      );
      setLoading(false);
      setIsEditModalOpen(false);
      setCurrentStaff(null);
    }, 500);
  };
  
  const handleDeleteStaff = () => {
    if (!currentStaff) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStaffMembers(prev => prev.filter(staff => staff.id !== currentStaff.id));
      setIsDeleteModalOpen(false);
      setCurrentStaff(null);
      setLoading(false);
    }, 500);
  };
  
  const handleToggleStatus = (staffId: number) => {
    setStaffMembers(prev =>
      prev.map(staff => {
        if (staff.id === staffId) {
          return {
            ...staff,
            status: staff.status === 'active' ? 'inactive' : 'active'
          };
        }
        return staff;
      })
    );
  };
  // Handler for saving shifts
  const handleSaveShifts = (shiftData: ShiftData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saved shift data:', shiftData);
      // Here we would integrate with a real API
      
      setLoading(false);
      setIsShiftModalOpen(false);
    }, 500);
  };
    // Handler for saving salary info
  const handleSaveSalary = (salaryData: SalaryData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saved salary info:', salaryData);
      // Here we would integrate with a real API
      
      setLoading(false);
      setIsSalaryModalOpen(false);
    }, 500);
  };
  
  // Get position label for display
  const getPositionLabel = (position: string) => {
    switch (position) {
      case 'receptionist':
        return 'Lễ tân';
      case 'maintenance':
        return 'Nhân viên bảo trì';
      case 'cleaning':
        return 'Nhân viên vệ sinh';
      case 'security':
        return 'Bảo vệ';
      default:
        return position;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý nhân sự" />
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:shadow-md transition flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <RiAddLine size={18} />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1"
          onClick={() => {
            if (filteredStaff.length > 0) {
              setCurrentStaff(filteredStaff[0]);
              setIsShiftModalOpen(true);
            } else {
              // Show notification that there are no staff members
              alert('Chưa có nhân viên nào để phân ca.');
            }
          }}
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
            <RiCalendarCheckLine size={22} className="text-white" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-blue-900">Phân ca làm việc</h3>
            <p className="text-xs text-blue-700">Quản lý lịch làm việc</p>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1"
          onClick={() => {
            if (filteredStaff.length > 0) {
              setCurrentStaff(filteredStaff[0]);
              setIsSalaryModalOpen(true);
            } else {
              // Show notification that there are no staff members
              alert('Chưa có nhân viên nào để quản lý lương thưởng.');
            }
          }}
        >
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full">
            <RiMoneyDollarBoxLine size={22} className="text-white" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-green-900">Lương thưởng</h3>
            <p className="text-xs text-green-700">Quản lý tiền lương</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-full">
            <RiTimeLine size={22} className="text-white" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-amber-900">Chấm công</h3>
            <p className="text-xs text-amber-700">Quản lý thời gian</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-full">
            <RiUserFollowLine size={22} className="text-white" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-purple-900">Nhân sự hoạt động</h3>
            <p className="text-xs text-purple-700">Nhân viên đang làm việc</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="position-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Vị trí
          </label>
          <div className="relative">
            <select
              id="position-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="receptionist">Lễ tân</option>
              <option value="maintenance">Bảo trì</option>
              <option value="cleaning">Vệ sinh</option>
              <option value="security">Bảo vệ</option>
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang làm việc</option>
              <option value="inactive">Đã nghỉ việc</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <input
            type="text"
            id="search"
            placeholder="Tìm theo tên, email, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Staff List with loading state */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <RiLoaderLine className="animate-spin text-primary" size={32} />
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Không có nhân viên nào phù hợp với điều kiện tìm kiếm
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Họ và tên</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Vị trí</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">SĐT</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ngày vào làm</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{staff.name}</td>
                  <td className="px-6 py-4">{getPositionLabel(staff.position)}</td>
                  <td className="px-6 py-4">{staff.email}</td>
                  <td className="px-6 py-4">{staff.phone}</td>
                  <td className="px-6 py-4">{staff.joinDate}</td>
                  <td className="px-6 py-4">
                    {staff.status === "active" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Đang làm việc
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Đã nghỉ việc
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3 items-center justify-center">
                      <div className="relative group">
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentStaff(staff);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <RiEditLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap z-10">
                          Chỉnh sửa
                        </span>
                      </div>
                      
                      <div className="relative group">
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentStaff(staff);
                            setIsShiftModalOpen(true);
                          }}
                        >
                          <RiTimeLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap z-10">
                          Ca làm việc
                        </span>
                      </div>
                      
                      <div className="relative group">
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentStaff(staff);
                            setIsSalaryModalOpen(true);
                          }}
                        >
                          <RiWalletLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap z-10">
                          Lương thưởng
                        </span>
                      </div>
                      
                      <div className="relative group">
                        <button 
                          className={`${
                            staff.status === "active" 
                              ? "text-red-600 hover:text-red-800 hover:bg-red-100" 
                              : "text-green-600 hover:text-green-800 hover:bg-green-100"
                          } p-1.5 rounded-full transition-colors`}
                          onClick={() => handleToggleStatus(staff.id!)}
                        >
                          {staff.status === "active" ? <RiUserUnfollowLine size={18} /> : <RiUserFollowLine size={18} />}
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap z-10">
                          {staff.status === "active" ? "Nghỉ việc" : "Kích hoạt"}
                        </span>
                      </div>
                      
                      <div className="relative group">
                        <button 
                          className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100 transition-colors"
                          onClick={() => {
                            setCurrentStaff(staff);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap z-10">
                          Xóa
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredStaff.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-sm gap-4">
          <div className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredStaff.length}</span> của <span className="font-medium">{filteredStaff.length}</span> nhân viên
          </div>
          <div className="flex items-center space-x-1">
            <button 
              className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white" 
              disabled
            >
              <RiArrowLeftSLine size={16} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/90">
              1
            </button>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
              disabled
            >
              <RiArrowRightSLine size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Staff Modal */}
      <StaffFormModal
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
        onSave={handleCreateStaff}
        title="Thêm nhân viên mới"
      />

      <StaffFormModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        initialData={currentStaff || undefined}
        onSave={handleUpdateStaff}
        title="Chỉnh sửa thông tin nhân viên"
      />      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteStaff}
        title="Xóa nhân viên"
        message={`Bạn có chắc chắn muốn xóa nhân viên ${currentStaff?.name || ''}? Thao tác này không thể hoàn tác.`}
      />      {/* Shift Schedule Modal */}
      <ShiftScheduleModal
        isOpen={isShiftModalOpen}
        closeModal={() => setIsShiftModalOpen(false)}
        initialData={currentStaff ? {
          staffId: currentStaff.id || 0,
          staffName: currentStaff.name,
          date: new Date().toISOString().split('T')[0],
          startTime: '08:00',
          endTime: '17:00',
          shiftType: 'fullday',
          status: 'scheduled'
        } : undefined}
        onSave={handleSaveShifts}
        title={`Quản lý ca làm việc ${currentStaff?.name ? `- ${currentStaff.name}` : ''}`}
        staffList={staffMembers.map(staff => ({ id: staff.id || 0, name: staff.name }))}
      />      {/* Salary Management Modal */}
      <SalaryManagementModal
        isOpen={isSalaryModalOpen}
        closeModal={() => setIsSalaryModalOpen(false)}
        initialData={currentStaff ? {
          staffId: currentStaff.id || 0,
          staffName: currentStaff.name,
          baseSalary: 5000000, // Default base salary (5,000,000 VND)
          bonus: 0,
          deduction: 0,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          paymentStatus: 'pending'
        } : undefined}
        onSave={handleSaveSalary}
        title={`Quản lý lương thưởng ${currentStaff?.name ? `- ${currentStaff.name}` : ''}`}
        staffList={staffMembers.map(staff => ({ id: staff.id || 0, name: staff.name }))}
      />
    </div>
  );
}
