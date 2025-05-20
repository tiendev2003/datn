'use client';

import { ChatContact, Message, useMessage } from '@/context/MessageContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';

interface MessageSearchProps {
  className?: string;
  onClose?: () => void;
}

const MessageSearch: React.FC<MessageSearchProps> = ({ className = '', onClose }) => {
  const { contacts, messages, selectContact } = useMessage();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{
    contacts: ChatContact[];
    messages: { message: Message; contact: ChatContact }[];
  }>({ contacts: [], messages: [] });
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults({ contacts: [], messages: [] });
      return;
    }

    const term = searchTerm.toLowerCase();
    
    // Search contacts
    const matchingContacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(term)
    );

    // Search messages
    const matchingMessages: { message: Message; contact: ChatContact }[] = [];
    
    // For each contact, search through their messages
    contacts.forEach(contact => {
      const contactMessages = messages.filter(msg => 
        (msg.senderId === contact.id || msg.recipientId === contact.id) &&
        msg.content.toLowerCase().includes(term)
      );
      
      contactMessages.forEach(message => {
        matchingMessages.push({ message, contact });
      });
    });

    // Sort messages by timestamp (newest first)
    matchingMessages.sort((a, b) => 
      b.message.timestamp.getTime() - a.message.timestamp.getTime()
    );

    setSearchResults({
      contacts: matchingContacts,
      messages: matchingMessages.slice(0, 5) // Limit to 5 messages
    });
  }, [searchTerm, contacts, messages]);

  const handleContactSelect = (contact: ChatContact) => {
    selectContact(contact);
    if (onClose) onClose();
    router.push('/account/messages');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Highlight matching text in search results
  const highlightMatch = (text: string) => {
    if (!searchTerm.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <span key={index} className="bg-yellow-200 font-medium">{part}</span> 
        : part
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border ${className}`}>
      <div className="p-3 border-b flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm tin nhắn hoặc liên hệ..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            autoFocus
          />
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="ml-2 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Đóng tìm kiếm"
          >
            <RiCloseLine size={24} />
          </button>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {searchTerm.trim() === '' ? (
          <div className="p-4 text-center text-gray-500">
            <RiSearchLine size={32} className="mx-auto mb-2" />
            <p>Nhập từ khóa để tìm kiếm</p>
          </div>
        ) : searchResults.contacts.length === 0 && searchResults.messages.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <RiCloseLine size={32} className="mx-auto mb-2" />
            <p>Không tìm thấy kết quả cho "{searchTerm}"</p>
          </div>
        ) : (
          <>
            {/* Contact results */}
            {searchResults.contacts.length > 0 && (
              <div>
                <h3 className="px-4 py-2 bg-gray-50 font-medium text-gray-700 text-sm">Liên hệ</h3>
                {searchResults.contacts.map(contact => (
                  <div 
                    key={contact.id}
                    className="px-4 py-3 flex items-center hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="relative">
                      <Image 
                        src={contact.avatar} 
                        alt={contact.name} 
                        width={40} 
                        height={40} 
                        className="rounded-full object-cover"
                      />
                      {contact.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{highlightMatch(contact.name)}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {contact.lastMessage || `${contact.role === 'trainer' ? 'Huấn luyện viên' : contact.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Message results */}
            {searchResults.messages.length > 0 && (
              <div>
                <h3 className="px-4 py-2 bg-gray-50 font-medium text-gray-700 text-sm">Tin nhắn</h3>
                {searchResults.messages.map(({ message, contact }) => (
                  <div 
                    key={message.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="flex items-center mb-1">
                      <Image 
                        src={contact.avatar} 
                        alt={contact.name} 
                        width={24} 
                        height={24} 
                        className="rounded-full object-cover mr-2"
                      />
                      <span className="font-medium">{contact.name}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{formatDate(message.timestamp)}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {highlightMatch(message.content)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageSearch;
