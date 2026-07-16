import { prisma } from '../config/prisma.js';

export const profileRepository = {
  async getProfile() {
    return prisma.profile.findFirst();
  }
};
