'use client';

import { useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortAsc } from 'react-icons/ri';
import TrainerRating from './TrainerRating';

interface Rating {
  id: string;
  trainerName: string;
  trainerId: string;
  trainerAvatar?: string;
  sessionId?: string;
  sessionDate?: Date;
  rating: number;
  expertise: number;
  attitude: number;
  effectiveness: number;
  comment: string;
  images: string[];
  createdAt: Date;
  trainerReply?: {
    text: string;
    createdAt: Date;
  };
  likeCount: number;
  dislikeCount: number;
}

// This would typically come from an API
const MOCK_RATINGS: Rating[] = [
  {
    id: '1',
    trainerName: 'Huấn luyện viên A',
    trainerId: 'trainer1',
    trainerAvatar: 'https://via.placeholder.com/150',
    sessionId: 'session1',
    sessionDate: new Date('2023-04-15'),
    rating: 5,
    expertise: 5,
    attitude: 5,
    effectiveness: 5,
    comment: 'Huấn luyện viên rất nhiệt tình và chuyên nghiệp. Tôi đã học được nhiều kỹ thuật mới và cảm thấy rất hài lòng với buổi tập.',
    images: ['https://via.placeholder.com/300?text=Before', 'https://via.placeholder.com/300?text=After'],
    createdAt: new Date('2023-04-16'),
    trainerReply: {
      text: 'Cảm ơn bạn đã có những nhận xét tích cực. Tôi rất vui khi thấy bạn đạt được tiến bộ và mong được tiếp tục hướng dẫn bạn trong các buổi tập tới!',
      createdAt: new Date('2023-04-17'),
    },
    likeCount: 5,
    dislikeCount: 0,
  },
  {
    id: '2',
    trainerName: 'Huấn luyện viên B',
    trainerId: 'trainer2',
    trainerAvatar: 'https://via.placeholder.com/150',
    sessionId: 'session2',
    sessionDate: new Date('2023-05-20'),
    rating: 4,
    expertise: 4,
    attitude: 5,
    effectiveness: 3,
    comment: 'Buổi tập khá tốt nhưng tôi cảm thấy cần có thêm sự đa dạng trong bài tập. Huấn luyện viên rất thân thiện và động viên.',
    images: [],
    createdAt: new Date('2023-05-21'),
    likeCount: 2,
    dislikeCount: 0,
  },
  {
    id: '3',
    trainerName: 'Huấn luyện viên C',
    trainerId: 'trainer3',
    trainerAvatar: 'https://via.placeholder.com/150',
    sessionId: 'session3',
    sessionDate: new Date('2023-06-10'),
    rating: 3,
    expertise: 4,
    attitude: 2,
    effectiveness: 3,
    comment: 'Huấn luyện viên có kiến thức tốt nhưng đôi khi thiếu kiên nhẫn. Cần cải thiện về thái độ và cách giao tiếp với học viên.',
    images: ['https://via.placeholder.com/300?text=Training'],
    createdAt: new Date('2023-06-11'),
    trainerReply: {
      text: 'Cảm ơn bạn đã chia sẻ phản hồi. Tôi xin ghi nhận và sẽ cố gắng cải thiện trong những buổi tập sau.',
      createdAt: new Date('2023-06-12'),
    },
    likeCount: 1,
    dislikeCount: 2,
  },
];

export default function TrainerRatingsHistory() {
  const [ratings, setRatings] = useState<Rating[]>(MOCK_RATINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  const handleLike = (ratingId: string) => {
    setRatings(ratings.map(rating => 
      rating.id === ratingId 
        ? { ...rating, likeCount: rating.likeCount + 1 } 
        : rating
    ));
  };

  const handleDislike = (ratingId: string) => {
    setRatings(ratings.map(rating => 
      rating.id === ratingId 
        ? { ...rating, dislikeCount: rating.dislikeCount + 1 } 
        : rating
    ));
  };

  // Filter and sort ratings
  const filteredRatings = ratings
    .filter(rating => {
      const matchesSearch = searchTerm === '' || 
        rating.trainerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.comment.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = filterRating === null || rating.rating === filterRating;
      
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search input */}
        <div className="relative w-full md:w-1/3">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên HLV hoặc nội dung"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Filter by rating */}
        <div className="relative w-full md:w-1/3">
          <RiFilterLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filterRating || ''}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          >
            <option value="">Tất cả đánh giá</option>
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </select>
        </div>
        
        {/* Sort by */}
        <div className="relative w-full md:w-1/3">
          <RiSortAsc className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'highest' | 'lowest')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Đánh giá cao nhất</option>
            <option value="lowest">Đánh giá thấp nhất</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        {filteredRatings.length} đánh giá
      </div>

      {/* Ratings list */}
      <div className="space-y-4">
        {filteredRatings.length > 0 ? (
          filteredRatings.map(rating => (
            <div key={rating.id} className="border border-gray-100 rounded-lg shadow-sm p-4">
              <div className="mb-3">
                <div className="font-medium text-lg text-primary mb-1">{rating.trainerName}</div>
                {rating.sessionDate && (
                  <div className="text-sm text-gray-500">
                    Buổi tập ngày: {rating.sessionDate.toLocaleDateString('vi-VN')}
                  </div>
                )}
              </div>
              
              <TrainerRating
                id={rating.id}
                userName="Bạn"
                rating={rating.rating}
                expertise={rating.expertise}
                attitude={rating.attitude}
                effectiveness={rating.effectiveness}
                comment={rating.comment}
                images={rating.images}
                createdAt={rating.createdAt}
                trainerReply={rating.trainerReply}
                likeCount={rating.likeCount}
                dislikeCount={rating.dislikeCount}
                onLike={() => handleLike(rating.id)}
                onDislike={() => handleDislike(rating.id)}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500">Không tìm thấy đánh giá nào</h3>
            <p className="text-gray-400">Hãy thử thay đổi bộ lọc tìm kiếm của bạn</p>
          </div>
        )}
      </div>
    </div>
  );
}
