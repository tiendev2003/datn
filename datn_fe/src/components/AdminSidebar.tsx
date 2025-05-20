'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    RiBarChartBoxLine,
    RiDashboardLine,
    RiFileListLine,
    RiGroupLine,
    RiMoneyDollarCircleLine,
    RiPaintBrushLine,
    RiSettings3Line,
    RiUserLine,
    RiVipDiamondLine
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

export default function AdminSidebar() {
    return (
        <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary">Quản lý hệ thống</h2>
            </div>
            <nav className="flex flex-col space-y-2">
                <NavLink href="/account/admin/dashboard" label="Bảng điều khiển" icon={<RiDashboardLine size={20} />} />
                <NavLink href="/account/admin/packages" label="Quản lý gói tập" icon={<RiVipDiamondLine size={20} />} />
                <NavLink href="/account/admin/staff" label="Quản lý nhân sự" icon={<RiGroupLine size={20} />} />
                <NavLink href="/account/admin/trainers" label="Quản lý PT" icon={<RiUserLine size={20} />} />
                <NavLink href="/account/admin/customers" label="Quản lý khách hàng" icon={<RiUserLine size={20} />} />
                <NavLink href="/account/admin/finance" label="Quản lý tài chính" icon={<RiMoneyDollarCircleLine size={20} />} />
                <NavLink href="/account/admin/reports" label="Báo cáo thống kê" icon={<RiBarChartBoxLine size={20} />} />
                <NavLink href="/account/admin/content" label="Quản lý nội dung" icon={<RiPaintBrushLine size={20} />} />
                <NavLink href="/account/admin/documents" label="Tài liệu & hướng dẫn" icon={<RiFileListLine size={20} />} />
                <NavLink href="/account/admin/settings" label="Cài đặt hệ thống" icon={<RiSettings3Line size={20} />} />
            </nav>
        </div>
    );
}
