"use client";

import RecentActivities, { Activity } from "@/components/dashboard/RecentActivities";
import StatsOverview from "@/components/dashboard/StatsOverview";
import TopTrainers from "@/components/dashboard/TopTrainers";
import { TrainerInfo } from "@/components/dashboard/TrainerCard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  // Analytics data - in a real app, this would come from an API call
  const [analyticsData, setAnalyticsData] = useState({
    totalMembers: 256,
    activeMembers: 198,
    totalTrainers: 12,
    totalClasses: 24,
    monthlyRevenue: 112500000 // VND
  });

  // Recent activities data - based on various tables like attendance_logs, payments, bookings, etc.
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    { id: 1, type: "new-member", user: "Nguyễn Thị Lan", time: "15 phút trước" },
    { id: 2, type: "class-booking", user: "Trần Văn Tuấn", class: "Yoga Flow", time: "1 giờ trước" },
    { id: 3, type: "package-purchase", user: "Lê Minh Hiếu", package: "Gói PT 6 tháng", amount: 8500000, time: "2 giờ trước" },
    { id: 4, type: "check-in", user: "Phạm Thị Hà", time: "3 giờ trước" },
    { id: 5, type: "trainer-schedule", trainer: "Đỗ Văn Nam", action: "cập nhật lịch", time: "5 giờ trước" }
  ]);

  // Upcoming classes - from class_schedules table

  // Top trainers based on trainer_profiles and trainer_ratings tables
  const [topTrainers, setTopTrainers] = useState<TrainerInfo[]>([
    { id: 1, name: "Nguyễn Văn A", sessions: 45, rating: 4.9, specialization: "Strength Training" },
    { id: 2, name: "Trần Thị B", sessions: 38, rating: 4.8, specialization: "Yoga & Pilates" },
    { id: 3, name: "Lê Minh C", sessions: 32, rating: 4.7, specialization: "HIIT & Cardio" }
  ]);

  // Simulate data fetching from API
  useEffect(() => {
    // In a real application, you would fetch data from your backend API here
    // fetchDashboardData().then(data => {
    //   setAnalyticsData(data.analytics);
    //   setRecentActivities(data.activities);
    //   setUpcomingClasses(data.classes);
    //   setTopTrainers(data.trainers);
    // });

    // For demo purposes, we'll use the mock data set above
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className=" bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tổng quan</h1>

          {/* Stats Cards */}
          <StatsOverview
            totalMembers={analyticsData.totalMembers}
            activeMembers={analyticsData.activeMembers}
            totalTrainers={analyticsData.totalTrainers}
            totalClasses={analyticsData.totalClasses}
            monthlyRevenue={analyticsData.monthlyRevenue}
          />

          {/* Activity and Class Sections */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mt-6">
            {/* Recent Activity */}
            <RecentActivities activities={recentActivities} />
          </div>

          {/* Top Trainers */}
          <div className="mt-6">
            <TopTrainers trainers={topTrainers} />
          </div>
        </div>
      </div>
    </div>
  );
}