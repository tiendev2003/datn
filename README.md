# Hệ Thống Đặt Lịch và Quản Lý Phòng Gym

## Tổng Quan

Hệ thống đặt lịch và quản lý phòng gym là một nền tảng trực tuyến giúp người dùng đặt lịch sử dụng dịch vụ gym, đồng thời cung cấp các công cụ quản lý cho nhân viên, huấn luyện viên và quản lý. Hệ thống hướng đến việc tối ưu hóa trải nghiệm người dùng, tăng hiệu quả quản lý và vận hành phòng gym.

## Mục Tiêu Tổng Thể

Dự án hướng đến việc xây dựng một hệ thống quản lý toàn diện cho phòng gym với các mục tiêu cụ thể sau:
 

## Đặc Điểm Hệ Thống

- **Đa chức năng**: Hệ thống tích hợp đầy đủ các tính năng từ đặt lịch, quản lý thành viên, đến bán gói tập, gói PT.
- **Đa nền tảng**: Tương thích với các thiết bị di động và máy tính.
- **Thời gian thực**: Cập nhật thông tin đặt lịch và quản lý theo thời gian thực.
- **Bảo mật**: Đảm bảo thông tin cá nhân và giao dịch của người dùng được bảo vệ.

## Phân Tích Yêu Cầu Theo Tác Nhân

### 1. Khách Vãng Lai

#### Yêu Cầu Cơ Bản
- Xem thông tin cơ bản về phòng gym (địa chỉ, giờ hoạt động, dịch vụ): Hiển thị thông tin chi tiết về vị trí, giờ mở cửa, các tiện ích và dịch vụ có sẵn tại phòng gym.
- Xem gói tập và bảng giá: Hiển thị danh sách các gói tập luyện kèm mức giá, thời hạn và quyền lợi tương ứng của từng gói.
- Đăng ký tài khoản mới: Cho phép người dùng tạo tài khoản mới với thông tin cá nhân cơ bản, yêu cầu xác thực email/số điện thoại.
- Liên hệ với phòng gym thông qua form liên hệ: Form liên hệ đơn giản với các trường thông tin cơ bản và yêu cầu, kèm theo xác thực để tránh spam.
- Xem thông tin về huấn luyện viên: Hiển thị danh sách các huấn luyện viên kèm thông tin về chuyên môn, kinh nghiệm, chứng chỉ và lịch làm việc.
- Mua gói tập tại quầy: Cho phép khách hàng xem thông tin chi tiết về các gói tập có sẵn và thực hiện mua gói tập tại quầy lễ tân với sự hỗ trợ của nhân viên.
- Đăng ký dùng thử dịch vụ: Cho phép khách vãng lai đăng ký sử dụng dịch vụ miễn phí trong thời gian giới hạn để trải nghiệm trước khi quyết định đăng ký làm thành viên.

#### Yêu Cầu Nâng Cao
- Đọc đánh giá và phản hồi từ người dùng hiện tại: Hiển thị các đánh giá, nhận xét từ người dùng đã sử dụng dịch vụ kèm theo thông tin về mức độ hài lòng (sao/điểm).
- Tham khảo lịch trình các lớp tập nhóm: Hiển thị lịch các lớp tập nhóm theo ngày/tuần/tháng, kèm thông tin về nội dung lớp, huấn luyện viên phụ trách và số lượng chỗ còn trống.

### 2. Hội Viên (Người Dùng Đã Đăng Ký)

