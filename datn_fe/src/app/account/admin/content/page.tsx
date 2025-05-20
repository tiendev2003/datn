import PageTitle from '@/components/PageTitle';
import { RiArticleLine, RiDeleteBinLine, RiEyeLine, RiFilterLine, RiPencilLine, RiVideoLine } from 'react-icons/ri';

export default function ContentManagement() {
  // Enhanced placeholder data for content items
  const contents = [
    {
      id: 1,
      title: 'Bài viết hướng dẫn tập Cardio',
      type: 'article',
      category: 'cardio',
      status: 'published',
      author: 'Nguyễn Văn A',
      createdAt: '15/05/2025',
      views: 1250
    },
    {
      id: 2,
      title: 'Video hướng dẫn Yoga cơ bản',
      type: 'video',
      category: 'yoga',
      status: 'draft',
      author: 'Trần Thị B',
      createdAt: '10/05/2025',
      views: 0
    },
    {
      id: 3,
      title: 'Bài viết dinh dưỡng cho người tập Gym',
      type: 'article',
      category: 'nutrition',
      status: 'published',
      author: 'Lê Văn C',
      createdAt: '08/05/2025',
      views: 876
    },
    {
      id: 4,
      title: 'Video phương pháp tập luyện hiệu quả',
      type: 'video',
      category: 'workout',
      status: 'published',
      author: 'Phạm Văn D',
      createdAt: '05/05/2025',
      views: 523
    },
    {
      id: 5,
      title: 'Bài viết phục hồi sau chấn thương',
      type: 'article',
      category: 'recovery',
      status: 'draft',
      author: 'Hoàng Thị E',
      createdAt: '01/05/2025',
      views: 0
    },
  ];

  // Statistics
  const totalContents = contents.length;
  const publishedContents = contents.filter(item => item.status === 'published').length;
  const draftContents = contents.filter(item => item.status === 'draft').length;
  const totalViews = contents.reduce((sum, item) => sum + item.views, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Quản lý nội dung" description="Quản lý tất cả bài viết, video và nội dung trên hệ thống" />
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition flex items-center">
          <span className="mr-1">+</span> Thêm nội dung
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng nội dung</p>
          <p className="text-2xl font-bold">{totalContents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Đã xuất bản</p>
          <p className="text-2xl font-bold text-green-600">{publishedContents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Bản nháp</p>
          <p className="text-2xl font-bold text-yellow-600">{draftContents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">Tổng lượt xem</p>
          <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Loại nội dung
          </label>
          <div className="relative">
            <select
              id="type-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="article">Bài viết</option>
              <option value="video">Video</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />

          </div>
        </div>

        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <div className="relative">
            <select
              id="category-filter"
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all"
            >
              <option value="all">Tất cả</option>
              <option value="cardio">Cardio</option>
              <option value="yoga">Yoga</option>
              <option value="nutrition">Dinh dưỡng</option>
              <option value="workout">Tập luyện</option>
              <option value="recovery">Phục hồi</option>
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
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
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
            placeholder="Tìm theo tiêu đề nội dung..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Tiêu đề</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Loại</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Danh mục</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Tác giả</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ngày tạo</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Lượt xem</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Trạng thái</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contents.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {item.type === 'article' ? (
                      <><RiArticleLine className="text-blue-500 mr-1" size={18} /> Bài viết</>
                    ) : (
                      <><RiVideoLine className="text-red-500 mr-1" size={18} /> Video</>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 capitalize">{item.category}</td>
                <td className="px-6 py-4">{item.author}</td>
                <td className="px-6 py-4 text-sm">{item.createdAt}</td>
                <td className="px-6 py-4 text-sm">{item.views.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {item.status === 'published' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Đã xuất bản
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Bản nháp
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center" title="Xem">
                      <RiEyeLine size={18} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center" title="Sửa">
                      <RiPencilLine size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 flex items-center" title="Xóa">
                      <RiDeleteBinLine size={18} />
                    </button>
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
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">5</span> nội dung
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
