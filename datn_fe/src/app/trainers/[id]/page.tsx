'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { trainers } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const TrainerDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const trainer = trainers.find((t) => t.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Nếu không tìm thấy PT, chuyển đến trang 404
  if (!trainer) {
    if (typeof window !== 'undefined') {
      router.push('/404');
    }
    return null;
  }

  const reviews = [
    {
      user: 'Nguyễn Văn B',
      rating: 5,
      comment: 'Huấn luyện viên rất nhiệt tình và chuyên nghiệp. Tôi đã đạt được mục tiêu giảm cân chỉ sau 3 tháng!',
    },
    {
      user: 'Trần Thị C',
      rating: 4,
      comment: 'Các bài tập rất hiệu quả, nhưng đôi khi lịch trình hơi bận rộn.',
    },
    {
      user: 'Lê Văn D',
      rating: 5,
      comment: 'Tôi rất hài lòng với sự hướng dẫn tận tình và chuyên môn cao của huấn luyện viên.',
    },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % trainer.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + trainer.images.length) % trainer.images.length);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-0">
          {/* Hero section with trainer image carousel */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={trainer.images[currentImageIndex]}
                  alt={`${trainer.name} - Image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  &gt;
                </button>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-2">{trainer.name}</h1>
                <p className="text-primary text-xl font-medium mb-4">{trainer.role}</p>
                
                <div className="mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>{trainer.experience} năm kinh nghiệm</span>
                </div>
                
                <div className="mb-4">
                  <p className="font-medium mb-1">Chuyên môn:</p>
                  <p className="text-gray-700">{trainer.specialization}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Lịch làm việc</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {trainer.schedule.map((item, index) => (
                      <div key={index} className="flex justify-between mb-2 last:mb-0">
                        <span className="font-medium">{item.day}:</span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Link
                    href="/register"
                    className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
                  >
                    Đặt lịch ngay
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="border border-primary text-primary px-8 py-3 rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    Liên hệ
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Biography section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 leading-relaxed">{trainer.bio}</p>
            </div>
          </div>
          
          {/* Certifications section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Chứng chỉ & Bằng cấp</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ul className="space-y-3">
                {trainer.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-primary mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Social Media section */}
          {trainer.socialMedia && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Mạng xã hội</h2>
              <div className="flex space-x-4">
                {trainer.socialMedia.facebook && (
                  <a href={trainer.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                )}
                
                {trainer.socialMedia.instagram && (
                  <a href={trainer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
                
                {trainer.socialMedia.youtube && (
                  <a href={trainer.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
          
          {/* Reviews section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Đánh giá từ học viên</h2>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-400 flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">&quot;{review.comment}&quot;</p>
                  <div className="font-medium">- {review.user}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action section */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Bắt đầu hành trình tập luyện của bạn ngay hôm nay</h3>
              <p className="text-gray-600 mb-6">
                Đặt lịch tập cùng {trainer.name} và nhận được lộ trình tập luyện được cá nhân hóa phù hợp với mục tiêu của bạn.
              </p>
              <Link
                href="/register"
                className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainerDetailPage;
