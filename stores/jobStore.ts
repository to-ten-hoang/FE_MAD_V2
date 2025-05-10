import { create } from 'zustand';
import { getAllJobs } from '../api/authApi';

interface JobState {
  jobs: any[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  clearJobs: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  loading: false,
  error: null,
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const jobList = await getAllJobs();
      set({ jobs: jobList, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch jobs', loading: false });
      throw error;
    }
  },
  clearJobs: () => {
    set({ jobs: [], loading: false, error: null });
  },
}));