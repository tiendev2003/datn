import { trainers as trainersData } from '@/utils/data';
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative">
        <div className="h-80 overflow-hidden relative">
          <Image 
            src={image} 
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="text-white">
            <p className="font-medium">Kinh nghiệm: {experience} năm</p>
            <p>Chuyên môn: {specialization}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-4">{role}</p>
        <Link 
          href={`/trainers/${id}`} 
          className="block text-center py-2 px-4 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

const Trainers = () => {
  return (
    <section id="trainers" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">Huấn luyện viên</span> chuyên nghiệp
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đội ngũ huấn luyện viên giàu kinh nghiệm và chuyên môn của chúng tôi sẽ giúp bạn đạt được
            mục tiêu sức khỏe và thể hình một cách hiệu quả nhất.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainersData.map((trainer) => (
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
        
        <div className="text-center mt-12">
          <Link 
            href="/trainers" 
            className="inline-block py-3 px-8 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
          >
            Xem tất cả huấn luyện viên
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
