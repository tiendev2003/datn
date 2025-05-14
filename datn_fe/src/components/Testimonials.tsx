'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { JSX, useState } from 'react';

// Define the Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Doanh nhân',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Tôi đã tập tại nhiều phòng gym khác nhau nhưng GYMMASTER thực sự là nơi tốt nhất. Các huấn luyện viên rất chuyên nghiệp và luôn hỗ trợ tôi đạt được mục tiêu.',
    rating: 5
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'Giáo viên',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'Lịch tập linh hoạt và đa dạng các lớp học giúp tôi dễ dàng sắp xếp thời gian. Trang thiết bị hiện đại và không gian thoáng mát.',
    rating: 5
  },
  {
    id: 3,
    name: 'Phạm Văn C',
    role: 'Kỹ sư phần mềm',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    quote: 'Sau 3 tháng tập luyện với PT tại GYMMASTER, tôi đã giảm được 8kg và cảm thấy khỏe mạnh hơn rất nhiều. Chắc chắn sẽ tiếp tục gắn bó lâu dài.',
    rating: 5
  },
  {
    id: 4,
    name: 'Lê Thị D',
    role: 'Nhân viên văn phòng',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    quote: 'Lớp học Yoga tại đây thực sự tuyệt vời. Không gian yên tĩnh, giảng viên tận tâm. Tôi cảm thấy thư giãn và cân bằng hơn mỗi khi tập luyện.',
    rating: 4
  },
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  const handlePrev = (): void => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = (): void => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }).map((_, index) => (
      <motion.svg
        key={index}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`w-5 h-5 ${index < rating ? 'text-accent' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </motion.svg>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Khách hàng <span className="text-primary">nói gì</span> về chúng tôi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hãy lắng nghe những trải nghiệm thực tế từ những khách hàng đã và đang tập luyện tại GYMMASTER.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto mt-6"
          ></motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative bg-white rounded-xl shadow-xl p-8 md:p-12"
          >
            {/* Red accent elements */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-6 -right-6 w-12 h-12 bg-primary rounded-full"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary rounded-full"
            ></motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTestimonial}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.4 }}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0 relative"
                >
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="flex-1">
                <div className="flex mb-3">
                  {renderStars(testimonials[activeTestimonial].rating)}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg italic mb-6"
                  >
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </motion.p>
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-bold text-xl">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      activeTestimonial === index ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
