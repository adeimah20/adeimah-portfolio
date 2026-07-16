import axiosInstance from '../api/api';

export const profileService = {
  async getProfile() {
    const response = await axiosInstance.get('/profile');
    return response.data;
  }
};
