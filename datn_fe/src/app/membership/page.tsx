import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function MembershipPage() {
  const membershipPlans = [
    {
      id: 1,
      name: "Cơ Bản",
      price: 500000,
      duration: "1 tháng",
      popularTag: false,
      description: "Dành cho người mới bắt đầu",
      features: [
        { name: "Sử dụng khu vực tập gym", included: true },
        { name: "Tủ đồ cá nhân", included: true },
        { name: "Đặt lịch trực tuyến", included: true },
        { name: "Tham gia các lớp tập nhóm", included: false },
        { name: "Phòng xông hơi và spa", included: false },
        { name: "Tư vấn dinh dưỡng", included: false },
        { name: "Buổi tập cùng PT", included: false },
      ]
    },
    {
      id: 2,
      name: "Premium",
      price: 900000,
      duration: "1 tháng",
      popularTag: true,
      description: "Trải nghiệm đầy đủ",
      features: [
        { name: "Sử dụng khu vực tập gym", included: true },
        { name: "Tủ đồ cá nhân", included: true },
        { name: "Đặt lịch trực tuyến", included: true },
        { name: "Tham gia các lớp tập nhóm không giới hạn", included: true },
        { name: "Phòng xông hơi và spa", included: true },
        { name: "Tư vấn dinh dưỡng cơ bản", included: true },
        { name: "Buổi tập cùng PT", included: false },
      ]
    },
    {
      id: 3,
      name: "VIP",
      price: 1500000,
      duration: "1 tháng",
      popularTag: false,
      description: "Dành cho người muốn kết quả nhanh",
      features: [
        { name: "Sử dụng khu vực tập gym", included: true },
        { name: "Tủ đồ cá nhân", included: true },
        { name: "Đặt lịch trực tuyến", included: true },
        { name: "Tham gia các lớp tập nhóm không giới hạn", included: true },
        { name: "Phòng xông hơi và spa", included: true },
        { name: "Tư vấn dinh dưỡng chuyên sâu", included: true },
        { name: "4 buổi tập cùng PT mỗi tháng", included: true },
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <section className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gói Thành Viên</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Chọn gói thành viên phù hợp với nhu cầu của bạn
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {membershipPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`border rounded-xl overflow-hidden relative ${plan.popularTag ? 'border-primary shadow-md' : ''}`}
            >
              {plan.popularTag && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  PHỔ BIẾN
                </div>
              )}
              <div className={`p-6 ${plan.popularTag ? 'bg-primary/10' : 'bg-primary/5'}`}>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-3 mb-2">
                  <span className="text-4xl font-bold">{plan.price.toLocaleString('vi-VN')}đ</span>
                  <span className="text-muted-foreground"> / {plan.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <X size={18} className="text-red-400" />
                      )}
                      <span className={!feature.included ? 'text-muted-foreground' : ''}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popularTag ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/auth/register">Chọn Gói Này</Link>
                </Button>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-muted/50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Các câu hỏi thường gặp</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tôi có thể hủy gói thành viên bất cứ lúc nào không?</h3>
              <p className="text-muted-foreground">
                Có, bạn có thể hủy gói thành viên bất cứ lúc nào. Tuy nhiên, chúng tôi không hoàn lại phí thành viên đã thanh toán cho tháng hiện tại.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Có ưu đãi cho các gói dài hạn không?</h3>
              <p className="text-muted-foreground">
                Có, chúng tôi cung cấp ưu đãi giảm giá cho các gói 3 tháng, 6 tháng và 12 tháng. Bạn có thể tiết kiệm đến 20% khi đăng ký gói 12 tháng.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Tôi có thể nâng cấp gói thành viên của mình không?</h3>
              <p className="text-muted-foreground">
                Có, bạn có thể nâng cấp gói thành viên của mình bất cứ lúc nào. Bạn chỉ cần thanh toán phần chênh lệch giữa gói hiện tại và gói mới.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Có phí gia nhập ban đầu không?</h3>
              <p className="text-muted-foreground">
                Có một khoản phí gia nhập một lần 200.000đ cho tất cả các thành viên mới. Phí này bao gồm chi phí đăng ký, thẻ thành viên và một buổi định hướng.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Không thấy gói phù hợp với bạn?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn về gói thành viên phù hợp với nhu cầu và mục tiêu cụ thể của bạn.
          </p>
          <Button size="lg" variant="default" asChild>
            <Link href="/contact">Liên Hệ Tư Vấn</Link>
          </Button>
        </section>

        <section className="bg-primary text-primary-foreground rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Bắt đầu hành trình sức khỏe của bạn ngay hôm nay</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Đăng ký thành viên và nhận ưu đãi đặc biệt dành cho hội viên mới
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">Đăng Ký Ngay</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}