import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/context/AuthContext";
import { MessageProvider } from "@/context/MessageContext";
import { NotificationProvider } from "@/context/NotificationContext";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GYMMASTER - Phòng tập hiện đại, chất lượng hàng đầu",
  description: "GYMMASTER là phòng tập hàng đầu với trang thiết bị hiện đại, không gian rộng rãi và đội ngũ huấn luyện viên chuyên nghiệp. Đăng ký gói tập với chúng tôi ngay hôm nay!",
  keywords: "gym, phòng tập, fitness, thể hình, yoga, personal trainer, huấn luyện viên cá nhân",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${interFont.variable} ${robotoFont.variable} antialiased bg-white text-secondary overflow-x-hidden min-h-screen`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <NotificationProvider>
            <MessageProvider>
              {children}
              <CookieConsent />
            </MessageProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
