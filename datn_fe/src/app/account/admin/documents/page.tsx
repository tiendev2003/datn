import PageTitle from '@/components/PageTitle';
import Link from 'next/link';

export default function DocumentsManagement() {
  // Placeholder data for documents
  const documents = [
    { id: 1, name: 'Hướng dẫn sử dụng hệ thống', url: '#' },
    { id: 2, name: 'Chính sách bảo mật', url: '#' },
    { id: 3, name: 'Quy định và điều khoản', url: '#' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Tài liệu & hướng dẫn" />
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
          + Thêm tài liệu
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <ul>
          {documents.map(doc => (
            <li key={doc.id} className=" last:border-none hover:bg-gray-50">
              <Link href={doc.url} className="flex justify-between items-center px-6 py-4">
                <span className="font-medium">{doc.name}</span>
                <span className="text-blue-600 hover:underline">Tải xuống</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
