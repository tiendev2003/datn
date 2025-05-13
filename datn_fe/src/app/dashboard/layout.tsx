"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [user, setUser] = useState<{
        email: string;
        name: string;
        roles: string[];
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in - in a real app, this would validate a token with the backend
        const userData = localStorage.getItem("fithub-user");

        if (!userData) {
            // Not logged in, redirect to login
            router.push("/login");
        } else {
            try {
                const parsed = JSON.parse(userData);
                console.log("Parsed user data:", parsed); // Debugging line
                setUser(parsed);
                setIsLoading(false);
            } catch (e) {
                // Invalid data, redirect to login
                localStorage.removeItem("fithub-user");
                router.push("/login");
            }
        }
    }, [router]);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("fithub-user");
        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <DashboardLayout
            user={user}
            handleLogout={handleLogout}
        >
            {children}
        </DashboardLayout>
    );
}