#### Yêu Cầu Cơ Bản
- Đăng nhập và quản lý tài khoản cá nhân: Cho phép người dùng đăng nhập an toàn, cập nhật thông tin cá nhân, thay đổi mật khẩu và quản lý các cài đặt riêng tư.
- Đặt lịch với huấn luyện viên: Cho phép chọn huấn luyện viên, xem lịch rảnh và đặt buổi tập cá nhân theo thời gian phù hợp.
- Đăng ký tham gia tập chung với người khác.
- Theo dõi tiến trình cá nhân: Hiển thị biểu đồ, thống kê về tiến độ tập luyện theo thời gian, bao gồm các chỉ số đo lường.
- Nhận thông báo về lịch đặt, thay đổi lịch: Hệ thống gửi thông báo qua email, SMS hoặc push notification về lịch đặt và cập nhật lịch.
- Mua và gia hạn gói tập trực tuyến: Cho phép người dùng xem, mua mới hoặc gia hạn các gói tập với thanh toán trực tuyến qua các phương thức thanh toán phổ biến.
- Mua gói PT (Personal Training): Cho phép đăng ký gói huấn luyện cá nhân với huấn luyện viên đã chọn, xem chi tiết gói (số buổi, giá cả, thời hạn) và thanh toán trực tuyến.

#### Yêu Cầu Nâng Cao
- Quản lý mục tiêu tập luyện cá nhân: Cho phép thiết lập, theo dõi và cập nhật các mục tiêu tập luyện ngắn hạn và dài hạn.
- Đánh giá và gửi phản hồi về dịch vụ, huấn luyện viên: Hệ thống đánh giá với thang điểm, bình luận chi tiết sau mỗi buổi tập/khóa học.
- Gia hạn thành viên trực tuyến: Xem thông tin hết hạn, lựa chọn và thanh toán gói gia hạn trực tuyến.
- Xem và theo dõi chỉ số cơ thể (BMI, cân nặng, v.v.): Nhập và theo dõi các chỉ số cơ thể theo thời gian, hiển thị dưới dạng biểu đồ trực quan.

### 3. Nhân Viên

#### Yêu Cầu Cơ Bản
- Đăng nhập vào hệ thống quản lý: Hệ thống xác thực với phân quyền dành riêng cho nhân viên, có tính năng bảo mật và ghi nhớ phiên đăng nhập.
- Quản lý lịch đặt của người dùng: Xem, xác nhận, hủy và thay đổi các lịch đặt của hội viên, kèm theo ghi chú và thông tin chi tiết.
- Kiểm tra thông tin hội viên: Tra cứu nhanh thông tin hội viên theo tên, mã số, thẻ thành viên, hiển thị chi tiết gói tập và thời hạn.
- Xử lý check-in và check-out: Quản lý việc vào/ra của hội viên, xác nhận danh tính, ghi nhận thời gian sử dụng dịch vụ thông qua mã QR/thẻ.
- Hỗ trợ người dùng với các vấn đề cơ bản: Giải đáp thắc mắc, hướng dẫn sử dụng hệ thống, xử lý sự cố đơn giản trong quá trình hội viên sử dụng dịch vụ.
- Xử lý bán gói tập và gói PT tại quầy: Thực hiện quy trình bán gói tập và gói PT cho khách hàng tại quầy, bao gồm tư vấn gói phù hợp, xử lý thanh toán và kích hoạt gói.
- Quản lý gia hạn gói tập: Nhắc nhở hội viên về việc gia hạn, xử lý yêu cầu gia hạn, áp dụng ưu đãi gia hạn và cập nhật thời hạn thành viên.

#### Yêu Cầu Nâng Cao
- Quản lý lịch làm việc cá nhân: Xem và cập nhật lịch làm việc, đăng ký ca trực, trao đổi ca với đồng nghiệp với phê duyệt của quản lý.
- Gửi thông báo tới người dùng: Gửi thông báo cá nhân hoặc theo nhóm đến hội viên về thay đổi lịch, sự kiện hoặc các thông tin quan trọng.
- Quản lý đăng ký hội viên mới tại quầy: Tạo hồ sơ hội viên mới, xử lý thanh toán, in thẻ thành viên và cung cấp thông tin về quy định phòng gym.
- Quản lý lịch các lớp tập nhóm: Theo dõi sĩ số lớp, cập nhật thông tin lớp học, điều chỉnh lịch huấn luyện viên, xử lý trường hợp vắng mặt.

### 4. Huấn Luyện Viên

