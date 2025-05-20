import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { RiCalendarLine, RiCloseLine, RiFileTextLine, RiHeartPulseLine, RiMailLine, RiPhoneLine, RiUser3Line } from 'react-icons/ri';

interface ClientDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  client: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    goals?: string;
    medicalHistory?: string;
    trainingHistory?: string;
    startDate?: string;
    notes?: string;
  };
}

export default function ClientDetailsModal({ isOpen, closeModal, client }: ClientDetailsModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Thông tin khách hàng
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-gray-100">
                        <Image
                          src={client.avatar || '/images/default-avatar.png'}
                          alt={client.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="mt-2 text-xl font-semibold">{client.name}</h4>
                      <p className="text-gray-500">ID: {client.id}</p>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <RiMailLine className="text-primary mr-2" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{client.email || 'Không có'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RiPhoneLine className="text-primary mr-2" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Điện thoại</p>
                            <p>{client.phone || 'Không có'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RiUser3Line className="text-primary mr-2" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Độ tuổi</p>
                            <p>{client.age || 'Không có'} tuổi</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RiUser3Line className="text-primary mr-2" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Giới tính</p>
                            <p>{client.gender || 'Không có'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RiHeartPulseLine className="text-primary mr-2" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Chiều cao/Cân nặng</p>
                            <p>
                              {client.height ? `${client.height} cm` : 'N/A'} / {client.weight ? `${client.weight} kg` : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RiCalendarLine className="text-primary mr-2" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                            <p>{client.startDate || 'Không có'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <h5 className="font-medium flex items-center mb-2">
                          <RiFileTextLine className="mr-2" /> Mục tiêu tập luyện
                        </h5>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                          {client.goals || 'Chưa có thông tin'}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium flex items-center mb-2">
                          <RiHeartPulseLine className="mr-2" /> Tiền sử bệnh
                        </h5>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                          {client.medicalHistory || 'Không có'}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium flex items-center mb-2">
                          <RiFileTextLine className="mr-2" /> Ghi chú
                        </h5>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                          {client.notes || 'Không có ghi chú'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    onClick={closeModal}
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
