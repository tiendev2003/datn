'use client';

import { ChatContact, Message, useMessage } from '@/context/MessageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RecentMessagesProps {
  maxMessages?: number;
  showHeader?: boolean;
  onlyUnread?: boolean;
  className?: string;
}

const RecentMessages: React.FC<RecentMessagesProps> = ({
  maxMessages = 5,
  showHeader = true,
  onlyUnread = false,
  className = '',
}) => {
  const { contacts, getRecentMessages, isLoading } = useMessage();
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  // Get the corresponding contact for a message
  const getContactForMessage = (message: Message): ChatContact | undefined => {
    return contacts.find(contact => 
      contact.id === (message.senderId !== 'currentUser' ? message.senderId : message.recipientId)
    );
  };

  // Format timestamp to relative time
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  // Load or refresh recent messages
  useEffect(() => {
    if (!isLoading) {
      const messages = getRecentMessages(maxMessages * 2); // Get more messages then filter
      const filtered = onlyUnread ? messages.filter(msg => !msg.isRead) : messages;
      setRecentMessages(filtered.slice(0, maxMessages));
    }
  }, [getRecentMessages, isLoading, maxMessages, onlyUnread]);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (recentMessages.length === 0) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        {showHeader && <h3 className="font-semibold text-lg mb-4">Tin nhắn gần đây</h3>}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center bg-blue-50 rounded-full w-16 h-16 text-blue-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <h3 className="text-gray-700 font-medium">Không có tin nhắn nào</h3>
          <p className="text-gray-500 text-sm mt-1">Các tin nhắn mới sẽ xuất hiện ở đây</p>
          <Link 
            href="/account/messages" 
            className="mt-4 inline-block text-primary font-medium hover:text-primary-dark transition"
          >
            Gửi tin nhắn mới
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={`bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 ${className}`}
    >
      {showHeader && (
        <div className="p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Tin nhắn gần đây</h3>
          <Link 
            href="/account/messages" 
            className="text-sm text-primary font-medium hover:text-primary-dark transition"
          >
            Xem tất cả
          </Link>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {recentMessages.map(message => {
          const contact = getContactForMessage(message);
          const isIncoming = message.senderId !== 'currentUser';
          
          return contact ? (
            <motion.div 
              key={message.id}
              variants={fadeIn}
              className={`p-4 ${!message.isRead ? 'bg-blue-50' : ''}`}
            >
              <Link href="/account/messages" className="flex items-start">
                <div className="relative mr-4">
                  <Image
                    src={contact.avatar || '/images/logo.png'}
                    alt={contact.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {contact.name}
                      <span className={`inline-flex ml-2 text-xs px-2 rounded-full items-center ${
                        contact.role === 'trainer' ? 'bg-orange-100 text-orange-800' :
                        contact.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {contact.role === 'trainer' ? 'HLV' :
                         contact.role === 'admin' ? 'Admin' : 'Hội viên'
                        }
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">{formatRelativeTime(message.timestamp)}</span>
                  </div>
                  
                  <p className={`text-sm mt-1 line-clamp-2 ${!message.isRead ? 'font-medium' : 'text-gray-600'}`}>
                    {isIncoming ? message.content : `Bạn: ${message.content}`}
                  </p>
                </div>
              </Link>
            </motion.div>
          ) : null;
        })}
      </div>
    </motion.div>
  );
};

export default RecentMessages;