#### Yêu Cầu Cơ Bản
- Đăng nhập và quản lý tài khoản: Hệ thống đăng nhập an toàn với tính năng khôi phục mật khẩu, quản lý thông tin cá nhân, chuyên môn và chứng chỉ.
- Xem lịch hẹn với khách hàng: Hiển thị lịch đặt chỗ theo ngày, tuần, tháng với đầy đủ thông tin của khách hàng và loại hình huấn luyện.
- Quản lý lịch dạy các lớp tập nhóm: Xem và quản lý thời khóa biểu các lớp tập đã được phân công, điều chỉnh nội dung và yêu cầu đối với học viên.
- Theo dõi tiến trình của khách hàng: Ghi chép và theo dõi sự tiến bộ của từng khách hàng qua các buổi tập, bao gồm các chỉ số đo lường cụ thể.
- Tạo và cập nhật chương trình tập luyện: Thiết kế và điều chỉnh chương trình tập luyện phù hợp cho từng khách hàng dựa trên mục tiêu và khả năng.

#### Yêu Cầu Nâng Cao
- Tạo kế hoạch tập luyện và dinh dưỡng cá nhân hóa: Thiết kế kế hoạch toàn diện kết hợp giữa lịch tập và chế độ dinh dưỡng dựa trên đặc điểm cơ thể và mục tiêu.
- Gửi phản hồi và đánh giá tiến độ cho khách hàng: Tạo báo cáo đánh giá định kỳ, gửi nhận xét và lời khuyên cải thiện thông qua nền tảng.
- Nhận thông báo về các cuộc hẹn mới: Nhận thông báo ngay lập tức khi có đặt lịch mới, thay đổi lịch hoặc hủy lịch từ khách hàng.
- Quản lý thời gian rảnh và lịch làm việc: Cập nhật thời gian có thể nhận khách, đánh dấu thời gian không làm việc, điều chỉnh lịch trình linh hoạt.

### 5. Admin (Quản Lý)

#### Yêu Cầu Cơ Bản
- Quản lý toàn bộ hệ thống: Truy cập vào tất cả các tính năng của hệ thống, điều chỉnh cấu hình, theo dõi toàn bộ hoạt động từ giao diện quản trị tập trung.
- Quản lý tài khoản người dùng, nhân viên, huấn luyện viên: Tạo, chỉnh sửa, vô hiệu hóa tài khoản, phục hồi mật khẩu, gán vai trò và phân quyền chi tiết.
- Cấu hình thông tin phòng gym (giờ mở cửa, dịch vụ, v.v.): Thiết lập và cập nhật thông tin cơ bản về phòng gym, điều chỉnh lịch hoạt động, thêm/xóa/sửa dịch vụ.
- Phân quyền cho các tài khoản trong hệ thống: Tạo các nhóm vai trò, thiết lập quyền hạn chi tiết cho từng vai trò, phân quyền đặc biệt cho tài khoản cụ thể.
- Theo dõi số liệu thống kê cơ bản: Xem báo cáo tổng quan về hoạt động hàng ngày, tuần, tháng với các biểu đồ trực quan về lượng khách, doanh thu.
- Quản lý gói tập và gói PT: Tạo mới, chỉnh sửa, xóa các gói tập và gói PT, thiết lập giá cả, thời hạn, quyền lợi kèm theo và chính sách ưu đãi.
- Quản lý doanh thu từ bán gói tập và gói PT: Theo dõi doanh thu từ các gói tập và gói PT, phân tích số liệu bán hàng, theo dõi tỷ lệ chuyển đổi và tỷ lệ tái đăng ký.

#### Yêu Cầu Nâng Cao
- Cấu hình hệ thống thông báo tự động: Thiết lập các quy tắc gửi thông báo, mẫu tin nhắn, lịch gửi thông báo tự động cho từng đối tượng người dùng.
- Sao lưu và khôi phục dữ liệu: Lên lịch sao lưu tự động, kiểm tra tính toàn vẹn dữ liệu, khôi phục dữ liệu từ các bản sao lưu khi cần.
- Quản lý phản hồi và đánh giá từ khách hàng: Xem, phân loại và phản hồi đánh giá của khách hàng, phân tích mức độ hài lòng và xu hướng phản hồi.

