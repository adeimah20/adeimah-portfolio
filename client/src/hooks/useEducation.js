import { useState, useEffect } from 'react';
import { educationService } from '../services/education.service';

export const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const result = await educationService.getAllEducation();
        if (result.success) {
          setEducation(result.data);
        } else {
          setError(result.message || 'Failed to fetch education.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch education.');
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { education, loading, error };
};
