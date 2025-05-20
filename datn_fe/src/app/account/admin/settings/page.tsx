import PageTitle from '@/components/PageTitle';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Cài đặt hệ thống" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
              Tên hệ thống
            </label>
            <input
              type="text"
              id="site-name"
              defaultValue="Gym System"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Đơn vị tiền tệ
            </label>
            <input
              type="text"
              id="currency"
              defaultValue="₫"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
              Múi giờ
            </label>
            <input
              type="text"
              id="timezone"
              defaultValue="Asia/Ho_Chi_Minh"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}
