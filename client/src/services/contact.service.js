import axiosInstance from '../api/api';

export const contactService = {
  async createMessage(data) {
    const response = await axiosInstance.post('/contact', data);
    return response.data;
  }
};
