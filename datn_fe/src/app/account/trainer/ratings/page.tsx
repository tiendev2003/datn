'use client';

import PageTitle from '@/components/PageTitle';
import TrainerRating from '@/components/TrainerRating';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

interface Rating {
  id: string;
  userName: string;
  userAvatar: string;
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
  likeCount: number;
  dislikeCount: number;
}

export default function TrainerRatings() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState<'all' | 'unanswered' | 'answered'>('all');
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  
  const [ratings, setRatings] = useState<Rating[]>([
    {
      id: '1',
      userName: 'Nguyễn Văn Z',
      userAvatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      rating: 5,
      expertise: 5,
      attitude: 5,
      effectiveness: 5,
      comment: 'HLV rất chuyên nghiệp và tận tình. Tôi đã đạt được kết quả tốt sau 1 tháng tập luyện.',
      createdAt: new Date('2025-05-14'),
      likeCount: 3,
      dislikeCount: 0
    },
    {
      id: '2',
      userName: 'Lê Thị M',
      userAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4,
      expertise: 4,
      attitude: 5,
      effectiveness: 3,
      comment: 'HLV có phương pháp giảng dạy rất dễ hiểu. Tuy nhiên, tôi mong muốn có thêm các bài tập đa dạng hơn.',
      createdAt: new Date('2025-05-12'),
      trainerReply: {
        text: 'Cảm ơn bạn đã đánh giá. Tôi sẽ cố gắng đa dạng hóa các bài tập trong các buổi sắp tới để phù hợp với nhu cầu của bạn.',
        createdAt: new Date('2025-05-13')
      },
      likeCount: 2,
      dislikeCount: 0
    },
    {
      id: '3',
      userName: 'Phạm Văn K',
      userAvatar: 'https://randomuser.me/api/portraits/men/82.jpg',
      rating: 3,
      expertise: 4,
      attitude: 3,
      effectiveness: 2,
      comment: 'HLV có kiến thức chuyên môn tốt, nhưng tôi cảm thấy chưa thực sự hiệu quả sau 2 tuần tập luyện.',
      createdAt: new Date('2025-05-10'),
      images: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      likeCount: 1,
      dislikeCount: 1
    },
    {
      id: '4',
      userName: 'Trần Thị H',
      userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 5,
      expertise: 5,
      attitude: 5,
      effectiveness: 5,
      comment: 'Tôi đã tập với nhiều PT khác nhưng chưa từng gặp HLV nào tận tâm như vậy. Cảm ơn vì đã giúp tôi đạt được mục tiêu của mình.',
      createdAt: new Date('2025-05-08'),
      trainerReply: {
        text: 'Cảm ơn bạn rất nhiều vì những lời đánh giá tích cực. Tôi rất vui khi biết rằng bạn đã đạt được mục tiêu của mình. Hãy tiếp tục giữ vững kết quả nhé!',
        createdAt: new Date('2025-05-09')
      },
      likeCount: 5,
      dislikeCount: 0
    }
  ]);
  
  // Prepare for reply
  const [replyText, setReplyText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect if not authenticated or not a trainer
    if (!isLoading && (!isAuthenticated || user?.role !== 'trainer')) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router, isLoading, user]);

  const filteredRatings = ratings.filter(rating => {
    // Filter by answered/unanswered
    if (ratingFilter === 'answered' && !rating.trainerReply) return false;
    if (ratingFilter === 'unanswered' && rating.trainerReply) return false;
    
    // Filter by star rating
    if (starFilter !== 'all' && rating.rating !== starFilter) return false;
    
    return true;
  });
  
  const handleReplyClick = (id: string) => {
    setReplyingToId(id);
    setReplyText('');
    
    // Scroll to the reply form
    setTimeout(() => {
      const element = document.getElementById('reply-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyingToId || !replyText.trim()) return;
    
    // Update the ratings with the new reply
    setRatings(prevRatings => 
      prevRatings.map(rating => 
        rating.id === replyingToId 
          ? {
              ...rating,
              trainerReply: {
                text: replyText,
                createdAt: new Date()
              }
            }
          : rating
      )
    );
    
    // Reset form
    setReplyingToId(null);
    setReplyText('');
  };
  
  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyText('');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Quản lý đánh giá" />
      
      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="text-lg font-bold">Tổng số đánh giá: {ratings.length}</div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value as 'all' | 'unanswered' | 'answered')}
            >
              <option value="all">Tất cả</option>
              <option value="unanswered">Chưa trả lời</option>
              <option value="answered">Đã trả lời</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={starFilter}
              onChange={(e) => setStarFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            >
              <option value="all">Mọi đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
            <RiFilterLine className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Ratings List */}
      <div className="space-y-4">
        {filteredRatings.length > 0 ? (
          filteredRatings.map((rating, index) => (
            <motion.div
              key={rating.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TrainerRating
                id={rating.id}
                userName={rating.userName}
                userAvatar={rating.userAvatar}
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
              />
              
              {!rating.trainerReply && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleReplyClick(rating.id)}
                    className="text-primary hover:underline text-sm"
                  >
                    Trả lời đánh giá này
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <p className="text-gray-500">Không tìm thấy đánh giá nào phù hợp với bộ lọc của bạn.</p>
          </div>
        )}
      </div>
      
      {/* Reply Form */}
      {replyingToId && (
        <motion.div
          id="reply-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold mb-4">Trả lời đánh giá</h2>
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div>
              <label htmlFor="reply" className="block text-gray-700 font-medium mb-2">Nội dung phản hồi</label>
              <textarea
                id="reply"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Viết phản hồi của bạn ở đây..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={handleCancelReply}
              >
                Hủy
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                disabled={!replyText.trim()}
              >
                Gửi phản hồi
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
