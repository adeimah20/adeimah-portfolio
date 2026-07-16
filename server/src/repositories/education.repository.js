import { prisma } from '../config/prisma.js';

export const educationRepository = {
  async getAllEducation() {
    return prisma.education.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    });
  }
};
