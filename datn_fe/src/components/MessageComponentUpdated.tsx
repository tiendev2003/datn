'use client';

import { useMessage, type Message, type MessageAttachment } from '@/context/MessageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    RiAttachment2,
    RiCheckDoubleLine,
    RiCloseLine,
    RiEmotionLine,
    RiImageLine,
    RiMessage2Line,
    RiSearchLine,
    RiSendPlaneFill,
    RiTimeLine,
    RiUser3Line
} from 'react-icons/ri';
import MessageAttachmentUploader from './MessageAttachmentUploader';

interface MessageComponentProps {
  isAdmin?: boolean;
}

export default function MessageComponentUpdated({ isAdmin = false }: MessageComponentProps) {
  const { 
    contacts, 
    messages, 
    selectedContact, 
    selectContact, 
    sendMessage,
    isLoading,
    searchContacts,
    uploadAttachment,
    deleteAttachment
  } = useMessage();
  
  const [newMessage, setNewMessage] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [showAttachmentUploader, setShowAttachmentUploader] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const router = useRouter();
  
  // Filter contacts based on search term
  const filteredContacts = searchContacts(searchTerm);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if ((!newMessage.trim() && pendingAttachments.length === 0) || !selectedContact) return;
    sendMessage(newMessage, pendingAttachments);
    setNewMessage('');
    setPendingAttachments([]);
  };

  const handleAttachmentAdded = (attachment: MessageAttachment) => {
    setPendingAttachments(prev => [...prev, attachment]);
  };
  
  const handleRemoveAttachment = (id: string) => {
    setPendingAttachments(prev => prev.filter(att => att.id !== id));
    deleteAttachment(id);
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
                onClick={() => selectContact(contact)}
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
                  <Message 
                    key={message.id}
                    message={message}
                    contactAvatar={selectedContact.avatar}
                    contactName={selectedContact.name}
                    formatMessageTime={formatMessageTime}
                    renderAttachment={renderAttachment}
                  />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-gray-500">
                  <p>Không có tin nhắn nào</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white">              <div className="flex items-center">
                <button 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-1" 
                  title="Đính kèm file"
                  onClick={() => setShowAttachmentUploader(!showAttachmentUploader)}
                >
                  <RiAttachment2 size={20} />
                </button>
                <button 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-1" 
                  title="Gửi hình ảnh"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files && target.files[0]) {
                        const attachment = await uploadAttachment(target.files[0]);
                        if (attachment) {
                          handleAttachmentAdded(attachment);
                        }
                      }
                    };
                    input.click();
                  }}
                >
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
                </div>                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() && pendingAttachments.length === 0}
                  className={`ml-2 p-2 rounded-full ${
                    (newMessage.trim() || pendingAttachments.length > 0) 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <RiSendPlaneFill size={20} />
                </button>
              </div>

              {/* Attachments Preview */}
              {pendingAttachments.length > 0 && (
                <div className="mt-2">
                  {pendingAttachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg mb-2">
                      <div className="flex items-center">
                        {attachment.type === 'image' ? (
                          <img 
                            src={attachment.url} 
                            alt={attachment.fileName} 
                            className="w-10 h-10 rounded-md object-cover mr-2"
                          />
                        ) : (
                          <RiAttachment2 className="w-10 h-10 text-blue-500 mr-2" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{attachment.fileName}</span>
                          <span className="text-xs text-gray-500">{attachment.fileSize}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setPendingAttachments(prev => prev.filter((_, i) => i !== index))}
                        className="p-1 rounded-full hover:bg-blue-100"
                        title="Xóa tệp đính kèm"
                      >
                        <RiCloseLine className="w-5 h-5 text-blue-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}              {/* File Upload */}
              {showAttachmentUploader && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Tải tệp lên</h3>
                    <button 
                      onClick={() => setShowAttachmentUploader(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <RiCloseLine size={20} />
                    </button>
                  </div>
                  <MessageAttachmentUploader 
                    onAttachmentAdded={handleAttachmentAdded}
                  />
                </div>
              )}
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

interface MessageProps {
  message: Message;
  contactAvatar: string;
  contactName: string;
  formatMessageTime: (date: Date) => string;
  renderAttachment: (attachment: MessageAttachment) => React.ReactNode;
}

function Message({ message, contactAvatar, contactName, formatMessageTime, renderAttachment }: MessageProps) {
  const { user } = { user: { id: '1' } }; // Replace with actual user from context
  const isFromCurrentUser = message.senderId === user.id;

  return (
    <div 
      className={`mb-3 flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isFromCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0 overflow-hidden self-end">
          <img src={contactAvatar} alt={contactName} className="w-full h-full object-cover" />
        </div>
      )}
      <div 
        className={`max-w-[70%] p-3 rounded-lg ${
          isFromCurrentUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-white border rounded-bl-none'
        }`}
      >
        <div>{message.content}</div>
        
        {/* Attachments */}
        {message.attachments?.map(attachment => (
          <div key={attachment.id} className={isFromCurrentUser ? 'text-blue-50' : ''}>
            {renderAttachment(attachment)}
          </div>
        ))}
        
        <div className={`text-xs mt-1 text-right flex items-center justify-end ${
          isFromCurrentUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span>{formatMessageTime(message.timestamp)}</span>
          {isFromCurrentUser && (
            <RiCheckDoubleLine 
              className={`ml-1 ${message.isRead ? 'text-green-300' : 'text-blue-200'}`} 
              title={message.isRead ? 'Đã đọc' : 'Đã gửi'}
            />
          )}
        </div>
      </div>
    </div>
  );
}
