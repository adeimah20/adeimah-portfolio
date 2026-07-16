import { useState, useEffect } from 'react';
import { experienceService } from '../services/experience.service';

export const useExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const result = await experienceService.getAllExperience();
        if (result.success) {
          setExperience(result.data);
        } else {
          setError(result.message || 'Failed to fetch experience.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch experience.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
};
