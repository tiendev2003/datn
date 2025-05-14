import ClientScrollProgressBar from "@/components/ClientScrollProgressBar";
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
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${interFont.variable} ${robotoFont.variable} antialiased bg-white text-secondary`}
        suppressHydrationWarning={true}
      >
        <ClientScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
