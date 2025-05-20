'use client';

import { usePathname } from 'next/navigation';
import ScrollProgressBar from './ScrollProgressBar';

const ClientScrollProgressBar = () => {
  const pathname = usePathname();
  
  // Chỉ hiển thị thanh tiến trình ở trang chủ, không hiển thị ở các trang khác
  if (pathname !== '/') {
    return null;
  }
  
  return (
    <ScrollProgressBar 
      position="top" 
      color="#00BFFF" // Màu xanh dương để không trùng với header
      height={6} // Tăng độ cao để dễ nhìn hơn
      showCompletionMessage={true}
    />
  );
};

export default ClientScrollProgressBar;
