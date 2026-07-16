import { prisma } from '../config/prisma.js';

export const skillRepository = {
  async getAllSkills() {
    return prisma.skill.findMany({
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' }
      ]
    });
  }
};
