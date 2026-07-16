import { prisma } from '../config/prisma.js';

export const projectRepository = {
  async getAllProjects() {
    return prisma.project.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    });
  },

  async getProjectBySlug(slug) {
    return prisma.project.findUnique({
      where: {
        slug
      }
    });
  }
};
