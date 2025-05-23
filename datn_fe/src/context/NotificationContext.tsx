'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: number;
  message: string;
  title?: string;
  date: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  category?: 'booking' | 'package' | 'payment' | 'schedule' | 'system';
  metadata?: Record<string, any>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'isRead'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    // TODO: Fetch initial notifications
    fetchInitialNotifications();

    // Initialize WebSocket connection
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/ws');
    
    ws.onopen = () => {
      console.log('WebSocket Connected');
      setWebSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const notificationData = JSON.parse(event.data);
        if (notificationData.type === 'notification') {
          addNotification({
            message: notificationData.message,
            title: notificationData.title,
            type: notificationData.notificationType,
            category: notificationData.category,
            metadata: notificationData.metadata
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        setWebSocket(null);
      }, 5000);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const fetchInitialNotifications = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/notifications');
      // const data = await response.json();
      // setNotifications(data);

      // Demo notifications
      setNotifications([
        {
          id: 1,
          title: 'Lịch hẹn mới',
          message: 'Bạn có lịch hẹn huấn luyện với học viên Nguyễn Văn A vào ngày mai lúc 15:00.',
          date: new Date().toISOString(),
          type: 'info',
          isRead: false,
          category: 'booking'
        },
        {
          id: 2,
          title: 'Gói tập sắp hết hạn',
          message: 'Gói tập PT của bạn sẽ hết hạn trong 7 ngày. Vui lòng gia hạn để tiếp tục tập luyện.',
          date: new Date().toISOString(),
          type: 'warning',
          isRead: false,
          category: 'package'
        }
      ]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/notifications/read-all', { method: 'POST' });
      
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      
      setNotifications(prev =>
        prev.filter(notification => notification.id !== id)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'date' | 'isRead'>) => {
    setNotifications(prev => [
      {
        ...notification,
        id: Date.now(),
        date: new Date().toISOString(),
        isRead: false
      },
      ...prev
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
