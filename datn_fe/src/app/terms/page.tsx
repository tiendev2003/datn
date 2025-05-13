'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Quay lại trang chủ
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Điều Khoản Dịch Vụ</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Cập nhật lần cuối: 22/04/2025
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Giới thiệu</h2>
            <p className="mb-4">
              Chào mừng bạn đến với trang web của chúng tôi. Các điều khoản dịch vụ này ("Điều khoản") điều chỉnh việc bạn sử dụng trang web của chúng tôi, 
              bao gồm cả ứng dụng di động, các chức năng, nội dung và các dịch vụ khác do chúng tôi cung cấp.
            </p>
            <p className="mb-4">
              Bằng cách truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các Điều khoản này. 
              Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, bạn không thể sử dụng dịch vụ của chúng tôi.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Điều kiện sử dụng</h2>
            <p className="mb-4">
              Để sử dụng dịch vụ của chúng tôi, bạn phải đủ 16 tuổi trở lên.
            </p>
            <p className="mb-4">
              Khi bạn tạo tài khoản trên dịch vụ của chúng tôi, bạn đồng ý cung cấp thông tin chính xác, đầy đủ và cập nhật. 
              Nếu thông tin bạn cung cấp không chính xác, không đầy đủ hoặc không được cập nhật, chúng tôi có quyền đình chỉ hoặc xóa tài khoản của bạn 
              và từ chối bất kỳ việc sử dụng nào đối với dịch vụ của chúng tôi.
            </p>
            <p className="mb-4">
              Bạn có trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu của mình. 
              Bạn đồng ý chấp nhận trách nhiệm cho tất cả các hoạt động xảy ra dưới tài khoản của bạn.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Lịch và đặt lịch tập luyện</h2>
            <p className="mb-4">
              Dịch vụ của chúng tôi cho phép bạn đặt lịch các lớp tập luyện và các buổi tư vấn với huấn luyện viên. 
              Vui lòng đảm bảo rằng bạn đến đúng giờ cho các buổi hẹn đã đặt.
            </p>
            <p className="mb-4">
              Chính sách hủy: Bạn có thể hủy buổi tập mà không bị phạt tối thiểu 24 giờ trước thời gian hẹn. Việc hủy bỏ muộn hoặc không xuất hiện có thể dẫn đến mất phí dịch vụ hoặc các hạn chế đối với việc đặt lịch trong tương lai.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Hành vi người dùng</h2>
            <p className="mb-4">
              Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý không:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Vi phạm bất kỳ luật pháp hoặc quy định hiện hành nào</li>
              <li>Đăng hoặc truyền tải bất kỳ nội dung nào vi phạm quyền sở hữu trí tuệ</li>
              <li>Đăng hoặc truyền tải bất kỳ nội dung không phù hợp nào</li>
              <li>Thu thập thông tin cá nhân của người dùng khác mà không có sự đồng ý</li>
              <li>Can thiệp vào hoạt động bình thường của dịch vụ</li>
              <li>Tham gia vào bất kỳ hành vi nào có thể gây hại cho hệ thống của chúng tôi</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Thanh toán và hoàn tiền</h2>
            <p className="mb-4">
              Chúng tôi cung cấp một số dịch vụ trả phí. Bạn đồng ý thanh toán tất cả các khoản phí liên quan đến tài khoản của bạn.
            </p>
            <p className="mb-4">
              Chính sách hoàn tiền: Các đăng ký không được hoàn lại trừ khi có quy định khác trong các điều khoản cụ thể của dịch vụ đó.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Miễn trừ trách nhiệm</h2>
            <p className="mb-4">
              Dịch vụ của chúng tôi được cung cấp "nguyên trạng" và "như có sẵn". Chúng tôi không đảm bảo rằng dịch vụ sẽ không bị gián đoạn, kịp thời, an toàn hoặc không có lỗi.
            </p>
            <p className="mb-4">
              Bạn tự chịu rủi ro khi sử dụng dịch vụ của chúng tôi. Chúng tôi không chịu trách nhiệm về bất kỳ thương tích nào có thể xảy ra do tham gia vào các hoạt động thể chất được khuyến khích hoặc hướng dẫn thông qua dịch vụ của chúng tôi.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Giới hạn trách nhiệm</h2>
            <p className="mb-4">
              Trong mọi trường hợp, chúng tôi sẽ không chịu trách nhiệm đối với bạn hoặc bất kỳ bên thứ ba nào về bất kỳ thiệt hại gián tiếp, hậu quả, ngoại lệ, ngẫu nhiên hoặc trừng phạt nào phát sinh từ hoặc liên quan đến việc bạn sử dụng dịch vụ của chúng tôi.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Thay đổi đối với điều khoản</h2>
            <p className="mb-4">
              Chúng tôi có thể sửa đổi các Điều khoản này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi quan trọng nào bằng cách đăng thông báo trên dịch vụ của chúng tôi hoặc gửi email cho bạn.
            </p>
            <p className="mb-4">
              Việc bạn tiếp tục sử dụng dịch vụ sau khi các thay đổi có hiệu lực sẽ cấu thành sự chấp nhận của bạn đối với các điều khoản sửa đổi.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Chấm dứt</h2>
            <p className="mb-4">
              Chúng tôi có thể chấm dứt hoặc đình chỉ quyền truy cập của bạn vào dịch vụ của chúng tôi ngay lập tức, không cần thông báo trước hoặc trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm cả việc bạn vi phạm các Điều khoản này.
            </p>
            <p className="mb-4">
              Tất cả các điều khoản trong Thỏa thuận này sẽ vẫn có hiệu lực sau khi chấm dứt.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Liên hệ</h2>
            <p className="mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi qua email: support@gymfitness.example.com
            </p>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}