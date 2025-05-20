import PageTitle from '@/components/PageTitle';
import { RiCalendarCheckLine, RiFileDownloadLine, RiTimeLine } from 'react-icons/ri';

export default function Reports() {
  // Mock data for reports
  const membershipStats = [
    { name: "Gói Standard", count: 120, percentage: 40 },
    { name: "Gói Premium", count: 75, percentage: 25 },
    { name: "Gói PT", count: 60, percentage: 20 },
    { name: "Gói Yoga", count: 45, percentage: 15 }
  ];

  const trainerPerformance = [
    {
      name: "Hoàng Văn A",
      sessions: 42,
      rating: 4.8,
      reviews: 32,
      earnings: "14,700,000₫",
      utilization: 85
    },
    {
      name: "Lê Thị B",
      sessions: 38,
      rating: 4.9,
      reviews: 30,
      earnings: "13,300,000₫",
      utilization: 82
    },
    {
      name: "Trần Văn C",
      sessions: 35,
      rating: 4.7,
      reviews: 28,
      earnings: "12,250,000₫",
      utilization: 75
    },
    {
      name: "Nguyễn Văn E",
      sessions: 32,
      rating: 4.6,
      reviews: 25,
      earnings: "11,200,000₫",
      utilization: 70
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Báo cáo thống kê" />
        <div className="flex space-x-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition flex items-center">
            <RiFileDownloadLine className="mr-1" />
            Xuất báo cáo
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            Tùy chỉnh báo cáo
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="report-period" className="block text-sm font-medium text-gray-700 mb-1">
            Khoảng thời gian
          </label>
          <select
            id="report-period"
            className="border rounded-md p-2 text-sm"
            defaultValue="this-month"
          >
            <option value="this-month">Tháng này</option>
            <option value="last-month">Tháng trước</option>
            <option value="this-quarter">Quý này</option>
            <option value="last-quarter">Quý trước</option>
            <option value="this-year">Năm nay</option>
            <option value="custom">Tùy chỉnh</option>
          </select>
        </div>

        <div className="flex items-end space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Áp dụng
          </button>
        </div>

        <div className="ml-auto flex items-center text-sm text-gray-600">
          <RiCalendarCheckLine className="mr-1" />
          Dữ liệu cập nhật: 20/05/2025
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Khách hàng mới</p>
          <p className="text-2xl font-bold">42</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-green-500 font-medium">+8% </span>
            <span className="text-gray-500">so với tháng trước</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng doanh thu</p>
          <p className="text-2xl font-bold">120,350,000₫</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-green-500 font-medium">+12% </span>
            <span className="text-gray-500">so với tháng trước</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tỷ lệ chuyển đổi</p>
          <p className="text-2xl font-bold">68%</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-green-500 font-medium">+5% </span>
            <span className="text-gray-500">so với tháng trước</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Điểm đánh giá trung bình</p>
          <p className="text-2xl font-bold">4.7/5</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-green-500 font-medium">+0.2 </span>
            <span className="text-gray-500">so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Doanh thu theo thời gian</h3>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Biểu đồ doanh thu theo thời gian sẽ hiển thị ở đây</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Phân bổ doanh thu</h3>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Biểu đồ phân bổ doanh thu sẽ hiển thị ở đây</p>
          </div>
        </div>
      </div>

      {/* Membership Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Phân bổ gói tập</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 text-left">Tên gói</th>
                <th className="py-3 text-left">Số lượng</th>
                <th className="py-3 text-left">Tỷ lệ</th>
                <th className="py-3 text-left">Phân bổ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {membershipStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50 ">
                  <td className="py-3 font-medium">{stat.name}</td>
                  <td className="py-3">{stat.count}</td>
                  <td className="py-3">{stat.percentage}%</td>
                  <td className="py-3 w-1/3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainer Performance */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Hiệu suất huấn luyện viên</h3>
          <button className="text-primary hover:underline text-sm">
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">

                <th className="py-3 text-left">Huấn luyện viên</th>
                <th className="py-3 text-left">Số buổi tập</th>
                <th className="py-3 text-left">Đánh giá</th>
                <th className="py-3 text-left">Thu nhập</th>
                <th className="py-3 text-left">Tỷ lệ sử dụng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trainerPerformance.map((trainer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{trainer.name}</td>
                  <td className="py-3">{trainer.sessions}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <span>{trainer.rating}</span>
                      <span className="text-yellow-500 ml-1">★</span>
                      <span className="text-gray-500 text-sm ml-1">({trainer.reviews})</span>
                    </div>
                  </td>
                  <td className="py-3 font-medium">{trainer.earnings}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${trainer.utilization >= 80 ? 'bg-green-500' :
                            trainer.utilization >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          style={{ width: `${trainer.utilization}%` }}
                        ></div>
                      </div>
                      <span>{trainer.utilization}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <RiCalendarCheckLine className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium ml-3">Báo cáo lịch tập</h3>
          </div>
          <p className="text-gray-600 text-sm">Thống kê buổi tập, tỷ lệ đặt lịch và hủy lịch</p>
          <div className="mt-3 text-blue-600 text-sm font-medium">Xem báo cáo →</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <RiTimeLine className="text-green-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium ml-3">Báo cáo khách hàng</h3>
          </div>
          <p className="text-gray-600 text-sm">Phân tích khách hàng mới, tỷ lệ giữ chân và gia hạn</p>
          <div className="mt-3 text-blue-600 text-sm font-medium">Xem báo cáo →</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <RiTimeLine className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium ml-3">Báo cáo nhân sự</h3>
          </div>
          <p className="text-gray-600 text-sm">Thống kê hiệu suất, đánh giá và tiền lương</p>
          <div className="mt-3 text-blue-600 text-sm font-medium">Xem báo cáo →</div>
        </div>
      </div>
    </div>
  );
}
