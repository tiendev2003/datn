TÀI LIỆU YÊU CẦU PHẦN MỀM (SRS)
HỆ THỐNG WEBSITE QUẢN LÝ PHÒNG GYM

1. GIỚI THIỆU
1.1. Mục đích
Tài liệu này mô tả các yêu cầu cho hệ thống website quản lý phòng gym, hỗ trợ các vai trò: khách vãng lai, khách hàng, huấn luyện viên (PT), nhân viên, và quản lý. Website cung cấp các chức năng như đăng ký gói tập, thanh toán, đặt lịch PT, quản lý lịch làm việc, và báo cáo doanh thu, nhằm quảng bá và vận hành phòng gym hiệu quả.

1.2. Phạm vi
Hệ thống cung cấp:
- Landing page để quảng bá phòng gym.
- Quản lý gói tập (Gym, Yoga, PT), thanh toán, và gửi hóa đơn qua email.
- Đặt lịch tập với PT (cá nhân hoặc nhóm) và đánh giá PT.
- Quản lý lịch làm việc, lương thưởng cho PT và nhân viên.
- Báo cáo doanh thu và thống kê cho quản lý.
- Thông báo qua email cho các sự kiện (lịch nghỉ, gia hạn gói).

1.3. Đối tượng người dùng
- Khách vãng lai: Xem thông tin phòng gym, gói tập, đăng ký tài khoản.
- Khách hàng: Đăng ký gói tập, thanh toán, đặt lịch PT, đánh giá PT, nhận thông báo.
- Huấn luyện viên (PT): Quản lý lịch, học viên, thu nhập, gửi thông báo.
- Nhân viên: Quản lý ca làm việc, chấm công, hỗ trợ khách tại chỗ, ghi nhận doanh thu.
- Quản lý (Admin): Quản lý gói tập, nhân sự, tài chính, và nội dung website.

2. YÊU CẦU TỔNG THỂ
2.1. Yêu cầu chức năng
2.1.1. Khách vãng lai
- Xem thông tin phòng gym (giờ hoạt động, nghỉ lễ, cơ sở vật chất).
- Xem danh sách gói tập và PT.
- Đăng ký tài khoản.
- Gửi yêu cầu liên hệ.

2.1.2. Khách hàng
- Đăng ký và thanh toán gói tập (Gym, Yoga, PT).
- Nhận hóa đơn qua email sau thanh toán.
- Gia hạn gói tập, nhận nhắc nhở khi gói sắp hết hạn.
- Đặt lịch tập với PT (cá nhân hoặc nhóm).
- Đánh giá PT (sao, bình luận).
- Gửi khiếu nại về PT nếu có xung đột.
- Nhận thông báo qua email (lịch nghỉ PT, xác nhận lịch tập, khuyến mãi).

2.1.3. Huấn luyện viên (PT)
- Cập nhật hồ sơ (ảnh, chuyên môn, kinh nghiệm).
- Quản lý lịch làm việc (lịch trống, ngày nghỉ).
- Gửi thông báo ngày nghỉ qua email tới học viên.
- Quản lý học viên (danh sách, tiến độ).
- Xem thống kê thu nhập.
- Ghi chú nội bộ về tiến độ học viên.

2.1.4. Nhân viên
- Xem lịch phân ca làm việc.
- Chấm công và xem thống kê lương.
- Đăng ký gói tập cho khách tại chỗ.
- Ghi nhận doanh thu tại chỗ.
- Xử lý yêu cầu gia hạn gói tập của khách.

2.1.5. Quản lý (Admin)
- Quản lý gói tập (tạo, chỉnh sửa, xóa).
- Quản lý PT, nhân viên (phân ca, duyệt ngày nghỉ, tính lương).
- Theo dõi doanh thu (online và tại chỗ).
- Xem báo cáo thống kê (khách hàng, gói tập, tài chính).
- Quản lý nội dung website (thông tin phòng gym, sự kiện, khuyến mãi).
- Xử lý khiếu nại từ khách hàng.

