import PageTitle from '@/components/PageTitle';
import { RiFilterLine, RiUserLine, RiVipDiamondLine } from 'react-icons/ri';

export default function CustomerManagement() {
  // Mock data for customers
  const customers = [
    {
      id: 1,
      name: "Trần Văn Nam",
      email: "tranvannam@example.com",
      phone: "0921234567",
      membership: "Gói Premium",
      membershipStatus: "active",
      expiryDate: "15/08/2025",
      joinDate: "15/02/2023",
      ptSessions: 12,
      totalSpent: "15,600,000₫"
    },
    {
      id: 2,
      name: "Nguyễn Thị Hương",
      email: "nguyenthihuong@example.com",
      phone: "0921234568",
      membership: "Gói Standard",
      membershipStatus: "active",
      expiryDate: "22/09/2025",
      joinDate: "22/03/2023",
      ptSessions: 0,
      totalSpent: "5,400,000₫"
    },
    {
      id: 3,
      name: "Lê Minh Tuấn",
      email: "leminhtuan@example.com",
      phone: "0921234569",
      membership: "Gói PT Basic",
      membershipStatus: "active",
      expiryDate: "N/A",
      joinDate: "10/04/2023",
      ptSessions: 8,
      totalSpent: "2,800,000₫"
    },
    {
      id: 4,
      name: "Phạm Thanh Hà",
      email: "phamthanhha@example.com",
      phone: "0921234570",
      membership: "Gói Premium",
      membershipStatus: "expired",
      expiryDate: "05/04/2025",
      joinDate: "05/10/2023",
      ptSessions: 20,
      totalSpent: "20,400,000₫"
    },
    {
      id: 5,
      name: "Hoàng Văn Bình",
      email: "hoangvanbinh@example.com",
      phone: "0921234571",
      membership: "Gói Yoga",
      membershipStatus: "active",
      expiryDate: "20/11/2025",
      joinDate: "20/05/2024",
      ptSessions: 0,
      totalSpent: "6,120,000₫"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý khách hàng" />
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
          + Thêm khách hàng
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng số khách hàng</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Gói tập đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Buổi PT đã đặt</p>
          <p className="text-2xl font-bold text-blue-600">40</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-purple-600">50,320,000₫</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <RiVipDiamondLine size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Gia hạn gói tập</h3>
            <p className="text-sm text-gray-600">Quản lý gói tập và gia hạn cho khách hàng</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <RiUserLine size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Quản lý buổi PT</h3>
            <p className="text-sm text-gray-600">Đặt lịch và quản lý buổi PT cho khách hàng</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="membership-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Loại gói tập
          </label>
          <div className="relative">
            <select
              id="membership-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="standard">Gói Standard</option>
              <option value="premium">Gói Premium</option>
              <option value="pt">Gói PT</option>
              <option value="yoga">Gói Yoga</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <div className='relative'>
            <select
              id="status-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="expired">Hết hạn</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />

          </div>
        </div>

        <div>
          <label htmlFor="join-date-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Thời gian tham gia
          </label>
          <div className='relative'>
            <select
              id="join-date-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="last-month">Tháng trước</option>
              <option value="last-quarter">Quý trước</option>
              <option value="last-year">Năm trước</option>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Họ và tên</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email/SĐT</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Gói tập</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ngày hết hạn</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Buổi PT</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Chi tiêu</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{customer.name}</td>
                <td className="px-6 py-4">
                  <div>{customer.email}</div>
                  <div className="text-gray-500 text-sm">{customer.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{customer.membership}</div>
                  <div>
                    {customer.membershipStatus === "active" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Hết hạn
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">{customer.expiryDate}</td>
                <td className="px-6 py-4">{customer.ptSessions}</td>
                <td className="px-6 py-4 font-medium">{customer.totalSpent}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Chi tiết
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      Gia hạn
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">5</span> khách hàng
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50" disabled>
            Trước
          </button>
          <button className="px-3 py-1 bg-primary text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50" disabled>
            Tiếp
          </button>
        </div>
      </div>
    </div >
  );
}
