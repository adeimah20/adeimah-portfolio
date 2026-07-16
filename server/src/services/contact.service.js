import { contactRepository } from '../repositories/contact.repository.js';

export const contactService = {
  async createMessage(data) {
    return contactRepository.createMessage(data);
  }
};
