// Define interfaces for type safety
export interface Package {
  id: string;
  title: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  description: string;
  benefits: string[];
  forWhom: string[];
  schedule?: string[];
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string; // Keep the main image for backward compatibility
  images: string[]; // New property for multiple images
  experience: number;
  specialization: string;
  bio: string;
  certifications: string[];
  schedule: { day: string; hours: string }[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

// Package data
export const packages: Package[] = [
  {
    id: 'basic',
    title: 'Gói cơ bản',
    price: 500000,
    duration: 'tháng',
    features: [
      'Tập không giới hạn thời gian',
      'Sử dụng tất cả thiết bị',
      'Tủ đồ cá nhân',
      'Phòng tắm',
      'Hỗ trợ cơ bản'
    ],
    popular: false,
    description: 'Gói cơ bản phù hợp cho người mới bắt đầu tập luyện hoặc những người cần một nơi để duy trì sự luyện tập đều đặn. Với gói này, bạn sẽ có đầy đủ quyền truy cập vào tất cả các khu vực tập luyện và thiết bị trong phòng gym của chúng tôi.',
    benefits: [
      'Tập luyện mọi lúc trong giờ mở cửa',
      'Tiếp cận đầy đủ các thiết bị tập luyện',
      'Môi trường sạch sẽ, thoáng mát',
      'Đội ngũ nhân viên thân thiện'
    ],
    forWhom: [
      'Người mới bắt đầu tập luyện',
      'Người tập luyện theo lịch trình cá nhân',
      'Người muốn duy trì thói quen tập luyện thường xuyên'
    ],
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80'
  },
  {
    id: 'gold',
    title: 'Gói vàng',
    price: 900000,
    duration: 'tháng',
    features: [
      'Tất cả tính năng gói cơ bản',
      '2 buổi PT mỗi tuần',
      'Lớp học nhóm miễn phí',
      'Đánh giá định kỳ',
      'Chế độ dinh dưỡng'
    ],
    popular: true,
    description: 'Gói vàng cung cấp trải nghiệm tập luyện đầy đủ với sự hướng dẫn chuyên nghiệp. Bạn sẽ có cơ hội làm việc với huấn luyện viên cá nhân để đạt được mục tiêu nhanh chóng và hiệu quả hơn, cùng với các đặc quyền tham gia lớp học nhóm.',
    benefits: [
      'Hướng dẫn chuyên nghiệp từ huấn luyện viên',
      'Lộ trình tập luyện được cá nhân hóa',
      'Theo dõi tiến độ định kỳ mỗi tháng',
      'Tư vấn dinh dưỡng phù hợp với mục tiêu',
      'Các lớp học nhóm đa dạng'
    ],
    forWhom: [
      'Người muốn đạt kết quả nhanh chóng',
      'Người cần sự hướng dẫn chuyên nghiệp',
      'Người thích tham gia các lớp học nhóm',
      'Người muốn có chế độ dinh dưỡng phù hợp'
    ],
    schedule: [
      'Thứ 2 & Thứ 4: Tập cùng PT (1 giờ/buổi)',
      'Thứ 3 & Thứ 5: Lớp học nhóm (1 giờ/buổi)',
      'Các ngày còn lại: Tập tự do'
    ],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 'platinum',
    title: 'Gói Platinum',
    price: 1500000,
    duration: 'tháng',
    features: [
      'Tất cả tính năng gói vàng',
      'PT không giới hạn',
      'Lịch tập cá nhân hóa',
      'Kiểm tra sức khỏe định kỳ',
      'Đồ uống protein miễn phí'
    ],
    popular: false,
    description: 'Gói Platinum là lựa chọn cao cấp nhất dành cho những người muốn đạt được kết quả tối đa. Bạn sẽ được hưởng dịch vụ PT không giới hạn, lịch tập cá nhân hóa, cùng với nhiều đặc quyền độc quyền khác để đảm bảo hành trình tập luyện hiệu quả nhất.',
    benefits: [
      'Huấn luyện viên cá nhân không giới hạn',
      'Lịch tập và chế độ dinh dưỡng hoàn toàn cá nhân hóa',
      'Theo dõi sức khỏe và thể chất định kỳ',
      'Đồ uống bổ sung protein sau tập luyện',
      'Ưu tiên đặt lịch các lớp học đặc biệt',
      'Tư vấn y tế thể thao'
    ],
    forWhom: [
      'Người đặt mục tiêu tập luyện nghiêm túc',
      'Người muốn đạt được kết quả nhanh chóng',
      'Vận động viên cần lịch tập chuyên sâu',
      'Người cần sự hỗ trợ toàn diện về tập luyện và dinh dưỡng'
    ],
    schedule: [
      'Tập luyện cùng PT mọi ngày trong tuần (theo lịch cá nhân)',
      'Đánh giá tiến độ hàng tuần',
      'Tư vấn dinh dưỡng 2 lần/tháng',
      'Kiểm tra sức khỏe 1 lần/tháng'
    ],
    image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
  },
];

// Trainers data
export const trainers: Trainer[] = [
  {
    id: 'nguyen-van-a',
    name: 'Nguyễn Văn A',
    role: 'HLV Thể hình & Sức mạnh',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    experience: 8,
    specialization: 'Tăng cơ, Cắt nét',
    bio: 'Nguyễn Văn A là huấn luyện viên thể hình với hơn 8 năm kinh nghiệm. Anh đã từng thi đấu và đạt nhiều giải thưởng trong các cuộc thi thể hình quốc gia. Với phương pháp huấn luyện khoa học và hiệu quả, anh đã giúp hàng trăm học viên đạt được mục tiêu thể hình mong muốn.',
    certifications: [
      'Chứng chỉ Huấn luyện viên thể hình quốc tế (IFBB)',
      'Chứng chỉ Dinh dưỡng thể thao (NASM)',
      'Chứng chỉ Sơ cứu và CPR'
    ],
    schedule: [
      { day: 'Thứ 2 - Thứ 6', hours: '8:00 - 17:00' },
      { day: 'Thứ 7', hours: '8:00 - 12:00' }
    ],
    socialMedia: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 'tran-thi-b',
    name: 'Trần Thị B',
    role: 'HLV Yoga & Pilates',
    image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    ],
    experience: 6,
    specialization: 'Yoga trị liệu, Thiền',
    bio: 'Trần Thị B là một huấn luyện viên yoga và pilates với 6 năm kinh nghiệm, chuyên về yoga trị liệu và thiền. Cô đã học tập tại Ấn Độ và nhiều trung tâm yoga uy tín trên thế giới. Phương pháp giảng dạy của cô tập trung vào sự kết hợp giữa thể chất và tinh thần, giúp học viên không chỉ cải thiện sức khỏe mà còn tìm thấy sự cân bằng trong cuộc sống.',
    certifications: [
      'Chứng chỉ Giáo viên Yoga quốc tế (RYT 500)',
      'Chứng chỉ Pilates mat work',
      'Chứng chỉ Yoga trị liệu'
    ],
    schedule: [
      { day: 'Thứ 2, Thứ 4, Thứ 6', hours: '9:00 - 18:00' },
      { day: 'Chủ nhật', hours: '9:00 - 11:00' }
    ],
    socialMedia: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com'
    }
  },
  {
    id: 'le-van-c',
    name: 'Lê Văn C',
    role: 'HLV Phục hồi chức năng',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    images: [
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    experience: 5,
    specialization: 'Điều trị chấn thương',
    bio: 'Lê Văn C là huấn luyện viên chuyên về phục hồi chức năng và điều trị chấn thương thể thao. Với nền tảng là một bác sĩ vật lý trị liệu, anh kết hợp kiến thức y khoa với huấn luyện thể chất để giúp khách hàng phục hồi sau chấn thương và tăng cường sức khỏe. Anh có 5 năm kinh nghiệm làm việc với nhiều vận động viên chuyên nghiệp.',
    certifications: [
      'Bằng Vật lý trị liệu và Phục hồi chức năng',
      'Chứng chỉ Điều trị chấn thương thể thao',
      'Chứng chỉ Kinesio Taping'
    ],
    schedule: [
      { day: 'Thứ 3, Thứ 5', hours: '10:00 - 19:00' },
      { day: 'Thứ 7', hours: '13:00 - 18:00' }
    ],
    socialMedia: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 'pham-thi-d',
    name: 'Phạm Thị D',
    role: 'HLV Cardio & HIIT',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    experience: 7,
    specialization: 'Đốt mỡ, Tăng sức bền',
    bio: 'Phạm Thị D là huấn luyện viên cardio và HIIT với 7 năm kinh nghiệm. Cô chuyên về các bài tập đốt mỡ, tăng sức bền và làm săn chắc cơ thể. Các buổi học của cô luôn năng động, nhiệt huyết và hiệu quả cao. Cô đã giúp nhiều khách hàng giảm cân thành công và cải thiện sức khỏe tim mạch.',
    certifications: [
      'Chứng chỉ Huấn luyện viên Thể dục nhịp điệu',
      'Chứng chỉ HIIT International',
      'Chứng chỉ Dinh dưỡng giảm cân'
    ],
    schedule: [
      { day: 'Thứ 2 - Thứ 6', hours: '14:00 - 21:00' },
      { day: 'Chủ nhật', hours: '14:00 - 18:00' }
    ],
    socialMedia: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com'
    }
  },
];