2.1.6. Hệ thống
- Gửi email thông báo (hóa đơn, lịch tập, nhắc nhở gia hạn, lịch nghỉ).
- Tích hợp cổng thanh toán (MoMo, ZaloPay, hoặc tương tự).
- Quản lý nhóm tập (nhiều khách hàng cùng PT).
- Lưu trữ lịch sử giao dịch và hóa đơn.

2.2. Yêu cầu phi chức năng
- Hiệu suất: Hệ thống đáp ứng 1.000 người dùng đồng thời, thời gian phản hồi dưới 2 giây.
- Bảo mật: Mã hóa mật khẩu, sử dụng HTTPS, tuân thủ quy định bảo vệ dữ liệu.
- Khả năng mở rộng: Hỗ trợ thêm tính năng (ứng dụng di động, điểm thưởng) trong tương lai.
- Tính khả dụng: Uptime 99.9%, sao lưu dữ liệu hàng ngày.
- Giao diện: Responsive, thân thiện trên cả desktop và mobile.
- Ngôn ngữ: Tiếng Việt (mặc định), hỗ trợ tiếng Anh nếu cần.

2.3. Ràng buộc
- Tích hợp cổng thanh toán phổ biến tại Việt Nam (MoMo, ZaloPay).
- Hỗ trợ gửi email qua dịch vụ như SendGrid hoặc AWS SES.
- Cơ sở dữ liệu phải tương thích với MySQL hoặc PostgreSQL.
- Landing page tối ưu SEO để quảng bá.

3. THIẾT KẾ HỆ THỐNG
3.1. Kiến trúc hệ thống
- Frontend: React hoặc Vue.js cho giao diện responsive.
- Backend: Node.js hoặc Laravel để xử lý API.
- Database: MySQL hoặc PostgreSQL.
- Email Service: SendGrid hoặc AWS SES.
- Thanh toán: Tích hợp MoMo, ZaloPay.
- Hosting: AWS hoặc DigitalOcean.

3.2. Cơ sở dữ liệu
Danh sách các bảng:
Users(user_id, email, password, full_name, phone, role, created_at, updated_at)
Gym_Info(gym_id, name, address, phone, email, operating_hours, holiday_schedule, description, created_at, updated_at)
Packages(package_id, name, type, price, duration_days, description, created_at, updated_at)
Customer_Packages(customer_package_id, user_id, package_id, pt_id, start_date, end_date, status, created_at, updated_at)
Payments(payment_id, user_id, customer_package_id, amount, payment_method, status, transaction_id, invoice_url, created_at, updated_at)
PT_Profiles(pt_id, user_id, bio, experience, specialization, avatar_url, created_at, updated_at)
PT_Schedules(schedule_id, pt_id, date, start_time, end_time, status, created_at, updated_at)
Bookings(booking_id, user_id, pt_id, schedule_id, booking_type, group_id, status, created_at, updated_at)
PT_Reviews(review_id, user_id, pt_id, rating, comment, created_at, updated_at)
Staff_Schedules(schedule_id, user_id, date, start_time, end_time, status, created_at, updated_at)
Payrolls(payroll_id, user_id, amount, period_start, period_end, status, created_at, updated_at)
Notifications(notification_id, user_id, title, content, type, status, created_at, updated_at)
Revenue_Records(record_id, payment_id, amount, source, created_at, updated_at)
Complaints(complaint_id, user_id, pt_id, description, status, resolved_at, created_at, updated_at)
Booking_Groups(group_id, schedule_id, max_members, created_at, updated_at)
PT_Progress_Notes(note_id, pt_id, user_id, content, created_at, updated_at)

4. QUY TRÌNH PHÁT TRIỂN
4.1. Các giai đoạn phát triển
1. Giai đoạn 1: Phân tích và thiết kế (2-4 tuần)
   - Thu thập yêu cầu chi tiết, xác nhận với khách hàng.
   - Thiết kế giao diện (UI/UX) và cơ sở dữ liệu.
   - Lập kế hoạch phát triển và phân bổ nguồn lực.

2. Giai đoạn 2: Phát triển cơ bản (8-12 tuần)
   - Xây dựng landing page và chức năng khách vãng lai.
   - Triển khai đăng ký gói tập, thanh toán, và gửi hóa đơn.
   - Phát triển quản lý hồ sơ PT và lịch làm việc.

