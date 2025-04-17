'use client';
import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Dumbbell,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserCircle,
  Users,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MobileSheet } from '@/components/layout/MobileSheet';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isLinkActive = (path: string): boolean => {
    return pathname === path;
  };

  const mainNavItems = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Đặt lịch', href: '/bookings', icon: Calendar },
    { name: 'Lớp tập', href: '/classes', icon: Users },
    { name: 'Huấn luyện viên', href: '/trainers', icon: Dumbbell },
    { name: 'Gói thành viên', href: '/membership', icon: Users },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Desktop Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6" />
              <span className="font-bold inline-block">GymFit</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-foreground/80 ${
                    isLinkActive(item.href) ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-2">
              <ThemeToggle />
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
            </div>
            <MobileSheet mainNavItems={mainNavItems} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:h-24 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} GymFit. Bản quyền thuộc về GymFit.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4 md:items-center md:gap-6">
            <nav className="flex gap-4 justify-center md:justify-end">
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                Về chúng tôi
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                Liên hệ
              </Link>
              <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                Chính sách
              </Link>
              <Link href="/terms" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                Điều khoản
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

function ThemeToggle() {
  // In a real app, you'd use a theme context
  // For now, just a UI sample
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle Theme">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}

export default MainLayout;