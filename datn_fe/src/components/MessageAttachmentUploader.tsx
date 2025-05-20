'use client';

import { MessageAttachment, useMessage } from '@/context/MessageContext';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface MessageAttachmentUploaderProps {
  onAttachmentAdded?: (attachment: MessageAttachment) => void;
  className?: string;
}

const MessageAttachmentUploader: React.FC<MessageAttachmentUploaderProps> = ({ 
  onAttachmentAdded,
  className = ''
}) => {
  const { uploadAttachment, isLoading } = useMessage();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maximum file size in bytes (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  // Allowed file types
  const ALLOWED_FILE_TYPES = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
    'text/plain'
  ];

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): boolean => {
    setError('');

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`Tệp tin quá lớn. Giới hạn là ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return false;
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('Định dạng tệp không được hỗ trợ.');
      return false;
    }

    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) return;

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 200);

      // Upload the file
      const attachment = await uploadAttachment(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (attachment && onAttachmentAdded) {
        onAttachmentAdded(attachment);
      }

      // Reset after 1 second
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      setError('Có lỗi xảy ra khi tải lên tệp.');
      setUploadProgress(0);
      console.error('Upload error:', error);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`${className}`}>
      {error && (
        <div className="bg-red-50 text-red-700 p-2 mb-2 rounded-md text-sm">
          {error}
          <button 
            className="ml-2 text-red-900"
            onClick={() => setError('')}
          >
            &times;
          </button>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer flex flex-col items-center justify-center 
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'} 
          ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
          ref={fileInputRef}
        />
        
        <div className="text-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
          ) : (
            <>
              <div className="text-primary mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm font-medium">Kéo thả tệp hoặc nhấp để chọn</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, PDF (Tối đa 5MB)</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageAttachmentUploader;

export const MessageAttachmentPreview: React.FC<{
  attachment: MessageAttachment;
  onDelete?: () => void;
  className?: string;
}> = ({ attachment, onDelete, className = '' }) => {
  const isImage = attachment.type === 'image';

  return (
    <div className={`relative border rounded-md overflow-hidden ${className}`}>
      {isImage ? (
        <div className="relative h-20 w-20">
          <Image 
            src={attachment.url} 
            alt={attachment.fileName} 
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center p-2 bg-gray-50">
          <div className="p-2 bg-blue-100 rounded-md text-blue-700 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{attachment.fileName}</p>
            <p className="text-xs text-gray-500">{attachment.fileSize}</p>
          </div>
        </div>
      )}
      
      {onDelete && (
        <button 
          onClick={onDelete}
          className="absolute top-0 right-0 bg-red-100 text-red-700 rounded-full p-1 shadow-sm transform translate-x-1/3 -translate-y-1/3 hover:bg-red-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
