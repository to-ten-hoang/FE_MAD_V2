import { create } from 'zustand';
import { getUserProfile, updateUserProfile, getSeekerSchedule } from '../api/authApi';
import { removeToken, getToken, getUserId } from '../utils/storage';

interface UserState {
  userId: number | null;
  fullName: string | null;
  role: string | null;
  email: string | null;
  phoneNumber: string | null;
  profilePicture: string | null;
  birthDate: string | null;
  workExperience: string | null;
  education: string | null;
  skills: string[];
  languages: string[];
  certifications: string[];
  cvFile: string | null;
  schedule: any[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  setUser: (userId: number) => Promise<void>;
  updateUserProfile: (profileData: any) => Promise<void>;
  fetchSchedule: () => Promise<void>;
  clearUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  fullName: null,
  role: null,
  email: null,
  phoneNumber: null,
  profilePicture: null,
  birthDate: null,
  workExperience: null,
  education: null,
  skills: [],
  languages: [],
  certifications: [],
  cvFile: null,
  schedule: [],
  isAuthenticated: false,
  loading: false,
  error: null,
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
          email: userProfile.email || null,
          phoneNumber: userProfile.phoneNumber || null,
          profilePicture: userProfile.profilePicture || null,
          birthDate: userProfile.birthDate || null,
          workExperience: userProfile.workExperience || null,
          education: userProfile.education || null,
          skills: userProfile.skills || [],
          languages: userProfile.languages || [],
          certifications: userProfile.certifications || [],
          cvFile: userProfile.cvFile || null,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        console.error('Error initializing user:', error);
        set({
          userId: null,
          fullName: null,
          role: null,
          email: null,
          phoneNumber: null,
          profilePicture: null,
          birthDate: null,
          workExperience: null,
          education: null,
          skills: [],
          languages: [],
          certifications: [],
          cvFile: null,
          schedule: [],
          isAuthenticated: false,
          loading: false,
        });
        await removeToken();
      }
    } else {
      set({
        userId: null,
        fullName: null,
        role: null,
        email: null,
        phoneNumber: null,
        profilePicture: null,
        birthDate: null,
        workExperience: null,
        education: null,
        skills: [],
        languages: [],
        certifications: [],
        cvFile: null,
        schedule: [],
        isAuthenticated: false,
        loading: false,
      });
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
        email: userProfile.email || null,
        phoneNumber: userProfile.phoneNumber || null,
        profilePicture: userProfile.profilePicture || null,
        birthDate: userProfile.birthDate || null,
        workExperience: userProfile.workExperience || null,
        education: userProfile.education || null,
        skills: userProfile.skills || [],
        languages: userProfile.languages || [],
        certifications: userProfile.certifications || [],
        cvFile: userProfile.cvFile || null,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching user profile in store:', error);
      set({ loading: false });
      throw error;
    }
  },
  updateUserProfile: async (profileData: any) => {
    try {
      set({ loading: true, error: null });
      const userId = await getUserId();
      if (!userId) throw new Error('User ID not found');
      const updatedProfile = await updateUserProfile(userId, profileData);
      set({
        fullName: updatedProfile.fullName || 'User',
        email: updatedProfile.email || null,
        phoneNumber: updatedProfile.phoneNumber || null,
        profilePicture: updatedProfile.profilePicture || null,
        birthDate: updatedProfile.birthDate || null,
        workExperience: updatedProfile.workExperience || null,
        education: updatedProfile.education || null,
        skills: updatedProfile.skills || [],
        languages: updatedProfile.languages || [],
        certifications: updatedProfile.certifications || [],
        cvFile: updatedProfile.cvFile || null,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update profile', loading: false });
      throw error;
    }
  },
  fetchSchedule: async () => {
    try {
      set({ loading: true, error: null });
      const userId = await getUserId();
      if (!userId) throw new Error('User ID not found');
      const scheduleData = await getSeekerSchedule(userId);
      set({ schedule: scheduleData || [], loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch schedule', loading: false });
      throw error;
    }
  },
  clearUser: async () => {
    await removeToken();
    set({
      userId: null,
      fullName: null,
      role: null,
      email: null,
      phoneNumber: null,
      profilePicture: null,
      birthDate: null,
      workExperience: null,
      education: null,
      skills: [],
      languages: [],
      certifications: [],
      cvFile: null,
      schedule: [],
      isAuthenticated: false,
      loading: false,
    });
  },
}));