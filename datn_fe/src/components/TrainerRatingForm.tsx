'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { RiCloseLine, RiUploadCloud2Line } from 'react-icons/ri';
import RatingStars from './RatingStars';

interface TrainerRatingFormProps {
  trainerId: string;
  sessionId?: string;
  onSubmit: (ratingData: any) => Promise<void>;
  onCancel?: () => void;
}

export default function TrainerRatingForm({ trainerId, sessionId, onSubmit, onCancel }: TrainerRatingFormProps) {
  const [overall, setOverall] = useState(0);
  const [expertise, setExpertise] = useState(0);
  const [attitude, setAttitude] = useState(0);
  const [effectiveness, setEffectiveness] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 4 images max
      const totalImages = [...images, ...newFiles].slice(0, 4);
      setImages(totalImages);
      
      // Generate preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviews].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreviewUrls];
    
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImages(updatedImages);
    setImagePreviewUrls(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (overall === 0) {
      alert('Vui lòng đánh giá tổng thể cho buổi tập.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would create a FormData object and append images
      const formData = new FormData();
      formData.append('trainerId', trainerId);
      if (sessionId) formData.append('sessionId', sessionId);
      formData.append('rating', overall.toString());
      formData.append('expertise', expertise.toString());
      formData.append('attitude', attitude.toString());
      formData.append('effectiveness', effectiveness.toString());
      formData.append('comment', comment);
      formData.append('isPublic', isPublic.toString());
      
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      
      // Mock submission for demo - replace with actual API call
      await onSubmit(formData);
      
      // Reset form
      setOverall(0);
      setExpertise(0);
      setAttitude(0);
      setEffectiveness(0);
      setComment('');
      setImages([]);
      setImagePreviewUrls([]);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Đã có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Đánh giá huấn luyện viên</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Đánh giá tổng thể <span className="text-red-500">*</span></label>
          <RatingStars initialRating={overall} onChange={setOverall} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Chuyên môn</label>
            <RatingStars initialRating={expertise} onChange={setExpertise} />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Thái độ</label>
            <RatingStars initialRating={attitude} onChange={setAttitude} />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Hiệu quả</label>
            <RatingStars initialRating={effectiveness} onChange={setEffectiveness} />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Nhận xét</label>
          <textarea 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn với huấn luyện viên này..."
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Hình ảnh (tùy chọn)</label>
          <p className="text-sm text-gray-500 mb-2">Có thể đính kèm tối đa 4 hình ảnh</p>
          
          <div className="flex flex-wrap gap-4">
            {imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image 
                  src={url} 
                  alt={`Preview ${index}`} 
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeImage(index)}
                >
                  <RiCloseLine size={16} />
                </button>
              </div>
            ))}
            
            {images.length < 4 && (
              <div 
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiUploadCloud2Line size={24} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Tải lên</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isPublic" className="text-gray-700">
            Hiển thị đánh giá này công khai
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Hủy bỏ
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang gửi...
              </>
            ) : (
              'Gửi đánh giá'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
