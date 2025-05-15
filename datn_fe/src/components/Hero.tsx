'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center bg-gradient-to-r from-secondary via-secondary to-black overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background image - you would replace this with your actual gym image */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1968&q=80')" }}
      ></motion.div>
      
      <div className="container relative z-20">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="text-primary">KHỎE MẠNH</span> HƠN.<br />
            <span className="text-primary">MẠNH MẼ</span> HƠN.<br />
            <span className="text-primary">TỐT HƠN</span> MỖI NGÀY.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-white/90 mb-8"
          >
            Chào mừng đến với GYMMASTER - nơi bạn khám phá phiên bản tốt nhất của chính mình với các huấn luyện viên chuyên nghiệp và trang thiết bị hiện đại.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/register" 
              className="px-8 py-4 bg-primary text-white text-center font-bold rounded-md hover:bg-primary-dark transition duration-300"
            >
              BẮT ĐẦU NGAY
            </Link>
            <Link 
              href="#packages" 
              className="px-8 py-4 border-2 border-white text-white text-center font-bold rounded-md hover:bg-white/10 transition duration-300"
            >
              XEM GÓI TẬP
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Red accent elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/30 rounded-full blur-3xl"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
      ></motion.div>
    </section>
  );
};

export default Hero;
