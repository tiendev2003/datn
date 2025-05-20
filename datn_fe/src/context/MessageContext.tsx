'use client';

import { useAuth } from '@/context/AuthContext';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the Message type
export interface MessageAttachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  fileName: string;
  fileSize?: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

export interface ChatContact {
  id: string;
  name: string;
  role: 'user' | 'trainer' | 'admin';
  avatar: string;
  lastMessage?: string;
  unreadCount: number;
  lastActive?: Date;
  status?: 'online' | 'offline' | 'away';
}

// Define the context state
interface MessageContextType {
  contacts: ChatContact[];
  messages: Message[];
  selectedContact: ChatContact | null;
  selectContact: (contact: ChatContact) => void;
  sendMessage: (content: string, attachments?: MessageAttachment[]) => void;
  markAsRead: (messageIds: string[]) => void;
  searchContacts: (term: string) => ChatContact[];
  getRecentMessages: (count: number) => Message[];
  uploadAttachment: (file: File) => Promise<MessageAttachment | null>;
  deleteAttachment: (attachmentId: string) => void;
  totalUnreadCount: number;
  isLoading: boolean;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [websocketConnected, setWebsocketConnected] = useState<boolean>(false);

  // Compute total unread messages
  const totalUnreadCount = contacts.reduce((sum, contact) => sum + contact.unreadCount, 0);

  // Simulate WebSocket connection
  useEffect(() => {
    if (user) {
      console.log('Connecting to message WebSocket...');
      
      // Simulate connection established
      const timeout = setTimeout(() => {
        console.log('WebSocket connected!');
        setWebsocketConnected(true);
      }, 1500);
      
      return () => {
        clearTimeout(timeout);
        console.log('WebSocket disconnected!');
        setWebsocketConnected(false);
      };
    }
  }, [user]);

