'use client';

import MessageComponentEnhanced from '@/components/MessageComponentEnhanced';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';

export default function Messages() {
  const { user } = useAuth();
  
  return (
    <div className="w-full">
      <PageTitle 
        title="Tin nhắn" 
        description="Trò chuyện với huấn luyện viên và quản trị viên" 
      />
      
      <div className="bg-white rounded-lg shadow-sm">
        <MessageComponentEnhanced />
      </div>
    </div>
  );
}
