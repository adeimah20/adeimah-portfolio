import { prisma } from '../config/prisma.js';

export const experienceRepository = {
  async getAllExperience() {
    return prisma.experience.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    });
  }
};
