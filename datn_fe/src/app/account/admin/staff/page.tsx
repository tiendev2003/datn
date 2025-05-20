import PageTitle from '@/components/PageTitle';
import { RiCalendarCheckLine, RiFilterLine, RiMoneyDollarBoxLine } from 'react-icons/ri';

export default function StaffManagement() {
  // Mock data for staff
  const staffMembers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Lễ tân",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      status: "active",
      joinDate: "15/04/2023",
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "Lễ tân",
      email: "tranthib@example.com",
      phone: "0901234568",
      status: "active",
      joinDate: "20/05/2023",
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "Nhân viên vệ sinh",
      email: "levanc@example.com",
      phone: "0901234569",
      status: "active",
      joinDate: "10/01/2024",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      position: "Nhân viên bảo trì",
      email: "phamthid@example.com",
      phone: "0901234570",
      status: "inactive",
      joinDate: "05/02/2024",
    },
    {
      id: 5,
      name: "Vũ Văn E",
      position: "Bảo vệ",
      email: "vuvane@example.com",
      phone: "0901234571",
      status: "active",
      joinDate: "30/03/2024",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý nhân sự" />
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
          + Thêm nhân viên
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <RiCalendarCheckLine size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Quản lý ca làm việc</h3>
            <p className="text-sm text-gray-600">Phân ca, điều chỉnh lịch làm việc</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <RiMoneyDollarBoxLine size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Quản lý lương thưởng</h3>
            <p className="text-sm text-gray-600">Cấu hình lương, tính thưởng, phạt</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="position-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Vị trí
          </label>
          <div className="relative">
            <select
              id="position-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
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
              defaultValue="all"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
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
            {staffMembers.map((staff) => (
              <tr key={staff.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{staff.name}</td>
                <td className="px-6 py-4">{staff.position}</td>
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
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Chi tiết
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                    {staff.status === "active" ? (
                      <button className="text-red-600 hover:text-red-800">
                        Nghỉ việc
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-800">
                        Kích hoạt
                      </button>
                    )}
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
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">5</span> nhân viên
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
    </div>
  );
}
