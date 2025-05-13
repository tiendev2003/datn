import React from 'react';

export interface TrainerInfo {
  id: number;
  name: string;
  sessions: number;
  rating: number;
}

interface TrainerCardProps {
  trainer: TrainerInfo;
  index: number;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, index }) => {
  // Xác định màu nền cho hạng thứ tự
  const getRankBgColor = (position: number) => {
    switch (position) {
      case 0: // Vàng - hạng 1
        return "bg-yellow-500 dark:bg-yellow-300";
      case 1: // Bạc - hạng 2
        return "bg-gray-400 dark:bg-gray-600";
      case 2: // Đồng - hạng 3
        return "bg-yellow-700 dark:bg-yellow-500";
      default:
        return "bg-gray-300 dark:bg-gray-700";
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-xl font-bold ${getRankBgColor(index)}`}>
              {index + 1}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {trainer.name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {trainer.sessions} buổi
                </div>
              </dd>
              <dd className="flex items-center">
                <div className="flex text-yellow-400 dark:text-yellow-300">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(trainer.rating) ? "text-yellow-400 dark:text-yellow-300" : "text-gray-300 dark:text-gray-600"}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({trainer.rating})</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;