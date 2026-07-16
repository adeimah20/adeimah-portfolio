import { useState, useEffect } from 'react';
import { profileService } from '../services/profile.service';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await profileService.getProfile();
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.message || 'Failed to fetch profile.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
