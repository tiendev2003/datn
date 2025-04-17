import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface ClassType {
  id: number;
  name: string;
  description: string;
  intensityLevel: 'Low' | 'Medium' | 'High';
  durationMinutes: number;
  imageUrl?: string;
}

export interface ClassSchedule {
  id: number;
  classTypeId: number;
  classType: ClassType;
  branchId: number;
  areaId: number;
  trainerId: number;
  trainerName: string;
  startDateTime: string;
  endDateTime: string;
  capacity: number;
  currentBookings: number;
  isRecurring: boolean;
  dayOfWeek?: string;
  status: 'Scheduled' | 'Cancelled' | 'Completed';
}

interface ClassState {
  classTypes: ClassType[];
  classSchedules: ClassSchedule[];
  selectedClass: ClassSchedule | null;
  userEnrolledClasses: ClassSchedule[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ClassState = {
  classTypes: [],
  classSchedules: [],
  selectedClass: null,
  userEnrolledClasses: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchClassTypes = createAsyncThunk(
  'class/fetchClassTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/classes/types');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy danh sách loại lớp tập');
    }
  }
);

export const fetchClassSchedules = createAsyncThunk(
  'class/fetchClassSchedules',
  async (params: { 
    startDate?: string; 
    endDate?: string;
    branchId?: number;
    classTypeId?: number;
  } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/classes/schedules', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy lịch lớp tập');
    }
  }
);

export const fetchUserEnrolledClasses = createAsyncThunk(
  'class/fetchUserEnrolledClasses',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.get('/api/classes/user-enrolled', {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy lớp tập đã đăng ký');
    }
  }
);

export const enrollInClass = createAsyncThunk(
  'class/enrollInClass',
  async (scheduleId: number, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post(`/api/classes/${scheduleId}/enroll`, {}, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể đăng ký lớp tập');
    }
  }
);

export const cancelClassEnrollment = createAsyncThunk(
  'class/cancelClassEnrollment',
  async (scheduleId: number, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post(`/api/classes/${scheduleId}/cancel-enrollment`, {}, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể hủy đăng ký lớp tập');
    }
  }
);

// Slice
const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setSelectedClass: (state, action: PayloadAction<ClassSchedule | null>) => {
      state.selectedClass = action.payload;
    },
    clearClassError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch class types
      .addCase(fetchClassTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassTypes.fulfilled, (state, action: PayloadAction<ClassType[]>) => {
        state.loading = false;
        state.classTypes = action.payload;
      })
      .addCase(fetchClassTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch class schedules
      .addCase(fetchClassSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassSchedules.fulfilled, (state, action: PayloadAction<ClassSchedule[]>) => {
        state.loading = false;
        state.classSchedules = action.payload;
      })
      .addCase(fetchClassSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch user enrolled classes
      .addCase(fetchUserEnrolledClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEnrolledClasses.fulfilled, (state, action: PayloadAction<ClassSchedule[]>) => {
        state.loading = false;
        state.userEnrolledClasses = action.payload;
      })
      .addCase(fetchUserEnrolledClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Enroll in class
      .addCase(enrollInClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInClass.fulfilled, (state, action: PayloadAction<ClassSchedule>) => {
        state.loading = false;
        state.userEnrolledClasses.push(action.payload);
        // Update current bookings in class schedules
        const index = state.classSchedules.findIndex(cls => cls.id === action.payload.id);
        if (index !== -1) {
          state.classSchedules[index].currentBookings += 1;
        }
      })
      .addCase(enrollInClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Cancel class enrollment
      .addCase(cancelClassEnrollment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelClassEnrollment.fulfilled, (state, action: PayloadAction<{ scheduleId: number }>) => {
        state.loading = false;
        // Remove from enrolled classes
        state.userEnrolledClasses = state.userEnrolledClasses.filter(
          cls => cls.id !== action.payload.scheduleId
        );
        // Update current bookings in class schedules
        const index = state.classSchedules.findIndex(cls => cls.id === action.payload.scheduleId);
        if (index !== -1 && state.classSchedules[index].currentBookings > 0) {
          state.classSchedules[index].currentBookings -= 1;
        }
      })
      .addCase(cancelClassEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedClass, clearClassError } = classSlice.actions;
export default classSlice.reducer;