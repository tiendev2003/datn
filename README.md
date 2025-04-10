# Hệ Thống Đặt Lịch và Quản Lý Phòng Gym

## Tổng Quan

Hệ thống đặt lịch và quản lý phòng gym là một nền tảng trực tuyến giúp người dùng đặt lịch sử dụng dịch vụ gym, đồng thời cung cấp các công cụ quản lý cho nhân viên, huấn luyện viên và quản lý. Hệ thống hướng đến việc tối ưu hóa trải nghiệm người dùng, tăng hiệu quả quản lý và vận hành phòng gym.

## Đặc Điểm Hệ Thống

- **Không bán hàng**: Hệ thống tập trung vào việc đặt lịch và quản lý, không có tính năng bán hàng trực tuyến.
- **Đa nền tảng**: Tương thích với các thiết bị di động và máy tính.
- **Thời gian thực**: Cập nhật thông tin đặt lịch và quản lý theo thời gian thực.
- **Bảo mật**: Đảm bảo thông tin cá nhân của người dùng được bảo vệ.

## Phân Tích Yêu Cầu Theo Tác Nhân

### 1. Khách Vãng Lai

#### Yêu Cầu Cơ Bản
- Xem thông tin cơ bản về phòng gym (địa chỉ, giờ hoạt động, dịch vụ)
- Xem gói tập và bảng giá
- Đăng ký tài khoản mới
- Liên hệ với phòng gym thông qua form liên hệ
- Xem thông tin về huấn luyện viên

#### Yêu Cầu Nâng Cao
- Xem tour ảo 360° của phòng gym
- Đọc đánh giá và phản hồi từ người dùng hiện tại
- Tham khảo lịch trình các lớp tập nhóm

### 2. Người Dùng (Đã Đăng Ký)

#### Yêu Cầu Cơ Bản
- Đăng nhập và quản lý tài khoản cá nhân
- Đặt lịch sử dụng phòng gym, máy tập
- Đặt lịch với huấn luyện viên
- Đăng ký tham gia lớp tập nhóm
- Xem lịch sử tập luyện
- Theo dõi tiến trình cá nhân
- Nhận thông báo về lịch đặt, thay đổi lịch

#### Yêu Cầu Nâng Cao
- Quản lý mục tiêu tập luyện cá nhân
- Xem và theo dõi chỉ số cơ thể (BMI, cân nặng, v.v.)
- Nhận kế hoạch tập luyện được cá nhân hóa
- Đánh giá và gửi phản hồi về dịch vụ, huấn luyện viên
- Tích hợp với ứng dụng theo dõi sức khỏe
- Tùy chỉnh chế độ thông báo
- Gia hạn thành viên trực tuyến

### 3. Nhân Viên

#### Yêu Cầu Cơ Bản
- Đăng nhập vào hệ thống quản lý
- Quản lý lịch đặt của người dùng
- Kiểm tra thông tin hội viên
- Xử lý check-in và check-out
- Quản lý sắp xếp phòng tập và thiết bị
- Hỗ trợ người dùng với các vấn đề cơ bản

#### Yêu Cầu Nâng Cao
- Quản lý lịch làm việc cá nhân
- Gửi thông báo tới người dùng
- Báo cáo vấn đề thiết bị hoặc cơ sở vật chất
- Quản lý đăng ký hội viên mới tại quầy
- Truy cập báo cáo thống kê cơ bản
- Quản lý lịch các lớp tập nhóm

### 4. Huấn Luyện Viên

#### Yêu Cầu Cơ Bản
- Đăng nhập và quản lý tài khoản
- Xem lịch hẹn với khách hàng
- Quản lý lịch dạy các lớp tập nhóm
- Theo dõi tiến trình của khách hàng
- Tạo và cập nhật chương trình tập luyện

#### Yêu Cầu Nâng Cao
- Tạo kế hoạch tập luyện và dinh dưỡng cá nhân hóa
- Gửi phản hồi và đánh giá tiến độ cho khách hàng
- Quản lý hồ sơ khách hàng đang huấn luyện
- Đặt mục tiêu và theo dõi tiến độ cho khách hàng
- Chia sẻ bài tập và hướng dẫn trực tuyến
- Nhận thông báo về các cuộc hẹn mới
- Quản lý thời gian rảnh và lịch làm việc

### 5. Admin (Quản Lý)

