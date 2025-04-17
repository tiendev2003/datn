import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface Trainer {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  profileImage?: string;
  specializations: string[];
  experience: number;
  biography: string;
  certifications: string[];
  averageRating: number;
  reviewCount: number;
}

export interface TrainerAvailability {
  id: number;
  trainerId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface TrainerState {
  trainers: Trainer[];
  selectedTrainer: Trainer | null;
  trainerAvailability: TrainerAvailability[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TrainerState = {
  trainers: [],
  selectedTrainer: null,
  trainerAvailability: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTrainers = createAsyncThunk(
  'trainer/fetchTrainers',
  async (params: { specialization?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/trainers', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy danh sách huấn luyện viên');
    }
  }
);

export const fetchTrainerById = createAsyncThunk(
  'trainer/fetchTrainerById',
  async (trainerId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/trainers/${trainerId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy thông tin huấn luyện viên');
    }
  }
);

export const fetchTrainerAvailability = createAsyncThunk(
  'trainer/fetchTrainerAvailability',
  async (trainerId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/trainers/${trainerId}/availability`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy lịch trống của huấn luyện viên');
    }
  }
);

export const rateTrainer = createAsyncThunk(
  'trainer/rateTrainer',
  async ({ 
    trainerId, 
    rating, 
    comment 
  }: { 
    trainerId: number; 
    rating: number; 
    comment?: string 
  }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post(`/api/trainers/${trainerId}/rate`, {
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể đánh giá huấn luyện viên');
    }
  }
);

// Slice
const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    setSelectedTrainer: (state, action: PayloadAction<Trainer | null>) => {
      state.selectedTrainer = action.payload;
    },
    clearTrainerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trainers
      .addCase(fetchTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainers.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch trainer by ID
      .addCase(fetchTrainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerById.fulfilled, (state, action: PayloadAction<Trainer>) => {
        state.loading = false;
        state.selectedTrainer = action.payload;
      })
      .addCase(fetchTrainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch trainer availability
      .addCase(fetchTrainerAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerAvailability.fulfilled, (state, action: PayloadAction<TrainerAvailability[]>) => {
        state.loading = false;
        state.trainerAvailability = action.payload;
      })
      .addCase(fetchTrainerAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Rate trainer
      .addCase(rateTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rateTrainer.fulfilled, (state, action: PayloadAction<{ trainerId: number; averageRating: number; reviewCount: number }>) => {
        state.loading = false;
        
        // Update trainer in list
        const trainerIndex = state.trainers.findIndex(t => t.id === action.payload.trainerId);
        if (trainerIndex !== -1) {
          state.trainers[trainerIndex].averageRating = action.payload.averageRating;
          state.trainers[trainerIndex].reviewCount = action.payload.reviewCount;
        }
        
        // Update selected trainer if it's the same one
        if (state.selectedTrainer && state.selectedTrainer.id === action.payload.trainerId) {
          state.selectedTrainer.averageRating = action.payload.averageRating;
          state.selectedTrainer.reviewCount = action.payload.reviewCount;
        }
      })
      .addCase(rateTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedTrainer, clearTrainerError } = trainerSlice.actions;
export default trainerSlice.reducer;