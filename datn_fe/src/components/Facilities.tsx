'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Define interfaces for type safety
interface Facility {
  icon: ReactNode;
  title: string;
  description: string;
}

// Remove the extending interface and use directly
type FacilityCardProps = Facility & {
  index: number;
};

const FacilityCard = ({ icon, title, description, index }: FacilityCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -10 }}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div 
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.4 }}
        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const Facilities = () => {
  const facilities: Facility[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Trang thiết bị hiện đại',
      description: 'Các thiết bị tập luyện mới nhất, hiện đại nhất đến từ các thương hiệu hàng đầu thế giới.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Phòng tập rộng rãi',
      description: 'Không gian thoáng đãng, thiết kế hiện đại với diện tích hơn 2000m² chia thành nhiều khu vực chức năng.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ nhân viên chuyên nghiệp, nhiệt tình sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Không gian thư giãn',
      description: 'Khu vực thư giãn, giải khát với nước uống miễn phí và đồ ăn nhẹ bổ dưỡng.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Phòng thay đồ tiện nghi',
      description: 'Phòng thay đồ rộng rãi với tủ khóa an toàn, phòng tắm nước nóng và đầy đủ tiện nghi.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'Lịch đa dạng',
      description: 'Hơn 50 lớp tập mỗi tuần với đa dạng hình thức: yoga, zumba, spinning, pilates và nhiều hơn nữa.'
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">Cơ sở vật chất</span> hiện đại
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi đầu tư mạnh mẽ vào cơ sở vật chất để đảm bảo trải nghiệm tập luyện tốt nhất cho khách hàng.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto mt-6"
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <FacilityCard
              key={index}
              icon={facility.icon}
              title={facility.title}
              description={facility.description}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-primary p-8 md:p-12 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Giờ hoạt động</h3>
              <ul className="space-y-3">
                {[
                  { day: 'Thứ Hai - Thứ Sáu', hours: '05:00 - 23:00' },
                  { day: 'Thứ Bảy', hours: '06:00 - 22:00' },
                  { day: 'Chủ Nhật', hours: '07:00 - 20:00' }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between"
                  >
                    <span>{item.day}:</span>
                    <span>{item.hours}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold mb-4">Địa chỉ</h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-4"
              >
                Tầng 5, Tòa nhà Landmark 81, Vinhomes Central Park,
                <br />
                720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh,
                <br />
                Thành phố Hồ Chí Minh
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-600"
              >
                <strong>Điện thoại:</strong> 028 1234 5678<br />
                <strong>Email:</strong> info@gymmaster.vn
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;