## Yêu Cầu Chức Năng Chung

### Quản Lý Lịch Hẹn
- Hệ thống đặt lịch thời gian thực: Cập nhật và hiển thị trạng thái đặt lịch ngay lập tức, tránh việc đặt trùng thời gian và nguồn lực.
- Kiểm tra trùng lịch tự động: Hệ thống tự động phát hiện và cảnh báo khi có sự trùng lặp về thời gian, huấn luyện viên hoặc không gian.
- Gửi thông báo xác nhận đặt lịch: Người dùng nhận được email/SMS xác nhận ngay sau khi đặt lịch thành công, kèm thông tin chi tiết buổi hẹn.
- Cho phép hủy hoặc thay đổi lịch: Người dùng có thể hủy hoặc điều chỉnh lịch đã đặt trong một khoảng thời gian cho phép trước buổi hẹn.
- Hiển thị trạng thái lịch (chờ xác nhận, đã xác nhận, đã huỷ): Theo dõi trạng thái của mỗi lịch hẹn với mã màu trực quan, kèm theo lịch sử thay đổi.

### Quản Lý Người Dùng
- Đăng ký và xác thực tài khoản: Quy trình đăng ký an toàn với xác thực email/SMS, bao gồm điều khoản sử dụng và chính sách bảo mật.
- Quản lý hồ sơ cá nhân: Người dùng có thể cập nhật thông tin cá nhân, ảnh đại diện, thông tin liên hệ và mật khẩu khi cần thiết.
- Quản lý quyền truy cập: Phân quyền chi tiết cho từng loại tài khoản, kiểm soát khả năng truy cập vào các chức năng của hệ thống.
- Khôi phục mật khẩu: Quy trình khôi phục mật khẩu an toàn thông qua email xác nhận, mã xác thực, hoặc câu hỏi bảo mật.
- Lịch sử hoạt động: Ghi lại và hiển thị tất cả các hoạt động quan trọng của người dùng trên hệ thống để dễ dàng theo dõi.

### Thông Báo và Nhắc Nhở
- Thông báo tự động về lịch hẹn: Hệ thống tự động gửi thông báo khi có lịch hẹn mới, được xác nhận, bị hủy hoặc thay đổi.
- Nhắc nhở trước khi đến giờ hẹn: Gửi nhắc nhở 24 giờ, 2 giờ hoặc 30 phút trước buổi hẹn để đảm bảo người dùng không quên.
- Thông báo khi có thay đổi lịch: Thông báo ngay lập tức cho các bên liên quan khi có bất kỳ thay đổi nào về lịch hoặc huấn luyện viên.
- Thông báo về các sự kiện đặc biệt: Gửi thông tin về sự kiện, lớp tập mới, chương trình khuyến mãi hoặc thay đổi giờ hoạt động.

### Báo Cáo và Thống Kê
- Báo cáo số lượt sử dụng dịch vụ: Thống kê chi tiết về số lượt sử dụng từng loại dịch vụ, phân tích theo thời gian và đối tượng người dùng.
- Báo cáo hoạt động của huấn luyện viên: Theo dõi số buổi huấn luyện, tỷ lệ đánh giá, hiệu suất và năng suất của từng huấn luyện viên.
- Báo cáo mức độ hài lòng của khách hàng: Phân tích phản hồi, đánh giá từ khách hàng và tổng hợp các chỉ số hài lòng theo thời gian.
- Thống kê thời gian cao điểm: Xác định các khung giờ, ngày trong tuần, mùa trong năm có lượng người sử dụng cao nhất để tối ưu hóa lịch.

