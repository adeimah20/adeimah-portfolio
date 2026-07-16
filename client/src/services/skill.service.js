import axiosInstance from '../api/api';

export const skillService = {
  async getAllSkills() {
    const response = await axiosInstance.get('/skills');
    return response.data;
  }
};
