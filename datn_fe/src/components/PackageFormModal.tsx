import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export interface PackageDuration {
  id?: number;
  type: 'day' | 'month' | 'session';
  value: number;
  price: number;
  discount: number;
}

export interface PackageFormData {
  id?: number;
  name: string;
  type: 'gym' | 'pt' | 'yoga' | 'zumba';
  basePrice: number;
  isActive: boolean;
  durations: PackageDuration[];
}

interface PackageFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: PackageFormData;
  onSave: (data: PackageFormData) => void;
  title: string;
}

export default function PackageFormModal({ 
  isOpen, 
  closeModal, 
  initialData, 
  onSave,
  title
}: PackageFormModalProps) {
  const defaultPackage: PackageFormData = {
    name: '',
    type: 'gym',
    basePrice: 0,
    isActive: true,
    durations: [
      { type: 'day', value: 30, price: 0, discount: 0 }
    ]
  };
  
  const [formData, setFormData] = useState<PackageFormData>(defaultPackage);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // If initialData is provided, use it
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultPackage);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (name === 'basePrice') {
      const price = parseInt(value.replace(/[^\d]/g, '') || '0', 10);
      setFormData(prev => ({ ...prev, [name]: price }));
      
      // Update all durations prices based on the new base price if they have no discount
      setFormData(prev => ({
        ...prev,
        durations: prev.durations.map(duration => {
          if (duration.discount === 0) {
            let multiplier = 1;
            if (duration.type === 'month' && duration.value > 1) {
              multiplier = duration.value;
            }
            return { ...duration, price: price * multiplier };
          }
          return duration;
        })
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDurationChange = (index: number, field: keyof PackageDuration, value: any) => {
    const updatedDurations = [...formData.durations];
    
    // If changing type or value fields
    if (field === 'type' || field === 'value') {
      updatedDurations[index] = {
        ...updatedDurations[index],
        [field]: value
      };
      
      // Recalculate price based on type, value, and discount
      const basePrice = formData.basePrice;
      let multiplier = 1;
      
      if (field === 'type') {
        if (value === 'month' && updatedDurations[index].value > 1) {
          multiplier = updatedDurations[index].value;
        }
      } else if (field === 'value') {
        if (updatedDurations[index].type === 'month' && value > 1) {
          multiplier = value;
        }
      }
      
      const discount = updatedDurations[index].discount / 100;
      const discountedPrice = basePrice * multiplier * (1 - discount);
      
      updatedDurations[index].price = Math.round(discountedPrice);
    }
    // If changing discount field
    else if (field === 'discount') {
      const discount = parseInt(value, 10) || 0;
      updatedDurations[index] = {
        ...updatedDurations[index],
        discount
      };
      
      // Recalculate price based on discount
      const basePrice = formData.basePrice;
      let multiplier = 1;
      
      if (updatedDurations[index].type === 'month' && updatedDurations[index].value > 1) {
        multiplier = updatedDurations[index].value;
      }
      
      const discountedPrice = basePrice * multiplier * (1 - discount / 100);
      updatedDurations[index].price = Math.round(discountedPrice);
    }
    // If changing price directly
    else if (field === 'price') {
      updatedDurations[index] = {
        ...updatedDurations[index],
        price: parseInt(value.replace(/[^\d]/g, '') || '0', 10)
      };
    }
    
    setFormData(prev => ({
      ...prev,
      durations: updatedDurations
    }));
  };

  const addDuration = () => {
    const newDuration: PackageDuration = {
      type: 'day',
      value: 30,
      price: formData.basePrice,
      discount: 0
    };
    
    setFormData(prev => ({
      ...prev,
      durations: [...prev.durations, newDuration]
    }));
  };

  const removeDuration = (index: number) => {
    // Don't allow removing if only one duration exists
    if (formData.durations.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      durations: prev.durations.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên gói không được để trống';
    }
    
    if (formData.basePrice <= 0) {
      newErrors.basePrice = 'Giá cơ bản phải lớn hơn 0';
    }
    
    formData.durations.forEach((duration, index) => {
      if (duration.value <= 0) {
        newErrors[`duration_${index}_value`] = 'Giá trị phải lớn hơn 0';
      }
      
      if (duration.price <= 0) {
        newErrors[`duration_${index}_price`] = 'Giá phải lớn hơn 0';
      }
      
      if (duration.discount < 0 || duration.discount > 100) {
        newErrors[`duration_${index}_discount`] = 'Giảm giá phải từ 0 đến 100';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      closeModal();
    }
  };

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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Tên gói <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Loại gói <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="gym">GYM</option>
                        <option value="pt">PT</option>
                        <option value="yoga">YOGA</option>
                        <option value="zumba">ZUMBA</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Giá cơ bản <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="basePrice"
                          name="basePrice"
                          value={formData.basePrice.toLocaleString()}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.basePrice ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        <span className="absolute right-3 top-2">₫</span>
                      </div>
                      {errors.basePrice && <p className="mt-1 text-red-500 text-sm">{errors.basePrice}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                      </label>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="h-4 w-4 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                          Đang hoạt động
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-md font-medium text-gray-700">Thời hạn và giá</h4>
                      <button
                        type="button"
                        onClick={addDuration}
                        className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90"
                      >
                        + Thêm thời hạn
                      </button>
                    </div>

                    {formData.durations.map((duration, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Loại <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={duration.type}
                              onChange={(e) => handleDurationChange(index, 'type', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="day">Ngày</option>
                              <option value="month">Tháng</option>
                              {formData.type === 'pt' && <option value="session">Buổi tập</option>}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Giá trị <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={duration.value}
                              onChange={(e) => handleDurationChange(index, 'value', parseInt(e.target.value, 10) || 0)}
                              className={`w-full p-2 border ${errors[`duration_${index}_value`] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            />
                            {errors[`duration_${index}_value`] && (
                              <p className="mt-1 text-red-500 text-sm">{errors[`duration_${index}_value`]}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Giảm giá (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={duration.discount}
                              onChange={(e) => handleDurationChange(index, 'discount', parseInt(e.target.value, 10) || 0)}
                              className={`w-full p-2 border ${errors[`duration_${index}_discount`] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            />
                            {errors[`duration_${index}_discount`] && (
                              <p className="mt-1 text-red-500 text-sm">{errors[`duration_${index}_discount`]}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Giá <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={duration.price.toLocaleString()}
                                onChange={(e) => handleDurationChange(index, 'price', e.target.value)}
                                className={`w-full p-2 border ${errors[`duration_${index}_price`] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                              />
                              <span className="absolute right-3 top-2">₫</span>
                            </div>
                            {errors[`duration_${index}_price`] && (
                              <p className="mt-1 text-red-500 text-sm">{errors[`duration_${index}_price`]}</p>
                            )}
                          </div>
                        </div>

                        {formData.durations.length > 1 && (
                          <div className="mt-2 text-right">
                            <button
                              type="button"
                              onClick={() => removeDuration(index)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Xóa
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={closeModal}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Lưu gói tập
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
