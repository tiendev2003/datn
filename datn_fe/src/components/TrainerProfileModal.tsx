import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RiCalendarLine, RiCloseLine, RiMailLine, RiPhoneLine, RiStarFill, RiUserLine } from 'react-icons/ri';

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  rating: number;
  reviews: number;
  status: string;
  joinDate: string;
  availability: string;
}

interface TrainerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer;
}

export default function TrainerProfileModal({ isOpen, onClose, trainer }: TrainerProfileModalProps) {
  if (!trainer) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    Thông tin huấn luyện viên
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <RiUserLine size={64} className="text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                      <h2 className="text-2xl font-bold text-gray-800">{trainer.name}</h2>
                      <p className="text-gray-600 italic mb-4">{trainer.specialty}</p>
                      
                      <div className="mb-4 flex items-center">
                        <div className="flex items-center">
                          <span className="font-medium text-lg">{trainer.rating}</span>
                          <RiStarFill className="ml-1 text-yellow-500" size={20} />
                        </div>
                        <span className="text-gray-500 text-sm ml-2">({trainer.reviews} đánh giá)</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <RiMailLine className="text-gray-500 mr-2" />
                          <span>{trainer.email}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <RiPhoneLine className="text-gray-500 mr-2" />
                          <span>{trainer.phone}</span>
                        </div>
                        
                        <div className="flex items-start">
                          <RiCalendarLine className="text-gray-500 mr-2 mt-1" />
                          <div>
                            <p className="font-medium">Lịch làm việc:</p>
                            <p>{trainer.availability || 'Chưa cập nhật'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="font-medium">Ngày tham gia:</p>
                        <p>{trainer.joinDate}</p>
                      </div>
                      
                      <div className="mt-2">
                        <p className="font-medium">Trạng thái:</p>
                        {trainer.status === "active" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Ngừng hoạt động
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t mt-6 pt-6">
                    <h3 className="text-lg font-semibold mb-2">Thông tin chuyên môn</h3>
                    <p className="text-gray-700">
                      Chuyên môn: <span className="font-medium">{trainer.specialty}</span>
                    </p>
                    <p className="text-gray-500 mt-4 italic">
                      Thông tin chi tiết về kinh nghiệm huấn luyện sẽ được cập nhật...
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none"
                    onClick={onClose}
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
