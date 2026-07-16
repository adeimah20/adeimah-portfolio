import { experienceRepository } from '../repositories/experience.repository.js';

export const experienceService = {
  async getAllExperience() {
    return experienceRepository.getAllExperience();
  }
};
