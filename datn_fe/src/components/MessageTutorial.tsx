'use client';

import { useAuth } from '@/context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
    RiAttachmentLine,
    RiChat1Line,
    RiCheckDoubleLine,
    RiCloseLine,
    RiInformationLine,
    RiMessage2Line,
    RiNotification2Line,
    RiQuestionLine,
    RiSearchLine
} from 'react-icons/ri';

interface MessageTutorialProps {
  className?: string;
}

export default function MessageTutorial({ className = '' }: MessageTutorialProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  if (!user) return null;

  const tutorialSteps = [
    {
      title: 'Danh sách liên hệ',
      description: 'Tìm và chọn người bạn muốn nhắn tin từ danh sách liên hệ ở bên trái. Chỉ báo trạng thái và số tin nhắn chưa đọc được hiển thị rõ ràng.',
      icon: <RiChat1Line className="text-2xl" />
    },
    {
      title: 'Tìm kiếm',
      description: 'Dễ dàng tìm kiếm liên hệ hoặc nội dung tin nhắn bằng thanh tìm kiếm. Bạn có thể tìm theo tên, nội dung hoặc thời gian.',
      icon: <RiSearchLine className="text-2xl" />
    },
    {
      title: 'Đính kèm tệp',
      description: 'Gửi hình ảnh hoặc tệp văn bản bằng cách nhấp vào nút đính kèm. Hỗ trợ nhiều định dạng tệp phổ biến.',
      icon: <RiAttachmentLine className="text-2xl" />
    },
    {
      title: 'Thông báo',
      description: 'Nhận thông báo khi có tin nhắn mới. Số lượng tin nhắn chưa đọc sẽ hiển thị trên biểu tượng thông báo.',
      icon: <RiNotification2Line className="text-2xl" />
    },
    {
      title: 'Trạng thái tin nhắn',
      description: 'Biết khi nào tin nhắn của bạn đã được gửi, giao và đọc thông qua các chỉ báo trạng thái tin nhắn.',
      icon: <RiCheckDoubleLine className="text-2xl" />
    }
  ];
  
  const nextStep = () => {
    if (activeStep < tutorialSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setShowGuide(false);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderContent = () => {
    switch (user.role) {
      case 'user':
        return (
          <>
            <h3 className="text-lg font-bold mb-3">Tin nhắn với huấn luyện viên</h3>
            <p className="mb-3">
              Bạn có thể sử dụng hệ thống tin nhắn để:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Liên hệ trực tiếp với huấn luyện viên cá nhân</li>
              <li>Đặt câu hỏi về lịch tập hoặc chế độ dinh dưỡng</li>
              <li>Thay đổi lịch hẹn khi cần thiết</li>
              <li>Nhận tư vấn và hỗ trợ từ quản trị viên</li>
            </ul>
            <p className="mb-2">
              Tin nhắn của bạn sẽ được phản hồi trong thời gian sớm nhất.
            </p>
            <div className="mt-4">
              <button 
                onClick={() => setShowGuide(true)}
                className="text-sm flex items-center text-red-600 hover:text-red-700"
              >
                <RiQuestionLine className="mr-1" /> Xem hướng dẫn sử dụng chat mới
              </button>
            </div>
          </>
        );
      case 'trainer':
        return (
          <>
            <h3 className="text-lg font-bold mb-3">Tin nhắn với học viên</h3>
            <p className="mb-3">
              Hệ thống tin nhắn giúp bạn:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Liên lạc trực tiếp với tất cả học viên của bạn</li>
              <li>Gửi lịch tập và hướng dẫn cá nhân hóa</li>
              <li>Cập nhật thông tin về lịch hẹn và thay đổi</li>
              <li>Gửi lời nhắc và động viên cho học viên</li>
            </ul>
            <p className="mb-2">
              Việc phản hồi kịp thời sẽ giúp nâng cao chất lượng dịch vụ và sự hài lòng của học viên.
            </p>
            <div className="mt-4">
              <button 
                onClick={() => setShowGuide(true)}
                className="text-sm flex items-center text-red-600 hover:text-red-700"
              >
                <RiQuestionLine className="mr-1" /> Xem hướng dẫn sử dụng chat mới
              </button>
            </div>
          </>
        );
      case 'admin':
        return (
          <>
            <h3 className="text-lg font-bold mb-3">Quản lý tin nhắn</h3>
            <p className="mb-3">
              Với tư cách là quản trị viên, bạn có thể:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Theo dõi các cuộc hội thoại giữa huấn luyện viên và học viên</li>
              <li>Hỗ trợ giải quyết vấn đề khi được yêu cầu</li>
              <li>Gửi thông báo quan trọng đến tất cả người dùng</li>
              <li>Trả lời các câu hỏi liên quan đến dịch vụ và thanh toán</li>
            </ul>
            <p className="mb-2">
              Hãy đảm bảo phản hồi mọi tin nhắn trong vòng 24 giờ.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`${className} bg-white p-5 rounded-lg shadow-md`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <RiInformationLine size={24} className="text-red-500" />
          </div>
          <div className="ml-3 flex-grow">
            {isOpen ? (
              <div>
                {renderContent()}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Đóng
                  </button>
                  <Link
                    href="/account/messages"
                    className="inline-flex items-center text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    <RiMessage2Line className="mr-1" />
                    Đi đến tin nhắn
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <h3 className="font-medium">
                  Tìm hiểu về tính năng nhắn tin mới
                </h3>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tutorial Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="relative">
                {/* Header */}
                <div className="py-4 px-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Hướng dẫn tính năng nhắn tin</h3>
                  <button 
                    onClick={() => setShowGuide(false)}
                    className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                  >
                    <RiCloseLine className="text-xl" />
                  </button>
                </div>
                
                {/* Step content */}
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      {tutorialSteps[activeStep].icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-center mb-2">
                    {tutorialSteps[activeStep].title}
                  </h4>
                  <p className="text-gray-600 text-center mb-6">
                    {tutorialSteps[activeStep].description}
                  </p>
                  
                  {/* Progress indicators */}
                  <div className="flex justify-center gap-2 mb-6">
                    {tutorialSteps.map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${index === activeStep ? 'bg-red-600' : 'bg-gray-300'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Footer actions */}
                <div className="py-3 px-6 border-t border-gray-200 flex justify-between">
                  <div>
                    {activeStep > 0 && (
                      <button 
                        onClick={prevStep}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                      >
                        Quay lại
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/documents/message-tutorial.md"
                      target="_blank"
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Đọc thêm
                    </Link>
                    <button 
                      onClick={nextStep}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      {activeStep < tutorialSteps.length - 1 ? 'Tiếp tục' : 'Hoàn thành'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
