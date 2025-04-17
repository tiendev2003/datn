import React from 'react';
import { Calendar, Clock, Dumbbell, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function BookingPage() {
  // Mock data for available gym times
  const gymTimes = [
    { id: 1, time: '06:00 - 08:00', availableSpots: 15, totalSpots: 30 },
    { id: 2, time: '08:00 - 10:00', availableSpots: 8, totalSpots: 30 },
    { id: 3, time: '10:00 - 12:00', availableSpots: 20, totalSpots: 30 },
    { id: 4, time: '12:00 - 14:00', availableSpots: 25, totalSpots: 30 },
    { id: 5, time: '14:00 - 16:00', availableSpots: 18, totalSpots: 30 },
    { id: 6, time: '16:00 - 18:00', availableSpots: 5, totalSpots: 30 },
    { id: 7, time: '18:00 - 20:00', availableSpots: 3, totalSpots: 30 },
    { id: 8, time: '20:00 - 22:00', availableSpots: 12, totalSpots: 30 },
  ];

  // Mock data for personal trainers
  const trainers = [
    { 
      id: 1, 
      name: 'Nguyễn Văn A', 
      specialty: 'Yoga Specialist',
      availableTimes: ['09:00', '11:00', '15:00', '17:00'],
      imageUrl: '/trainer.jpg'
    },
    { 
      id: 2, 
      name: 'Trần Thị B', 
      specialty: 'HIIT & Cardio Coach',
      availableTimes: ['07:00', '10:00', '14:00', '18:00'],
      imageUrl: '/trainer.jpg'
    },
    { 
      id: 3, 
      name: 'Lê Văn C', 
      specialty: 'Strength Trainer',
      availableTimes: ['08:00', '12:00', '16:00', '19:00'],
      imageUrl: '/trainer.jpg'
    },
    { 
      id: 4, 
      name: 'Phạm Thị D', 
      specialty: 'Nutrition Coach',
      availableTimes: ['10:00', '13:00', '17:00', '20:00'],
      imageUrl: '/trainer.jpg'
    },
  ];

  // Mock data for upcoming classes
  const classes = [
    {
      id: 1,
      name: "Yoga Flow",
      trainer: "Nguyễn Thị A",
      intensity: "Nhẹ Nhàng",
      time: "07:00 - 07:45",
      date: "15/04/2025",
      location: "Phòng 201",
      availableSpots: 8,
      totalSpots: 20,
      imageUrl: "/yoga-class.jpg",
      intensityColor: "yellow"
    },
    {
      id: 2,
      name: "HIIT",
      trainer: "Trần Văn B",
      intensity: "Cao Cấp",
      time: "18:30 - 19:00",
      date: "15/04/2025",
      location: "Phòng 102",
      availableSpots: 5,
      totalSpots: 15,
      imageUrl: "/hiit-class.jpg",
      intensityColor: "red"
    },
    {
      id: 3,
      name: "Spinning",
      trainer: "Lê Thị C",
      intensity: "Trung Bình",
      time: "19:15 - 20:05",
      date: "15/04/2025",
      location: "Phòng Spinning",
      availableSpots: 12,
      totalSpots: 25,
      imageUrl: "/spin-class.jpg",
      intensityColor: "blue"
    },
    {
      id: 4,
      name: "Pilates",
      trainer: "Phạm Văn D",
      intensity: "Trung Bình",
      time: "08:00 - 09:00",
      date: "16/04/2025",
      location: "Phòng 201",
      availableSpots: 15,
      totalSpots: 20,
      imageUrl: "/pilates-class.jpg",
      intensityColor: "blue"
    },
  ];

interface IntensityColorMap {
    yellow: string;
    red: string;
    blue: string;
    [key: string]: string;
}

const getIntensityColor = (color: keyof IntensityColorMap): string => {
    const intensityColorMap: IntensityColorMap = {
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
        default: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    };

    return intensityColorMap[color] || intensityColorMap.default;
};

  return (
    <MainLayout>
      <div className="container py-10">
        <section className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Đặt Lịch</h1>
          <p className="text-xl text-muted-foreground">
            Đặt lịch tập gym, tham gia lớp tập nhóm hoặc với huấn luyện viên cá nhân
          </p>
        </section>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              type="date"
              defaultValue="2025-04-15"
              className="w-full sm:w-auto"
            />
            <Select defaultValue="q1">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Chi nhánh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">Chi nhánh Quận 1</SelectItem>
                <SelectItem value="q3">Chi nhánh Quận 3</SelectItem>
                <SelectItem value="tb">Chi nhánh Tân Bình</SelectItem>
                <SelectItem value="td">Chi nhánh Thủ Đức</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="gym" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="gym" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Gym
            </TabsTrigger>
            <TabsTrigger value="pt" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Huấn luyện viên
            </TabsTrigger>
            <TabsTrigger value="class" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Lớp tập
            </TabsTrigger>
          </TabsList>

          {/* Gym booking tab */}
          <TabsContent value="gym" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {gymTimes.map((slot) => (
                <div key={slot.id} className="bg-card border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="mb-3">
                    <div className="text-lg font-medium">{slot.time}</div>
                    <div className="text-sm text-muted-foreground">Thứ 3, 15/04/2025</div>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span>Chỗ còn trống:</span>
                    <span className="font-medium">{slot.availableSpots}/{slot.totalSpots}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${Math.round((slot.availableSpots / slot.totalSpots) * 100)}%` }}
                    ></div>
                  </div>
                  <Button className="w-full" variant={slot.availableSpots > 0 ? "default" : "outline"} disabled={slot.availableSpots === 0}>
                    {slot.availableSpots > 0 ? "Đặt Lịch" : "Hết Chỗ"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Personal trainer booking tab */}
          <TabsContent value="pt" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="bg-card border rounded-lg overflow-hidden">
                  <div className="p-6 sm:flex gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 mx-auto sm:mx-0">
                      <div className={`w-full h-full   bg-cover bg-center`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{trainer.name}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{trainer.specialty}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Chọn khung giờ phù hợp với bạn từ các khung giờ trống dưới đây
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trainer.availableTimes.map((time, index) => (
                          <div key={index} className="relative">
                            <input 
                              type="radio" 
                              name={`time-${trainer.id}`} 
                              id={`time-${trainer.id}-${index}`} 
                              className="peer sr-only" 
                            />
                            <label 
                              htmlFor={`time-${trainer.id}-${index}`}
                              className="flex items-center px-3 py-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted peer-checked:bg-primary peer-checked:text-white text-sm"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </label>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">Đặt Buổi Tập</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Class booking tab */}
          <TabsContent value="class" className="mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Lớp tập sắp tới</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Loại lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả các loại</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="spinning">Spinning</SelectItem>
                    <SelectItem value="pilates">Pilates</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {classes.map((classItem) => (
                <div key={classItem.id} className="bg-card rounded-lg overflow-hidden border shadow-sm flex flex-col sm:flex-row">
                  <div className="h-40 sm:h-auto sm:w-40 relative">
                    <div className={`absolute inset-0   bg-cover bg-center`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent sm:hidden"></div>
                    <div className="absolute left-4 bottom-4 sm:hidden">
                      <h3 className="text-white text-lg font-semibold">{classItem.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="hidden sm:block">
                      <h3 className="text-lg font-semibold">{classItem.name}</h3>
                      <p className="text-muted-foreground text-sm">với {classItem.trainer}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3 mb-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${getIntensityColor(classItem.intensityColor)}`}>
                        {classItem.intensity}
                      </span>
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{classItem.date}, {classItem.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{classItem.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Chỗ còn trống:</span>
                      <span className="font-medium">{classItem.availableSpots}/{classItem.totalSpots}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${Math.round((classItem.availableSpots / classItem.totalSpots) * 100)}%` }}
                      ></div>
                    </div>
                    <Button className="w-full" variant={classItem.availableSpots > 0 ? "default" : "outline"} disabled={classItem.availableSpots === 0}>
                      {classItem.availableSpots > 0 ? "Đăng Ký" : "Hết Chỗ"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="bg-muted/50 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Thông Tin Đặt Lịch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Chính sách hủy lịch</h3>
              <p className="text-muted-foreground">Bạn có thể hủy lịch tập ít nhất 2 giờ trước thời gian đặt. Hủy muộn hơn có thể bị tính phí.</p>
            </div>
            <div>
              <h3 className="font-medium">Đặt lịch nhóm</h3>
              <p className="text-muted-foreground">Liên hệ trực tiếp với nhân viên lễ tân nếu bạn muốn đặt lịch cho nhóm lớn hơn 5 người.</p>
            </div>
            <div>
              <h3 className="font-medium">Đặt lịch thường xuyên</h3>
              <p className="text-muted-foreground">Sử dụng tính năng "Lịch tập hàng tuần" để tự động đặt lịch cho các buổi tập lặp lại của bạn.</p>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Xem lịch sử đặt lịch của bạn</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Quản lý tất cả các lịch đặt của bạn, hủy hoặc lên lịch lại các buổi tập
          </p>
          <Button variant="secondary" size="lg">Xem Lịch Sử Đặt</Button>
        </section>
      </div>
    </MainLayout>
  );
}