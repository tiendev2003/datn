'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    RiBellLine,
    RiCalendarEventLine,
    RiDashboardLine,
    RiMessage2Line,
    RiSettings3Line,
    RiVipDiamondLine,
    RiWalletLine
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
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

export default function AccountSidebar() {
  return (
    <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Tài khoản của tôi</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavLink href="/account/dashboard" label="Bảng điều khiển" icon={<RiDashboardLine size={20} />} />
        <NavLink href="/account/membership" label="Gói tập" icon={<RiVipDiamondLine size={20} />} />
        <NavLink href="/account/schedule" label="Lịch tập" icon={<RiCalendarEventLine size={20} />} />        <NavLink href="/account/payments" label="Lịch sử thanh toán" icon={<RiWalletLine size={20} />} />
        <NavLink href="/account/messages" label="Tin nhắn" icon={<RiMessage2Line size={20} />} />
        <NavLink href="/account/notifications" label="Thông báo" icon={<RiBellLine size={20} />} />
        <NavLink href="/account/settings" label="Cài đặt tài khoản" icon={<RiSettings3Line size={20} />} />
      </nav>
    </div>
  );
}
