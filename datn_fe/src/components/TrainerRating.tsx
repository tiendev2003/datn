'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import { useState } from 'react';
import { RiCloseLine, RiImageLine, RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';
import RatingStars from './RatingStars';

interface TrainerRatingProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  expertise?: number;
  attitude?: number;
  effectiveness?: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  trainerReply?: {
    text: string;
    createdAt: Date;
  };
  onLike?: () => void;
  onDislike?: () => void;
  likeCount?: number;
  dislikeCount?: number;
}

export default function TrainerRating({
  id,
  userName,
  userAvatar,
  rating,
  expertise,
  attitude,
  effectiveness,
  comment,
  images = [],
  createdAt,
  trainerReply,
  onLike,
  onDislike,
  likeCount = 0,
  dislikeCount = 0
}: TrainerRatingProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const avatarUrl = userAvatar || "https://via.placeholder.com/40";
  
  const formatDate = (date: Date) => {
    return format(date, "dd 'tháng' MM, yyyy", { locale: vi });
  };
  
  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };
  
  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
      <div className="flex items-start">
        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
          <Image
            src={avatarUrl}
            alt={userName}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-800">{userName}</h4>
            <span className="hidden sm:inline text-gray-400">•</span>
            <time className="text-sm text-gray-500">{formatDate(createdAt)}</time>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 mr-2">Tổng thể:</span>
                <RatingStars initialRating={rating} readOnly size={16} />
              </div>
              
              {(expertise || attitude || effectiveness) && (
                <div className="text-sm text-gray-500">
                  {expertise && <span className="mr-2">Chuyên môn: {expertise}/5</span>}
                  {attitude && <span className="mr-2">Thái độ: {attitude}/5</span>}
                  {effectiveness && <span>Hiệu quả: {effectiveness}/5</span>}
                </div>
              )}
            </div>
            
            <p className="text-gray-700">{comment}</p>
          </div>
          
          {images.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <RiImageLine className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-500 font-medium">Hình ảnh ({images.length})</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(showAllImages ? images : images.slice(0, 3)).map((url, index) => (
                  <div key={index} className="relative h-16 w-16 cursor-pointer rounded-md overflow-hidden" onClick={() => handleImageClick(url)}>
                    <Image
                      src={url}
                      alt={`Hình ảnh ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                
                {!showAllImages && images.length > 3 && (
                  <button 
                    className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 transition-colors"
                    onClick={() => setShowAllImages(true)}
                  >
                    +{images.length - 3}
                  </button>
                )}
              </div>
            </div>
          )}
          
          {trainerReply && (
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <span className="font-medium text-gray-700">Phản hồi từ huấn luyện viên</span>
                <span className="mx-2 text-gray-400">•</span>
                <time className="text-xs text-gray-500">{formatDate(trainerReply.createdAt)}</time>
              </div>
              <p className="text-gray-700">{trainerReply.text}</p>
            </div>
          )}
          
          <div className="mt-3 flex items-center gap-4">
            <button 
              className="flex items-center text-gray-500 hover:text-primary transition-colors"
              onClick={onLike}
            >
              <RiThumbUpLine className="mr-1" />
              <span>{likeCount}</span>
            </button>
            
            <button 
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onDislike}
            >
              <RiThumbDownLine className="mr-1" />
              <span>{dislikeCount}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Image viewer modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closeImageViewer}>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
            />
            
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={closeImageViewer}
            >
              <RiCloseLine size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
