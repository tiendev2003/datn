"use client";

import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state để tránh hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hiển thị nút khi người dùng cuộn xuống 300px từ đầu trang
  useEffect(() => {
    if (!isMounted) return;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Gọi toggleVisibility ngay lập tức để cập nhật trạng thái ban đầu
    toggleVisibility();
    
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup function để tránh memory leak
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isMounted]);

  // Hàm xử lý sự kiện khi click nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Không render gì nếu component chưa mount hoặc nút không hiển thị
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-[9999] p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110 focus:outline-none !important"
      style={{ 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Scroll To Top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;