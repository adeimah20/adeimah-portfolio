import { skillService } from '../services/skill.service.js';
import { asyncHandler } from '../middleware/async-handler.js';

export const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await skillService.getAllSkills();
  res.status(200).json({
    success: true,
    data: skills
  });
});
