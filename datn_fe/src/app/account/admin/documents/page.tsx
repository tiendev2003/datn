import PageTitle from '@/components/PageTitle';
import { RiAddLine, RiDeleteBinLine, RiDownloadLine, RiEyeLine, RiFileLine, RiPencilLine } from 'react-icons/ri';

export default function DocumentsManagement() {
  // Enhanced placeholder data for documents
  const documents = [
    { id: 1, name: 'Hướng dẫn sử dụng hệ thống', url: '#', type: 'PDF', size: '2.5MB', uploadedAt: '15/05/2025' },
    { id: 2, name: 'Chính sách bảo mật', url: '#', type: 'DOC', size: '1.2MB', uploadedAt: '10/05/2025' },
    { id: 3, name: 'Quy định và điều khoản', url: '#', type: 'PDF', size: '3.1MB', uploadedAt: '05/05/2025' },
    { id: 4, name: 'Hợp đồng mẫu', url: '#', type: 'DOCX', size: '0.8MB', uploadedAt: '01/05/2025' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Tài liệu & hướng dẫn" description="Quản lý các tài liệu, hướng dẫn và hợp đồng mẫu" />
        <button className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:shadow-md transition flex items-center gap-2 transform hover:-translate-y-0.5">
          <RiAddLine size={18} />
          <span>Thêm tài liệu</span>
        </button>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Tài liệu hướng dẫn</p>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">5</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-purple-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Chính sách & Quy định</p>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium rounded-full px-2 py-0.5">3</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Hợp đồng mẫu</p>
            <span className="bg-green-100 text-green-800 text-xs font-medium rounded-full px-2 py-0.5">2</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-amber-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Biểu mẫu</p>
            <span className="bg-amber-100 text-amber-800 text-xs font-medium rounded-full px-2 py-0.5">4</span>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <h3 className="font-semibold text-gray-700">Tài liệu đã tải lên</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Tên tài liệu</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Loại</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Kích thước</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ngày tải lên</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <RiFileLine className="text-blue-500 mr-2" size={20} />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors">
                          <RiEyeLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Xem
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="text-green-600 hover:text-green-800 p-1.5 rounded-full hover:bg-green-100 transition-colors">
                          <RiDownloadLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Tải xuống
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors">
                          <RiPencilLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Sửa
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100 transition-colors">
                          <RiDeleteBinLine size={18} />
                        </button>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Xóa
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg shadow-sm border border-dashed border-gray-300 hover:border-primary transition-colors text-center">
        <RiAddLine size={40} className="mx-auto text-gray-400" />
        <h3 className="mt-2 font-medium">Kéo và thả tài liệu vào đây</h3>
        <p className="text-sm text-gray-500 mt-1">hoặc</p>
        <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">Chọn tệp tin</button>
      </div>
    </div>
  );
}
