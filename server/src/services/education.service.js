import { educationRepository } from '../repositories/education.repository.js';

export const educationService = {
  async getAllEducation() {
    return educationRepository.getAllEducation();
  }
};
