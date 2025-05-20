'use client';

import { useMessage, type ChatContact, type Message, type MessageAttachment } from '@/context/MessageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    RiArrowLeftLine,
    RiAttachment2,
    RiCheckDoubleLine,
    RiCloseLine,
    RiEmotionHappyLine,
    RiFileTextLine,
    RiImageLine,
    RiInformationLine,
    RiMessage2Line,
    RiPhoneLine,
    RiSearchLine,
    RiSendPlaneFill,
    RiVideoLine
} from 'react-icons/ri';

interface MessageComponentProps {
    isAdmin?: boolean;
    className?: string;
}

export default function MessageComponentEnhanced({ isAdmin = false, className = '' }: MessageComponentProps) {
    const {
        contacts,
        messages,
        selectedContact,
        selectContact,
        sendMessage,
        isLoading,
        searchContacts,
        uploadAttachment,
        deleteAttachment,

    } = useMessage();

    const [newMessage, setNewMessage] = useState('');
    const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
    const [showAttachmentUploader, setShowAttachmentUploader] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const [showMobileContacts, setShowMobileContacts] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    // Filter contacts based on search term
    const filteredContacts = searchContacts(searchTerm);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Toggle mobile view between contacts and messages
    useEffect(() => {
        if (selectedContact) {
            setShowMobileContacts(false);
        }
    }, [selectedContact]);

    const handleSelectContact = (contact: ChatContact) => {
        selectContact(contact);
        setShowMobileContacts(false);
    };

    const handleBackToContacts = () => {
        setShowMobileContacts(true);
    };

    const handleSendMessage = () => {
        if ((!newMessage.trim() && pendingAttachments.length === 0) || !selectedContact) return;
        sendMessage(newMessage, pendingAttachments);
        setNewMessage('');
        setPendingAttachments([]);
        if (messageInputRef.current) {
            messageInputRef.current.style.height = 'auto';
        }
    };

    const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleAttachmentAdded = (attachment: MessageAttachment) => {
        setPendingAttachments(prev => [...prev, attachment]);
    };

    const handleRemoveAttachment = (id: string) => {
        setPendingAttachments(prev => prev.filter(att => att.id !== id));
        deleteAttachment(id);
    };

    const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
        // Auto-resize textarea
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
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

    const renderMessageDate = (message: Message, index: number) => {
        if (index === 0) {
            return (
                <div className="flex justify-center my-3">
                    <span className="px-4 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {message.timestamp.toLocaleDateString('vi-VN')}
                    </span>
                </div>
            );
        }

        const prevMessage = messages[index - 1];
        const prevDate = prevMessage.timestamp.toLocaleDateString();
        const currentDate = message.timestamp.toLocaleDateString();

        if (prevDate !== currentDate) {
            return (
                <div className="flex justify-center my-3">
                    <span className="px-4 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {message.timestamp.toLocaleDateString('vi-VN')}
                    </span>
                </div>
            );
        }

        return null;
    };

    const renderAttachment = (attachment: MessageAttachment) => {
        if (attachment.type === 'image') {
            return (
                <div className="relative mt-2 rounded-lg overflow-hidden group">
                    <img
                        src={attachment.url}
                        alt={attachment.fileName}
                        className="max-w-full h-auto max-h-48 rounded-lg"
                        onClick={() => window.open(attachment.url, '_blank')}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {attachment.fileName} ({attachment.fileSize})
                    </div>
                </div>
            );
        }

        return (
            <div className="mt-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-3 flex items-center cursor-pointer border border-gray-200">
                <RiFileTextLine className="mr-3 text-lg text-blue-600" />
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{attachment.fileName}</div>
                    <div className="text-xs text-gray-500">{attachment.fileSize}</div>
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
                bgColor = 'bg-gray-400';
                break;
            case 'away':
                bgColor = 'bg-yellow-500';
                break;
            default:
                bgColor = 'bg-gray-400';
        }

        return (
            <span className={`absolute bottom-0 right-0 w-3 h-3 ${bgColor} border-2 border-white rounded-full`}></span>
        );
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    const slideIn = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.2 } }
    };

    return (
        <div className={`flex flex-col h-[calc(100vh-200px)] border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white ${className}`}>
            {/* Mobile View Toggle */}
            <div className="md:hidden">
                <AnimatePresence initial={false}>
                    {showMobileContacts ? (
                        <motion.div
                            key="contacts"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={fadeIn}
                            className="h-full"
                        >
                            {/* Contact List - Mobile */}
                            <div className="h-full flex flex-col">
                                {/* Search Header - Mobile */}
                                <div className="p-4 border-b">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm liên hệ..."
                                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                                    </div>
                                </div>

                                {/* Contact List - Mobile */}
                                <div className="flex-1 overflow-y-auto">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
                                        </div>
                                    ) : filteredContacts.length > 0 ? (
                                        filteredContacts.map(contact => (
                                            <motion.div
                                                key={contact.id}
                                                variants={slideIn}
                                                initial="hidden"
                                                animate="visible"
                                                className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-gray-100' : ''}`}
                                                onClick={() => handleSelectContact(contact)}
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                                        <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {getStatusIndicator(contact.status)}
                                                </div>
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-gray-800 truncate">{contact.name}</span>
                                                        <span className="text-xs text-gray-500">
                                                            {contact.lastActive ? formatLastActive(contact.lastActive) : ''}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="text-sm text-gray-500 truncate">
                                                            {contact.lastMessage || 'Chưa có tin nhắn'}
                                                        </span>
                                                        {contact.unreadCount > 0 && (
                                                            <span className="ml-2 bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                                                {contact.unreadCount}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-6 h-full">
                                            <RiMessage2Line className="text-gray-400 text-4xl mb-2" />
                                            <p className="text-gray-500 text-center">Không tìm thấy liên hệ phù hợp</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="messages"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={fadeIn}
                            className="h-full"
                        >
                            {/* Chat Content - Mobile */}
                            {renderChatContent()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex flex-row h-full">
                {/* Contact List - Desktop */}
                <div className="w-1/3 border-r border-gray-200 flex flex-col">
                    {/* Search Header - Desktop */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm liên hệ..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    {/* Contact List - Desktop */}
                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
                            </div>
                        ) : filteredContacts.length > 0 ? (
                            filteredContacts.map(contact => (
                                <motion.div
                                    key={contact.id}
                                    variants={slideIn}
                                    initial="hidden"
                                    animate="visible"
                                    className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact?.id === contact.id ? 'bg-gray-100' : ''}`}
                                    onClick={() => selectContact(contact)}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                                        </div>
                                        {getStatusIndicator(contact.status)}
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-800 truncate">{contact.name}</span>
                                            <span className="text-xs text-gray-500">
                                                {contact.lastActive ? formatLastActive(contact.lastActive) : ''}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-sm text-gray-500 truncate max-w-[120px]">
                                                {contact.lastMessage || 'Chưa có tin nhắn'}
                                            </span>
                                            {contact.unreadCount > 0 && (
                                                <span className="ml-2 bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                                    {contact.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6 h-full">
                                <RiMessage2Line className="text-gray-400 text-4xl mb-2" />
                                <p className="text-gray-500 text-center">Không tìm thấy liên hệ phù hợp</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Content - Desktop */}
                <div className="w-2/3 flex flex-col">
                    {renderChatContent()}
                </div>
            </div>
        </div>
    );

    function renderChatContent() {
        return (
            <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
                    {/* Back button for mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={handleBackToContacts}
                            className="mr-2 p-1 hover:bg-gray-100 rounded-full"
                        >
                            <RiArrowLeftLine className="text-gray-600" />
                        </button>
                    </div>

                    {selectedContact ? (
                        <>
                            <div className="flex items-center">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                        <img
                                            src={selectedContact.avatar}
                                            alt={selectedContact.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {getStatusIndicator(selectedContact.status)}
                                </div>
                                <div className="ml-3">
                                    <div className="font-medium">{selectedContact.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {selectedContact.status === 'online' ? 'Đang hoạt động' : `Hoạt động ${formatLastActive(selectedContact.lastActive)}`}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-1">
                                <button className="p-2 hover:bg-gray-100 rounded-full" title="Gọi điện">
                                    <RiPhoneLine className="text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full" title="Gọi video">
                                    <RiVideoLine className="text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full" title="Thông tin">
                                    <RiInformationLine className="text-gray-600" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 text-center text-gray-500">
                            Chọn một liên hệ để bắt đầu trò chuyện
                        </div>
                    )}
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {selectedContact ? (
                        messages.length > 0 ? (
                            <div>
                                {messages.map((message, index) => {
                                    const isCurrentUser = message.senderId === 'currentUser';

                                    return (
                                        <div key={message.id}>
                                            {renderMessageDate(message, index)}
                                            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
                                                {!isCurrentUser && (
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2 flex-shrink-0 mt-1">
                                                        <img
                                                            src={selectedContact.avatar}
                                                            alt={selectedContact.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`max-w-[80%] ${isCurrentUser ? 'order-1' : 'order-2'}`}
                                                >
                                                    <div
                                                        className={`px-4 py-2 rounded-2xl ${isCurrentUser
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-white border border-gray-200 text-gray-800'
                                                            }`}
                                                    >
                                                        {message.content}
                                                    </div>

                                                    {message.attachments && message.attachments.length > 0 && (
                                                        <div className={`mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                                            {message.attachments.map(attachment => (
                                                                <div key={attachment.id} className="inline-block max-w-xs">
                                                                    {renderAttachment(attachment)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className={`flex items-center mt-1 text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                                        <span>{formatMessageTime(message.timestamp)}</span>
                                                        {isCurrentUser && (
                                                            <div className="flex items-center ml-1">
                                                                <RiCheckDoubleLine className={`ml-1 ${message.isRead ? 'text-blue-500' : 'text-gray-400'}`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <RiMessage2Line className="text-2xl text-gray-400" />
                                </div>
                                <p className="mb-1">Hãy bắt đầu cuộc trò chuyện với {selectedContact.name}</p>
                                <p className="text-sm text-gray-400">Tin nhắn của bạn sẽ hiện ở đây</p>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <RiMessage2Line className="text-2xl text-gray-400" />
                            </div>
                            <p className="mb-1">Chưa có cuộc trò chuyện nào</p>
                            <p className="text-sm text-gray-400">Chọn một liên hệ để bắt đầu trò chuyện</p>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                {selectedContact && (
                    <>
                        {/* Attachment Preview */}
                        {pendingAttachments.length > 0 && (
                            <div className="px-4 pt-2 flex flex-wrap gap-2 bg-white border-t border-gray-200">
                                {pendingAttachments.map(attachment => (
                                    <div
                                        key={attachment.id}
                                        className="relative group border rounded-lg overflow-hidden"
                                        style={{ width: '80px', height: '80px' }}
                                    >
                                        {attachment.type === 'image' ? (
                                            <img
                                                src={attachment.url}
                                                alt={attachment.fileName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <RiFileTextLine className="text-2xl text-gray-500" />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleRemoveAttachment(attachment.id)}
                                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <RiCloseLine className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="p-3 bg-white border-t border-gray-200 flex items-end">
                            <div className="flex">
                                <button
                                    onClick={() => setShowEmojis(!showEmojis)}
                                    className="p-2 mr-1 hover:bg-gray-100 rounded-full text-gray-500 focus:outline-none"
                                    title="Biểu tượng cảm xúc"
                                >
                                    <RiEmotionHappyLine />
                                </button>
                                <button
                                    onClick={() => setShowAttachmentUploader(true)}
                                    className="p-2 mr-1 hover:bg-gray-100 rounded-full text-gray-500 focus:outline-none"
                                    title="Đính kèm tệp"
                                >
                                    <RiAttachment2 />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 focus:outline-none"
                                    title="Hình ảnh"
                                >
                                    <RiImageLine />
                                </button>
                            </div>

                            <textarea
                                ref={messageInputRef}
                                className="flex-1 mx-2 py-2 px-3 border rounded-2xl max-h-24 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
                                placeholder="Nhập tin nhắn..."
                                rows={1}
                                value={newMessage}
                                onChange={handleTextAreaInput}
                                onKeyDown={handleMessageKeyDown}
                            />

                            <button
                                className={`p-2 rounded-full ${newMessage.trim() || pendingAttachments.length > 0
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-gray-100 text-gray-400'}`}
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim() && pendingAttachments.length === 0}
                                title="Gửi"
                            >
                                <RiSendPlaneFill />
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    }
 
}
