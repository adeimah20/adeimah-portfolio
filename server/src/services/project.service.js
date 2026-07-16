import { projectRepository } from '../repositories/project.repository.js';

export const projectService = {
  async getAllProjects() {
    return projectRepository.getAllProjects();
  },

  async getProjectBySlug(slug) {
    return projectRepository.getProjectBySlug(slug);
  }
};
