'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CountdownUnit = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex flex-col items-center"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 500 }}
        className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold"
      >
        {value}
      </motion.div>
      <span className="mt-1 text-sm">{label}</span>
    </motion.div>
  );
};

const SpecialOffer = () => {
  const [days, setDays] = useState('15');
  const [hours, setHours] = useState('08');
  const [minutes, setMinutes] = useState('45');
  const [seconds, setSeconds] = useState('30');

  // Add a dynamic countdown effect
  useEffect(() => {
    const endDate = new Date('2025-05-30T23:59:59');
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setDays(String(d).padStart(2, '0'));
      setHours(String(h).padStart(2, '0'));
      setMinutes(String(m).padStart(2, '0'));
      setSeconds(String(s).padStart(2, '0'));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary-dark to-secondary text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-8 md:mb-0 md:max-w-2xl"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              ĐĂNG KÝ HÔM NAY - NHẬN ƯU ĐÃI ĐẶC BIỆT
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg opacity-90 mb-6"
            >
              Giảm ngay 20% cho gói tập 12 tháng và miễn phí 2 buổi PT khi đăng ký trước ngày 30/05/2025.
              Đừng bỏ lỡ cơ hội tuyệt vời để bắt đầu hành trình sức khỏe cùng GYMMASTER!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="px-8 py-3 bg-white text-primary text-center font-bold rounded-md hover:bg-gray-100 transition-colors duration-300 block"
                >
                  ĐĂNG KÝ NGAY
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="px-8 py-3 border-2 border-white text-white text-center font-bold rounded-md hover:bg-white/10 transition-colors duration-300 block"
                >
                  TÌM HIỂU THÊM
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg w-full md:w-auto"
          >
            <div className="text-center">
              <motion.h3 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-2"
              >
                KHUYẾN MÃI KẾT THÚC SAU
              </motion.h3>
              <div className="flex items-center justify-center gap-4 my-4">
                <CountdownUnit value={days} label="Ngày" />
                <CountdownUnit value={hours} label="Giờ" />
                <CountdownUnit value={minutes} label="Phút" />
                <CountdownUnit value={seconds} label="Giây" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm opacity-90"
              >
                * Áp dụng có điều kiện. Vui lòng liên hệ để biết thêm chi tiết.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
