import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface Booking {
  id: number;
  userId: number;
  bookingType: 'Gym Session' | 'PT Session' | 'Class';
  startDateTime: string;
  endDateTime: string;
  branchId: number;
  areaId?: number;
  trainerId?: number;
  classScheduleId?: number;
  status: 'Booked' | 'Checked In' | 'Completed' | 'Cancelled' | 'No Show';
  notes?: string;
  createdAt: string;
}

interface BookingState {
  userBookings: Booking[];
  availableSlots: any[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BookingState = {
  userBookings: [],
  availableSlots: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.get('/api/bookings/user', {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy lịch đặt');
    }
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  'booking/fetchAvailableSlots',
  async (params: { 
    date: string; 
    bookingType: string;
    branchId: number;
    areaId?: number;
    trainerId?: number;
  }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.get('/api/bookings/available-slots', {
        params,
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy khung giờ trống');
    }
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: Partial<Booking>, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post('/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể tạo lịch đặt');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async ({ bookingId, reason }: { bookingId: number; reason?: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post(`/api/bookings/${bookingId}/cancel`, { reason }, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể hủy lịch đặt');
    }
  }
);

// Slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.selectedBooking = action.payload;
    },
    clearBookingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch available slots
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSlots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.userBookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        const index = state.userBookings.findIndex(booking => booking.id === action.payload.id);
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedBooking, clearBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;