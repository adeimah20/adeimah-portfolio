import axiosInstance from '../api/api';

export const educationService = {
  async getAllEducation() {
    const response = await axiosInstance.get('/education');
    return response.data;
  }
};
