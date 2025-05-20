'use client';

import PageTitle from '@/components/PageTitle';
import TrainerRatingsHistory from '@/components/TrainerRatingsHistory';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { RiStarLine } from 'react-icons/ri';

export default function AccountSettings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    
    const [profileData, setProfileData] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0987654321',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: 'Số 123, Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
    });
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    
    const [notificationsSettings, setNotificationsSettings] = useState({
        emailNotifications: true,
        smsNotifications: true,
        marketingEmails: false,
        appointmentReminders: true,
        promotionalOffers: false,
    });
    
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };
    
    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNotificationsSettings({
            ...notificationsSettings,
            [name]: checked,
        });
    };
    
    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        
        try {
            // Simulate API call
            setTimeout(() => {
                console.log('Updating profile:', profileData);
                setSuccessMessage('Thông tin cá nhân đã được cập nhật thành công!');
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
            setIsLoading(false);
        }
    };
    
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.');
            setIsLoading(false);
            return;
        }
        
        try {
            // Simulate API call
            setTimeout(() => {
                console.log('Updating password');
                setSuccessMessage('Mật khẩu đã được cập nhật thành công!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Không thể cập nhật mật khẩu. Vui lòng thử lại sau.');
            setIsLoading(false);
        }
    };
    
    const handleNotificationsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        
        try {
            // Simulate API call
            setTimeout(() => {
                console.log('Updating notification settings:', notificationsSettings);
                setSuccessMessage('Cài đặt thông báo đã được cập nhật thành công!');
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Không thể cập nhật cài đặt thông báo. Vui lòng thử lại sau.');
            setIsLoading(false);
        }
    };
    
    const renderTabContent = () => {
        switch(activeTab) {
            case 'profile':
                return (
                    <form onSubmit={handleProfileSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={profileData.fullName}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                    Số điện thoại <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-2">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={profileData.dateOfBirth}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                                    Giới tính
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                                Địa chỉ
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={profileData.address}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                rows={3}
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold text-lg flex items-center justify-center shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang cập nhật...
                                </>
                            ) : (
                                'CẬP NHẬT THÔNG TIN'
                            )}
                        </button>
                    </form>
                );
                
            case 'password':
                return (
                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                        <div className="relative">
                            <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                                Mật khẩu hiện tại <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                                Mật khẩu mới <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                minLength={8}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự</p>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                minLength={8}
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold text-lg flex items-center justify-center shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang cập nhật...
                                </>
                            ) : (
                                'ĐỔI MẬT KHẨU'
                            )}
                        </button>
                    </form>
                );
                
            case 'notifications':
                return (
                    <form onSubmit={handleNotificationsSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Thông báo qua Email</h3>
                                    <p className="text-gray-600 text-sm">Nhận thông báo qua email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="emailNotifications"
                                        checked={notificationsSettings.emailNotifications}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Thông báo qua SMS</h3>
                                    <p className="text-gray-600 text-sm">Nhận thông báo qua tin nhắn SMS</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="smsNotifications"
                                        checked={notificationsSettings.smsNotifications}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Email tiếp thị</h3>
                                    <p className="text-gray-600 text-sm">Nhận thông tin về sản phẩm và dịch vụ mới</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="marketingEmails"
                                        checked={notificationsSettings.marketingEmails}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Nhắc nhở lịch hẹn</h3>
                                    <p className="text-gray-600 text-sm">Nhận thông báo nhắc nhở về lịch hẹn tập luyện</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="appointmentReminders"
                                        checked={notificationsSettings.appointmentReminders}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Khuyến mãi & Ưu đãi</h3>
                                    <p className="text-gray-600 text-sm">Nhận thông báo về các chương trình khuyến mãi</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="promotionalOffers"
                                        checked={notificationsSettings.promotionalOffers}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 font-bold text-lg flex items-center justify-center shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang cập nhật...
                                </>
                            ) : (
                                'LƯU CÀI ĐẶT'
                            )}
                        </button>
                    </form>
                );
                
            case 'ratings':
                return <TrainerRatingsHistory />;
                
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <PageTitle 
                title="Cài đặt tài khoản"
                description="Quản lý thông tin cá nhân và tùy chỉnh tài khoản của bạn"
            />
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border-4 border-primary">
                                <Image 
                                    src="https://via.placeholder.com/150" 
                                    alt="Profile picture" 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{profileData.fullName}</h3>
                            <p className="text-gray-600">{profileData.email}</p>
                        </div>
                        
                        <nav className="space-y-2">
                            <button 
                                onClick={() => setActiveTab('profile')} 
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Thông tin cá nhân
                            </button>
                            
                            <button 
                                onClick={() => setActiveTab('password')} 
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'password' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Đổi mật khẩu
                            </button>
                            
                            <button 
                                onClick={() => setActiveTab('notifications')} 
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'notifications' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Cài đặt thông báo
                            </button>
                            
                            <button 
                                onClick={() => setActiveTab('ratings')} 
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'ratings' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <RiStarLine className="h-5 w-5 mr-2" />
                                Lịch sử đánh giá PT
                            </button>
                            
                            <Link href="/" className="w-full text-left px-4 py-3 rounded-lg flex items-center hover:bg-gray-100 text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Đăng xuất
                            </Link>
                        </nav>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="w-full md:w-3/4">
                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {activeTab === 'profile' && 'Thông tin cá nhân'}
                            {activeTab === 'password' && 'Đổi mật khẩu'}
                            {activeTab === 'notifications' && 'Cài đặt thông báo'}
                            {activeTab === 'ratings' && 'Lịch sử đánh giá huấn luyện viên'}
                        </h2>
                        
                        {successMessage && (
                            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{successMessage}</span>
                            </div>
                        )}
                        
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                        
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}