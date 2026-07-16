import { contactService } from '../services/contact.service.js';
import { asyncHandler } from '../middleware/async-handler.js';

export const createMessage = asyncHandler(async (req, res) => {
  const message = await contactService.createMessage(req.body);
  res.status(201).json({
    success: true,
    message: 'Message sent successfully. Thank you for reaching out!',
    data: message
  });
});
