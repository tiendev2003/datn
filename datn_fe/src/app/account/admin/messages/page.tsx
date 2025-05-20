'use client';

import MessageComponentUpdated from '@/components/MessageComponentUpdated';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';

export default function AdminMessages() {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <PageTitle 
        title="Tin nhắn quản trị" 
        description="Quản lý tin nhắn với huấn luyện viên và thành viên" 
      />
      
      <div className="bg-white rounded-lg shadow-md">
        <MessageComponentUpdated isAdmin={true} />
      </div>
    </div>
  );
}
