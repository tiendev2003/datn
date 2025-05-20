'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    RiAttachment2,
    RiCheckDoubleLine,
    RiEmotionLine,
    RiImageLine,
    RiMessage2Line,
    RiSearchLine,
    RiSendPlaneFill,
    RiTimeLine,
    RiUser3Line
} from 'react-icons/ri';

interface MessageAttachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  fileName: string;
  fileSize?: string;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

interface ChatContact {
  id: string;
  name: string;
  role: 'user' | 'trainer' | 'admin';
  avatar: string;
  lastMessage?: string;
  unreadCount: number;
  lastActive?: Date;
  status?: 'online' | 'offline' | 'away';
}

interface MessageComponentProps {
  isAdmin?: boolean;
}

export default function MessageComponent({ isAdmin = false }: MessageComponentProps) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const router = useRouter();
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock data
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      // Generate mock contacts based on user role
      const mockContacts: ChatContact[] = [];
      
      if (isAdmin) {
        // Admin sees all users and trainers
        for (let i = 1; i <= 3; i++) {
          mockContacts.push({
            id: `trainer${i}`,
            name: `Huấn luyện viên ${i}`,
            role: 'trainer',
            avatar: '/images/logo.png',
            lastMessage: `Yêu cầu hỗ trợ từ HLV ${i}`,
            unreadCount: i % 3,
            status: i % 3 === 0 ? 'online' : (i % 3 === 1 ? 'offline' : 'away'),
            lastActive: new Date(Date.now() - i * 3600000)
          });
        }
        
        for (let i = 1; i <= 5; i++) {
          mockContacts.push({
            id: `user${i}`,
            name: `Người dùng ${i}`,
            role: 'user',
            avatar: '/images/logo.png',
            lastMessage: i % 2 === 0 ? 'Tôi cần hỗ trợ về gói tập' : 'Cảm ơn về phản hồi',
            unreadCount: i % 2,
            status: i % 2 === 0 ? 'online' : 'offline',
            lastActive: new Date(Date.now() - i * 1800000)
          });
        }
      }
      else if (user.role === 'user') {
        // Users see their assigned trainers and admin
        mockContacts.push({
          id: 'trainer1',
          name: 'Nguyễn Huấn Luyện',
          role: 'trainer',
          avatar: '/images/logo.png',
          lastMessage: 'Bạn có thể tập luyện vào ngày mai không?',
          unreadCount: 2,
          status: 'online',
          lastActive: new Date()
        });
        
        mockContacts.push({
          id: 'admin1',
          name: 'Quản trị viên',
          role: 'admin',
          avatar: '/images/logo.png',
          lastMessage: 'Cảm ơn bạn đã đăng ký gói tập',
          unreadCount: 0,
          status: 'online',
          lastActive: new Date(Date.now() - 1200000)
        });
      } 
      else if (user.role === 'trainer') {
        // Generate mock user contacts for trainer
        for (let i = 1; i <= 7; i++) {
          mockContacts.push({
            id: `user${i}`,
            name: `Học viên ${i}`,
            role: 'user',
            avatar: '/images/logo.png',
            lastMessage: i % 2 === 0 ? 'Tôi có thể đổi lịch được không?' : 'Cảm ơn PT!',
            unreadCount: i % 3,
            status: i % 3 === 0 ? 'online' : (i % 3 === 1 ? 'offline' : 'away'),
            lastActive: new Date(Date.now() - i * 2400000)
          });
        }
        
        // Add admin contact
        mockContacts.push({
          id: 'admin1',
          name: 'Quản trị viên',
          role: 'admin',
          avatar: '/images/logo.png',
          lastMessage: 'Lịch làm việc tuần tới đã được cập nhật',
          unreadCount: 1,
          status: 'online',
          lastActive: new Date(Date.now() - 3600000)
        });
      }
      
      // Sort contacts by unread messages and then by lastActive
      mockContacts.sort((a, b) => {
        if (a.unreadCount !== b.unreadCount) {
          return b.unreadCount - a.unreadCount;
        }
        return (b.lastActive?.getTime() || 0) - (a.lastActive?.getTime() || 0);
      });
      
      setTimeout(() => {
        setContacts(mockContacts);
        setIsLoading(false);
        
        if (mockContacts.length > 0) {
          setSelectedContact(mockContacts[0]);
          generateMockMessages(mockContacts[0].id);
        }
      }, 800);
    }
  }, [user, isAdmin]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  // Generate mock messages for selected contact
  const generateMockMessages = (contactId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    const mockMessages: Message[] = [];
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // Generate 10 mock messages between user and contact
    for (let i = 0; i < 10; i++) {
      const isFromUser = i % 2 === 0;
      const messageTime = new Date(now.getTime() - (10 - i) * oneDay / 10);
        // Every 3rd message has an attachment
      const attachments = i % 3 === 0 ? [
        {
          id: `att${i}`,
          type: (i % 2 === 0 ? 'image' : 'document') as 'image' | 'document',
          url: i % 2 === 0 ? '/images/gym-background.jpg' : '#',
          fileName: i % 2 === 0 ? 'gym_photo.jpg' : 'schedule.pdf',
          fileSize: i % 2 === 0 ? '238 KB' : '1.2 MB'
        }
      ] : undefined;
      
      mockMessages.push({
        id: `msg${i}`,
        senderId: isFromUser ? user.id : contactId,
        recipientId: isFromUser ? contactId : user.id,
        content: isFromUser 
          ? `Đây là tin nhắn từ ${user.fullName} số ${i + 1}`
          : `Đây là tin nhắn phản hồi số ${i + 1}`,
        timestamp: messageTime,
        isRead: i < 8, // Mark last 2 messages as unread
        attachments: attachments
      });
    }
    
    setTimeout(() => {
      setMessages(mockMessages);
      setIsLoading(false);
    }, 500);
  };

  const handleContactSelect = (contact: ChatContact) => {
    setSelectedContact(contact);
    generateMockMessages(contact.id);
    
    // Mark as read in contacts list
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !selectedContact) return;
    
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      recipientId: selectedContact.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Update last message in contacts
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === selectedContact.id 
          ? { ...c, lastMessage: newMessage.substring(0, 30) + (newMessage.length > 30 ? '...' : '') } 
          : c
      )
    );
  };
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatLastActive = (date?: Date) => {
    if (!date) return 'Không xác định';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Vừa truy cập';
    if (diffMins < 60) return `${diffMins} phút trước`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ngày trước`;
  };

  const renderAttachment = (attachment: MessageAttachment) => {
    if (attachment.type === 'image') {
      return (
        <div className="mt-2 rounded overflow-hidden">
          <img 
            src={attachment.url} 
            alt={attachment.fileName} 
            className="max-w-full h-auto max-h-48"
            onClick={() => window.open(attachment.url, '_blank')}
          />
          <div className="text-xs mt-1">
            {attachment.fileName} ({attachment.fileSize})
          </div>
        </div>
      );
    }
    
    return (
      <div className="mt-2 bg-gray-100 rounded p-2 flex items-center">
        <RiAttachment2 className="mr-2" />
        <div>
          <div>{attachment.fileName}</div>
          <div className="text-xs">{attachment.fileSize}</div>
        </div>
      </div>
    );
  };

  const getStatusIndicator = (status?: string) => {
    if (!status) return null;
    
    let bgColor = '';
    
    switch (status) {
      case 'online':
        bgColor = 'bg-green-500';
        break;
      case 'offline':
        bgColor = 'bg-gray-500';
        break;
      case 'away':
        bgColor = 'bg-yellow-500';
        break;
      default:
        bgColor = 'bg-gray-500';
    }
    
    return (
      <span className={`absolute bottom-0 right-0 w-3 h-3 ${bgColor} border-2 border-white rounded-full`}></span>
    );
  };

  if (!user) {
    return <div>Vui lòng đăng nhập để sử dụng tính năng nhắn tin</div>;
  }
  return (
    <div className="flex flex-col md:flex-row h-[600px] border rounded-lg overflow-hidden">
      {/* Contact List */}
      <div className="w-full md:w-1/3 border-r">
        <div className="p-3 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium text-gray-700">Danh sách liên hệ</h2>
            <span className="text-sm text-blue-600">{contacts.length} liên hệ</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(600px-76px)]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 border-b ${selectedContact?.id === contact.id ? 'bg-blue-50' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3 overflow-hidden relative">
                  <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                  {getStatusIndicator(contact.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <p className="text-xs text-gray-500">
                        {contact.status === 'online' ? 'Đang hoạt động' : `Hoạt động ${formatLastActive(contact.lastActive)}`}
                      </p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-gray-500">
              <RiUser3Line size={32} className="mb-2" />
              <p>Không tìm thấy liên hệ</p>
            </div>
          )}
        </div>
      </div>

      {/* Conversation */}
      <div className="w-full md:w-2/3 flex flex-col">
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="p-3 border-b bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 overflow-hidden relative">
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
                  {getStatusIndicator(selectedContact.status)}
                </div>
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-gray-500">
                    {selectedContact.status === 'online' ? 'Đang hoạt động' : `Hoạt động ${formatLastActive(selectedContact.lastActive)}`}
                  </p>
                </div>
              </div>
              <div className="flex">
                <button className="p-2 rounded-full hover:bg-gray-200" title="Xem lịch sử">
                  <RiTimeLine size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length > 0 ? (
                messages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`mb-3 flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.senderId !== user.id && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0 overflow-hidden self-end">
                        <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderId === user.id 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-white border rounded-bl-none'
                      }`}
                    >
                      <div>{message.content}</div>
                      
                      {/* Attachments */}
                      {message.attachments?.map(attachment => (
                        <div key={attachment.id} className={message.senderId === user.id ? 'text-blue-50' : ''}>
                          {renderAttachment(attachment)}
                        </div>
                      ))}
                      
                      <div className={`text-xs mt-1 text-right flex items-center justify-end ${
                        message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{formatMessageTime(message.timestamp)}</span>
                        {message.senderId === user.id && (
                          <RiCheckDoubleLine 
                            className={`ml-1 ${message.isRead ? 'text-green-300' : 'text-blue-200'}`} 
                            title={message.isRead ? 'Đã đọc' : 'Đã gửi'}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-gray-500">
                  <p>Không có tin nhắn nào</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-1" title="Đính kèm file">
                  <RiAttachment2 size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-1" title="Gửi hình ảnh">
                  <RiImageLine size={20} />
                </button>
                <button 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-2" 
                  title="Chọn biểu tượng cảm xúc"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <RiEmotionLine size={20} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Nhập tin nhắn..."
                  />
                  {showEmojis && (
                    <div className="absolute bottom-full mb-2 bg-white border p-2 rounded-lg shadow-lg flex flex-wrap">
                      {['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '🙏'].map(emoji => (
                        <button
                          key={emoji}
                          className="p-1 text-xl hover:bg-gray-100 rounded"
                          onClick={() => {
                            setNewMessage(prev => prev + emoji);
                            setShowEmojis(false);
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`ml-2 p-2 rounded-full ${
                    newMessage.trim() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <RiSendPlaneFill size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <RiMessage2Line size={48} className="mb-4 text-gray-300" />
            <h3 className="text-xl font-medium mb-2">Tin nhắn của bạn</h3>
            <p className="text-center px-4">
              Chọn một liên hệ để bắt đầu cuộc trò chuyện hoặc tiếp tục cuộc trò chuyện đang diễn ra
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