3. Giai đoạn 3: Phát triển nâng cao (8-12 tuần)
   - Thêm chức năng đặt lịch PT (cá nhân/nhóm), đánh giá PT, khiếu nại.
   - Triển khai quản lý nhân viên (ca làm việc, chấm công, lương).
   - Phát triển báo cáo doanh thu và thống kê.

4. Giai đoạn 4: Kiểm thử và triển khai (4-6 tuần)
   - Kiểm thử chức năng, hiệu suất, và bảo mật.
   - Sửa lỗi và tối ưu hệ thống.
   - Triển khai website, chạy quảng cáo, thu thập phản hồi.

4.2. Công nghệ sử dụng
- Frontend: React, Tailwind CSS.
- Backend: Node.js (Express) hoặc Laravel.
- Database: MySQL.
- Email: SendGrid.
- Thanh toán: MoMo, ZaloPay.
- Analytics: Google Analytics.

5. YÊU CẦU GIAO DIỆN
5.1. Landing Page
- Hiển thị thông tin phòng gym, hình ảnh cơ sở vật chất.
- Danh sách gói tập và PT nổi bật.
- Form liên hệ và nút đăng ký tài khoản.
- Tối ưu SEO, responsive trên mobile.

5.2. Dashboard người dùng
- Khách hàng: Xem gói tập, lịch đặt, hóa đơn, đánh giá PT.
- PT: Quản lý lịch, học viên, thu nhập, ghi chú tiến độ.
- Nhân viên: Xem ca làm việc, chấm công, nhập doanh thu.
- Quản lý: Quản lý gói tập, nhân sự, báo cáo tài chính.

5.3. Giao diện quản lý
- Dashboard thống kê (doanh thu, khách hàng, hiệu suất PT).
- Form quản lý gói tập, PT, nhân viên.
- Xem và xử lý khiếu nại.

6. KẾ HOẠCH KIỂM THỬ
6.1. Kiểm thử chức năng
- Đảm bảo tất cả chức năng (đăng ký, thanh toán, đặt lịch, báo cáo) hoạt động đúng.
- Kiểm tra gửi email (hóa đơn, thông báo).
- Xác minh phân quyền theo vai trò.

6.2. Kiểm thử phi chức năng
- Kiểm tra hiệu suất với 1.000 người dùng đồng thời.
- Kiểm tra bảo mật (SQL injection, XSS).
- Kiểm tra khả năng responsive trên các thiết bị.

6.3. Kiểm thử người dùng
- Mời nhóm khách hàng, PT, nhân viên dùng thử.
- Thu thập phản hồi để cải thiện UI/UX.

7. KẾ HOẠCH TRIỂN KHAI
7.1. Triển khai
- Triển khai trên server (AWS/DigitalOcean).
- Cấu hình DNS và HTTPS.
- Tích hợp Google Analytics để theo dõi lưu lượng.

7.2. Bảo trì
- Cập nhật tính năng theo phản hồi người dùng.
- Sao lưu dữ liệu hàng ngày.
- Giám sát uptime và xử lý sự cố 24/7.

8. GIẢ ĐỊNH VÀ RÀNG BUỘC
8.1. Giả định
- Người dùng có kết nối internet ổn định.
- Cổng thanh toán (MoMo, ZaloPay) hoạt động bình thường.
- Quản lý cung cấp đầy đủ thông tin về gói tập, PT, và nội dung website.

8.2. Ràng buộc
- Ngân sách phát triển giới hạn trong phạm vi dự án nhỏ.
- Thời gian hoàn thành dự kiến: 6-9 tháng.
- Hệ thống ưu tiên thị trường Việt Nam.

9. PHỤ LỤC
9.1. Từ viết tắt
- SRS: Software Requirements Specification.
- PT: Personal Trainer (Huấn luyện viên cá nhân).
- UI/UX: User Interface/User Experience.

9.2. Tài liệu tham khảo
- Yêu cầu từ khách hàng (mô tả hệ thống phòng gym).
- Tài liệu về cổng thanh toán MoMo, ZaloPay.
- Hướng dẫn SEO và Google Analytics.