### Bảo Mật
- Xác thực hai yếu tố: Cung cấp tùy chọn bảo mật bổ sung thông qua mã xác thực gửi qua SMS/email hoặc ứng dụng xác thực.
- Mã hóa dữ liệu nhạy cảm: Áp dụng các thuật toán mã hóa mạnh cho dữ liệu cá nhân, thông tin thanh toán và mật khẩu người dùng.
- Quản lý phiên đăng nhập: Theo dõi phiên đăng nhập, tự động đăng xuất sau thời gian không hoạt động, khóa tài khoản sau nhiều lần đăng nhập sai.
- Nhật ký hoạt động hệ thống: Ghi lại đầy đủ các thao tác quan trọng trên hệ thống, phát hiện và cảnh báo các hoạt động bất thường.
 

### Khả Năng Mở Rộng
- Tích hợp với các hệ thống bên thứ ba: Cung cấp API và webhook cho phép kết nối với các ứng dụng theo dõi sức khỏe, hệ thống thanh toán và phần mềm kế toán.
- Khả năng thêm tính năng mới: Kiến trúc module hóa cho phép thêm tính năng mới mà không ảnh hưởng đến các phần khác của hệ thống.

### Sử Dụng
- Giao diện thân thiện với người dùng: Thiết kế trực quan, dễ tiếp cận với các hướng dẫn và trợ giúp ngữ cảnh, tuân thủ các nguyên tắc UX hiện đại.
- Hỗ trợ đa ngôn ngữ: Hỗ trợ ít nhất tiếng Việt và tiếng Anh, có khả năng mở rộng thêm ngôn ngữ khác thông qua tệp ngôn ngữ.
- Hướng dẫn sử dụng trực tuyến: Cung cấp tài liệu hướng dẫn, video tutorial và trợ giúp ngữ cảnh cho từng tính năng của hệ thống.
- Tương thích với các trình duyệt phổ biến: Hoạt động tốt trên các trình duyệt phổ biến như Chrome, Firefox, Safari, Edge với phiên bản được phát hành trong 2 năm gần đây.

## Kiến Trúc Hệ Thống

### Kiến Trúc Tổng Thể
- Kiến trúc MVC (Model-View-Controller)
- Ứng dụng monolithic với các module phân chia rõ ràng
- RESTful API cho giao tiếp với front-end
- Cơ sở dữ liệu tập trung (shared database)
- Caching tầng ứng dụng và database


### Công Nghệ Đề Xuất
- **Front-end**: ReactJS  
- **Back-end**: Spring Boot với Spring MVC
- **Database**: 
  - MySQL cho toàn bộ dữ liệu
  - Thiết kế schema tối ưu với indexes và constraints
- **Caching**: Hibernate Second-level cache + Redis
- **Authentication**: Spring Security với JWT
- **Notification**: WebSocket, SMTP (Email), SMS Gateway
- **Deployment**: Tomcat/Jetty server, Docker
- **Monitoring**: Spring Actuator, Prometheus, Grafana
- **Background Jobs**: Spring Batch, Spring Scheduler
- **Testing**: JUnit, Mockito, Spring Test

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

## Bảng Phân Tích Đặc Tả Yêu Cầu

### Bảng Phân Tích Yêu Cầu Chức Năng Theo Module

