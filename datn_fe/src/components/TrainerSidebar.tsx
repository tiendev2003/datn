'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiCalendarEventLine,
  RiDashboardLine,
  RiMessage2Line,
  RiMoneyDollarCircleLine,
  RiNotification3Line,
  RiSettings3Line,
  RiStarLine,
  RiTimeLine,
  RiUserLine
} from 'react-icons/ri';

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const NavLink = ({ href, label, icon }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActive
          ? 'bg-primary text-white'
          : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

export default function TrainerSidebar() {
  return (
    <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Huấn luyện viên</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavLink href="/account/trainer/dashboard" label="Dashboard" icon={<RiDashboardLine size={20} />} />
        <NavLink href="/account/trainer/schedule" label="Lịch PT" icon={<RiCalendarEventLine size={20} />} />
        <NavLink href="/account/trainer/clients" label="Khách hàng" icon={<RiUserLine size={20} />} />
        <NavLink href="/account/trainer/availability" label="Lịch làm việc" icon={<RiTimeLine size={20} />} />
        <NavLink href="/account/trainer/notifications" label="Thông báo" icon={<RiNotification3Line size={20} />} />
        <NavLink href="/account/messages" label="Tin nhắn" icon={<RiMessage2Line size={20} />} />
        <NavLink href="/account/trainer/income" label="Thu nhập" icon={<RiMoneyDollarCircleLine size={20} />} />
        <NavLink href="/account/trainer/ratings" label="Đánh giá" icon={<RiStarLine size={20} />} />
        <NavLink href="/account/trainer/profile" label="Thông tin cá nhân" icon={<RiSettings3Line size={20} />} />
      </nav>
    </div>
  );
}
