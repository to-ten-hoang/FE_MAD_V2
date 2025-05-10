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
    return response.data;
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
    return response.data;
  } catch (error) {
    throw error;
  }
};