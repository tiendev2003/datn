import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, Moon, Settings, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MainNavItem {
  href: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function MobileSheet({ mainNavItems }: { mainNavItems: MainNavItem[] }) {
  const pathname = usePathname();

const isLinkActive = (path: string): boolean => {
    return pathname === path;
};

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <SheetHeader className="pr-6">
          <SheetTitle>GymFit</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 pr-6 mt-4">
          <nav className="flex flex-col gap-3">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent ${
                    isLinkActive(item.href) ? "bg-accent" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t my-2" />
          <div className="flex flex-col gap-3">
            <Link
              href="/profile"
              className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent ${
                isLinkActive("/profile") ? "bg-accent" : ""
              }`}
            >
              <Settings className="h-4 w-4" />
              Cài đặt tài khoản
            </Link>
            <Link
              href="/auth/logout"
              className="flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent text-red-500"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Link>
          </div>
          <div className="border-t my-2" />
          <div className="flex justify-between items-center px-3">
            <span className="text-sm">Chế độ tối</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Toggle Theme">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}