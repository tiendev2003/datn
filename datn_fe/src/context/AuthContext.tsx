'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the User type
interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'trainer';
  isVerified: boolean;
}

// Helper function to determine mock role based on email for testing
const mapEmailToMockRole = (email: string): 'admin' | 'trainer' | 'user' => {
  if (email.includes('admin')) return 'admin';
  if (email.includes('trainer')) return 'trainer';
  return 'user';
};

// Define the context state
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  redirectToDashboard: () => void;
}

// Define register form data
interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is logged in on page load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if we have a token in localStorage or cookies
        if (typeof window !== 'undefined') {
          // Kiểm tra trong localStorage
          let token = localStorage.getItem('authToken');
          
          // Nếu không có trong localStorage, kiểm tra trong cookies
          if (!token) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.startsWith('authToken=')) {
                token = cookie.substring('authToken='.length);
                break;
              }
            }
          }
          
          console.log('Token found:', token ? 'Yes' : 'No');

          if (token) {
            // Đảm bảo token được lưu ở cả hai nơi
            localStorage.setItem('authToken', token);
            document.cookie = `authToken=${token}; path=/; max-age=${60*60*24*7}; SameSite=Lax`;
            
            // Lấy email từ localStorage
            const savedEmail = localStorage.getItem('userEmail') || 'user@example.com';
            
            // Dùng email để xác định vai trò của người dùng (cho mục đích giả lập)
            const userRole = mapEmailToMockRole(savedEmail);
            
            const mockUser: User = {
              id: '1',
              fullName: 'Người Dùng Mẫu',
              email: savedEmail,
              phone: '0987654321',
              role: userRole,
              isVerified: true,
            };
            
            setUser(mockUser);
            setIsAuthenticated(true);
            console.log('Đã tạo phiên đăng nhập giả với vai trò:', userRole);
          }
        }
      } catch (error) {
        console.error('Lỗi kiểm tra trạng thái xác thực:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userEmail');
          document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        }
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Chỉ sử dụng dữ liệu giả - không kết nối với API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mô phỏng độ trễ API
      
      // Xác định vai trò dựa trên email để kiểm thử
      const userRole = mapEmailToMockRole(email);
      
      const mockUser: User = {
        id: '1',
        fullName: 'Nguyễn Văn A',
        email: email,
        phone: '0987654321',
        role: userRole,
        isVerified: true,
      };
        // Lưu token và email vào localStorage và cookies
      if (typeof window !== 'undefined') {
        const token = 'mock-jwt-token';
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email);
        
        // Đặt cookie với thời hạn 7 ngày
        document.cookie = `authToken=${token}; path=/; max-age=${60*60*24*7}; SameSite=Lax`;
      } 
      
      setUser(mockUser);
      setIsAuthenticated(true);
      console.log('Đăng nhập thành công với vai trò:', userRole);    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      throw new Error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (formData: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    try {
      // Chỉ mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mô phỏng độ trễ API
      
      // Trong tình huống thực tế, đăng ký thường yêu cầu xác minh email trước
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      throw new Error('Đăng ký không thành công. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };  const logout = (): void => {
    // Xóa dữ liệu xác thực từ cả localStorage và cookies
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      
      // Xóa cookie bằng cách đặt thời hạn là quá khứ
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    }
    setUser(null);
    setIsAuthenticated(false);
  };
  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Yêu cầu quên mật khẩu thất bại:', error);
      throw new Error('Không thể gửi yêu cầu lấy lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  const resetPassword = async (token: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Đặt lại mật khẩu thất bại:', error);
      throw new Error('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  const verifyEmail = async (token: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Nếu người dùng đã đăng nhập, cập nhật trạng thái xác minh
      if (user) {
        setUser({
          ...user,
          isVerified: true
        });
      }
    } catch (error) {
      console.error('Xác minh email thất bại:', error);
      throw new Error('Không thể xác thực email. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  const resendVerificationEmail = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Gửi lại email xác thực thất bại:', error);
      throw new Error('Không thể gửi lại email xác thực. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  const updateUserProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) {
      throw new Error('Bạn cần đăng nhập để thực hiện thao tác này.');
    }

    setIsLoading(true);
    try {
      // Mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Cập nhật trạng thái người dùng với dữ liệu mới
      setUser({
        ...user,
        ...data
      });
    } catch (error) {
      console.error('Cập nhật thông tin thất bại:', error);
      throw new Error('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!user) {
      throw new Error('Bạn cần đăng nhập để thực hiện thao tác này.');
    }

    setIsLoading(true);
    try {
      // Mô phỏng API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Đổi mật khẩu thất bại:', error);
      throw new Error('Không thể đổi mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }  };
  
  const redirectToDashboard = (): void => {
    if (!user) return;
    
    try {
      if (typeof window !== 'undefined') {
        // Đảm bảo token được lưu trong cả localStorage và cookie trước khi chuyển hướng
        const token = localStorage.getItem('authToken');
        if (token) {
          document.cookie = `authToken=${token}; path=/; max-age=${60*60*24*7}; SameSite=Lax`;
        }
      
        // Xác định đường dẫn dựa trên vai trò
        const path = user.role === 'admin' 
          ? '/account/admin/dashboard'
          : user.role === 'trainer'
            ? '/account/trainer/dashboard'
            : '/account/dashboard';
        
        console.log(`Chuyển hướng người dùng ${user.role} đến: ${path}`);
        
        // Điều hướng bằng cách thay đổi địa chỉ URL
        window.location.href = path;
      }
    } catch (error) {
      console.error('Lỗi khi chuyển hướng:', error);
      // Fallback đến trang dashboard nếu có lỗi
      window.location.href = '/account/dashboard';
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    updateUserProfile,
    changePassword,
    isAuthenticated,
    redirectToDashboard
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
