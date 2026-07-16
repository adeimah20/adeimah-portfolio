import axiosInstance from '../api/api';

export const projectService = {
  async getAllProjects() {
    const response = await axiosInstance.get('/projects');
    return response.data;
  },

  async getProjectBySlug(slug) {
    const response = await axiosInstance.get(`/projects/${slug}`);
    return response.data;
  }
};
