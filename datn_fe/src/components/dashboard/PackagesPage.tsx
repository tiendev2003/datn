import React, { useState } from 'react';

export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  durationText: string;
  features: string[];
  maxClasses: number | null;
  maxPersonalTrainings: number | null;
  status: 'active' | 'inactive';
  popularityScore: number;
  isPopular: boolean;
  type: 'basic' | 'standard' | 'premium' | 'custom';
  classTypes?: string[];
  allowedTimeRanges?: { start: string; end: string }[];
  createdAt: string;
  updatedAt: string;
}

interface PackagesPageProps {
  initialPackages?: Package[];
}

const PackagesPage: React.FC<PackagesPageProps> = ({ initialPackages = [] }) => {
  const [packages, setPackages] = useState<Package[]>(initialPackages.length > 0 ? initialPackages : [
    {
      id: 1,
      name: 'Gói Cơ Bản',
      description: 'Gói tập dành cho người mới bắt đầu, phù hợp cho việc khám phá các dịch vụ tại phòng tập.',
      price: 499000,
      durationDays: 30,
      durationText: '1 tháng',
      features: [
        'Sử dụng khu vực tập tự do',
        'Tham gia 5 lớp học nhóm mỗi tháng',
        'Giảm giá 5% cho các dịch vụ khác',
        'Đánh giá thể chất cơ bản',
      ],
      maxClasses: 5,
      maxPersonalTrainings: null,
      status: 'active',
      popularityScore: 75,
      isPopular: false,
      type: 'basic',
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-03-20T15:30:00Z'
    },
    {
      id: 2,
      name: 'Gói Tiêu Chuẩn',
      description: 'Gói phổ biến nhất, phù hợp cho hầu hết người tập thể hình thường xuyên.',
      price: 899000,
      durationDays: 30,
      durationText: '1 tháng',
      features: [
        'Sử dụng khu vực tập tự do',
        'Tham gia không giới hạn các lớp học nhóm',
        'Giảm giá 10% cho các dịch vụ khác',
        'Đánh giá thể chất nâng cao',
        '2 buổi tập với HLV cá nhân mỗi tháng',
        'Tư vấn dinh dưỡng cơ bản',
      ],
      maxClasses: null,
      maxPersonalTrainings: 2,
      status: 'active',
      popularityScore: 90,
      isPopular: true,
      type: 'standard',
      createdAt: '2025-01-15T09:15:00Z',
      updatedAt: '2025-03-21T10:45:00Z'
    },
    {
      id: 3,
      name: 'Gói Cao Cấp',
      description: 'Gói toàn diện và cao cấp nhất, dành cho những người muốn đạt được kết quả tối đa.',
      price: 1499000,
      durationDays: 30,
      durationText: '1 tháng',
      features: [
        'Sử dụng không giới hạn toàn bộ khu vực tập luyện',
        'Tham gia không giới hạn các lớp học nhóm',
        'Giảm giá 15% cho các dịch vụ khác',
        'Đánh giá thể chất chuyên sâu',
        '4 buổi tập với HLV cá nhân mỗi tháng',
        'Tư vấn dinh dưỡng chuyên sâu',
        'Sử dụng khu vực spa & xông hơi không giới hạn',
        'Chế độ ưu tiên đặt lịch',
      ],
      maxClasses: null,
      maxPersonalTrainings: 4,
      status: 'active',
      popularityScore: 82,
      isPopular: false,
      type: 'premium',
      createdAt: '2025-01-15T09:30:00Z',
      updatedAt: '2025-03-22T14:20:00Z'
    },
    {
      id: 4,
      name: 'Gói 3 tháng Tiêu Chuẩn',
      description: 'Tiết kiệm hơn khi đăng ký gói 3 tháng với đầy đủ các tính năng của gói Tiêu Chuẩn.',
      price: 2499000,
      durationDays: 90,
      durationText: '3 tháng',
      features: [
        'Sử dụng khu vực tập tự do',
        'Tham gia không giới hạn các lớp học nhóm',
        'Giảm giá 10% cho các dịch vụ khác',
        'Đánh giá thể chất nâng cao',
        '6 buổi tập với HLV cá nhân',
        'Tư vấn dinh dưỡng cơ bản',
        'Áo phông tập luyện cao cấp',
      ],
      maxClasses: null,
      maxPersonalTrainings: 6,
      status: 'active',
      popularityScore: 85,
      isPopular: false,
      type: 'standard',
      createdAt: '2025-01-20T11:00:00Z',
      updatedAt: '2025-03-25T09:15:00Z'
    },
    {
      id: 5,
      name: 'Gói Sinh Viên',
      description: 'Gói ưu đãi đặc biệt dành riêng cho sinh viên có thẻ sinh viên hợp lệ.',
      price: 399000,
      durationDays: 30,
      durationText: '1 tháng',
      features: [
        'Sử dụng khu vực tập tự do (9:00 - 16:00)',
        'Tham gia 3 lớp học nhóm mỗi tháng',
        'Đánh giá thể chất cơ bản',
      ],
      maxClasses: 3,
      maxPersonalTrainings: null,
      status: 'active',
      popularityScore: 70,
      isPopular: false,
      type: 'basic',
      classTypes: ['yoga', 'cardio', 'hiit'],
      allowedTimeRanges: [{ start: '09:00', end: '16:00' }],
      createdAt: '2025-02-05T13:45:00Z',
      updatedAt: '2025-04-10T08:30:00Z'
    },
    {
      id: 6,
      name: 'Gói Doanh Nghiệp',
      description: 'Gói tùy chỉnh cho doanh nghiệp với ít nhất 5 nhân viên đăng ký.',
      price: 799000,
      durationDays: 30,
      durationText: '1 tháng/người',
      features: [
        'Sử dụng không giới hạn toàn bộ khu vực tập luyện',
        'Tham gia không giới hạn các lớp học nhóm',
        'Giảm giá 12% cho các dịch vụ khác',
        'Đánh giá thể chất chuyên sâu',
        '2 buổi tập với HLV cá nhân mỗi tháng',
        'Báo cáo sức khỏe tập thể hàng tháng',
        'Tổ chức sự kiện team building',
      ],
      maxClasses: null,
      maxPersonalTrainings: 2,
      status: 'inactive',
      popularityScore: 60,
      isPopular: false,
      type: 'custom',
      createdAt: '2025-02-10T10:20:00Z',
      updatedAt: '2025-04-15T16:45:00Z'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lọc và sắp xếp gói tập
  const filteredPackages = packages
    .filter(pkg => {
      const matchesSearch = 
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || pkg.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'duration':
          return b.durationDays - a.durationDays;
        case 'popularity':
        default:
          return b.popularityScore - a.popularityScore;
      }
    });

  // Format giá
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6 p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen rounded-lg">
      <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Quản lý gói tập
          </h3>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            + Tạo gói mới
          </button>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label htmlFor="search" className="sr-only">
              Tìm kiếm
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
                placeholder="Tìm kiếm gói tập..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Type filter */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loại gói
            </label>
            <select
              id="type"
              name="type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Tất cả loại</option>
              <option value="basic">Cơ bản</option>
              <option value="standard">Tiêu chuẩn</option>
              <option value="premium">Cao cấp</option>
              <option value="custom">Tùy chỉnh</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Trạng thái
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang kích hoạt</option>
              <option value="inactive">Đã vô hiệu</option>
            </select>
          </div>

          {/* Sort by */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sắp xếp theo
            </label>
            <select
              id="sortBy"
              name="sortBy"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Phổ biến nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="name">Tên (A-Z)</option>
              <option value="duration">Thời hạn dài nhất</option>
            </select>
          </div>
        </div>

        {/* Package cards */}
        <div className="p-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border ${
                  pkg.isPopular
                    ? 'border-red-500 dark:border-red-700'
                    : 'border-gray-200 dark:border-gray-700'
                } rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide transform translate-x-2 -translate-y-0 rotate-45 origin-bottom-left">
                    Phổ biến
                  </div>
                )}
                <div className="px-4 pt-5 pb-4">
                  <div className={`flex justify-between ${pkg.isPopular ? 'mr-6' : ''}`}>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{pkg.name}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pkg.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {pkg.status === 'active' ? 'Kích hoạt' : 'Vô hiệu'}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /{pkg.durationText}
                    </span>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    {pkg.description}
                  </div>

                  <div className="mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pkg.type === 'basic'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        : pkg.type === 'standard'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : pkg.type === 'premium'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {pkg.type === 'basic' && 'Cơ bản'}
                      {pkg.type === 'standard' && 'Tiêu chuẩn'}
                      {pkg.type === 'premium' && 'Cao cấp'}
                      {pkg.type === 'custom' && 'Tùy chỉnh'}
                    </span>
                    {pkg.allowedTimeRanges && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        Giới hạn thời gian
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Tính năng:</h4>
                    <ul className="mt-2 space-y-2">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex text-sm">
                          <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400">
                          + {pkg.features.length - 3} tính năng khác
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-2">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        setCurrentPackage(pkg);
                        setIsModalOpen(true);
                      }}
                    >
                      Chi tiết
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Chỉnh sửa
                    </button>
                    {pkg.status === 'active' ? (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Vô hiệu hóa
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-green-700 dark:text-green-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Kích hoạt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Trước
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Sau
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredPackages.length}</span> trong số{' '}
                <span className="font-medium">{packages.length}</span> gói tập
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Trước</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-red-50 dark:bg-red-900 text-sm font-medium text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Sau</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for package details */}
      {isModalOpen && currentPackage && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      Chi tiết gói tập
                    </h3>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{currentPackage.name}</h4>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          currentPackage.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {currentPackage.status === 'active' ? 'Kích hoạt' : 'Vô hiệu'}
                        </span>
                      </div>
                      
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatPrice(currentPackage.price)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          /{currentPackage.durationText}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        {currentPackage.description}
                      </p>

                      <div className="mt-4">
                        <h5 className="font-medium text-gray-900 dark:text-white">Tính năng:</h5>
                        <ul className="mt-2 space-y-2">
                          {currentPackage.features.map((feature, index) => (
                            <li key={index} className="flex text-sm">
                              <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <dl className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Thời hạn</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{currentPackage.durationDays} ngày</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Loại gói</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">{
                            currentPackage.type === 'basic' ? 'Cơ bản' :
                            currentPackage.type === 'standard' ? 'Tiêu chuẩn' :
                            currentPackage.type === 'premium' ? 'Cao cấp' : 'Tùy chỉnh'
                          }</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Giới hạn lớp học</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {currentPackage.maxClasses === null ? "Không giới hạn" : `${currentPackage.maxClasses} lớp/tháng`}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Buổi PT</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {currentPackage.maxPersonalTrainings === null ? "Không bao gồm" : `${currentPackage.maxPersonalTrainings} buổi`}
                          </dd>
                        </div>
                        {currentPackage.classTypes && (
                          <div className="col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Loại lớp học</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                              {currentPackage.classTypes.join(', ')}
                            </dd>
                          </div>
                        )}
                        {currentPackage.allowedTimeRanges && (
                          <div className="col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Thời gian được phép</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                              {currentPackage.allowedTimeRanges.map((range, index) => (
                                <span key={index}>{range.start} - {range.end}{index < currentPackage.allowedTimeRanges!.length - 1 ? ', ' : ''}</span>
                              ))}
                            </dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(currentPackage.createdAt)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Cập nhật lần cuối</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(currentPackage.updatedAt)}</dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Độ phổ biến</dt>
                          <dd className="mt-1">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  currentPackage.popularityScore >= 80
                                    ? 'bg-green-500 dark:bg-green-600'
                                    : currentPackage.popularityScore >= 50
                                    ? 'bg-yellow-500 dark:bg-yellow-600'
                                    : 'bg-red-500 dark:bg-red-600'
                                }`}
                                style={{ width: `${currentPackage.popularityScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{currentPackage.popularityScore}%</span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;