#### Yêu Cầu Cơ Bản
- Quản lý toàn bộ hệ thống
- Quản lý tài khoản người dùng, nhân viên, huấn luyện viên
- Cấu hình thông tin phòng gym (giờ mở cửa, dịch vụ, v.v.)
- Phân quyền cho các tài khoản trong hệ thống
- Theo dõi số liệu thống kê cơ bản
- Quản lý cơ sở vật chất và thiết bị

#### Yêu Cầu Nâng Cao
- Phân tích dữ liệu và báo cáo thống kê chi tiết
- Quản lý marketing và chương trình khuyến mãi
- Theo dõi hiệu suất của nhân viên và huấn luyện viên
- Quản lý tài chính và doanh thu
- Cấu hình hệ thống thông báo tự động
- Sao lưu và khôi phục dữ liệu
- Quản lý phản hồi và đánh giá từ khách hàng
- Theo dõi mức độ sử dụng thiết bị và khu vực tập luyện

## Yêu Cầu Chức Năng Chung

### Quản Lý Lịch Hẹn
- Hệ thống đặt lịch thời gian thực
- Kiểm tra trùng lịch tự động
- Gửi thông báo xác nhận đặt lịch
- Cho phép hủy hoặc thay đổi lịch
- Hiển thị trạng thái lịch (chờ xác nhận, đã xác nhận, đã huỷ)

### Quản Lý Người Dùng
- Đăng ký và xác thực tài khoản
- Quản lý hồ sơ cá nhân
- Quản lý quyền truy cập
- Khôi phục mật khẩu
- Lịch sử hoạt động

### Thông Báo và Nhắc Nhở
- Thông báo tự động về lịch hẹn
- Nhắc nhở trước khi đến giờ hẹn
- Thông báo khi có thay đổi lịch
- Thông báo về các sự kiện đặc biệt

### Báo Cáo và Thống Kê
- Báo cáo số lượt sử dụng dịch vụ
- Báo cáo hoạt động của huấn luyện viên
- Báo cáo mức độ hài lòng của khách hàng
- Thống kê thời gian cao điểm

### Bảo Mật
- Xác thực hai yếu tố
- Mã hóa dữ liệu nhạy cảm
- Quản lý phiên đăng nhập
- Nhật ký hoạt động hệ thống

## Yêu Cầu Phi Chức Năng

### Hiệu Suất
- Thời gian phản hồi nhanh (dưới 2 giây)
- Khả năng xử lý đồng thời nhiều người dùng
- Tối ưu hóa cho thiết bị di động

### Độ Tin Cậy
- Hệ thống hoạt động 24/7
- Tự động sao lưu dữ liệu
- Khôi phục sau sự cố

### Khả Năng Mở Rộng
- Hỗ trợ thêm chi nhánh phòng gym
- Tích hợp với các hệ thống bên thứ ba
- Khả năng thêm tính năng mới

### Sử Dụng
- Giao diện thân thiện với người dùng
- Hỗ trợ đa ngôn ngữ
- Hướng dẫn sử dụng trực tuyến
- Tương thích với các trình duyệt phổ biến

## Kiến Trúc Hệ Thống

### Kiến Trúc Tổng Thể
- Mô hình Client-Server
- REST API cho giao tiếp giữa client và server
- Cơ sở dữ liệu quan hệ

### Công Nghệ Đề Xuất
- **Front-end**: Reactjs
- **Back-end**: Spring Boot
- **Database**: MySQL
- **Authentication**: JWT, OAuth
- **Notification**: WebSocket, Firebase Cloud Messaging
- **Deployment**: Docker, AWS/Azure/Google Cloud

## Kế Hoạch Triển Khai

### Phase 1: MVP (Minimum Viable Product)
- Đăng ký và đăng nhập
- Xem thông tin phòng gym
- Đặt lịch cơ bản
- Quản lý tài khoản người dùng

### Phase 2: Enhanced Features
- Quản lý lịch cho huấn luyện viên
- Hệ thống thông báo
- Báo cáo cơ bản
- Dashboard cho admin

### Phase 3: Advanced Features
- Phân tích dữ liệu nâng cao
- Tích hợp với ứng dụng theo dõi sức khỏe
- Kế hoạch tập luyện cá nhân hóa
- Báo cáo và thống kê nâng cao

## Tài Liệu Liên Quan
- Tài liệu API
- Hướng dẫn người dùng
- Quy trình bảo trì hệ thống
- Kế hoạch kiểm thử