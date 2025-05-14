'use client';
import { packages as packagesData } from '@/utils/data';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Use only the properties needed for card display
type PackageCardProps = {
  id: string;
  title: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  index: number;
};

// Package card component
const PackageCard = ({ id, title, price, duration, features, popular = false, index }: PackageCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className={`relative rounded-lg p-6 shadow-lg ${
        popular ? 'bg-primary/5 border-2 border-primary' : 'bg-white border border-gray-200'
      }`}
    >
      {popular && (
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
          className="absolute top-0 right-0 bg-primary text-white py-1 px-4 rounded-bl-lg rounded-tr-lg text-sm font-medium"
        >
          Phổ biến
        </motion.div>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="flex items-end mb-6">
        <span className="text-4xl font-bold text-primary">{price.toLocaleString()}đ</span>
        <span className="text-gray-500 ml-1">/{duration}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <motion.li 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + idx * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </motion.li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <Link 
          href={`/packages/${id}`}
          className="flex-1 text-center py-3 px-4 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
        >
          Chi tiết
        </Link>
        <Link 
          href="/register" 
          className={`flex-1 text-center py-3 px-4 rounded-md transition duration-300 ${
            popular 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'border border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          Đăng ký
        </Link>
      </div>
    </motion.div>
  );
};

const Packages = () => {
  return (
    <section id="packages" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Các gói <span className="text-primary">tập luyện</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp nhiều gói tập luyện khác nhau để phù hợp với nhu cầu và mục tiêu của bạn.
            Từ người mới bắt đầu đến người tập luyện chuyên nghiệp.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto mt-6"
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packagesData.slice(0, 3).map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              price={pkg.price}
              duration={pkg.duration}
              features={pkg.features}
              popular={pkg.popular}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              href="/packages" 
              className="inline-block py-3 px-8 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
            >
              Xem tất cả các gói tập
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
