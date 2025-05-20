'use client';

import { useMessage, type Message } from '@/context/MessageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiArrowRightLine, RiMessage2Line } from 'react-icons/ri';

interface DashboardMessagesProps {
  maxMessages?: number;
  showHeader?: boolean;
  onlyUnread?: boolean;
  className?: string;
}

const DashboardMessages: React.FC<DashboardMessagesProps> = ({
  maxMessages = 5,
  showHeader = true,
  onlyUnread = false,
  className = '',
}) => {
  const { contacts, getRecentMessages, isLoading } = useMessage();
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  // Get the corresponding contact for a message
  const getContactForMessage = (message: Message) => {
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

  // Get message preview text (truncated if needed)
  const getMessagePreview = (message: Message): string => {
    if (!message.content || message.content.trim() === '') {
      if (message.attachments && message.attachments.length > 0) {
        return `[${message.senderId === 'currentUser' ? 'Bạn' : 'Người gửi'} đã gửi ${message.attachments.length} tệp đính kèm]`;
      }
      return 'Không có nội dung';
    }
    
    const preview = message.content.trim();
    return preview.length > 50 ? `${preview.substring(0, 50)}...` : preview;
  };

  // Load or refresh recent messages
  useEffect(() => {
    if (!isLoading) {
      const messages = getRecentMessages(maxMessages * 2); // Get more messages then filter
      
      // Filter messages if onlyUnread is true
      let filteredMessages = onlyUnread 
        ? messages.filter(msg => !msg.isRead && msg.senderId !== 'currentUser')
        : messages;
        
      // Take only the number specified by maxMessages
      filteredMessages = filteredMessages.slice(0, maxMessages);
      
      setRecentMessages(filteredMessages);
    }
  }, [getRecentMessages, isLoading, maxMessages, onlyUnread, contacts]);

  if (isLoading) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (recentMessages.length === 0) {
    return (
      <div className={`p-4 flex flex-col items-center justify-center ${className}`}>
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          <RiMessage2Line className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-500 text-center">
          {onlyUnread ? 'Không có tin nhắn chưa đọc' : 'Không có tin nhắn nào'}
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center mb-4 px-4 pt-2">
          <h3 className="font-semibold text-lg">
            {onlyUnread ? 'Tin nhắn chưa đọc' : 'Tin nhắn gần đây'}
          </h3>
          <Link href="/account/messages" className="flex items-center text-sm text-red-600 hover:text-red-700">
            <span>Xem tất cả</span>
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>
      )}

      <div className="space-y-1">
        {recentMessages.map((message, index) => {
          const contact = getContactForMessage(message);
          const isFromMe = message.senderId === 'currentUser';
          
          return (
            <motion.div 
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            >
              <Link href="/account/messages" className="flex items-center">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                    {contact && (
                      <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  {!message.isRead && !isFromMe && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800 truncate">
                      {contact ? contact.name : 'Người dùng không xác định'}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatRelativeTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 truncate flex items-center">
                    {isFromMe && <span className="text-xs mr-1 text-blue-600">Bạn: </span>}
                    {getMessagePreview(message)}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {showHeader && recentMessages.length > 0 && (
        <div className="mt-3 text-center">
          <Link 
            href="/account/messages" 
            className="inline-block text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-colors"
          >
            Xem tất cả tin nhắn
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardMessages;
