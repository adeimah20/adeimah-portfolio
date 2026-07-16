import { useState, useEffect } from 'react';
import { skillService } from '../services/skill.service';

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const result = await skillService.getAllSkills();
        if (result.success) {
          setSkills(result.data);
        } else {
          setError(result.message || 'Failed to fetch skills.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch skills.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};
