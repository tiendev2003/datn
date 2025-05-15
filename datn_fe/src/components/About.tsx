'use client';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Về <span className="text-primary">GYM</span>MASTER
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="px-2 sm:px-0"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Phòng tập hiện đại, chất lượng hàng đầu</h3>
            <p className="text-gray-700 mb-6">
              GYMMASTER là phòng tập hàng đầu với trang thiết bị hiện đại, không gian rộng rãi và đội ngũ huấn 
              luyện viên chuyên nghiệp. Chúng tôi cam kết mang đến trải nghiệm tập luyện tốt nhất cho khách hàng.
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              {[
                { number: '1000+', label: 'Khách hàng' },
                { number: '20+', label: 'Huấn luyện viên' },
                { number: '50+', label: 'Lớp tập mỗi tuần' },
                { number: '24/7', label: 'Giờ hoạt động' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                  className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <span className="text-primary text-2xl sm:text-4xl font-bold">{item.number}</span>
                  <span className="text-gray-600 text-sm sm:text-base">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative mt-8 md:mt-0"
          >
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')" }}
              ></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary/80 rounded-lg flex items-center justify-center p-4"
            >
              <p className="text-white text-center font-bold text-sm sm:text-base md:text-lg">
                10 NĂM<br />KINH NGHIỆM
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
