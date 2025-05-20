'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function NewPaymentPage() {
  // Mock data - replace with API call later
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Gói Silver",
      duration: "1 tháng",
      price: 900000,
      features: [
        "Sử dụng tất cả thiết bị",
        "Giờ tập: 9:00 - 22:00",
        "Không giới hạn thời gian tập",
        "Tủ đồ cá nhân"
      ],
      recommended: false
    },
    {
      id: 2,
      name: "Gói Gold",
      duration: "1 tháng",
      price: 1200000,
      features: [
        "Sử dụng tất cả thiết bị",
        "Giờ tập: 6:00 - 22:00",
        "Không giới hạn thời gian tập",
        "Tủ đồ cá nhân",
        "Phòng tắm VIP",
        "1 buổi PT miễn phí"
      ],
      recommended: true
    },
    {
      id: 3,
      name: "Gói Platinum",
      duration: "1 tháng",
      price: 1500000,
      features: [
        "Sử dụng tất cả thiết bị",
        "Giờ tập 24/7",
        "Không giới hạn thời gian tập",
        "Tủ đồ cá nhân cao cấp",
        "Phòng tắm VIP",
        "2 buổi PT miễn phí",
        "Đồ uống miễn phí"
      ],
      recommended: false
    }
  ]);

  const [ptPackages, setPTPackages] = useState([
    {
      id: 4,
      name: "Gói 4 buổi PT",
      duration: "1 tháng",
      price: 1000000,
      pricePerSession: 250000,
      recommended: false
    },
    {
      id: 5,
      name: "Gói 8 buổi PT",
      duration: "2 tháng",
      price: 1900000,
      pricePerSession: 237500,
      recommended: true
    },
    {
      id: 6,
      name: "Gói 12 buổi PT",
      duration: "3 tháng",
      price: 2700000,
      pricePerSession: 225000,
      recommended: false
    }
  ]);

  // Payment form data
  const [formData, setFormData] = useState({
    packageId: null as number | null,
    ptPackageId: null as number | null,
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardHolder: '',
    bankingName: '',
    agreeTerms: false
  });

  // Form steps
  const [step, setStep] = useState(1);
  const [packageType, setPackageType] = useState('membership');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' && checked !== undefined ? checked : value
    });
  };

  // Select a membership package
  const handleSelectPackage = (id: number) => {
    setFormData({
      ...formData,
      packageId: id,
      ptPackageId: null
    });
  };

  // Select a PT package
  const handleSelectPTPackage = (id: number) => {
    setFormData({
      ...formData,
      packageId: null,
      ptPackageId: id
    });
  };

  // Handle payment method selection
  const handleSelectPaymentMethod = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };

  // Move to next step
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Move to previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        window.location.href = '/account/payments';
      }, 2000);
    }, 1500);
  };

  // Get selected package details
  const selectedPackage = formData.packageId 
    ? packages.find(pkg => pkg.id === formData.packageId)
    : formData.ptPackageId
      ? ptPackages.find(pkg => pkg.id === formData.ptPackageId)
      : null;

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/account/payments" className="flex items-center text-primary font-medium mb-2">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Thanh toán mới</h1>
        <p className="text-gray-600">Chọn gói tập và phương thức thanh toán</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="progress-step-number">1</div>
            <div className="progress-step-label">Chọn gói</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="progress-step-number">2</div>
            <div className="progress-step-label">Thanh toán</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="progress-step-number">3</div>
            <div className="progress-step-label">Xác nhận</div>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="card max-w-3xl mx-auto text-center p-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã thanh toán. Gói dịch vụ của bạn đã được kích hoạt.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/account/membership" className="btn btn-primary">
              Xem chi tiết gói tập
            </Link>
            <Link href="/account/dashboard" className="btn btn-outline">
              Về trang chủ
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Step 1: Select Package */}
          {step === 1 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md overflow-hidden">
                  <button
                    className={`px-5 py-2 ${packageType === 'membership' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setPackageType('membership')}
                  >
                    Gói tập
                  </button>
                  <button
                    className={`px-5 py-2 ${packageType === 'pt' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setPackageType('pt')}
                  >
                    Gói PT
                  </button>
                </div>
              </div>
              
              {packageType === 'membership' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      variants={item}
                      className={`relative rounded-xl overflow-hidden border-2 transition hover:shadow-lg ${
                        formData.packageId === pkg.id ? 'border-primary shadow-lg' : 'border-gray-200'
                      } ${pkg.recommended ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleSelectPackage(pkg.id)}
                    >
                      {pkg.recommended && (
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 transform translate-x-4 -translate-y-1 rotate-45">
                          Phổ biến
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                        <p className="text-gray-600">{pkg.duration}</p>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-gray-900">{pkg.price.toLocaleString('vi-VN')}</span>
                          <span className="text-gray-600"> VND</span>
                        </div>
                        <ul className="mt-6 space-y-2">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <button
                            className={`w-full py-2 rounded-lg transition ${
                              formData.packageId === pkg.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                            onClick={() => handleSelectPackage(pkg.id)}
                          >
                            {formData.packageId === pkg.id ? 'Đã chọn' : 'Chọn gói này'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {packageType === 'pt' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ptPackages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      variants={item}
                      className={`relative rounded-xl overflow-hidden border-2 transition hover:shadow-lg ${
                        formData.ptPackageId === pkg.id ? 'border-primary shadow-lg' : 'border-gray-200'
                      } ${pkg.recommended ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleSelectPTPackage(pkg.id)}
                    >
                      {pkg.recommended && (
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 transform translate-x-4 -translate-y-1 rotate-45">
                          Tiết kiệm
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                        <p className="text-gray-600">Hiệu lực: {pkg.duration}</p>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-gray-900">{pkg.price.toLocaleString('vi-VN')}</span>
                          <span className="text-gray-600"> VND</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{pkg.pricePerSession.toLocaleString('vi-VN')} VND / buổi</p>
                        <ul className="mt-6 space-y-2">
                          <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Huấn luyện viên chuyên nghiệp</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Lịch tập cá nhân hóa</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Theo dõi tiến độ</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Tư vấn dinh dưỡng</span>
                          </li>
                        </ul>
                        <div className="mt-8">
                          <button
                            className={`w-full py-2 rounded-lg transition ${
                              formData.ptPackageId === pkg.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                            onClick={() => handleSelectPTPackage(pkg.id)}
                          >
                            {formData.ptPackageId === pkg.id ? 'Đã chọn' : 'Chọn gói này'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-center mt-8">
                <button
                  className="btn btn-primary px-8"
                  onClick={handleNextStep}
                  disabled={!formData.packageId && !formData.ptPackageId}
                >
                  Tiếp tục
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto"
            >
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">Bước 2: Chọn phương thức thanh toán</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <motion.div
                    variants={item}
                    className={`payment-method-card border rounded-lg p-4 cursor-pointer text-center ${formData.paymentMethod === 'credit_card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                    onClick={() => handleSelectPaymentMethod('credit_card')}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">Thẻ tín dụng/ghi nợ</h3>
                  </motion.div>
                  
                  <motion.div
                    variants={item}
                    className={`payment-method-card border rounded-lg p-4 cursor-pointer text-center ${formData.paymentMethod === 'banking' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                    onClick={() => handleSelectPaymentMethod('banking')}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">Chuyển khoản ngân hàng</h3>
                  </motion.div>
                  
                  <motion.div
                    variants={item}
                    className={`payment-method-card border rounded-lg p-4 cursor-pointer text-center ${formData.paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                    onClick={() => handleSelectPaymentMethod('cash')}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">Tiền mặt</h3>
                  </motion.div>
                </div>
                
                {formData.paymentMethod === 'credit_card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Số thẻ</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Ngày hết hạn</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Mã bảo mật (CVV)</label>
                            <input
                              type="text"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleChange}
                              placeholder="XXX"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Tên chủ thẻ</label>
                          <input
                            type="text"
                            name="cardHolder"
                            value={formData.cardHolder}
                            onChange={handleChange}
                            placeholder="Nhập tên in trên thẻ"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {formData.paymentMethod === 'banking' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Chọn ngân hàng</label>
                        <select
                          name="bankingName"
                          value={formData.bankingName}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Chọn ngân hàng</option>
                          <option value="Techcombank">Techcombank</option>
                          <option value="Vietcombank">Vietcombank</option>
                          <option value="BIDV">BIDV</option>
                          <option value="VPBank">VPBank</option>
                          <option value="MB Bank">MB Bank</option>
                        </select>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded p-4">
                        <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
                        <p className="text-gray-700"><span className="font-medium">Số tài khoản:</span> 19038217635012</p>
                        <p className="text-gray-700"><span className="font-medium">Chủ tài khoản:</span> CÔNG TY TNHH GYM FITNESS CENTER</p>
                        <p className="text-gray-700"><span className="font-medium">Ngân hàng:</span> Techcombank</p>
                        <p className="text-gray-700"><span className="font-medium">Nội dung CK:</span> [Họ tên] thanh toan goi tap</p>
                        <p className="text-sm text-red-600 mt-2">* Vui lòng chuyển khoản trước khi đến trung tâm</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {formData.paymentMethod === 'cash' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center mb-4">
                        <svg className="w-8 h-8 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="font-medium">Thanh toán tiền mặt tại trung tâm</p>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Vui lòng đến trung tâm trong giờ hoạt động (6:00 - 22:00)</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Gói tập sẽ được kích hoạt ngay sau khi thanh toán</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Nhân viên tư vấn sẽ hỗ trợ bạn hoàn thành quá trình thanh toán</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <label htmlFor="agreeTerms" className="ml-2 text-gray-700">
                    Tôi đồng ý với <Link href="/terms" className="text-primary hover:underline">Điều khoản</Link> và <Link href="/privacy" className="text-primary hover:underline">Chính sách bảo mật</Link>
                  </label>
                </div>
                
                <div className="flex justify-between">
                  <button
                    className="btn btn-outline"
                    onClick={handlePrevStep}
                  >
                    Quay lại
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!formData.paymentMethod || !formData.agreeTerms || 
                      (formData.paymentMethod === 'credit_card' && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardHolder)) || 
                      (formData.paymentMethod === 'banking' && !formData.bankingName)
                    }
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review and Confirm */}
          {step === 3 && selectedPackage && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto"
            >
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">Bước 3: Xác nhận thanh toán</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Chi tiết đơn hàng</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gói dịch vụ</span>
                      <span className="text-gray-900 font-medium">{selectedPackage.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời hạn</span>
                      <span className="text-gray-900 font-medium">{selectedPackage.duration}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giá gói</span>
                      <span className="text-gray-900 font-medium">{selectedPackage.price.toLocaleString('vi-VN')} VND</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-900 font-semibold">Tổng tiền</span>
                        <span className="text-primary font-bold">{selectedPackage.price.toLocaleString('vi-VN')} VND</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Phương thức thanh toán</h3>
                  
                  <div className="flex items-center">
                    {formData.paymentMethod === 'credit_card' && (
                      <>
                        <svg className="w-6 h-6 text-gray-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <div>
                          <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                          <p className="text-gray-600 text-sm">{formData.cardNumber}</p>
                        </div>
                      </>
                    )}
                    
                    {formData.paymentMethod === 'banking' && (
                      <>
                        <svg className="w-6 h-6 text-gray-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                        </svg>
                        <div>
                          <p className="font-medium">Chuyển khoản ngân hàng</p>
                          <p className="text-gray-600 text-sm">{formData.bankingName}</p>
                        </div>
                      </>
                    )}
                    
                    {formData.paymentMethod === 'cash' && (
                      <>
                        <svg className="w-6 h-6 text-gray-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                        </svg>
                        <div>
                          <p className="font-medium">Tiền mặt tại trung tâm</p>
                          <p className="text-gray-600 text-sm">Thanh toán trực tiếp tại quầy</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    className="btn btn-outline"
                    onClick={handlePrevStep}
                  >
                    Quay lại
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : 'Xác nhận thanh toán'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
