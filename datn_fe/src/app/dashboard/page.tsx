import React from 'react';
import { BarChart3, Calendar, CreditCard, ChevronRight, Clock, Dumbbell, Award, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  // Mock user data
  const userData = {
    name: 'Nguyễn Văn A',
    membership: {
      type: 'Premium',
      startDate: '15/01/2025',
      endDate: '15/05/2025',
      daysLeft: 32,
      totalDays: 120,
      autoRenew: true
    },
    stats: {
      visits: 24,
      classes: 12,
      ptSessions: 4
    },
    nextWorkout: {
      type: 'Gym Session',
      date: '15/04/2025',
      time: '17:30 - 19:00',
      location: 'Chi nhánh Quận 1'
    },
    upcomingClasses: [
      {
        id: 1,
        name: 'Yoga Flow',
        date: '16/04/2025',
        time: '18:00 - 18:45',
        trainer: 'Nguyễn Thị A'
      },
      {
        id: 2,
        name: 'HIIT',
        date: '18/04/2025',
        time: '19:00 - 19:30',
        trainer: 'Trần Văn B'
      }
    ],
    fitness: {
      goals: [
        { name: 'Tập luyện 4 lần/tuần', progress: 75 },
        { name: 'Hoàn thành 10 lớp Yoga', progress: 40 },
        { name: 'Giảm 3kg', progress: 60 }
      ],
      achievements: [
        { name: '5 buổi tập liên tiếp', date: '10/04/2025' },
        { name: 'Hoàn thành 5 lớp Yoga', date: '08/04/2025' },
      ]
    },
    notifications: [
      {
        id: 1,
        type: 'booking',
        message: 'Lịch đặt Yoga Flow vào 16/04 đã được xác nhận',
        time: '1 giờ trước'
      },
      {
        id: 2,
        type: 'membership',
        message: 'Gói thành viên Premium của bạn sẽ hết hạn trong 32 ngày',
        time: '1 ngày trước'
      },
      {
        id: 3,
        type: 'achievement',
        message: 'Chúc mừng! Bạn đã đạt được thành tích 5 buổi tập liên tiếp',
        time: '2 ngày trước'
      }
    ]
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Xin chào, {userData.name}</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Bell className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Thông báo</span>
            </Button>
            <Button size="sm">Đặt Lịch</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Membership Card */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Gói Thành Viên</CardTitle>
              <CardDescription>
                Thông tin gói thành viên và thời hạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary">{userData.membership.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    {userData.membership.startDate} - {userData.membership.endDate}
                  </p>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">
                  {userData.membership.autoRenew ? 'Tự động gia hạn' : 'Không tự động gia hạn'}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Thời gian còn lại:</span>
                  <span className="font-medium">{userData.membership.daysLeft} ngày</span>
                </div>
                <Progress
                  value={userData.membership.daysLeft / userData.membership.totalDays * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/membership">
                  <span>Xem chi tiết gói thành viên</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Hoạt Động Tháng Này</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </div>
                  <span>Buổi tập Gym</span>
                </div>
                <span className="font-semibold">{userData.stats.visits}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span>Lớp tập nhóm</span>
                </div>
                <span className="font-semibold">{userData.stats.classes}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span>Buổi PT</span>
                </div>
                <span className="font-semibold">{userData.stats.ptSessions}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/stats">
                  <span>Xem đầy đủ hoạt động</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Next Workout Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Buổi Tập Tiếp Theo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{userData.nextWorkout.type}</h4>
                    <p className="text-sm text-muted-foreground">{userData.nextWorkout.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.nextWorkout.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.nextWorkout.time}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full">Xem Lịch Đặt</Button>
            </CardFooter>
          </Card>

          {/* Upcoming Classes Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lớp Tập Sắp Tới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-start p-3 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-semibold">{classItem.name}</h4>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{classItem.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{classItem.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Huấn luyện viên: {classItem.trainer}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/classes">
                  <span>Xem tất cả lớp tập</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Fitness Goals Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Mục Tiêu Sức Khỏe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.fitness.goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{goal.name}</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress
                      value={goal.progress}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/goals">
                  <span>Thiết lập mục tiêu mới</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Achievements Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Thành Tích Đạt Được</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.fitness.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/achievements">
                  <span>Xem tất cả thành tích</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Fitness Stats Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Báo Cáo Sức Khỏe</CardTitle>
              <CardDescription>
                Số liệu thống kê hàng tháng
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[200px] flex items-end gap-2">
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-primary/10 w-full rounded-t-sm" style={{ height: '30%' }}></div>
                  <span className="text-xs mt-1">T1</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-primary/10 w-full rounded-t-sm" style={{ height: '45%' }}></div>
                  <span className="text-xs mt-1">T2</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-primary/10 w-full rounded-t-sm" style={{ height: '60%' }}></div>
                  <span className="text-xs mt-1">T3</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-primary/30 w-full rounded-t-sm" style={{ height: '80%' }}></div>
                  <span className="text-xs mt-1">T4</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-primary w-full rounded-t-sm" style={{ height: '70%' }}></div>
                  <span className="text-xs mt-1">Hiện tại</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/reports">
                  <span>Xem báo cáo chi tiết</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Notifications Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle>Thông Báo</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs h-7">Đánh dấu đã đọc</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-3">
                    <div className="p-2 rounded-full bg-primary/10 h-min mt-0.5">
                      {notification.type === 'booking' && <Calendar className="h-4 w-4 text-primary" />}
                      {notification.type === 'membership' && <CreditCard className="h-4 w-4 text-primary" />}
                      {notification.type === 'achievement' && <Award className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                <a href="/notifications">
                  <span>Xem tất cả thông báo</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}