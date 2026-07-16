import { prisma } from '../config/prisma.js';

export const contactRepository = {
  async createMessage(data) {
    return prisma.contactMessage.create({
      data
    });
  }
};
