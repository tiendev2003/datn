import { trainers as trainersData } from '@/utils/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Use type instead of extending interface
type TrainerCardProps = {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: number;
  specialization: string;
};

const TrainerCard = ({ id, name, role, image, experience, specialization }: TrainerCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden group"
    >
      <div className="relative">
        <div className="h-60 sm:h-72 md:h-80 overflow-hidden relative">
          <Image 
            src={image} 
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
          <div className="text-white">
            <p className="font-medium text-sm sm:text-base">Kinh nghiệm: {experience} năm</p>
            <p className="text-sm sm:text-base">Chuyên môn: {specialization}</p>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3 sm:mb-4 text-sm sm:text-base">{role}</p>
        <Link 
          href={`/trainers/${id}`} 
          className="block text-center py-2 px-4 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition duration-300 text-sm sm:text-base"
        >
          Xem chi tiết
        </Link>
      </div>
    </motion.div>
  );
};

const Trainers = () => {
  return (
    <section id="trainers" className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-20">
      <div className="container px-4 sm:px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-primary">Huấn luyện viên</span> chuyên nghiệp
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Đội ngũ huấn luyện viên giàu kinh nghiệm và chuyên môn của chúng tôi sẽ giúp bạn đạt được
            mục tiêu sức khỏe và thể hình một cách hiệu quả nhất.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trainersData.map((trainer, index) => (
            <TrainerCard
              key={trainer.id}
              id={trainer.id}
              name={trainer.name}
              role={trainer.role}
              image={trainer.image}
              experience={trainer.experience}
              specialization={trainer.specialization}
            />
          ))}
        </div>
        
        <div className="text-center mt-10 md:mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              href="/trainers" 
              className="inline-block py-2 sm:py-3 px-6 sm:px-8 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 text-sm sm:text-base"
            >
              Xem tất cả huấn luyện viên
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
