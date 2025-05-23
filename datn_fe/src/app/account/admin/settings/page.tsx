import PageTitle from '@/components/PageTitle';
import { RiGlobalLine, RiMoneyDollarCircleLine, RiSaveLine, RiSettings3Line } from 'react-icons/ri';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Cài đặt hệ thống" />
      </div>      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-1"><RiSettings3Line className="text-primary" size={20} /> Thông tin cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
              Tên hệ thống
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <RiSettings3Line className="text-gray-400 w-5 h-5 ml-3" />
              <input
                type="text"
                id="site-name"
                defaultValue="Gym System"
                className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Đơn vị tiền tệ
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <RiMoneyDollarCircleLine className="text-gray-400 w-5 h-5 ml-3" />
              <input
                type="text"
                id="currency"
                defaultValue="₫"
                className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
              Múi giờ
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <RiGlobalLine className="text-gray-400 w-5 h-5 ml-3" />
              <input
                type="text"
                id="timezone"
                defaultValue="Asia/Ho_Chi_Minh"
                className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            <RiSaveLine className="w-5 h-5 mr-2 inline-block" />
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}
