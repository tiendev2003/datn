'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { packages } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const PackageDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const packageData = packages.find((p) => p.id === id);

  // Nếu không tìm thấy gói tập, chuyển đến trang 404
  if (!packageData) {
    if (typeof window !== 'undefined') {
      router.push('/404');
    }
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-0">
          {/* Hero section */}
          <div className="mb-16 relative overflow-hidden rounded-xl h-[300px] md:h-[400px]">
            <Image
              src={packageData.image}
              alt={packageData.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{packageData.title}</h1>
                <p className="text-xl opacity-90">{packageData.price.toLocaleString()}đ/{packageData.duration}</p>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Package details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Mô tả gói tập</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{packageData.description}</p>
                
                <h3 className="text-xl font-bold mb-3">Lợi ích</h3>
                <ul className="mb-6 space-y-3">
                  {packageData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-primary mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-bold mb-3">Gói này phù hợp với ai?</h3>
                <ul className="mb-6 space-y-3">
                  {packageData.forWhom.map((person, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-primary mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{person}</span>
                    </li>
                  ))}
                </ul>
                
                {packageData.schedule && (
                  <>
                    <h3 className="text-xl font-bold mb-3">Lịch tập gợi ý</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <ul className="space-y-2">
                        {packageData.schedule.map((item, index) => (
                          <li key={index} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
              
              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Tôi có thể bắt đầu tập luyện vào bất kỳ lúc nào không?</h4>
                    <p className="text-gray-700">Có, bạn có thể bắt đầu gói tập vào bất kỳ ngày nào trong tháng. Thời hạn sẽ được tính từ ngày bạn bắt đầu sử dụng dịch vụ.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Gói tập có thể hoàn tiền nếu tôi không hài lòng không?</h4>
                    <p className="text-gray-700">Chúng tôi có chính sách hoàn tiền trong 7 ngày đầu tiên nếu bạn không hài lòng với dịch vụ. Sau thời gian này, gói tập sẽ không được hoàn tiền.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Tôi có thể nâng cấp gói trong thời gian sử dụng không?</h4>
                    <p className="text-gray-700">Có, bạn có thể nâng cấp gói bất kỳ lúc nào. Phần chênh lệch giữa các gói sẽ được tính theo tỷ lệ thời gian còn lại của gói hiện tại.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Gói tập có bao gồm các lớp học nhóm không?</h4>
                    <p className="text-gray-700">Các lớp học nhóm được bao gồm trong Gói Vàng và Gói Platinum. Gói Cơ bản sẽ cần thanh toán thêm để tham gia các lớp học nhóm.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Pricing and CTA */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">{packageData.price.toLocaleString()}đ</span>
                  <span className="text-gray-500">/{packageData.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Tính năng bao gồm</h3>
                <ul className="mb-6 space-y-3">
                  {packageData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/register" 
                  className="block text-center py-3 px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 mb-4"
                >
                  Đăng ký ngay
                </Link>
                
                <Link 
                  href="/contact" 
                  className="block text-center py-3 px-6 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
                >
                  Liên hệ tư vấn
                </Link>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  Bạn sẽ được hướng dẫn chi tiết sau khi đăng ký
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-400 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    &quot;{packageData.title} đã giúp tôi đạt được mục tiêu tập luyện một cách hiệu quả. 
                    Các huấn luyện viên rất chuyên nghiệp và tận tâm. 
                    Tôi đã đạt được kết quả ngoài mong đợi chỉ sau 2 tháng.&quot;
                  </p>
                  <div className="font-medium">Khách hàng Nguyễn Văn A</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related packages section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Các gói tập khác</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages
                .filter(p => p.id !== packageData.id)
                .map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-48 relative">
                      <Image 
                        src={pkg.image} 
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                      <div className="flex items-end mb-4">
                        <span className="text-2xl font-bold text-primary">{pkg.price.toLocaleString()}đ</span>
                        <span className="text-gray-500 ml-1">/{pkg.duration}</span>
                      </div>
                      <Link 
                        href={`/packages/${pkg.id}`} 
                        className="block text-center py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackageDetailPage;
