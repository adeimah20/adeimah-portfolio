import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectService } from '../services/project.service';

export const useProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const result = await projectService.getProjectBySlug(slug);
        if (result.success) {
          setProject(result.data);
        } else {
          setError({
            status: 404,
            message: result.message || 'Project not found.'
          });
        }
      } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Failed to fetch project details.';
        setError({
          status,
          message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [slug]);

  return { project, loading, error, slug };
};
