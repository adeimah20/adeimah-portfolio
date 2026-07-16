import { profileService } from '../services/profile.service.js';
import { asyncHandler } from '../middleware/async-handler.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile();
  if (!profile) {
    return res.status(404).json({
      success: false,
      message: 'Profile not found.'
    });
  }
  res.status(200).json({
    success: true,
    data: profile
  });
});
