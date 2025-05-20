import PageTitle from '@/components/PageTitle';
import { RiFilterLine } from 'react-icons/ri';

export default function Packages() {
  // Mock data for packages
  const packages = [
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
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý gói tập" />
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
          + Thêm gói tập mới
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
              defaultValue="all"
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
              defaultValue="all"
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
          />
        </div>
      </div>

      {/* Package List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
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
            {packages.map((pkg) => (
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {pkg.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Ngừng hoạt động
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Xóa
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
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">4</span> của <span className="font-medium">4</span> gói
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
