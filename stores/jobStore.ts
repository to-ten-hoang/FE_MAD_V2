import { create } from 'zustand';
import { getAllJobs, getJobDetail, applyJob } from '../api/authApi';

interface JobState {
  jobs: any[];
  selectedJob: any | null;
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  fetchJobDetail: (jobId: string) => Promise<void>;
  applyJob: (jobSeekerId: number, jobPostingId: number) => Promise<void>;
  clearJobs: () => void;
  clearSelectedJob: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const jobList = await getAllJobs();
      set({ jobs: Array.isArray(jobList) ? jobList : [], loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch jobs', loading: false });
      set({ jobs: [] });
      throw error;
    }
  },
  fetchJobDetail: async (jobId: string) => {
    set({ loading: true, error: null });
    try {
      const job = await getJobDetail(jobId);
      set({ selectedJob: job, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch job detail', loading: false });
      throw error;
    }
  },
  applyJob: async (jobSeekerId: number, jobPostingId: number) => {
    set({ loading: true, error: null });
    try {
      await applyJob(jobSeekerId, jobPostingId);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to apply for job', loading: false });
      throw error;
    }
  },
  clearJobs: () => {
    set({ jobs: [], loading: false, error: null });
  },
  clearSelectedJob: () => {
    set({ selectedJob: null, loading: false, error: null });
  },
}));