import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ErrorResponse } from '../types/api-responses';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
});

// Request interceptor for adding token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }
        
        // Try to refresh token
        const response = await axios.post<ApiResponse<{ accessToken: string }>>(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );
        
        if (response.data.success && response.data.data?.accessToken) {
          const newToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          
          // Update the failed request with new token and retry
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Generic API request function with strong typing
export const apiRequest = async <T, D = any>(
  config: AxiosRequestConfig<D>
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'API request failed',
        data: undefined,
      };
    }
    return {
      success: false,
      message: 'Network error or server not responding',
      data: undefined,
    };
  }
};

// Helper methods for common requests
export const apiGet = <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ method: 'GET', url, params });
};

export const apiPost = <T, D = any>(url: string, data?: D): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ method: 'POST', url, data });
};

export const apiPut = <T, D = any>(url: string, data?: D): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ method: 'PUT', url, data });
};

export const apiPatch = <T, D = any>(url: string, data?: D): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ method: 'PATCH', url, data });
};

export const apiDelete = <T>(url: string): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ method: 'DELETE', url });
};

export default apiClient;