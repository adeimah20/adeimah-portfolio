import { educationService } from '../services/education.service.js';
import { asyncHandler } from '../middleware/async-handler.js';

export const getAllEducation = asyncHandler(async (req, res) => {
  const education = await educationService.getAllEducation();
  res.status(200).json({
    success: true,
    data: education
  });
});
