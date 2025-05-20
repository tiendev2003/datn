import PageTitle from '@/components/PageTitle';
import { RiFileDownloadLine, RiFilePdfLine, RiFilterLine } from 'react-icons/ri';

export default function FinancialManagement() {
  // Mock data for financial transactions
  const transactions = [
    {
      id: 1,
      date: "18/05/2025",
      customer: "Trần Văn Nam",
      description: "Thanh toán gói Premium 12 tháng",
      amount: "15,600,000₫",
      method: "VNPay",
      status: "completed",
      type: "income"
    },
    {
      id: 2,
      date: "17/05/2025",
      customer: "Nguyễn Thị Hương",
      description: "Thanh toán gói Standard 6 tháng",
      amount: "5,400,000₫",
      method: "MoMo",
      status: "completed",
      type: "income"
    },
    {
      id: 3,
      date: "16/05/2025",
      customer: "Lê Minh Tuấn",
      description: "Thanh toán 8 buổi PT",
      amount: "2,800,000₫",
      method: "Tiền mặt",
      status: "completed",
      type: "income"
    },
    {
      id: 4,
      date: "15/05/2025",
      customer: "N/A",
      description: "Thanh toán thiết bị",
      amount: "25,000,000₫",
      method: "Chuyển khoản",
      status: "completed",
      type: "expense"
    },
    {
      id: 5,
      date: "14/05/2025",
      customer: "Hoàng Văn Bình",
      description: "Thanh toán gói Yoga 6 tháng",
      amount: "6,120,000₫",
      method: "ZaloPay",
      status: "pending",
      type: "income"
    }
  ];

  // Financial summary mock data
  const summary = {
    income: "54,920,000₫",
    expense: "25,000,000₫",
    profit: "29,920,000₫",
    percentChange: "+12%"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý tài chính" />
        <div className="flex space-x-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition flex items-center">
            <RiFileDownloadLine className="mr-1" />
            Xuất Excel
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition flex items-center">
            <RiFilePdfLine className="mr-1" />
            Xuất PDF
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            + Thêm giao dịch
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng thu</p>
          <p className="text-2xl font-bold text-green-600">{summary.income}</p>
          <p className="text-sm text-green-600">{summary.percentChange} so với tháng trước</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng chi</p>
          <p className="text-2xl font-bold text-red-600">{summary.expense}</p>
          <p className="text-sm text-gray-500">Tháng 5/2025</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Lợi nhuận</p>
          <p className="text-2xl font-bold">{summary.profit}</p>
          <p className="text-sm text-green-600">{summary.percentChange} so với tháng trước</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Hoàn thành mục tiêu</p>
          <div className="relative pt-1 mt-2">
            <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200">
              <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary">
                75%
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Mục tiêu: 40,000,000₫</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Doanh thu theo thời gian</h3>
        <div className="h-72 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Biểu đồ doanh thu sẽ hiển thị ở đây</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Khoảng thời gian
          </label>
          <div className="relative">
            <select
              id="date-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="this-month"
            >
              <option value="this-month">Tháng này</option>
              <option value="last-month">Tháng trước</option>
              <option value="this-quarter">Quý này</option>
              <option value="last-quarter">Quý trước</option>
              <option value="this-year">Năm nay</option>
              <option value="custom">Tùy chỉnh</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />

          </div>
        </div>

        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Loại giao dịch
          </label>
          <div className="relative">
            <select
              id="type-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="income">Thu</option>
              <option value="expense">Chi</option>
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
              <option value="completed">Đã hoàn thành</option>
              <option value="pending">Đang chờ</option>
              <option value="failed">Thất bại</option>
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
            placeholder="Tìm theo mô tả, khách hàng..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ngày</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Mô tả</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Khách hàng</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Phương thức</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Trạng thái</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Số tiền</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{transaction.date}</td>
                <td className="px-6 py-4 font-medium">{transaction.description}</td>
                <td className="px-6 py-4">{transaction.customer}</td>
                <td className="px-6 py-4">{transaction.method}</td>
                <td className="px-6 py-4">
                  {transaction.status === "completed" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Đã hoàn thành
                    </span>
                  ) : transaction.status === "pending" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Đang chờ
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Thất bại
                    </span>
                  )}
                </td>
                <td className={`px-6 py-4 font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Chi tiết
                    </button>
                    {transaction.status === "pending" && (
                      <button className="text-green-600 hover:text-green-800">
                        Xác nhận
                      </button>
                    )}
                    <button className="text-blue-600 hover:text-blue-800">
                      Hóa đơn
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
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">5</span> giao dịch
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
