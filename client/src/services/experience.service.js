import axiosInstance from '../api/api';

export const experienceService = {
  async getAllExperience() {
    const response = await axiosInstance.get('/experience');
    return response.data;
  }
};
