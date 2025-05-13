'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function PrivacyPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Chính Sách Bảo Mật</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Cập nhật lần cuối: 22/04/2025
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Giới thiệu</h2>
            <p className="mb-4">
              Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, 
              sử dụng, tiết lộ, lưu trữ và bảo vệ thông tin cá nhân của bạn.
            </p>
            <p className="mb-4">
              Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này. 
              Chúng tôi sẽ không sử dụng hoặc chia sẻ thông tin của bạn với bất kỳ ai ngoại trừ như được mô tả trong Chính sách bảo mật này.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Thông tin chúng tôi thu thập</h2>
            <p className="mb-4">
              Chúng tôi thu thập một số loại thông tin từ và về người dùng dịch vụ của chúng tôi, bao gồm:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>
                <span className="font-medium">Thông tin cá nhân</span>: Khi bạn đăng ký tài khoản, chúng tôi thu thập tên, địa chỉ email, số điện thoại và thông tin liên hệ khác.
              </li>
              <li>
                <span className="font-medium">Thông tin hồ sơ</span>: Chúng tôi có thể thu thập thông tin về tuổi, giới tính, chiều cao, cân nặng và các mục tiêu thể dục của bạn để cung cấp dịch vụ được cá nhân hóa.
              </li>
              <li>
                <span className="font-medium">Thông tin sức khỏe</span>: Khi bạn sử dụng dịch vụ của chúng tôi, chúng tôi có thể thu thập dữ liệu liên quan đến sức khỏe như chỉ số sức khỏe, thói quen tập luyện và chế độ ăn uống.
              </li>
              <li>
                <span className="font-medium">Thông tin sử dụng</span>: Chúng tôi thu thập thông tin về cách bạn sử dụng dịch vụ của chúng tôi, bao gồm lịch sử đặt lịch, hoạt động tập luyện và tương tác với dịch vụ.
              </li>
              <li>
                <span className="font-medium">Thông tin thiết bị</span>: Chúng tôi thu thập thông tin về thiết bị bạn sử dụng để truy cập dịch vụ của chúng tôi, bao gồm loại thiết bị, hệ điều hành và thông tin trình duyệt.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
            <p className="mb-4">
              Chúng tôi sử dụng thông tin thu thập được để:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
              <li>Cá nhân hóa trải nghiệm của bạn và cung cấp nội dung và đề xuất phù hợp</li>
              <li>Xử lý đặt lịch và thanh toán</li>
              <li>Gửi thông báo về tài khoản và lịch tập của bạn</li>
              <li>Gửi email tiếp thị, khảo sát hoặc các tài liệu quảng cáo khác</li>
              <li>Phân tích và cải thiện hiệu quả của dịch vụ</li>
              <li>Phát hiện, ngăn chặn và giải quyết các vấn đề kỹ thuật hoặc bảo mật</li>
              <li>Tuân thủ nghĩa vụ pháp lý</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Chia sẻ thông tin</h2>
            <p className="mb-4">
              Chúng tôi không bán, giao dịch hoặc cho thuê thông tin cá nhân của người dùng cho người khác. Chúng tôi có thể chia sẻ thông tin cá nhân của bạn trong các trường hợp sau:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Với sự đồng ý của bạn</li>
              <li>Với các nhà cung cấp dịch vụ bên thứ ba giúp chúng tôi vận hành dịch vụ</li>
              <li>Với các huấn luyện viên hoặc nhân viên được phân công cho bạn</li>
              <li>Để tuân thủ pháp luật hoặc bảo vệ quyền, tài sản hoặc an toàn</li>
              <li>Trong trường hợp sáp nhập, mua lại hoặc bán tài sản, thông tin người dùng có thể nằm trong số các tài sản được chuyển giao</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Bảo mật dữ liệu</h2>
            <p className="mb-4">
              Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn không bị mất mát, lạm dụng, truy cập trái phép, tiết lộ, thay đổi hoặc phá hủy. Các biện pháp này bao gồm:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Mã hóa dữ liệu nhạy cảm</li>
              <li>Giới hạn quyền truy cập vào thông tin cá nhân</li>
              <li>Duy trì các biện pháp bảo vệ vật lý, điện tử và thủ tục</li>
              <li>Thường xuyên xem xét và cập nhật các biện pháp bảo mật</li>
            </ul>
            <p className="mb-4">
              Tuy nhiên, không có phương thức truyền internet hay lưu trữ điện tử nào là 100% an toàn. Do đó, mặc dù chúng tôi cố gắng sử dụng các phương tiện thương mại chấp nhận được để bảo vệ thông tin cá nhân của bạn, chúng tôi không thể đảm bảo an ninh tuyệt đối.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Cookie và công nghệ theo dõi</h2>
            <p className="mb-4">
              Chúng tôi sử dụng cookie và các công nghệ theo dõi tương tự để theo dõi hoạt động trên dịch vụ của chúng tôi và lưu giữ một số thông tin. Cookie là các tệp có lượng dữ liệu nhỏ có thể bao gồm một mã định danh duy nhất ẩn danh.
            </p>
            <p className="mb-4">
              Bạn có thể hướng dẫn trình duyệt từ chối tất cả cookie hoặc cho biết khi nào cookie được gửi. Tuy nhiên, nếu bạn không chấp nhận cookie, bạn có thể không sử dụng được một số phần của dịch vụ của chúng tôi.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Quyền của người dùng</h2>
            <p className="mb-4">
              Tùy thuộc vào luật pháp hiện hành, bạn có thể có các quyền sau liên quan đến thông tin cá nhân của mình:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Quyền truy cập thông tin cá nhân của bạn</li>
              <li>Quyền sửa đổi hoặc cập nhật thông tin cá nhân không chính xác hoặc không đầy đủ</li>
              <li>Quyền giới hạn việc sử dụng thông tin cá nhân của bạn</li>
              <li>Quyền xóa thông tin cá nhân của bạn</li>
              <li>Quyền rút lại sự đồng ý đối với việc xử lý thông tin cá nhân của bạn</li>
              <li>Quyền phản đối việc xử lý thông tin cá nhân của bạn</li>
              <li>Quyền nhận thông tin cá nhân của bạn ở định dạng có cấu trúc, thường được sử dụng</li>
            </ul>
            <p className="mb-4">
              Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi theo thông tin liên lạc được cung cấp bên dưới.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Lưu giữ dữ liệu</h2>
            <p className="mb-4">
              Chúng tôi sẽ chỉ giữ thông tin cá nhân của bạn trong thời gian cần thiết cho các mục đích được nêu trong Chính sách bảo mật này, trừ khi cần lưu giữ lâu hơn để tuân thủ nghĩa vụ pháp lý hoặc để bảo vệ quyền lợi của chúng tôi.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Thay đổi đối với chính sách bảo mật này</h2>
            <p className="mb-4">
              Chúng tôi có thể cập nhật Chính sách bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang này và cập nhật "ngày cập nhật lần cuối" ở đầu Chính sách bảo mật này.
            </p>
            <p className="mb-4">
              Bạn nên xem lại Chính sách bảo mật này định kỳ để cập nhật về các thay đổi. Những thay đổi đối với Chính sách bảo mật này có hiệu lực khi chúng được đăng trên trang này.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Liên hệ</h2>
            <p className="mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Email: privacy@gymfitness.example.com</li>
              <li>Điện thoại: +84 123 456 789</li>
              <li>Địa chỉ: 123 Đường Fitness, Quận 1, TP.HCM</li>
            </ul>
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