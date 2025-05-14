'use client';

import ScrollProgressBar from './ScrollProgressBar';

const ClientScrollProgressBar = () => {
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
