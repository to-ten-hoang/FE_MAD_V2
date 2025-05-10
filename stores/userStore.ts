import { create } from 'zustand';
import { getUserProfile } from '../api/authApi';
import { removeToken, getToken, getUserId } from '../utils/storage';

interface UserState {
  userId: number | null;
  fullName: string | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean; // Thêm trạng thái loading
  initialize: () => Promise<void>;
  setUser: (userId: number) => Promise<void>;
  clearUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  fullName: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  initialize: async () => {
    const token = await getToken();
    const userId = await getUserId();
    if (token && userId) {
      try {
        set({ loading: true });
        const userProfile = await getUserProfile(userId);
        set({
          userId,
          fullName: userProfile.fullName || 'User',
          role: userProfile.role || null,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        console.error('Error initializing user:', error);
        set({ userId: null, fullName: null, role: null, isAuthenticated: false, loading: false });
        await removeToken();
      }
    } else {
      set({ userId: null, fullName: null, role: null, isAuthenticated: false, loading: false });
    }
  },
  setUser: async (userId: number) => {
    try {
      set({ loading: true });
      const userProfile = await getUserProfile(userId);
      set({
        userId,
        fullName: userProfile.fullName || 'User',
        role: userProfile.role || null,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching user profile in store:', error);
      set({ loading: false });
      throw error;
    }
  },
  clearUser: async () => {
    await removeToken();
    set({ userId: null, fullName: null, role: null, isAuthenticated: false, loading: false });
  },
}));