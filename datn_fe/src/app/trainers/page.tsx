'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { trainers } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const TrainersPage = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 9; // 3x3 grid
  
  // Lọc trainer theo chuyên môn
  const filteredTrainers = filter === 'all' 
    ? trainers 
    : trainers.filter(trainer => trainer.specialization.toLowerCase().includes(filter));

  // Tính toán số trang
  const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);

  // Lấy danh sách trainer cho trang hiện tại
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = filteredTrainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  // Reset về trang 1 khi thay đổi bộ lọc
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // Tạo mảng các số trang
  const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Đội ngũ <span className="text-primary">Huấn luyện viên</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gặp gỡ đội ngũ huấn luyện viên chuyên nghiệp của chúng tôi. 
              Mỗi người đều có kinh nghiệm và chuyên môn riêng để giúp bạn đạt được mục tiêu của mình.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6 mb-10"></div>
            
            {/* Filter options */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button 
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Tất cả
              </button>
              <button 
                onClick={() => handleFilterChange('tăng cơ')}
                className={`px-4 py-2 rounded-full ${filter === 'tăng cơ' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Tăng cơ
              </button>
              <button 
                onClick={() => handleFilterChange('yoga')}
                className={`px-4 py-2 rounded-full ${filter === 'yoga' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Yoga
              </button>
              <button 
                onClick={() => handleFilterChange('phục hồi')}
                className={`px-4 py-2 rounded-full ${filter === 'phục hồi' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Phục hồi chức năng
              </button>
              <button 
                onClick={() => handleFilterChange('đốt mỡ')}
                className={`px-4 py-2 rounded-full ${filter === 'đốt mỡ' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Đốt mỡ & Cardio
              </button>
            </div>
          </div>
          
          {/* Trainers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTrainers.map(trainer => (
              <div key={trainer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-80">
                  <Image 
                    src={trainer.image} 
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{trainer.name}</h2>
                  <p className="text-primary font-medium mb-2">{trainer.role}</p>
                  <div className="mb-4 flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{trainer.experience} năm kinh nghiệm</span>
                  </div>
                  <p className="mb-4 text-gray-600 line-clamp-2">{trainer.bio.substring(0, 100)}...</p>
                  <div className="mb-6">
                    <p className="font-medium mb-2">Chuyên môn:</p>
                    <p className="text-gray-600">{trainer.specialization}</p>
                  </div>
                  <Link 
                    href={`/trainers/${trainer.id}`} 
                    className="block w-full text-center py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              {paginationItems.map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === number
                      ? "bg-primary text-white"
                      : "border text-gray-700 hover:bg-gray-100"
                  } transition-colors`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-full border text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {filteredTrainers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">Không tìm thấy huấn luyện viên phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainersPage;
