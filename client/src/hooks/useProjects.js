import { useState, useEffect } from 'react';
import { projectService } from '../services/project.service';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const result = await projectService.getAllProjects();
        if (result.success) {
          setProjects(result.data);
        } else {
          setError(result.message || 'Failed to fetch projects.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
