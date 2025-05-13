import React from 'react';
import TrainerCard, { TrainerInfo } from './TrainerCard';

interface TopTrainersProps {
  trainers: TrainerInfo[];
}

const TopTrainers: React.FC<TopTrainersProps> = ({ trainers }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          HLV hiệu quả nhất tháng
        </h3>
        <button type="button" className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
          Xem tất cả
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {trainers.map((trainer, idx) => (
              <TrainerCard key={trainer.id} trainer={trainer} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTrainers;