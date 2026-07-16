import { skillRepository } from '../repositories/skill.repository.js';

export const skillService = {
  async getAllSkills() {
    return skillRepository.getAllSkills();
  }
};
