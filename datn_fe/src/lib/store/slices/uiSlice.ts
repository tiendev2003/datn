import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface UIState {
  toasts: Toast[];
  activePage: string;
  isSidebarOpen: boolean;
  isLoading: boolean;
  isMenuOpen: boolean;
  activeModal: string | null;
  modalData: any;
}

const initialState: UIState = {
  toasts: [],
  activePage: '/',
  isSidebarOpen: false,
  isLoading: false,
  isMenuOpen: false,
  activeModal: null,
  modalData: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = Math.random().toString(36).substring(2, 9);
      state.toasts.push({
        id,
        ...action.payload,
      });
    },
    
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    
    clearToasts: (state) => {
      state.toasts = [];
    },
    
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
    
    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
      state.isSidebarOpen = action.payload !== undefined ? action.payload : !state.isSidebarOpen;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    toggleMenu: (state, action: PayloadAction<boolean | undefined>) => {
      state.isMenuOpen = action.payload !== undefined ? action.payload : !state.isMenuOpen;
    },
    
    openModal: (state, action: PayloadAction<{ modal: string; data?: any }>) => {
      state.activeModal = action.payload.modal;
      state.modalData = action.payload.data || null;
    },
    
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
  },
});

export const {
  addToast,
  removeToast,
  clearToasts,
  setActivePage,
  toggleSidebar,
  setLoading,
  toggleMenu,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;