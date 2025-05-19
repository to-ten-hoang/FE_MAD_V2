import axios from 'axios';
import { getToken } from '../utils/storage';

const BASE_URL = 'https://server-mad.onrender.com';

// Đăng nhập
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng ký
export const register = async (fullName: string, email: string, password: string, role: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      fullName,
      email,
      password,
      role,
    });
    return response.data; // Trả về dữ liệu đầy đủ từ server
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin hồ sơ người dùng
export const getUserProfile = async (userId: number) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/auth/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin hồ sơ người dùng
export const updateUserProfile = async (userId: number, profileData: any) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${BASE_URL}/auth/profile/${userId}`, profileData, {
      headers: { Authorization: `Bearer ${token}`, 'accept': '*/*' },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách tất cả công việc
export const getAllJobs = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/recruiter/jobs/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết một công việc
export const getJobDetail = async (jobId: string) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/recruiter/job/${jobId}`, {
      headers: { Authorization: `Bearer ${token}`, 'accept': '*/*' },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Ứng tuyển công việc
export const applyJob = async (jobSeekerId: number, jobPostingId: number) => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${BASE_URL}/applications/apply`,
      {},
      {
        headers: { Authorization: `Bearer ${token}`, 'accept': '*/*' },
        params: { jobSeekerId, jobPostingId },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy lịch làm việc của người tìm việc
export const getSeekerSchedule = async (seekerId: number) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/seeker/schedule/${seekerId}`, {
      headers: { Authorization: `Bearer ${token}`, 'accept': '*/*' },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};