  // Simulate incoming messages periodically (only when connected)
  useEffect(() => {
    if (!websocketConnected || !user || contacts.length === 0) return;
    
    // Random message every 30-120 seconds
    const interval = setInterval(() => {
      // 30% chance of receiving a message
      if (Math.random() > 0.3) return;
      
      // Select random contact
      const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
      
      // Create a new message from this contact
      const newMessage: Message = {
        id: `ws-msg-${Date.now()}`,
        senderId: randomContact.id,
        recipientId: user.id,
        content: `Tin nhắn tự động từ ${randomContact.name}: ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
        isRead: false,
      };
      
      // Update messages if this is the selected contact
      if (selectedContact?.id === randomContact.id) {
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Update contacts list with new message notification
      setContacts(prevContacts => 
        prevContacts.map(c => 
          c.id === randomContact.id 
            ? { 
                ...c, 
                lastMessage: newMessage.content.substring(0, 30) + (newMessage.content.length > 30 ? '...' : ''),
                unreadCount: c.id === selectedContact?.id ? c.unreadCount : c.unreadCount + 1,
                lastActive: new Date(),
                status: 'online'
              } 
            : c
        )
      );
      
      // Show browser notification if supported
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`Tin nhắn mới từ ${randomContact.name}`, {
          body: newMessage.content,
          icon: randomContact.avatar
        });
      }
      
    }, 30000 + Math.random() * 90000); // Random interval between 30-120 seconds
    
    return () => clearInterval(interval);
  }, [websocketConnected, contacts, selectedContact, user]);

  // Initialize mock data when user changes
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      
      // Generate mock contacts based on user role
      const mockContacts: ChatContact[] = [];
      
      if (user.role === 'admin') {
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
  }, [user]);

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

  const selectContact = (contact: ChatContact) => {
    setSelectedContact(contact);
    generateMockMessages(contact.id);
    
    // Mark as read in contacts list
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  const sendMessage = (content: string, attachments?: MessageAttachment[]) => {
    if (!content.trim() || !user || !selectedContact) return;
    
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      recipientId: selectedContact.id,
      content: content,
      timestamp: new Date(),
      isRead: false,
      attachments: attachments
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    // Update last message in contacts
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === selectedContact.id 
          ? { ...c, lastMessage: content.substring(0, 30) + (content.length > 30 ? '...' : '') } 
          : c
      )
    );

    // Simulate reply after 2-5 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg${Date.now() + 1}`,
        senderId: selectedContact.id,
        recipientId: user.id,
        content: `Phản hồi tự động cho tin nhắn: "${content.substring(0, 20)}${content.length > 20 ? '...' : ''}"`,
        timestamp: new Date(),
        isRead: false,
      };
      
      setMessages(prev => [...prev, replyMsg]);
      
      // Update contact with new message notification
      setContacts(prevContacts => 
        prevContacts.map(c => 
          c.id === selectedContact.id 
            ? { 
                ...c, 
                lastMessage: replyMsg.content.substring(0, 30) + (replyMsg.content.length > 30 ? '...' : ''),
                unreadCount: c.id !== selectedContact.id ? c.unreadCount + 1 : c.unreadCount
              } 
            : c
        )
      );
    }, 2000 + Math.random() * 3000);
  };

  const markAsRead = (messageIds: string[]) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
      )
    );
  };

  const searchContacts = (term: string): ChatContact[] => {
    if (!term.trim()) return contacts;
    
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Get recent messages for dashboard
  const getRecentMessages = (count: number): Message[] => {
    // Create a map to store the most recent message from each contact
    const contactMessages = new Map<string, Message>();
    
    // Store all user's messages in an array
    const allMessages: Message[] = [];
    
    // Collect the recent message history
    contacts.forEach(contact => {
      // Get messages for this contact (normally we would fetch this from API)
      const mockContactMessages: Message[] = [];
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      
      for (let i = 0; i < 3; i++) {
        const isFromUser = i % 2 === 0;
        const messageTime = new Date(now.getTime() - (3 - i) * oneDay / 10);
        
        mockContactMessages.push({
          id: `dashboard-msg-${contact.id}-${i}`,
          senderId: isFromUser ? (user?.id || 'currentUser') : contact.id,
          recipientId: isFromUser ? contact.id : (user?.id || 'currentUser'),
          content: isFromUser 
            ? `Tin nhắn gần đây tới ${contact.name}`
            : `${contact.lastMessage || `Phản hồi từ ${contact.name}`}`,
          timestamp: messageTime,
          isRead: i !== 2, // Mark latest as unread
        });
      }
      
      // Get the most recent message from this contact conversation
      const recentMessage = mockContactMessages.sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      )[0];
      
      if (recentMessage) {
        contactMessages.set(contact.id, recentMessage);
        allMessages.push(...mockContactMessages);
      }
    });
    
    // Sort all messages by timestamp (newest first) and limit to the requested count
    return allMessages
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, count);
  };

  // File attachment upload handler
  const uploadAttachment = async (file: File): Promise<MessageAttachment | null> => {
    if (!file || !selectedContact || !user) return null;
    
    // Simulate upload delay
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create mock URL for the file
        const attachmentId = `attachment-${Date.now()}`;
        const fileType: 'image' | 'document' = 
          file.type.startsWith('image/') ? 'image' : 'document';
        
        // Format file size
        const fileSize = file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
          
        // Create the attachment object
        const newAttachment: MessageAttachment = {
          id: attachmentId,
          type: fileType,
          url: fileType === 'image' 
            ? URL.createObjectURL(file) // For images, create a viewable URL
            : '#', // For documents, we'd normally upload to server
          fileName: file.name,
          fileSize: fileSize
        };
        
        // Create a new message with the attachment if needed
        const newMsg: Message = {
          id: `msg-att-${Date.now()}`,
          senderId: user.id,
          recipientId: selectedContact.id,
          content: `Đã gửi tệp đính kèm: ${file.name}`,
          timestamp: new Date(),
          isRead: false,
          attachments: [newAttachment]
        };
        
        setMessages(prev => [...prev, newMsg]);
        
        // Update contact's last message
        setContacts(prevContacts => 
          prevContacts.map(c => 
            c.id === selectedContact.id 
              ? { 
                  ...c, 
                  lastMessage: `Đã gửi tệp đính kèm: ${file.name}`,
                } 
              : c
          )
        );
        
        setIsLoading(false);
        resolve(newAttachment);
      }, 1000);
    });
  };
  
  // Delete attachment handler
  const deleteAttachment = (attachmentId: string) => {
    // In a real app, this would call an API to delete the file
    console.log(`Deleting attachment: ${attachmentId}`);
    
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (!msg.attachments) return msg;
        
        const updatedAttachments = msg.attachments.filter(att => att.id !== attachmentId);
        
        return {
          ...msg,
          attachments: updatedAttachments.length > 0 ? updatedAttachments : undefined
        };
      })
    );
  };

  return (
    <MessageContext.Provider 
      value={{ 
        contacts, 
        messages, 
        selectedContact, 
        selectContact, 
        sendMessage,
        markAsRead,
        searchContacts,
        getRecentMessages,
        uploadAttachment,
        deleteAttachment,
        totalUnreadCount,
        isLoading
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

// Custom hook to use the message context
export function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}
