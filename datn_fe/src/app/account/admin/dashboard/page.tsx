import PageTitle from '@/components/PageTitle';

export default function Dashboard() {
  // In a real app, these values would come from API calls
  const stats = [
    { label: 'Tổng doanh thu', value: '120.350.000₫', increase: '12%', period: 'so với tháng trước' },
    { label: 'Khách hàng mới', value: '42', increase: '8%', period: 'so với tháng trước' },
    { label: 'Gói tập đã bán', value: '78', increase: '15%', period: 'so với tháng trước' },
    { label: 'Buổi PT đã đặt', value: '156', increase: '18%', period: 'so với tháng trước' },
  ];

  const recentActivities = [
    { id: 1, user: 'Nguyễn Văn A', action: 'đã đăng ký gói', target: 'Gói Platinum 12 tháng', time: '10 phút trước', amount: '15.600.000₫' },
    { id: 2, user: 'Trần Thị B', action: 'đặt lịch với', target: 'PT Nguyễn Văn C', time: '30 phút trước', amount: '350.000₫' },
    { id: 3, user: 'Lê Văn D', action: 'đánh giá', target: 'PT Trần Văn E', time: '1 giờ trước', rating: '5.0' },
    { id: 4, user: 'Phạm Văn F', action: 'gia hạn gói', target: 'Gói Gold 3 tháng', time: '3 giờ trước', amount: '4.500.000₫' },
    { id: 5, user: 'Hoàng Thị G', action: 'huỷ lịch với', target: 'PT Lê Thị H', time: '5 giờ trước' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle title="Bảng điều khiển quản trị" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <div className="flex items-center mt-2">
              <span className="text-green-500 font-medium">{stat.increase} ↑</span>
              <span className="ml-1 text-gray-500 text-sm">{stat.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ doanh thu */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Doanh thu theo thời gian</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Biểu đồ doanh thu sẽ hiển thị ở đây</p>
          </div>
        </div>

        {/* Phân bố doanh thu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Phân bố doanh thu</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Biểu đồ phân bố sẽ hiển thị ở đây</p>
          </div>
        </div>
      </div>

      {/* Hoạt động gần đây */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">

                <th className="py-3 text-left">Người dùng</th>
                <th className="py-3 text-left">Hoạt động</th>
                <th className="py-3 text-left">Thời gian</th>
                <th className="py-3 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{activity.user}</td>
                  <td className="py-3">
                    {activity.action} <span className="font-medium">{activity.target}</span>
                  </td>
                  <td className="py-3 text-gray-500">{activity.time}</td>
                  <td className="py-3 text-right">
                    {activity.amount && <span className="font-semibold text-green-600">{activity.amount}</span>}
                    {activity.rating && <span className="font-semibold text-yellow-500">★ {activity.rating}</span>}
                    {!activity.amount && !activity.rating && <span>-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="text-primary hover:underline font-medium">
            Xem tất cả hoạt động →
          </button>
        </div>
      </div>
    </div>
  );
}
