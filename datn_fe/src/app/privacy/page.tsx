'use client';

import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Privacy() {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <main className="pt-20 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="bg-primary p-6 sm:p-10">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Chính Sách Bảo Mật</h1>
                        </div>
                        
                        <div className="p-6 sm:p-10">
                            <div className="prose max-w-none">
                                <p className="text-gray-600 mb-6">
                                    Cập nhật lần cuối: 15 tháng 5, 2025
                                </p>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Giới Thiệu</h2>
                                    <p>GYMMASTER ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng trang web và dịch vụ của chúng tôi.</p>
                                    <p className="mt-3">Bằng cách truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này. Nếu bạn không đồng ý với chính sách này, vui lòng không sử dụng dịch vụ của chúng tôi.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
                                    <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
                                    
                                    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1. Thông Tin Cá Nhân</h3>
                                    <p>Khi bạn đăng ký tài khoản hoặc sử dụng dịch vụ của chúng tôi, chúng tôi có thể thu thập:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Họ tên</li>
                                        <li>Địa chỉ email</li>
                                        <li>Số điện thoại</li>
                                        <li>Ngày sinh</li>
                                        <li>Giới tính</li>
                                        <li>Địa chỉ</li>
                                        <li>Thông tin thanh toán</li>
                                        <li>Hình ảnh đại diện (nếu bạn tải lên)</li>
                                    </ul>
                                    
                                    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2. Thông Tin Sức Khỏe</h3>
                                    <p>Để cung cấp dịch vụ phù hợp, chúng tôi có thể thu thập một số thông tin sức khỏe như:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Chiều cao và cân nặng</li>
                                        <li>Mục tiêu tập luyện</li>
                                        <li>Thông tin về tình trạng sức khỏe liên quan đến hoạt động thể chất</li>
                                        <li>Lịch sử tập luyện</li>
                                    </ul>
                                    
                                    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3. Thông Tin Sử Dụng</h3>
                                    <p>Chúng tôi tự động thu thập thông tin về cách bạn tương tác với dịch vụ của chúng tôi, bao gồm:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Địa chỉ IP</li>
                                        <li>Loại thiết bị và trình duyệt</li>
                                        <li>Thời gian truy cập và thời lượng phiên</li>
                                        <li>Các trang bạn xem</li>
                                        <li>Tần suất sử dụng dịch vụ của chúng tôi</li>
                                    </ul>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
                                    <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Cung cấp và cải thiện dịch vụ của chúng tôi</li>
                                        <li>Xử lý giao dịch và thanh toán</li>
                                        <li>Gửi thông báo liên quan đến tài khoản và dịch vụ</li>
                                        <li>Phát triển các chương trình tập luyện và dinh dưỡng cá nhân hóa</li>
                                        <li>Phân tích cách dịch vụ của chúng tôi được sử dụng để cải thiện trải nghiệm người dùng</li>
                                        <li>Gửi email tiếp thị và cập nhật (chỉ khi bạn đã chọn tham gia)</li>
                                        <li>Phát hiện, ngăn chặn và giải quyết các hoạt động gian lận hoặc bất hợp pháp</li>
                                    </ul>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Chia Sẻ Thông Tin</h2>
                                    <p>Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba không liên quan mà không có sự đồng ý của bạn. Tuy nhiên, chúng tôi có thể chia sẻ thông tin với:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li><strong>Nhà cung cấp dịch vụ:</strong> Các bên thứ ba giúp chúng tôi vận hành dịch vụ (như xử lý thanh toán, phân tích dữ liệu, hỗ trợ tiếp thị)</li>
                                        <li><strong>Huấn luyện viên:</strong> Nếu bạn đăng ký với huấn luyện viên cá nhân, chúng tôi chia sẻ thông tin liên quan để họ có thể cung cấp dịch vụ</li>
                                        <li><strong>Yêu cầu pháp lý:</strong> Khi luật pháp yêu cầu hoặc để bảo vệ quyền hợp pháp của chúng tôi</li>
                                        <li><strong>Trong trường hợp sáp nhập hoặc mua lại:</strong> Nếu doanh nghiệp của chúng tôi được mua lại hoặc sáp nhập</li>
                                    </ul>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Cookie và Công Nghệ Theo Dõi</h2>
                                    <p>Chúng tôi sử dụng cookie và công nghệ tương tự để thu thập thông tin và cải thiện dịch vụ của mình. Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn. Bạn có thể cài đặt trình duyệt để từ chối tất cả hoặc một số cookie, hoặc thông báo khi cookie được gửi.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Bảo Mật Dữ Liệu</h2>
                                    <p>Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi bị mất mát, truy cập trái phép, tiết lộ, thay đổi hoặc phá hủy. Tuy nhiên, không có phương pháp truyền tải qua internet hoặc lưu trữ điện tử nào là an toàn 100%.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Quyền Riêng Tư Của Bạn</h2>
                                    <p>Tùy thuộc vào luật áp dụng, bạn có thể có quyền:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Truy cập thông tin cá nhân mà chúng tôi lưu giữ về bạn</li>
                                        <li>Yêu cầu sửa đổi thông tin không chính xác</li>
                                        <li>Yêu cầu xóa thông tin của bạn</li>
                                        <li>Phản đối hoặc hạn chế một số cách sử dụng nhất định đối với thông tin của bạn</li>
                                        <li>Rút lại sự đồng ý của bạn khi chúng tôi dựa vào sự đồng ý để xử lý thông tin của bạn</li>
                                    </ul>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Thay Đổi Chính Sách</h2>
                                    <p>Chúng tôi có thể cập nhật chính sách bảo mật này tùy từng thời điểm. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi quan trọng nào bằng cách đăng thông báo trên trang web của chúng tôi hoặc gửi email thông báo trực tiếp.</p>
                                </section>
                                
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Liên Hệ</h2>
                                    <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ:</p>
                                    <div className="mt-3">
                                        <p><strong>Email:</strong> privacy@gymmaster.com</p>
                                        <p><strong>Điện thoại:</strong> 0123 456 789</p>
                                        <p><strong>Địa chỉ:</strong> 123 Đường Thể Thao, Quận 1, Tp. Hồ Chí Minh</p>
                                    </div>
                                </section>
                            </div>

                            <div className="mt-10 flex justify-center">
                                <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Quay lại trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <BackToTop />
        </>
    );
}
