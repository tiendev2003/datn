'use client';

import PageTitle from '@/components/PageTitle';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    FaAward,
    FaCalendarAlt,
    FaCertificate,
    FaCloudUploadAlt,
    FaDumbbell,
    FaEdit,
    FaEnvelope,
    FaGraduationCap, FaLanguage,
    FaMoneyBillWave,
    FaPhone,
    FaPlus,
    FaStar,
    FaTrash,
    FaUserCircle
} from 'react-icons/fa';

interface TrainerProfile {
    fullName: string;
    email: string;
    phone: string;
    specialization: string[];
    experience: string;
    certifications: string[];
    certificateFiles: {name: string, url: string}[];
    skills: string[];
    achievements: string[];
    education: string;
    languages: string[];
    availability: string;
    bio: string;
    avatar: string;
    hourlyRate: number;
}

export default function TrainerProfilePage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const certificateFileInputRef = useRef<HTMLInputElement>(null);    const [profile, setProfile] = useState<TrainerProfile>({
        fullName: '',
        email: '',
        phone: '',
        specialization: [],
        experience: '',
        certifications: [],
        certificateFiles: [],
        skills: [],
        achievements: [],
        education: '',
        languages: [],
        availability: '',
        bio: '',
        avatar: '',
        hourlyRate: 0
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newItem, setNewItem] = useState({
        specialization: '',
        certification: '',
        skill: '',
        achievement: '',
        language: ''
    });
    const [loading, setLoading] = useState(false);

    // Fetch trainer profile data from API
    useEffect(() => {
        const fetchTrainerProfile = async () => {
            try {
                setLoading(true);
                // Mock data for demonstration, replace with actual API call
                setTimeout(() => {
                    setProfile({                        fullName: 'Nguyễn Văn A',
                        email: 'trainer@example.com',
                        phone: '0123456789',
                        specialization: ['Yoga', 'Fitness', 'Cardio'],
                        experience: '5 năm kinh nghiệm huấn luyện viên thể hình và yoga',
                        certifications: ['Chứng chỉ HLV Yoga Quốc tế', 'Chứng nhận HLV Fitness'],
                        certificateFiles: [
                            { name: 'Chứng chỉ Yoga.pdf', url: '/documents/sample-certificate.pdf' },
                            { name: 'Chứng nhận Fitness.pdf', url: '/documents/sample-certificate.pdf' }
                        ],
                        skills: ['Xây dựng kế hoạch tập luyện', 'Tư vấn dinh dưỡng', 'Giảm cân'],
                        achievements: ['Giải nhất cuộc thi Body Fitness 2020', 'Top 10 HLV tiêu biểu 2022'],
                        education: 'Đại học Thể dục Thể thao TP.HCM',
                        languages: ['Tiếng Việt', 'Tiếng Anh'],
                        availability: 'Thứ 2 - Thứ 6: 7:00 - 20:00, Thứ 7: 8:00 - 18:00',
                        bio: 'Tôi là huấn luyện viên với hơn 5 năm kinh nghiệm, chuyên về yoga và fitness. Tôi luôn tâm huyết với việc giúp đỡ học viên đạt được mục tiêu sức khỏe và hình thể lý tưởng.',
                        avatar: '/images/default-avatar.png',
                        hourlyRate: 250000
                    });
                    setLoading(false);
                }, 1000);

                // Uncomment when ready to connect with actual API
                // const response = await fetch('/api/trainer/profile');
                // const data = await response.json();
                // setProfile(data);
            } catch (error) {
                console.error('Error fetching trainer profile:', error);
                toast.error('Không thể tải thông tin huấn luyện viên');
                setLoading(false);
            }
        };

        fetchTrainerProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Mock API call
            setTimeout(() => {
                setLoading(false);
                setIsEditing(false);
                toast.success('Cập nhật thông tin thành công');
            }, 1000);

            // Uncomment when ready to connect with actual API
            // const response = await fetch('/api/trainer/profile', {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(profile),
            // });
            // if (response.ok) {
            //     setIsEditing(false);
            //     toast.success('Cập nhật thông tin thành công');
            // } else {
            //     toast.error('Cập nhật thông tin thất bại');
            // }
        } catch (error) {
            console.error('Error updating trainer profile:', error);
            toast.error('Cập nhật thông tin thất bại');
            setLoading(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Preview the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({
                    ...profile,
                    avatar: reader.result as string
                });
            };
            reader.readAsDataURL(file);

            // Here you would typically upload the image to your server or cloud storage
            // and update the profile with the URL returned from the server
        }
    };    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };    
    
    const triggerCertificateFileInput = () => {
        certificateFileInputRef.current?.click();
    };
    
    const handleCertificateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            
            // Create a preview URL for the file
            const fileUrl = URL.createObjectURL(file);
            
            // Add the file to certificateFiles array
            setProfile({
                ...profile,
                certificateFiles: [
                    ...profile.certificateFiles,
                    { name: file.name, url: fileUrl }
                ]
            });
            
            // In a real implementation, you would upload the file to your server
            toast.success(`Đã thêm chứng chỉ: ${file.name}`);
            
            // Reset the input
            e.target.value = '';
        }
    };
    
    const removeCertificateFile = (index: number) => {
        setProfile({
            ...profile,
            certificateFiles: profile.certificateFiles.filter((_, i) => i !== index)
        });
    };
    
    // Functions to handle array fields
    const addItem = (field: 'specialization' | 'certifications' | 'skills' | 'achievements' | 'languages') => {
        const fieldMap: Record<string, keyof typeof newItem> = {
            'specialization': 'specialization',
            'certifications': 'certification',
            'skills': 'skill',
            'achievements': 'achievement',
            'languages': 'language'
        };

        const newItemKey = fieldMap[field];
        const newItemValue = newItem[newItemKey];

        if (newItemValue.trim()) {
            setProfile({
                ...profile,
                [field]: [...profile[field], newItemValue.trim()]
            });
            setNewItem({
                ...newItem,
                [newItemKey]: ''
            });
        }
    };

    const removeItem = (field: 'specialization' | 'certifications' | 'skills' | 'achievements' | 'languages', index: number) => {
        setProfile({
            ...profile,
            [field]: profile[field].filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
                <PageTitle title="Thông tin cá nhân" />
                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <FaEdit /> Chỉnh sửa
                    </button>
                ) : null}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-8">
                    {/* Avatar and basic info section */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar section */}
                        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg">
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-primary/20 shadow-lg">
                                    <img
                                        src={profile.avatar || '/images/default-avatar.png'}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleAvatarChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={triggerFileInput}
                                            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            <FaCloudUploadAlt /> Thay đổi ảnh
                                        </button>
                                    </>
                                )}

                                <div className="mt-6 w-full">
                                    <h3 className="text-lg font-semibold text-center mb-4">{profile.fullName || 'Chưa cập nhật'}</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <FaEnvelope className="text-gray-500" />
                                            <span>{profile.email || 'Chưa cập nhật'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaPhone className="text-gray-500" />
                                            <span>{profile.phone || 'Chưa cập nhật'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaMoneyBillWave className="text-gray-500" />
                                            <span>{profile.hourlyRate.toLocaleString('vi-VN')} đ/giờ</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-500" />
                                            <span>{profile.availability || 'Chưa cập nhật'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile information */}
                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                        <FaUserCircle /> Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                        <FaEnvelope /> Email
                                    </label>
                                    <input type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                        <FaPhone /> Số điện thoại
                                    </label>
                                    <input type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                        <FaMoneyBillWave /> Mức giá theo giờ (đ)
                                    </label>
                                    <input type="number"
                                        value={profile.hourlyRate}
                                        onChange={(e) => setProfile({ ...profile, hourlyRate: Number(e.target.value) })}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendarAlt /> Lịch làm việc
                                </label>
                                <input type="text"
                                    value={profile.availability}
                                    onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                                    disabled={!isEditing}
                                    placeholder="Ví dụ: Thứ 2 - Thứ 6: 8:00 - 18:00"
                                    className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <FaGraduationCap /> Học vấn
                                </label>
                                <input type="text"
                                    value={profile.education}
                                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                                    disabled={!isEditing}
                                    className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <FaDumbbell /> Kinh nghiệm
                                </label>
                                <textarea value={profile.experience}
                                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                                    disabled={!isEditing}
                                    rows={3}
                                    className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <FaUserCircle /> Giới thiệu bản thân
                                </label>
                                <textarea value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Array fields section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Specialization */}
                        <div className="space-y-3 bg-gray-50 p-5 rounded-lg">
                            <h3 className="flex items-center gap-2 font-medium text-gray-800">
                                <FaDumbbell className="text-primary" /> Chuyên môn
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.specialization.map((item, index) => (
                                    <div key={index} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        <span>{item}</span>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem('specialization', index)}
                                                className="ml-2 text-primary/70 hover:text-primary"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 mt-2">
                                    <input type="text"
                                        value={newItem.specialization}
                                        onChange={(e) => setNewItem({ ...newItem, specialization: e.target.value })}
                                        placeholder="Thêm chuyên môn"
                                        className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem('specialization')}
                                        className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md hover:bg-primary-dark"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            )}
                        </div>                        {/* Certifications */}
                        <div className="space-y-3 bg-gray-50 p-5 rounded-lg">
                            <h3 className="flex items-center gap-2 font-medium text-gray-800">
                                <FaCertificate className="text-primary" /> Chứng chỉ
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.certifications.map((item, index) => (
                                    <div key={index} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        <span>{item}</span>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem('certifications', index)}
                                                className="ml-2 text-primary/70 hover:text-primary"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 mt-2">
                                    <input type="text"
                                        value={newItem.certification}
                                        onChange={(e) => setNewItem({ ...newItem, certification: e.target.value })}
                                        placeholder="Thêm chứng chỉ"
                                        className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem('certifications')}
                                        className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md hover:bg-primary-dark"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            )}
                            
                            {/* Certificate Files */}
                            <div className="mt-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Tài liệu chứng chỉ</div>
                                
                                <div className="space-y-2">
                                    {profile.certificateFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <div className="text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <a 
                                                    href={file.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </a>
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCertificateFile(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {isEditing && (
                                    <>
                                        <input
                                            type="file"
                                            ref={certificateFileInputRef}
                                            onChange={handleCertificateFileUpload}
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={triggerCertificateFileInput}
                                            className="mt-2 flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                            </svg>
                                            Tải lên tài liệu chứng chỉ
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-3 bg-gray-50 p-5 rounded-lg">
                            <h3 className="flex items-center gap-2 font-medium text-gray-800">
                                <FaStar className="text-primary" /> Kỹ năng
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((item, index) => (
                                    <div key={index} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        <span>{item}</span>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem('skills', index)}
                                                className="ml-2 text-primary/70 hover:text-primary"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 mt-2">
                                    <input type="text"
                                        value={newItem.skill}
                                        onChange={(e) => setNewItem({ ...newItem, skill: e.target.value })}
                                        placeholder="Thêm kỹ năng"
                                        className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem('skills')}
                                        className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md hover:bg-primary-dark"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Achievements */}
                        <div className="space-y-3 bg-gray-50 p-5 rounded-lg">
                            <h3 className="flex items-center gap-2 font-medium text-gray-800">
                                <FaAward className="text-primary" /> Thành tích
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.achievements.map((item, index) => (
                                    <div key={index} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        <span>{item}</span>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem('achievements', index)}
                                                className="ml-2 text-primary/70 hover:text-primary"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 mt-2">
                                    <input type="text"
                                        value={newItem.achievement}
                                        onChange={(e) => setNewItem({ ...newItem, achievement: e.target.value })}
                                        placeholder="Thêm thành tích"
                                        className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem('achievements')}
                                        className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md hover:bg-primary-dark"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Languages */}
                        <div className="space-y-3 bg-gray-50 p-5 rounded-lg">
                            <h3 className="flex items-center gap-2 font-medium text-gray-800">
                                <FaLanguage className="text-primary" /> Ngôn ngữ
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.languages.map((item, index) => (
                                    <div key={index} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        <span>{item}</span>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem('languages', index)}
                                                className="ml-2 text-primary/70 hover:text-primary"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 mt-2">
                                    <input type="text"
                                        value={newItem.language}
                                        onChange={(e) => setNewItem({ ...newItem, language: e.target.value })}
                                        placeholder="Thêm ngôn ngữ"
                                        className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem('languages')}
                                        className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md hover:bg-primary-dark"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer buttons */}
                    {isEditing && (
                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        <span>Đang lưu...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaEdit />
                                        <span>Lưu thay đổi</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
