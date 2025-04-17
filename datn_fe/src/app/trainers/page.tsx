import React from 'react';
import { Facebook, Filter, Instagram, Mail, Search, Star, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MainLayout from '@/components/layout/MainLayout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TrainersPage() {
  const trainers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      specialty: 'Yoga Specialist',
      experience: 5,
      rating: 4.8,
      reviewCount: 124,
      bio: 'Chuyên gia yoga với 5+ năm kinh nghiệm, chứng nhận quốc tế về yoga và thiền. Tập trung vào cải thiện sức khỏe tinh thần và thể chất thông qua thực hành yoga.',
      specializations: ['Yoga', 'Thiền', 'Linh hoạt'],
      certifications: ['RYT 500', 'Yoga Alliance', 'Mindfulness Coach'],
      imageUrl: '/trainer.jpg',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 2,
      name: 'Trần Thị B',
      specialty: 'HIIT & Cardio Coach',
      experience: 7,
      rating: 4.9,
      reviewCount: 156,
      bio: 'Huấn luyện viên HIIT và cardio với 7 năm kinh nghiệm. Chuyên về các bài tập cường độ cao và cardio để đốt cháy calo hiệu quả và cải thiện sức bền.',
      specializations: ['HIIT', 'Cardio', 'Giảm cân'],
      certifications: ['ACE', 'NASM-CPT', 'Crossfit Level 2'],
      imageUrl: '/trainer.jpg',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com'
      }
    },
    {
      id: 3,
      name: 'Lê Văn C',
      specialty: 'Strength Trainer',
      experience: 6,
      rating: 4.7,
      reviewCount: 98,
      bio: 'Chuyên gia về tập luyện sức mạnh và tăng cơ bắp. 6 năm kinh nghiệm trong việc thiết kế chương trình tập luyện tăng sức mạnh và phát triển cơ bắp.',
      specializations: ['Tạ tự do', 'Tăng cơ', 'Powerlifting'],
      certifications: ['NSCA-CSCS', 'ISSA', 'Powerlifting Coach'],
      imageUrl: '/trainer.jpg',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      specialty: 'Nutrition Coach',
      experience: 8,
      rating: 4.9,
      reviewCount: 176,
      bio: 'Chuyên gia dinh dưỡng với 8 năm kinh nghiệm. Tập trung vào việc xây dựng kế hoạch dinh dưỡng cá nhân hóa để hỗ trợ các mục tiêu sức khỏe và thể hình.',
      specializations: ['Dinh dưỡng thể thao', 'Kế hoạch ăn uống', 'Giảm cân'],
      certifications: ['PN Level 2', 'ISSN', 'Fitness Nutrition Specialist'],
      imageUrl: '/trainer.jpg',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com'
      }
    },
    {
      id: 5,
      name: 'Trương Văn E',
      specialty: 'Rehabilitation Specialist',
      experience: 10,
      rating: 4.9,
      reviewCount: 215,
      bio: '10 năm kinh nghiệm trong lĩnh vực phục hồi thể chất và phòng ngừa chấn thương. Chuyên về việc thiết kế chương trình tập luyện cho người gặp chấn thương hoặc vấn đề sức khỏe.',
      specializations: ['Phục hồi chấn thương', 'Tập luyện trị liệu', 'Cân bằng cơ thể'],
      certifications: ['NASM-CES', 'ACSM', 'Physical Therapy Assistant'],
      imageUrl: '/trainer.jpg',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 6,
      name: 'Hoàng Thị F',
      specialty: 'Pilates & Flexibility',
      experience: 6,
      rating: 4.8,
      reviewCount: 112,
      bio: 'Chuyên gia Pilates với 6 năm kinh nghiệm. Tập trung vào việc cải thiện tính linh hoạt, sức mạnh cốt lõi và tư thế thông qua thực hành Pilates.',
      specializations: ['Pilates', 'Linh hoạt', 'Posture'],
      certifications: ['Balanced Body', 'STOTT Pilates', 'PMA-CPT'],
      imageUrl: '/trainer.jpg',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com'
      }
    }
  ];

  return (
    <MainLayout>
      <div className="container py-10">
        <section className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Huấn Luyện Viên</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Gặp gỡ đội ngũ huấn luyện viên chuyên nghiệp của chúng tôi
          </p>
        </section>

        <section className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm huấn luyện viên..." className="pl-9 w-full" />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Chuyên môn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chuyên môn</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="hiit">HIIT & Cardio</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="rehab">Rehabilitation</SelectItem>
                  <SelectItem value="pilates">Pilates</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="rating">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Xếp hạng cao nhất</SelectItem>
                  <SelectItem value="experience">Kinh nghiệm nhiều nhất</SelectItem>
                  <SelectItem value="reviews">Đánh giá nhiều nhất</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </section>

        <section className="bg-muted/50 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Làm việc với huấn luyện viên cá nhân</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">Đánh giá ban đầu</h3>
              <p className="text-muted-foreground text-sm">Buổi đánh giá ban đầu để xác định mục tiêu, trình độ hiện tại và tạo kế hoạch phù hợp.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Gói PT</h3>
              <p className="text-muted-foreground text-sm">Các gói buổi tập PT với giá ưu đãi. Càng nhiều buổi, giá mỗi buổi càng giảm.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Theo dõi tiến độ</h3>
              <p className="text-muted-foreground text-sm">Đánh giá tiến độ thường xuyên để điều chỉnh kế hoạch tập luyện và đảm bảo đạt mục tiêu.</p>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Bắt đầu hành trình với huấn luyện viên cá nhân</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Đạt được mục tiêu nhanh hơn và hiệu quả hơn với sự hướng dẫn cá nhân từ đội ngũ huấn luyện viên chuyên nghiệp của chúng tôi
          </p>
          <Button variant="secondary" size="lg">Đặt Lịch Buổi Đánh Giá</Button>
        </section>
      </div>
    </MainLayout>
  );
}

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  specializations: string[];
  certifications: string[];
  imageUrl: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border shadow-sm flex flex-col">
      <div className="h-64 relative">
        <div className={`absolute inset-0   bg-cover bg-center`} />
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{trainer.rating}</span>
          <span className="text-xs opacity-75">({trainer.reviewCount})</span>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold">{trainer.name}</h3>
        <p className="text-primary text-sm font-medium mb-2">{trainer.specialty}</p>
        <p className="text-muted-foreground text-sm mb-4">{trainer.experience} năm kinh nghiệm</p>
        <p className="text-sm mb-4 line-clamp-3">{trainer.bio}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Chuyên môn:</h4>
          <div className="flex flex-wrap gap-2">
            {trainer.specializations.map((spec: string, index: number) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          {trainer.socials.instagram && (
            <a 
              href={trainer.socials.instagram}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
          {trainer.socials.facebook && (
            <a 
              href={trainer.socials.facebook}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
          )}
          {trainer.socials.twitter && (
            <a 
              href={trainer.socials.twitter}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          <a 
            href={`mailto:contact@gymfit.com?subject=PT Request: ${trainer.name}`}
            className="text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Button className="w-full">Đặt Lịch Huấn Luyện</Button>
      </div>
    </div>
  );
}