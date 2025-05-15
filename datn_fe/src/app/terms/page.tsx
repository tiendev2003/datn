'use client';

import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Terms() {
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
                            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Điều Khoản Sử Dụng</h1>
                        </div>
                        
                        <div className="p-6 sm:p-10">
                            <div className="prose max-w-none">
                                <p className="text-gray-600 mb-6">
                                    Cập nhật lần cuối: 15 tháng 5, 2025
                                </p>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Chấp Nhận Điều Khoản</h2>
                                    <p>Bằng việc truy cập và sử dụng dịch vụ GYMMASTER, bạn đồng ý tuân theo và chịu ràng buộc bởi các điều khoản và điều kiện được nêu trong thỏa thuận này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Tư Cách Thành Viên</h2>
                                    <p>Để sử dụng đầy đủ các dịch vụ của GYMMASTER, bạn phải đăng ký và tạo một tài khoản. Bạn đồng ý cung cấp thông tin chính xác, cập nhật và đầy đủ trong quá trình đăng ký và cam kết cập nhật thông tin khi cần thiết để đảm bảo tính chính xác và đầy đủ.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Dịch Vụ và Thanh Toán</h2>
                                    <p>GYMMASTER cung cấp các gói dịch vụ fitness và huấn luyện cá nhân khác nhau. Các khoản phí và lịch thanh toán được nêu rõ trong mô tả gói dịch vụ. Bạn đồng ý thanh toán đúng hạn tất cả các khoản phí liên quan đến tài khoản của mình.</p>
                                    <p className="mt-3">Chúng tôi có quyền thay đổi giá và cấu trúc phí với thông báo trước 30 ngày. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Chính Sách Hủy và Hoàn Tiền</h2>
                                    <p>Bạn có thể hủy tư cách thành viên bất kỳ lúc nào bằng cách liên hệ với dịch vụ khách hàng. Các chính sách hoàn tiền khác nhau tùy thuộc vào gói dịch vụ bạn đã đăng ký:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Đối với các gói hàng tháng, việc hủy sẽ có hiệu lực vào cuối chu kỳ thanh toán hiện tại.</li>
                                        <li>Đối với các gói hàng năm, bạn có thể nhận được hoàn tiền theo tỷ lệ nếu hủy trong vòng 30 ngày kể từ ngày thanh toán.</li>
                                        <li>Các buổi tập cá nhân có thể được hủy hoặc lên lịch lại ít nhất 24 giờ trước thời gian đã đặt.</li>
                                    </ul>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Quy Tắc Hành Vi</h2>
                                    <p>Khi sử dụng GYMMASTER, bạn đồng ý không:</p>
                                    <ul className="list-disc pl-6 mt-3 space-y-2">
                                        <li>Vi phạm bất kỳ luật pháp hoặc quy định hiện hành nào.</li>
                                        <li>Quấy rối, đe dọa hoặc đối xử thiếu tôn trọng với các thành viên hoặc nhân viên khác.</li>
                                        <li>Sử dụng sai hoặc làm hỏng thiết bị tập luyện.</li>
                                        <li>Chia sẻ thông tin đăng nhập của bạn hoặc cho phép người khác sử dụng tư cách thành viên của bạn.</li>
                                        <li>Tham gia vào bất kỳ hoạt động nào có thể gây nguy hiểm cho sự an toàn của bạn hoặc những người khác.</li>
                                    </ul>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Giới Hạn Trách Nhiệm</h2>
                                    <p>GYMMASTER không chịu trách nhiệm về bất kỳ thương tích, thiệt hại hoặc mất mát nào phát sinh từ việc sử dụng dịch vụ của chúng tôi. Bạn tham gia vào tất cả các hoạt động thể chất và sử dụng các cơ sở vật chất của chúng tôi hoàn toàn với rủi ro của riêng bạn.</p>
                                    <p className="mt-3">Chúng tôi khuyến nghị bạn tham khảo ý kiến ​​bác sĩ trước khi bắt đầu bất kỳ chương trình tập thể dục mới nào và tuân theo hướng dẫn của huấn luyện viên một cách cẩn thận.</p>
                                </section>
                                
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Thay Đổi Điều Khoản</h2>
                                    <p>GYMMASTER có quyền sửa đổi hoặc thay thế các điều khoản này bất kỳ lúc nào. Những thay đổi sẽ có hiệu lực ngay sau khi được đăng trên trang web của chúng tôi. Việc tiếp tục sử dụng dịch vụ của chúng tôi sau khi đăng các thay đổi đồng nghĩa với việc bạn chấp nhận và đồng ý với các thay đổi đó.</p>
                                </section>
                                
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Liên Hệ</h2>
                                    <p>Nếu bạn có bất kỳ câu hỏi nào về Điều Khoản Sử Dụng này, vui lòng liên hệ với chúng tôi qua:</p>
                                    <div className="mt-3">
                                        <p><strong>Email:</strong> info@gymmaster.com</p>
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
