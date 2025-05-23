'use client';

import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import PackageFormModal, { PackageFormData } from '@/components/PackageFormModal';
import PageTitle from '@/components/PageTitle';
import { useEffect, useState } from 'react';
import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiEditLine,
  RiFilterLine,
  RiLoaderLine
} from 'react-icons/ri';

export default function Packages() {
  // State for packages data
  const [packages, setPackages] = useState<PackageFormData[]>([
    {
      id: 1,
      name: "Gói Standard",
      type: "gym",
      basePrice: 1000000,
      isActive: true,
      durations: [
        { id: 1, type: "day", value: 30, price: 1000000, discount: 0 },
        { id: 2, type: "month", value: 3, price: 2700000, discount: 10 },
        { id: 3, type: "month", value: 6, price: 5100000, discount: 15 },
        { id: 4, type: "month", value: 12, price: 9600000, discount: 20 },
      ]
    },
    {
      id: 2,
      name: "Gói Premium",
      type: "gym",
      basePrice: 1500000,
      isActive: true,
      durations: [
        { id: 5, type: "day", value: 30, price: 1500000, discount: 0 },
        { id: 6, type: "month", value: 3, price: 4050000, discount: 10 },
        { id: 7, type: "month", value: 6, price: 7650000, discount: 15 },
        { id: 8, type: "month", value: 12, price: 14400000, discount: 20 },
      ]
    },
    {
      id: 3,
      name: "Gói PT Basic",
      type: "pt",
      basePrice: 350000,
      isActive: true,
      durations: [
        { id: 9, type: "session", value: 1, price: 350000, discount: 0 },
        { id: 10, type: "session", value: 10, price: 3150000, discount: 10 },
        { id: 11, type: "session", value: 20, price: 5950000, discount: 15 },
      ]
    },
    {
      id: 4,
      name: "Gói Yoga",
      type: "yoga",
      basePrice: 1200000,
      isActive: true,
      durations: [
        { id: 12, type: "day", value: 30, price: 1200000, discount: 0 },
        { id: 13, type: "month", value: 3, price: 3240000, discount: 10 },
        { id: 14, type: "month", value: 6, price: 6120000, discount: 15 },
      ]
    },
  ]);

  // State for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<PackageFormData | null>(null);

  // State for filters and search
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Filtered packages based on filters and search
  const filteredPackages = packages.filter(pkg => {
    // Type filter
    if (typeFilter !== 'all' && pkg.type !== typeFilter) {
      return false;
    }

    // Status filter
    if (statusFilter === 'active' && !pkg.isActive) {
      return false;
    }
    if (statusFilter === 'inactive' && pkg.isActive) {
      return false;
    }

    // Search by name
    if (searchQuery && !pkg.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Effect to load packages from API (would be implemented in production)
  useEffect(() => {
    // In a real implementation, we would fetch packages from API here
    // Example:
    // const loadPackages = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch('/api/packages');
    //     const data = await response.json();
    //     setPackages(data);
    //   } catch (error) {
    //     console.error('Error loading packages:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadPackages();
  }, []);

  // Function to handle creating a new package
  const handleCreatePackage = (newPackage: PackageFormData) => {
    // In a real implementation, we would POST to API and then update state
    // Example:
    // const createPackage = async (packageData: PackageFormData) => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch('/api/packages', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(packageData),
    //     });
    //     const data = await response.json();
    //     setPackages([...packages, data]);
    //     setIsCreateModalOpen(false);
    //   } catch (error) {
    //     console.error('Error creating package:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // For now, just add it to the state with a mock ID
    const lastId = packages.reduce((max, pkg) => Math.max(max, pkg.id || 0), 0);
    const packageWithId = {
      ...newPackage,
      id: lastId + 1,
      durations: newPackage.durations.map((duration, index) => ({
        ...duration,
        id: lastId * 100 + index + 1,
      })),
    };

    setPackages([...packages, packageWithId]);
  };

  // Function to handle updating a package
  const handleUpdatePackage = (updatedPackage: PackageFormData) => {
    // In a real implementation, we would PUT to API and then update state
    // Example:
    // const updatePackage = async (packageData: PackageFormData) => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch(`/api/packages/${packageData.id}`, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(packageData),
    //     });
    //     const data = await response.json();
    //     setPackages(packages.map(pkg => pkg.id === data.id ? data : pkg));
    //     setIsEditModalOpen(false);
    //     setCurrentPackage(null);
    //   } catch (error) {
    //     console.error('Error updating package:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // For now, just update it in the state
    setPackages(packages.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg));
    setCurrentPackage(null);
  };

  // Function to handle deleting a package
  const handleDeletePackage = () => {
    if (!currentPackage) return;

    // In a real implementation, we would DELETE to API and then update state
    // Example:
    // const deletePackage = async (id: number) => {
    //   setLoading(true);
    //   try {
    //     await fetch(`/api/packages/${id}`, {
    //       method: 'DELETE',
    //     });
    //     setPackages(packages.filter(pkg => pkg.id !== id));
    //     setCurrentPackage(null);
    //     setIsDeleteModalOpen(false);
    //   } catch (error) {
    //     console.error('Error deleting package:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // For now, just remove it from the state
    setPackages(packages.filter(pkg => pkg.id !== currentPackage.id));
    setCurrentPackage(null);
  };

  // Function to toggle package active status
  const togglePackageStatus = (packageId: number) => {
    // In a real implementation, we would PATCH to API and then update state
    // Example:
    // const toggleStatus = async (id: number) => {
    //   const pkg = packages.find(p => p.id === id);
    //   if (!pkg) return;
    //
    //   setLoading(true);
    //   try {
    //     const response = await fetch(`/api/packages/${id}/status`, {
    //       method: 'PATCH',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ isActive: !pkg.isActive }),
    //     });
    //     const data = await response.json();
    //     setPackages(packages.map(pkg => pkg.id === data.id ? data : pkg));
    //   } catch (error) {
    //     console.error('Error toggling package status:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // For now, just toggle it in the state
    setPackages(packages.map(pkg =>
      pkg.id === packageId ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
  };
  return (
    <div className="space-y-6">      <div className="flex justify-between items-center">
      <PageTitle title="Quản lý gói tập" />
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition flex items-center gap-1"
      >
        <RiAddLine size={18} /> <span>Thêm gói tập mới</span>
      </button>
    </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Loại gói
          </label>
          <div className="relative">
            <select
              id="type-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="gym">Gym</option>
              <option value="pt">PT</option>
              <option value="yoga">Yoga</option>
              <option value="zumba">Zumba</option>
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
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
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
            placeholder="Tìm theo tên gói tập..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Package List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <RiLoaderLine className="animate-spin text-primary mr-2" size={24} />
            <span>Đang tải dữ liệu...</span>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Không tìm thấy gói tập nào phù hợp với điều kiện tìm kiếm.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-gray-500 font-medium">Tên gói</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Loại</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Giá cơ bản</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Thời hạn</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Trạng thái</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{pkg.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <span className={`text-xs rounded-full px-2 py-1 ${pkg.type === 'gym' ? 'bg-blue-100 text-blue-700' :
                      pkg.type === 'pt' ? 'bg-purple-100 text-purple-700' :
                        pkg.type === 'yoga' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                      }`}>
                      {pkg.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{pkg.basePrice.toLocaleString()}₫</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <span className="text-sm text-gray-600">
                      {pkg.durations.length} lựa chọn
                    </span>
                  </td>                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <div className="relative group inline-block">
                      <button
                        onClick={() => togglePackageStatus(pkg.id!)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pkg.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                      >
                        {pkg.isActive ? <RiCheckboxCircleLine className="mr-1" size={14} /> : <RiCloseCircleLine className="mr-1" size={14} />}
                        {pkg.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => {
                            setCurrentPackage(pkg);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <RiEditLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
                          Chỉnh sửa
                        </span>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100 transition-colors"
                          onClick={() => {
                            setCurrentPackage(pkg);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 -left-1 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
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

      {/* Pagination */}      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-sm gap-4">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredPackages.length}</span> của <span className="font-medium">{filteredPackages.length}</span> gói
        </div>
        <div className="flex items-center space-x-1">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/90">
            1
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Create Package Modal */}
      <PackageFormModal
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePackage}
        title="Thêm gói tập mới"
      />

      {/* Edit Package Modal */}
      {currentPackage && (
        <PackageFormModal
          isOpen={isEditModalOpen}
          closeModal={() => {
            setIsEditModalOpen(false);
            setCurrentPackage(null);
          }}
          initialData={currentPackage}
          onSave={handleUpdatePackage}
          title="Chỉnh sửa gói tập"
        />
      )}

      {/* Delete Confirmation Modal */}
      {currentPackage && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          closeModal={() => {
            setIsDeleteModalOpen(false);
            setCurrentPackage(null);
          }}
          onConfirm={handleDeletePackage}
          title="Xóa gói tập"
          message={`Bạn có chắc chắn muốn xóa gói "${currentPackage.name}"? Hành động này không thể hoàn tác.`}
        />
      )}
    </div>
  );
}
