import React from 'react';
import { Calendar, ChevronDown, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ClassesPage() {
  const classList = [
    {
      id: 1,
      name: "Yoga Flow",
      trainer: "Nguyễn Thị A",
      intensity: "Nhẹ Nhàng",
      duration: 45,
      time: "07:00 - 07:45",
      date: "Thứ 2, 15/04/2025",
      location: "Phòng 201 - Chi nhánh Quận 1",
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
      duration: 30,
      time: "18:30 - 19:00",
      date: "Thứ 2, 15/04/2025",
      location: "Phòng 102 - Chi nhánh Quận 1",
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
      duration: 50,
      time: "19:15 - 20:05",
      date: "Thứ 2, 15/04/2025",
      location: "Phòng Spinning - Chi nhánh Quận 1",
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
      duration: 60,
      time: "08:00 - 09:00",
      date: "Thứ 3, 16/04/2025",
      location: "Phòng 201 - Chi nhánh Quận 1",
      availableSpots: 15,
      totalSpots: 20,
      imageUrl: "/pilates-class.jpg",
      intensityColor: "blue"
    },
    {
      id: 5,
      name: "Boxing",
      trainer: "Hoàng Văn E",
      intensity: "Cao Cấp",
      duration: 45,
      time: "18:00 - 18:45",
      date: "Thứ 3, 16/04/2025",
      location: "Phòng Boxing - Chi nhánh Quận 1",
      availableSpots: 10,
      totalSpots: 15,
      imageUrl: "/boxing-class.jpg",
      intensityColor: "red"
    },
    {
      id: 6,
      name: "Zumba",
      trainer: "Trịnh Thị F",
      intensity: "Trung Bình",
      duration: 45,
      time: "19:00 - 19:45",
      date: "Thứ 3, 16/04/2025",
      location: "Phòng 102 - Chi nhánh Quận 1",
      availableSpots: 20,
      totalSpots: 30,
      imageUrl: "/zumba-class.jpg",
      intensityColor: "blue"
    }
  ];

  // Group classes by date
  const classesByDate = classList.reduce<Record<string, typeof classList>>((groups, classItem) => {
    const date = classItem.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(classItem);
    return groups;
  }, {});

  return (
    <MainLayout>
      <div className="container py-10">
        <section className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Lớp Tập Nhóm</h1>
          <p className="text-xl text-muted-foreground">
            Tham gia các lớp tập nhóm năng động với các huấn luyện viên tràn đầy năng lượng
          </p>
        </section>

        <Tabs defaultValue="calendar" className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Lịch Tuần
              </TabsTrigger>
              <TabsTrigger value="all">Tất Cả Lớp</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Tìm kiếm lớp tập..." className="pl-9" />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Cường độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả cường độ</SelectItem>
                    <SelectItem value="low">Nhẹ Nhàng</SelectItem>
                    <SelectItem value="medium">Trung Bình</SelectItem>
                    <SelectItem value="high">Cao Cấp</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="calendar" className="mt-0">
            {Object.entries(classesByDate).map(([date, classes]) => (
              <div key={date} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{date}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((classItem) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classList.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="bg-muted/50 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Thông Tin Về Lớp Tập</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Đăng ký lớp</h3>
              <p className="text-muted-foreground">Đăng ký trước ít nhất 2 giờ trước khi lớp bắt đầu để đảm bảo có chỗ.</p>
            </div>
            <div>
              <h3 className="font-medium">Hủy đăng ký</h3>
              <p className="text-muted-foreground">Vui lòng hủy đăng ký ít nhất 2 giờ trước giờ bắt đầu để nhường chỗ cho người khác.</p>
            </div>
            <div>
              <h3 className="font-medium">Đến sớm</h3>
              <p className="text-muted-foreground">Vui lòng đến trước 10 phút để chuẩn bị. Người đến muộn hơn 5 phút có thể không được tham gia.</p>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tham gia không giới hạn với gói Premium</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Đăng ký gói Premium để tham gia tất cả các lớp tập không giới hạn
          </p>
          <Button variant="secondary" size="lg">Nâng Cấp Lên Premium</Button>
        </section>
      </div>
    </MainLayout>
  );
}

interface ClassItem {
  id: number;
  name: string;
  trainer: string;
  intensity: string;
  duration: number;
  time: string;
  date: string;
  location: string;
  availableSpots: number;
  totalSpots: number;
  imageUrl: string;
  intensityColor: string;
}

function ClassCard({ classItem }: { classItem: ClassItem }) {
const getIntensityColor = (color: string): string => {
    switch (color) {
        case 'yellow':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300';
        case 'red':
            return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
        case 'blue':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300';
        default:
            return 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
    }
};

  return (
    <div className="bg-card rounded-lg overflow-hidden border shadow-sm flex flex-col">
      <div className="h-48 relative">
        <div className={`absolute inset-0   bg-cover bg-center`} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-semibold">{classItem.name}</h3>
          <p className="text-white/80 text-sm">với {classItem.trainer}</p>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className={`rounded-full px-2 py-1 text-xs ${getIntensityColor(classItem.intensityColor)}`}>
            {classItem.intensity}
          </span>
          <span className="text-sm text-muted-foreground">{classItem.duration} phút</span>
        </div>
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{classItem.time}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{classItem.location}</p>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Chỗ còn trống:</span>
            <span className="font-medium">{classItem.availableSpots}/{classItem.totalSpots}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2" 
              style={{ width: `${Math.round((classItem.availableSpots / classItem.totalSpots) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Button className="w-full">Đăng Ký</Button>
      </div>
    </div>
  );
}