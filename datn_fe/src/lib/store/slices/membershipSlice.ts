import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface MembershipType {
  id: number;
  name: string;
  description: string;
  durationDays: number;
  price: number;
  benefits: string[];
  isActive: boolean;
}

export interface UserMembership {
  id: number;
  userId: number;
  membershipTypeId: number;
  membershipType: MembershipType;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Cancelled' | 'Paused';
  autoRenew: boolean;
  lastRenewalDate?: string;
}

interface MembershipState {
  membershipTypes: MembershipType[];
  userMembership: UserMembership | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MembershipState = {
  membershipTypes: [],
  userMembership: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchMembershipTypes = createAsyncThunk(
  'membership/fetchMembershipTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/memberships/types');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy danh sách gói tập');
    }
  }
);

export const fetchUserMembership = createAsyncThunk(
  'membership/fetchUserMembership',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.get('/api/memberships/user', {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy thông tin gói tập');
    }
  }
);

export const purchaseMembership = createAsyncThunk(
  'membership/purchaseMembership',
  async ({ membershipTypeId, autoRenew }: { membershipTypeId: number; autoRenew: boolean }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post('/api/memberships/purchase', {
        membershipTypeId,
        autoRenew
      }, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể mua gói tập');
    }
  }
);

export const cancelMembership = createAsyncThunk(
  'membership/cancelMembership',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string, user: { id: number } } };
    
    try {
      const response = await axios.post('/api/memberships/cancel', {}, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể hủy gói tập');
    }
  }
);

export const toggleAutoRenew = createAsyncThunk(
  'membership/toggleAutoRenew',
  async (autoRenew: boolean, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    
    try {
      const response = await axios.post('/api/memberships/auto-renew', {
        autoRenew
      }, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể cập nhật tự động gia hạn');
    }
  }
);

// Slice
const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    clearMembershipError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch membership types
      .addCase(fetchMembershipTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembershipTypes.fulfilled, (state, action: PayloadAction<MembershipType[]>) => {
        state.loading = false;
        state.membershipTypes = action.payload;
      })
      .addCase(fetchMembershipTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch user membership
      .addCase(fetchUserMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMembership.fulfilled, (state, action: PayloadAction<UserMembership>) => {
        state.loading = false;
        state.userMembership = action.payload;
      })
      .addCase(fetchUserMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Purchase membership
      .addCase(purchaseMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseMembership.fulfilled, (state, action: PayloadAction<UserMembership>) => {
        state.loading = false;
        state.userMembership = action.payload;
      })
      .addCase(purchaseMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Cancel membership
      .addCase(cancelMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelMembership.fulfilled, (state, action: PayloadAction<UserMembership>) => {
        state.loading = false;
        state.userMembership = action.payload;
      })
      .addCase(cancelMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Toggle auto renew
      .addCase(toggleAutoRenew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAutoRenew.fulfilled, (state, action: PayloadAction<UserMembership>) => {
        state.loading = false;
        state.userMembership = action.payload;
      })
      .addCase(toggleAutoRenew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMembershipError } = membershipSlice.actions;
export default membershipSlice.reducer;