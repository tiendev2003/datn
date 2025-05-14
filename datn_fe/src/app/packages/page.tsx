'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { packages } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Filter packages based on title/features (giả sử các gói phân loại theo title)
  const filteredPackages = activeCategory === 'all' 
    ? packages 
    : packages.filter(pkg => {
        if (activeCategory === 'platinum') return pkg.title.toLowerCase().includes('platinum');
        if (activeCategory === 'gold') return pkg.title.toLowerCase().includes('vàng');
        if (activeCategory === 'basic') return pkg.title.toLowerCase().includes('cơ bản');
        return true;
      });
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Các gói <span className="text-primary">tập luyện</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp nhiều gói tập luyện khác nhau để phù hợp với nhu cầu và mục tiêu của bạn.
              Từ người mới bắt đầu đến người tập luyện chuyên nghiệp.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6 mb-10"></div>
            
            {/* Filter options */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2 rounded-full ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Tất cả
              </button>
              <button 
                onClick={() => setActiveCategory('basic')}
                className={`px-6 py-2 rounded-full ${activeCategory === 'basic' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Gói cơ bản
              </button>
              <button 
                onClick={() => setActiveCategory('gold')}
                className={`px-6 py-2 rounded-full ${activeCategory === 'gold' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Gói vàng
              </button>
              <button 
                onClick={() => setActiveCategory('platinum')}
                className={`px-6 py-2 rounded-full ${activeCategory === 'platinum' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Gói platinum
              </button>
            </div>
          </div>
          
          {/* Packages grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map(pkg => (
              <div key={pkg.id} className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 ${pkg.popular ? 'border-2 border-primary' : 'border border-gray-200'}`}>
                <div className="relative">
                  <div className="h-56 relative">
                    <Image 
                      src={pkg.image} 
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                      Phổ biến
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold text-primary">{pkg.price.toLocaleString()}đ</span>
                    <span className="text-gray-500 ml-1">/{pkg.duration}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-primary mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    
                    {pkg.features.length > 4 && (
                      <li className="text-primary text-sm">+ {pkg.features.length - 4} tính năng khác</li>
                    )}
                  </ul>
                  
                  <div className="flex space-x-2">
                    <Link 
                      href={`/packages/${pkg.id}`}
                      className="flex-1 text-center py-3 px-4 border border-primary text-primary hover:bg-primary hover:text-white transition duration-300 rounded-md"
                    >
                      Chi tiết
                    </Link>
                    <Link 
                      href="/register" 
                      className={`flex-1 text-center py-3 px-4 rounded-md transition duration-300 ${
                        pkg.popular 
                          ? 'bg-primary text-white hover:bg-primary-dark' 
                          : 'border border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPackages.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">Không tìm thấy gói tập phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
          
          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Câu hỏi thường gặp</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Làm thế nào để chọn gói tập phù hợp?</h3>
                  <p className="text-gray-700">
                    Bạn nên lựa chọn gói tập dựa trên mục tiêu cá nhân, thời gian có thể dành cho việc tập luyện và ngân sách. 
                    Nếu bạn mới bắt đầu, Gói cơ bản là lựa chọn tốt. Nếu bạn cần hướng dẫn chuyên sâu, Gói vàng hoặc Platinum sẽ phù hợp hơn.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Tôi có thể chuyển đổi giữa các gói tập không?</h3>
                  <p className="text-gray-700">
                    Có, bạn có thể nâng cấp gói tập của mình bất kỳ lúc nào. 
                    Chúng tôi sẽ tính toán phần chênh lệch giữa các gói dựa trên thời gian còn lại của gói hiện tại.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Có giảm giá khi đăng ký dài hạn không?</h3>
                  <p className="text-gray-700">
                    Chúng tôi thường xuyên có chương trình khuyến mãi cho các gói đăng ký 6 tháng hoặc 1 năm. 
                    Vui lòng liên hệ nhân viên tư vấn để biết thông tin chi tiết về các ưu đãi hiện tại.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Tôi có thể dừng gói tập trong trường hợp bất khả kháng không?</h3>
                  <p className="text-gray-700">
                    Trong trường hợp đặc biệt như bệnh tật, chấn thương hoặc di chuyển xa, 
                    chúng tôi có thể tạm ngưng gói tập của bạn. Vui lòng thông báo trước và cung cấp giấy tờ liên quan nếu cần thiết.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-10 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-4">Bạn vẫn chưa chắc chắn về lựa chọn của mình?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Hãy để chúng tôi tư vấn và giúp bạn chọn gói tập phù hợp nhất với mục tiêu và thói quen của bạn.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/contact" 
                className="py-3 px-8 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition duration-300"
              >
                Liên hệ tư vấn
              </Link>
              <Link 
                href="/register" 
                className="py-3 px-8 border border-white text-white font-bold rounded-md hover:bg-white hover:text-primary transition duration-300"
              >
                Đăng ký dùng thử
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackagesPage;
