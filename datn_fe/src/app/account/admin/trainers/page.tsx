import PageTitle from '@/components/PageTitle';
import { RiFilterLine, RiStarFill } from 'react-icons/ri';

export default function TrainerManagement() {
  // Mock data for trainers
  const trainers = [
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
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý huấn luyện viên" />
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
          + Thêm huấn luyện viên
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng số PT</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">PT đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Đánh giá trung bình</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold">4.7</p>
            <RiStarFill className="ml-1 text-yellow-500" size={24} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Chuyên môn
          </label>
          <div className="relative">
            <select
              id="specialty-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
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
              defaultValue="all"
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
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="4.5+">4.5 sao trở lên</option>
              <option value="4+">4 sao trở lên</option>
              <option value="3.5+">3.5 sao trở lên</option>
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
            placeholder="Tìm theo tên, email, chuyên môn..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
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
            {trainers.map((trainer) => (
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
                    <button className="text-blue-600 hover:text-blue-800">
                      Hồ sơ
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                    {trainer.status === "active" ? (
                      <button className="text-red-600 hover:text-red-800">
                        Vô hiệu
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
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">5</span> huấn luyện viên
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