| Module | Yêu Cầu Chức Năng | Mức Độ Ưu Tiên | Tác Nhân Liên Quan | Phụ Thuộc |
|--------|-------------------|----------------|-------------------|-----------|
| **Quản Lý Tài Khoản** | Đăng ký tài khoản | Cao | Khách vãng lai | Không |
| | Đăng nhập | Cao | Tất cả người dùng | Không |
| | Quản lý thông tin cá nhân | Cao | Tất cả người dùng | Quản lý tài khoản |
| | Khôi phục mật khẩu | Trung bình | Tất cả người dùng | Quản lý tài khoản |
| | Xác thực hai yếu tố | Thấp | Tất cả người dùng | Quản lý tài khoản |
| **Đặt Lịch** | Xem lịch trống | Cao | Người dùng, Nhân viên | Quản lý tài khoản |
| | Đặt lịch sử dụng phòng gym | Cao | Người dùng, Nhân viên | Quản lý tài khoản |
| | Đặt lịch với huấn luyện viên | Cao | Người dùng, Nhân viên | Quản lý tài khoản, Quản lý huấn luyện viên |
| | Hủy/thay đổi lịch | Cao | Người dùng, Nhân viên | Đặt lịch |
| | Kiểm tra trùng lịch | Cao | Hệ thống | Đặt lịch |
| **Quản Lý Gói Tập** | Xem gói tập và bảng giá | Cao | Tất cả người dùng | Không |
| | Mua gói tập | Cao | Người dùng, Nhân viên | Quản lý tài khoản |
| | Tạo/chỉnh sửa gói tập | Cao | Admin | Không |
| | Gia hạn gói tập | Cao | Người dùng, Nhân viên | Quản lý tài khoản, Quản lý gói tập |
| | Theo dõi hạn sử dụng | Cao | Người dùng, Nhân viên, Admin | Quản lý gói tập |
| **Quản Lý Huấn Luyện Viên** | Xem thông tin huấn luyện viên | Cao | Tất cả người dùng | Không |
| | Mua gói PT | Cao | Người dùng, Nhân viên | Quản lý tài khoản |
| | Quản lý lịch làm việc | Cao | Huấn luyện viên, Admin | Quản lý tài khoản |
| | Tạo kế hoạch tập luyện | Cao | Huấn luyện viên | Quản lý tài khoản |
| | Theo dõi tiến trình khách hàng | Cao | Huấn luyện viên | Quản lý tài khoản, Đặt lịch |
| **Lớp Tập Nhóm** | Xem lịch lớp tập | Cao | Tất cả người dùng | Không |
| | Đăng ký tham gia lớp | Cao | Người dùng, Nhân viên | Quản lý tài khoản |
| | Quản lý lớp tập | Cao | Huấn luyện viên, Admin | Quản lý tài khoản |
| | Theo dõi sĩ số lớp | Trung bình | Huấn luyện viên, Admin | Lớp tập nhóm |
| **Thông Báo & Nhắc Nhở** | Thông báo lịch hẹn | Cao | Tất cả người dùng | Đặt lịch |
| | Nhắc nhở trước buổi tập | Cao | Người dùng, Huấn luyện viên | Đặt lịch |
| | Thông báo thay đổi lịch | Cao | Tất cả người dùng | Đặt lịch |
| | Cấu hình hệ thống thông báo | Trung bình | Admin | Không |
| **Báo Cáo & Thống Kê** | Báo cáo sử dụng dịch vụ | Cao | Admin | Tất cả module |
| | Báo cáo doanh thu | Cao | Admin | Quản lý gói tập |
| | Báo cáo hiệu suất huấn luyện viên | Trung bình | Admin | Quản lý huấn luyện viên |
| | Phân tích mức độ hài lòng | Thấp | Admin | Quản lý tài khoản |
| **Quản Lý Marketing** | Chương trình khuyến mãi | Trung bình | Admin | Quản lý gói tập |
| | Chương trình giới thiệu | Trung bình | Admin | Quản lý tài khoản |
| | Quà tặng thành viên | Thấp | Admin | Quản lý tài khoản |
| **Check-in/Check-out** | Quản lý vào/ra | Cao | Nhân viên | Quản lý tài khoản |
| | Xác thực danh tính | Cao | Nhân viên | Quản lý tài khoản |
| | Ghi nhận thời gian sử dụng | Cao | Hệ thống | Check-in/Check-out |
| **Quản Lý Tài Chính** | Theo dõi thu chi | Cao | Admin | Tất cả module liên quan đến thanh toán |
| | Báo cáo tài chính | Cao | Admin | Quản lý tài chính |
| | Kiểm soát dòng tiền | Trung bình | Admin | Quản lý tài chính |

### Phân Chia Module Hệ Thống

#### Module Core
1. **Authentication & Authorization Module**
   - Quản lý đăng nhập/đăng ký
   - Phân quyền và kiểm soát truy cập
   - Xác thực hai yếu tố
   - Quản lý phiên đăng nhập

2. **User Management Module**
   - Quản lý hồ sơ người dùng
   - Phân loại người dùng (khách vãng lai, thành viên, nhân viên, huấn luyện viên, admin)
   - Quản lý thông tin cá nhân
   - Lịch sử hoạt động

