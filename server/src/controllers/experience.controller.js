import { experienceService } from '../services/experience.service.js';
import { asyncHandler } from '../middleware/async-handler.js';

export const getAllExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.getAllExperience();
  res.status(200).json({
    success: true,
    data: experience
  });
});
