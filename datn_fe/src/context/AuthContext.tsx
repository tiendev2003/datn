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
        // Check if we have a token in localStorage - safely access localStorage only on client side
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken');
          
          if (token) {
            // Validate token with backend (in a real scenario)
            // const response = await fetch('/api/auth/validate-token', { headers: { Authorization: `Bearer ${token}` } });
            // const data = await response.json();
            
            // For now, we'll simulate a successful authentication
            const mockUser: User = {
              id: '1',
              fullName: 'Nguyễn Văn A',
              email: 'nguyenvana@example.com',
              phone: '0987654321',
              role: 'user',
              isVerified: true,
            };
            
            setUser(mockUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
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
      // Here you would make an API call to your backend to authenticate user
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser: User = {
        id: '1',
        fullName: 'Nguyễn Văn A',
        email: email,
        phone: '0987654321',
        role: 'user',
        isVerified: true,
      };
        // Save token to localStorage - safely access localStorage only on client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', 'mock-jwt-token');
      }
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (formData: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    try {
      // Here you would make an API call to your backend to register user
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Note: In a real scenario, you would not automatically set the user here
      // as registration typically requires email verification first
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Đăng ký không thành công. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
    const logout = (): void => {
    // Clear authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Here you would make an API call to your backend to send password reset email
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw new Error('Không thể gửi yêu cầu lấy lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (token: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Here you would make an API call to your backend to reset password
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, password }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    } catch (error) {
      console.error('Reset password failed:', error);
      throw new Error('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyEmail = async (token: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Here you would make an API call to your backend to verify email
      // const response = await fetch('/api/auth/verify-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // If user is already logged in, update their verification status
      if (user) {
        setUser({
          ...user,
          isVerified: true
        });
      }
    } catch (error) {
      console.error('Email verification failed:', error);
      throw new Error('Không thể xác thực email. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resendVerificationEmail = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Here you would make an API call to your backend to resend verification email
      // const response = await fetch('/api/auth/resend-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    } catch (error) {
      console.error('Resend verification email failed:', error);
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
    try {      // Here you would make an API call to your backend to update user profile
      // const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`
      //   },
      //   body: JSON.stringify(data),
      // });
      // const updatedData = await response.json();
      
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Update the user state with the new data
      setUser({
        ...user,
        ...data
      });
    } catch (error) {
      console.error('Update profile failed:', error);
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
    try {      // Here you would make an API call to your backend to change password
      // const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      // const response = await fetch('/api/user/change-password', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ currentPassword, newPassword }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    } catch (error) {
      console.error('Change password failed:', error);
      throw new Error('Không thể đổi mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
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
    isAuthenticated
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