3. **Booking Management Module**
   - Đặt lịch sử dụng phòng gym
   - Đặt lịch với huấn luyện viên
   - Quản lý thay đổi/hủy lịch
   - Kiểm tra trùng lịch
   - Lịch sử đặt lịch

4. **Notification Module**
   - Thông báo lịch hẹn
   - Nhắc nhở trước buổi tập
   - Thông báo thay đổi lịch
   - Thông báo sự kiện đặc biệt
   - Cấu hình hệ thống thông báo

#### Module Kinh Doanh
5. **Membership & Package Module**
   - Quản lý gói tập
   - Quản lý giá và thời hạn
   - Quản lý ưu đãi
   - Theo dõi hạn sử dụng
   - Gia hạn thành viên

6. **PT Service Module**
   - Quản lý gói PT
   - Đặt lịch và theo dõi buổi tập với PT
   - Đánh giá PT
   - Theo dõi tiến trình với PT

7. **Class Management Module**
   - Quản lý lớp tập nhóm
   - Đăng ký tham gia lớp
   - Quản lý lịch lớp
   - Theo dõi sĩ số

8. **Check-in/Check-out Module**
    - Quản lý vào/ra
    - Xác thực danh tính
    - Ghi nhận thời gian sử dụng

9. **Staff Management Module**
    - Quản lý nhân viên
    - Phân ca làm việc
    - Đánh giá hiệu suất
    - Quản lý lương

#### Module Phân Tích & Báo Cáo
10. **Analytics & Reporting Module**
    - Báo cáo sử dụng dịch vụ
    - Báo cáo doanh thu
    - Phân tích hiệu suất huấn luyện viên
    - Phân tích mức độ hài lòng
    - Thống kê thời gian cao điểm

11. **Integration Module**
    - Tích hợp với ứng dụng theo dõi sức khỏe
    - Tích hợp với hệ thống thanh toán
    - Tích hợp với phần mềm kế toán
    - API cho bên thứ ba

### Bảng Mối Quan Hệ Giữa Tác Nhân và Module

| Tác Nhân | Module Chính | Quyền Hạn |
|----------|--------------|-----------|
| **Khách Vãng Lai** | - User Management (giới hạn)<br>- Membership & Package (xem)<br>- PT Service (xem)<br>- Class Management (xem) | - Đăng ký<br>- Xem thông tin cơ bản<br>- Đăng ký dùng thử |
| **Người Dùng (Đã Đăng Ký)** | - Authentication & Authorization<br>- User Management<br>- Booking Management<br>- Notification<br>- Membership & Package<br>- PT Service<br>- Class Management<br>- Check-in/Check-out | - Quản lý tài khoản<br>- Đặt/hủy lịch<br>- Mua gói tập/PT<br>- Đăng ký lớp<br>- Check-in/out<br>- Đánh giá dịch vụ |
| **Nhân Viên** | - Authentication & Authorization<br>- User Management (hạn chế)<br>- Booking Management<br>- Notification<br>- Membership & Package<br>- PT Service<br>- Class Management<br>- Facility & Equipment (hạn chế)<br>- Check-in/Check-out<br>- Staff Management (hạn chế) | - Quản lý lịch đặt<br>- Hỗ trợ khách hàng<br>- Bán gói tập/PT<br>- Quản lý check-in/out<br>- Báo cáo sự cố<br>- Xem thông tin cơ bản |
| **Huấn Luyện Viên** | - Authentication & Authorization<br>- User Management (hạn chế)<br>- Booking Management (hạn chế)<br>- Notification<br>- PT Service<br>- Class Management<br>- Staff Management (hạn chế) | - Quản lý lịch dạy<br>- Tạo kế hoạch tập<br>- Theo dõi khách hàng<br>- Quản lý lớp tập<br>- Đánh giá tiến độ |
| **Admin (Quản Lý)** | Tất cả các module | Toàn quyền quản lý hệ thống |
 