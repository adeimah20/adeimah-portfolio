import { profileRepository } from '../repositories/profile.repository.js';

export const profileService = {
  async getProfile() {
    return profileRepository.getProfile();
  }
};
