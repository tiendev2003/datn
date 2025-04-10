# Quy Trình Hoạt Động Của Hệ Thống Đặt Lịch và Quản Lý Phòng Gym

Tài liệu này mô tả trực quan các quy trình hoạt động chính của hệ thống, giúp người đọc hiểu rõ luồng hoạt động và tương tác giữa các thành phần trong hệ thống.

## Mục Lục

1. [Tổng Quan Kiến Trúc Hệ Thống](#tổng-quan-kiến-trúc-hệ-thống)
2. [Quy Trình Đăng Ký và Đăng Nhập](#quy-trình-đăng-ký-và-đăng-nhập)
3. [Quy Trình Đặt Lịch Sử Dụng Phòng Gym](#quy-trình-đặt-lịch-sử-dụng-phòng-gym)
4. [Quy Trình Đặt Lịch Với Huấn Luyện Viên](#quy-trình-đặt-lịch-với-huấn-luyện-viên)
5. [Quy Trình Mua Gói Tập](#quy-trình-mua-gói-tập)
6. [Quy Trình Mua Gói PT](#quy-trình-mua-gói-pt)
7. [Quy Trình Check-in và Check-out](#quy-trình-check-in-và-check-out)
8. [Quy Trình Thông Báo](#quy-trình-thông-báo)
9. [Quy Trình Báo Cáo và Thống Kê](#quy-trình-báo-cáo-và-thống-kê)
10. [Tương Tác Giữa Các Microservices](#tương-tác-giữa-các-microservices)

## Tổng Quan Kiến Trúc Hệ Thống

```mermaid
graph TB
    Client[Client Applications] --> ApiGateway[API Gateway]
    ApiGateway --> Auth[Authentication Service]
    ApiGateway --> User[User Service]
    ApiGateway --> Booking[Booking Service]
    ApiGateway --> Trainer[Trainer Service]
    ApiGateway --> Class[Class Management Service]
    ApiGateway --> Membership[Membership Service]
    ApiGateway --> PT[PT Package Service]
    ApiGateway --> Payment[Payment Service]
    ApiGateway --> Notification[Notification Service]
    ApiGateway --> Analytics[Analytics Service]
    ApiGateway --> Equipment[Equipment Service]
    
    Auth --> AuthDB[(Auth DB)]
    User --> UserDB[(User DB)]
    Booking --> BookingDB[(Booking DB)]
    Trainer --> TrainerDB[(Trainer DB)]
    Class --> ClassDB[(Class DB)]
    Membership --> MembershipDB[(Membership DB)]
    PT --> PTDB[(PT Package DB)]
    Payment --> PaymentDB[(Payment DB)]
    Equipment --> EquipmentDB[(Equipment DB)]
    
    Notification --> Email[Email Service]
    Notification --> SMS[SMS Service]
    Notification --> Push[Push Notification]
    
    Auth -.-> MessageBroker[Message Broker]
    User -.-> MessageBroker
    Booking -.-> MessageBroker
    Trainer -.-> MessageBroker
    Class -.-> MessageBroker
    Membership -.-> MessageBroker
    PT -.-> MessageBroker
    Payment -.-> MessageBroker
    Notification -.-> MessageBroker
    Analytics -.-> MessageBroker
    Equipment -.-> MessageBroker
    
    MessageBroker --> Cache[Redis Cache]
    
    style ApiGateway fill:#f9f,stroke:#333,stroke-width:2px
    style MessageBroker fill:#bbf,stroke:#333,stroke-width:2px
    style Cache fill:#bfb,stroke:#333,stroke-width:2px
```

Hệ thống được xây dựng theo kiến trúc microservices với các thành phần chính:
- **API Gateway**: Điểm vào của hệ thống, điều hướng các request tới microservice phù hợp
- **Microservices**: Mỗi service chịu trách nhiệm cho một nghiệp vụ cụ thể và có cơ sở dữ liệu riêng
- **Message Broker**: Hỗ trợ giao tiếp bất đồng bộ giữa các microservices
- **Cache**: Lưu trữ tạm thời dữ liệu thường xuyên truy cập để tăng hiệu suất

## Quy Trình Đăng Ký và Đăng Nhập

### Quy Trình Đăng Ký

```mermaid
sequenceDiagram
    participant User as Người Dùng
    participant Gateway as API Gateway
    participant AuthService as Authentication Service
    participant UserService as User Service
    participant NotificationService as Notification Service
    participant DB as Database
    
    User->>Gateway: Gửi thông tin đăng ký
    Gateway->>AuthService: Chuyển tiếp yêu cầu
    AuthService->>AuthService: Xác thực thông tin
    AuthService->>DB: Kiểm tra email đã tồn tại chưa
    DB-->>AuthService: Trả về kết quả
    
    alt Email đã tồn tại
        AuthService-->>Gateway: Thông báo lỗi
        Gateway-->>User: Hiển thị lỗi
    else Email chưa tồn tại
        AuthService->>DB: Lưu thông tin tài khoản
        AuthService->>UserService: Tạo hồ sơ người dùng
        UserService->>DB: Lưu thông tin hồ sơ
        AuthService->>NotificationService: Yêu cầu gửi email xác thực
        NotificationService-->>User: Gửi email xác thực
        AuthService-->>Gateway: Đăng ký thành công
        Gateway-->>User: Hiển thị thông báo thành công
    end
    
    User->>Gateway: Xác thực email
    Gateway->>AuthService: Xác nhận email
    AuthService->>DB: Cập nhật trạng thái tài khoản
    AuthService-->>Gateway: Xác thực thành công
    Gateway-->>User: Chuyển đến trang đăng nhập
```

### Quy Trình Đăng Nhập

```mermaid
sequenceDiagram
    participant User as Người Dùng
    participant Gateway as API Gateway
    participant AuthService as Authentication Service
    participant UserService as User Service
    participant DB as Database
    
    User->>Gateway: Gửi thông tin đăng nhập
    Gateway->>AuthService: Chuyển tiếp yêu cầu
    AuthService->>DB: Kiểm tra thông tin đăng nhập
    DB-->>AuthService: Trả về kết quả
    
    alt Thông tin không hợp lệ
        AuthService-->>Gateway: Thông báo lỗi
        Gateway-->>User: Hiển thị lỗi
    else Thông tin hợp lệ
        AuthService->>AuthService: Tạo JWT token
        AuthService->>UserService: Lấy thông tin người dùng
        UserService-->>AuthService: Trả về thông tin người dùng
        AuthService-->>Gateway: Trả về token và thông tin người dùng
        Gateway-->>User: Chuyển đến trang chính
    end
```

## Quy Trình Đặt Lịch Sử Dụng Phòng Gym

```mermaid
flowchart TD
    A[Hội Viên] -->|Đăng nhập| B[Xem lịch trống]
    B --> C{Chọn ngày và giờ}
    C -->|Chọn khu vực/thiết bị| D[Kiểm tra tính khả dụng]
    D --> E{Còn trống?}
    E -->|Có| F[Xác nhận đặt lịch]
    E -->|Không| G[Thông báo không khả dụng]
    G --> B
    F --> H[Gửi thông báo xác nhận]
    H --> I[Lưu vào lịch cá nhân]
    
    J[Nhân Viên] -->|Đăng nhập| K[Xem lịch đặt]
    K --> L[Xác nhận/từ chối lịch đặt]
    L -->|Xác nhận| M[Gửi thông báo xác nhận cho hội viên]
    L -->|Từ chối| N[Gửi thông báo từ chối với lý do]
    N --> O[Cập nhật lịch trống]
    M --> P[Chuẩn bị khu vực/thiết bị]
```

## Quy Trình Đặt Lịch Với Huấn Luyện Viên

```mermaid
sequenceDiagram
    participant Member as Hội Viên
    participant Gateway as API Gateway
    participant BookingService as Booking Service
    participant TrainerService as Trainer Service
    participant NotificationService as Notification Service
    participant Trainer as Huấn Luyện Viên
    
    Member->>Gateway: Xem danh sách huấn luyện viên
    Gateway->>TrainerService: Lấy danh sách
    TrainerService-->>Gateway: Danh sách huấn luyện viên
    Gateway-->>Member: Hiển thị danh sách
    
    Member->>Gateway: Chọn huấn luyện viên
    Gateway->>TrainerService: Lấy thông tin và lịch trống
    TrainerService-->>Gateway: Thông tin và lịch trống
    Gateway-->>Member: Hiển thị thông tin và lịch
    
    Member->>Gateway: Chọn ngày giờ và đặt lịch
    Gateway->>BookingService: Tạo lịch hẹn
    BookingService->>TrainerService: Kiểm tra lịch trống
    
    alt Lịch không khả dụng
        TrainerService-->>BookingService: Thông báo không khả dụng
        BookingService-->>Gateway: Trả về lỗi
        Gateway-->>Member: Hiển thị lỗi
    else Lịch khả dụng
        TrainerService-->>BookingService: Xác nhận khả dụng
        BookingService->>BookingService: Lưu lịch hẹn
        BookingService->>NotificationService: Thông báo đặt lịch
        NotificationService-->>Member: Gửi xác nhận đặt lịch
        NotificationService-->>Trainer: Thông báo lịch hẹn mới
        BookingService-->>Gateway: Đặt lịch thành công
        Gateway-->>Member: Hiển thị thông báo thành công
    end
```

## Quy Trình Mua Gói Tập

```mermaid
flowchart TD
    A[Khách hàng] -->|Xem gói tập| B[Chọn gói tập phù hợp]
    B --> C{Mua online?}
    
    C -->|Có| D[Thanh toán online]
    D --> E{Thanh toán thành công?}
    E -->|Có| F[Kích hoạt gói tập]
    E -->|Không| G[Thông báo lỗi thanh toán]
    G --> D
    
    C -->|Không| H[Đến quầy lễ tân]
    H --> I[Nhân viên xử lý]
    I --> J[Thanh toán tại quầy]
    J --> F
    
    F --> K[Gửi email xác nhận]
    K --> L[Cập nhật quyền lợi hội viên]
    L --> M[Lưu lịch sử giao dịch]
```

## Quy Trình Mua Gói PT

```mermaid
sequenceDiagram
    participant Member as Hội Viên
    participant Gateway as API Gateway
    participant PTService as PT Package Service
    participant TrainerService as Trainer Service
    participant PaymentService as Payment Service
    participant NotificationService as Notification Service
    
    Member->>Gateway: Xem danh sách gói PT
    Gateway->>PTService: Lấy danh sách gói PT
    PTService-->>Gateway: Danh sách gói PT
    Gateway-->>Member: Hiển thị danh sách
    
    Member->>Gateway: Chọn gói PT
    Gateway->>TrainerService: Xem danh sách huấn luyện viên khả dụng
    TrainerService-->>Gateway: Danh sách huấn luyện viên
    Gateway-->>Member: Hiển thị danh sách huấn luyện viên
    
    Member->>Gateway: Chọn huấn luyện viên và xác nhận mua
    Gateway->>PaymentService: Xử lý thanh toán
    
    alt Thanh toán thất bại
        PaymentService-->>Gateway: Thông báo lỗi
        Gateway-->>Member: Hiển thị lỗi thanh toán
    else Thanh toán thành công
        PaymentService-->>Gateway: Xác nhận thanh toán
        Gateway->>PTService: Kích hoạt gói PT
        PTService->>TrainerService: Cập nhật lịch huấn luyện viên
        PTService->>NotificationService: Yêu cầu gửi thông báo
        NotificationService-->>Member: Gửi xác nhận mua gói PT
        NotificationService-->>TrainerService: Thông báo cho huấn luyện viên
        Gateway-->>Member: Hiển thị thông báo thành công
    end
```

## Quy Trình Check-in và Check-out

```mermaid
flowchart TD
    A[Hội viên] -->|Đến phòng gym| B[Quét mã QR/thẻ thành viên]
    B --> C[Hệ thống kiểm tra]
    C --> D{Thành viên hợp lệ?}
    
    D -->|Không| E[Thông báo lỗi]
    E --> F[Nhân viên kiểm tra]
    F --> G{Giải quyết được?}
    G -->|Có| H[Override check-in]
    G -->|Không| I[Từ chối vào]
    
    D -->|Có| J[Check-in thành công]
    J --> K[Cập nhật trạng thái]
    K --> L[Ghi nhận thời gian vào]
    
    M[Hội viên] -->|Rời phòng gym| N[Quét mã QR/thẻ để check-out]
    N --> O[Hệ thống ghi nhận]
    O --> P[Cập nhật thời gian sử dụng]
    P --> Q[Cập nhật lịch sử tập luyện]
```

## Quy Trình Thông Báo

```mermaid
flowchart TD
    A[Sự kiện hệ thống] -->|Phát sinh| B[Message Broker]
    B --> C[Notification Service]
    
    C --> D{Loại thông báo?}
    D -->|Email| E[Email Service]
    D -->|SMS| F[SMS Service]
    D -->|Push| G[Push Notification]
    
    E --> H[Gửi email]
    F --> I[Gửi SMS]
    G --> J[Gửi push notification]
    
    H --> K[Ghi nhận trạng thái gửi]
    I --> K
    J --> K
    
    K --> L{Gửi thành công?}
    L -->|Không| M[Thử lại]
    M --> H
    L -->|Có| N[Cập nhật trạng thái đã gửi]
```

## Quy Trình Báo Cáo và Thống Kê

```mermaid
flowchart TD
    A[Admin] -->|Yêu cầu báo cáo| B[Analytics Service]
    B -->|Thu thập dữ liệu| C{Loại báo cáo?}
    
    C -->|Doanh thu| D[Lấy dữ liệu từ Payment Service]
    C -->|Hoạt động| E[Lấy dữ liệu từ Booking Service]
    C -->|Hội viên| F[Lấy dữ liệu từ User Service]
    C -->|Huấn luyện viên| G[Lấy dữ liệu từ Trainer Service]
    
    D --> H[Xử lý và phân tích]
    E --> H
    F --> H
    G --> H
    
    H --> I[Tạo báo cáo]
    I --> J[Hiển thị báo cáo]
    I --> K[Xuất file]
    
    J --> L[Dashboard]
    K --> M[PDF/Excel/CSV]
```

## Tương Tác Giữa Các Microservices

```mermaid
graph TB
    subgraph "Front-end Applications"
        WebApp[Web Application]
        MobileApp[Mobile Application]
        AdminPanel[Admin Panel]
    end
    
    subgraph "API Gateway"
        Gateway[API Gateway]
    end
    
    subgraph "Core Services"
        Auth[Authentication Service]
        User[User Service]
        Booking[Booking Service]
        Trainer[Trainer Service]
        Class[Class Management Service]
        Equipment[Equipment Service]
    end
    
    subgraph "Business Services"
        Membership[Membership Service]
        PT[PT Package Service]
        Payment[Payment Service]
        Analytics[Analytics Service]
    end
    
    subgraph "Supporting Services"
        Notification[Notification Service]
        FileStorage[File Storage Service]
        Search[Search Service]
    end
    
    WebApp --> Gateway
    MobileApp --> Gateway
    AdminPanel --> Gateway
    
    Gateway --> Auth
    Gateway --> User
    Gateway --> Booking
    Gateway --> Trainer
    Gateway --> Class
    Gateway --> Equipment
    Gateway --> Membership
    Gateway --> PT
    Gateway --> Payment
    Gateway --> Analytics
    Gateway --> Notification
    Gateway --> FileStorage
    Gateway --> Search
    
    Auth <--> User
    Booking <--> User
    Booking <--> Trainer
    Booking <--> Class
    Booking <--> Equipment
    
    Membership <--> User
    PT <--> Trainer
    PT <--> User
    Payment <--> Membership
    Payment <--> PT
    
    Notification <--> User
    Notification <--> Booking
    Notification <--> Payment
    Notification <--> Membership
    Notification <--> PT
    
    Analytics <--> User
    Analytics <--> Booking
    Analytics <--> Payment
    Analytics <--> Trainer
    Analytics <--> Membership
    Analytics <--> PT
    
    FileStorage <--> User
    FileStorage <--> Trainer
    
    Search <--> User
    Search <--> Trainer
    Search <--> Class
    Search <--> Equipment
    
    style WebApp fill:#f9f,stroke:#333,stroke-width:1px
    style MobileApp fill:#f9f,stroke:#333,stroke-width:1px
    style AdminPanel fill:#f9f,stroke:#333,stroke-width:1px
    style Gateway fill:#f96,stroke:#333,stroke-width:2px
    style Auth fill:#bbf,stroke:#333,stroke-width:1px
    style User fill:#bbf,stroke:#333,stroke-width:1px
    style Booking fill:#bbf,stroke:#333,stroke-width:1px
    style Trainer fill:#bbf,stroke:#333,stroke-width:1px
    style Class fill:#bbf,stroke:#333,stroke-width:1px
    style Equipment fill:#bbf,stroke:#333,stroke-width:1px
    style Membership fill:#bfb,stroke:#333,stroke-width:1px
    style PT fill:#bfb,stroke:#333,stroke-width:1px
    style Payment fill:#bfb,stroke:#333,stroke-width:1px
    style Analytics fill:#bfb,stroke:#333,stroke-width:1px
    style Notification fill:#ff9,stroke:#333,stroke-width:1px
    style FileStorage fill:#ff9,stroke:#333,stroke-width:1px
    style Search fill:#ff9,stroke:#333,stroke-width:1px
```

## Diễn Giải Chi Tiết

Hệ thống quản lý phòng gym được thiết kế với kiến trúc microservices để đảm bảo tính linh hoạt, khả năng mở rộng và bảo trì. Mỗi dịch vụ hoạt động độc lập và giao tiếp với nhau thông qua API hoặc Message Broker.

### Các Điểm Chính:

1. **Phân Tách Trách Nhiệm**: Mỗi microservice chịu trách nhiệm cho một phần chức năng cụ thể, giúp dễ dàng phát triển và bảo trì.

2. **Khả Năng Mở Rộng**: Các service có thể được triển khai, mở rộng và nâng cấp độc lập mà không ảnh hưởng đến phần còn lại của hệ thống.

3. **Tính Linh Hoạt**: Hệ thống có thể dễ dàng thêm các tính năng mới thông qua việc thêm microservices hoặc mở rộng các service hiện có.

4. **Xử Lý Sự Cố**: Lỗi trong một service không ảnh hưởng đến toàn bộ hệ thống, giúp tăng độ ổn định và khả năng phục hồi.

Quy trình hoạt động được thiết kế để tối ưu hóa trải nghiệm của cả người dùng cuối (hội viên, huấn luyện viên) và người quản lý (nhân viên, admin), đồng thời đảm bảo tính nhất quán và hiệu quả của dữ liệu.
