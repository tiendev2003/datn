'use client';

import AccountSidebar from '@/components/AccountSidebar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TrainerSidebar from '@/components/TrainerSidebar';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Add a useEffect to handle the loading state based on auth status
  useEffect(() => {
    // Set loading to false when we have determined the auth state
    // and either have user data or know the user isn't authenticated
    if (isAuthenticated !== undefined) {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Chỉ chuyển hướng khi đã hoàn thành quá trình kiểm tra xác thực
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to login');
        router.push('/login');
      } else {
        console.log('User authenticated with role:', user?.role);
      }
    }
  }, [isAuthenticated, router, isLoading, user]);
  // Role-based redirects
  useEffect(() => {
    if (user && !isLoading) {      // Check if we're on an account page that's not a shared page (like settings or messages)
      const isNonSharedAccountPage =
        pathname.startsWith('/account/') &&
        !pathname.startsWith('/account/settings') &&
        !pathname.startsWith('/account/messages');// Handle admin redirects
      if (user.role === 'admin') {
        if (isNonSharedAccountPage && !pathname.startsWith('/account/admin') && !pathname.startsWith('/account/messages')) {
          router.push('/account/admin/dashboard');
        }
      }
      // Handle trainer redirects
      else if (user.role === 'trainer') {
        if (isNonSharedAccountPage && !pathname.startsWith('/account/trainer') && !pathname.startsWith('/account/messages')) {
          router.push('/account/trainer/dashboard');
        }
      }
      // Handle regular user redirects
      else if (user.role === 'user') {
        if (pathname.startsWith('/account/trainer') || pathname.startsWith('/account/admin')) {
          router.push('/account/dashboard');
        }
      }
    }
  }, [user, pathname, router, isLoading]);

  if (isLoading) {
    console.log('Loading user data... Role:', user?.role, 'Auth state:', isAuthenticated);
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  // Determine which sidebar to render based on user role and current path
  const renderSidebar = () => {
    if (user?.role === 'admin') {
      // If you have an AdminSidebar component, you can return it here
      // return <AdminSidebar />;
      // For now, we'll use the trainer sidebar for admin too
      return <TrainerSidebar />;
    } else if (user?.role === 'trainer') {
      return <TrainerSidebar />;
    }
    return <AccountSidebar />;
  };

  return (
    <>
      <Header isAccountPage={true} />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-auto md:sticky md:top-20 md:self-start">
              {renderSidebar()}
            </aside>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
