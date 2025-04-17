import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Dumbbell, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 dark:opacity-10" />
        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Nâng Cao Sức Khỏe và <span className="text-primary">Thể Chất</span> của Bạn
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Chúng tôi cung cấp các dịch vụ phòng tập hiện đại, huấn luyện viên chuyên nghiệp, và cộng đồng hỗ trợ để giúp bạn đạt được mục tiêu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/membership">Tham Gia Ngay</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/classes">Xem Lớp Tập</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Tại Sao Chọn Chúng Tôi?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Dumbbell size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Thiết Bị Hiện Đại</h3>
              <p className="text-muted-foreground">
                Chúng tôi đầu tư vào các thiết bị tập luyện tốt nhất để đảm bảo trải nghiệm tập luyện hiệu quả và an toàn.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mở Cửa 24/7</h3>
              <p className="text-muted-foreground">
                Phòng tập mở cửa 24/7 để phù hợp với lịch trình bận rộn của bạn, không còn lo về giờ giấc.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Huấn Luyện Viên Chuyên Nghiệp</h3>
              <p className="text-muted-foreground">
                Đội ngũ huấn luyện viên giàu kinh nghiệm, được chứng nhận sẽ hướng dẫn và hỗ trợ bạn trong suốt hành trình.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Gói Thành Viên</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Chọn gói tập phù hợp với nhu cầu và mục tiêu của bạn với các quyền lợi đa dạng.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-6 bg-primary/5">
                <h3 className="text-xl font-semibold">Cơ Bản</h3>
                <div className="mt-2 mb-2">
                  <span className="text-3xl font-bold">500.000đ</span>
                  <span className="text-muted-foreground"> / tháng</span>
                </div>
                <p className="text-sm text-muted-foreground">Dành cho người mới bắt đầu</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Sử dụng khu vực tập gym</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Tủ đồ cá nhân</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Đặt lịch trực tuyến</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/membership">Chọn Gói</Link>
                </Button>
              </div>
            </div>
            
            <div className="border border-primary rounded-lg overflow-hidden shadow-md relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                PHỔ BIẾN
              </div>
              <div className="p-6 bg-primary/10">
                <h3 className="text-xl font-semibold">Premium</h3>
                <div className="mt-2 mb-2">
                  <span className="text-3xl font-bold">900.000đ</span>
                  <span className="text-muted-foreground"> / tháng</span>
                </div>
                <p className="text-sm text-muted-foreground">Trải nghiệm đầy đủ</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Tất cả các quyền lợi của gói Cơ Bản</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Tham gia các lớp tập không giới hạn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Sử dụng phòng xông hơi và spa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Chế độ dinh dưỡng cơ bản</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/membership">Chọn Gói</Link>
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="p-6 bg-primary/5">
                <h3 className="text-xl font-semibold">VIP</h3>
                <div className="mt-2 mb-2">
                  <span className="text-3xl font-bold">1.500.000đ</span>
                  <span className="text-muted-foreground"> / tháng</span>
                </div>
                <p className="text-sm text-muted-foreground">Dành cho người muốn kết quả nhanh</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Tất cả các quyền lợi của gói Premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>4 buổi tập cùng PT mỗi tháng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Kế hoạch tập luyện cá nhân hóa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    <span>Tư vấn dinh dưỡng chuyên sâu</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/membership">Chọn Gói</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Các Lớp Tập Nổi Bật</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Tham gia các lớp tập nhóm năng động với các huấn luyện viên tràn đầy năng lượng.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-[url('/yoga-class.jpg')] bg-cover bg-center" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">Yoga Flow</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-800/30 dark:text-yellow-300">Nhẹ Nhàng</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Cân bằng thân - tâm - trí với các động tác yoga trôi chảy, phù hợp mọi trình độ.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">45 phút</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                    <Link href="/classes">
                      Chi tiết <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-[url('/hiit-class.jpg')] bg-cover bg-center" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">HIIT</h3>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded dark:bg-red-800/30 dark:text-red-300">Cao Cấp</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Tập luyện cường độ cao với những bài tập ngắn giúp đốt cháy calo hiệu quả.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">30 phút</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                    <Link href="/classes">
                      Chi tiết <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-[url('/spin-class.jpg')] bg-cover bg-center" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">Spinning</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-800/30 dark:text-blue-300">Trung Bình</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Cardio năng động trên xe đạp với nhạc sôi động, phù hợp cho mọi cấp độ tập luyện.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">50 phút</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                    <Link href="/classes">
                      Chi tiết <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/classes">Xem Tất Cả Lớp Tập</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Huấn Luyện Viên Chuyên Nghiệp</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Đội ngũ huấn luyện viên có chứng chỉ và nhiều kinh nghiệm sẽ đồng hành cùng bạn.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((trainer) => (
              <div key={trainer} className="bg-card rounded-lg overflow-hidden shadow-sm text-center">
                <div className="h-64 relative">
                  <div className="absolute inset-0 bg-[url('/trainer.jpg')] bg-cover bg-center" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Nguyễn Văn A</h3>
                  <p className="text-primary mb-3">Yoga Specialist</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    5+ năm kinh nghiệm huấn luyện với chứng chỉ quốc tế về Yoga và Thiền.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/trainers">Chi Tiết</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" variant="outline" asChild>
              <Link href="/trainers">Xem Tất Cả Huấn Luyện Viên</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Hàng ngàn hội viên đã thay đổi cuộc sống của họ cùng với chúng tôi.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic flex-grow mb-6">
                  "Tham gia phòng gym là quyết định tốt nhất mà tôi đã thực hiện. Các huấn luyện viên rất tận tâm và thiết bị luôn trong tình trạng tốt."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4"></div>
                  <div>
                    <p className="font-semibold">Trần Thị B</p>
                    <p className="text-sm text-muted-foreground">Thành viên 2 năm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic flex-grow mb-6">
                  "Các lớp tập nhóm là điểm nổi bật của phòng gym này. Huấn luyện viên nhiệt tình và không khí tập luyện rất tuyệt vời!"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4"></div>
                  <div>
                    <p className="font-semibold">Lê Văn C</p>
                    <p className="text-sm text-muted-foreground">Thành viên 1 năm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic flex-grow mb-6">
                  "Tôi đã giảm 15kg trong 6 tháng với sự hướng dẫn từ PT của phòng gym. Môi trường thân thiện và động viên rất nhiều."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4"></div>
                  <div>
                    <p className="font-semibold">Phạm Thị D</p>
                    <p className="text-sm text-muted-foreground">Thành viên 6 tháng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bắt đầu hành trình của bạn ngay hôm nay</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Đăng ký ngay để nhận ưu đãi đặc biệt cho thành viên mới và bắt đầu thay đổi cuộc sống của bạn.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">Đăng Ký Ngay</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
