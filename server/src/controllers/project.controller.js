import { projectService } from '../services/project.service.js';
import { asyncHandler } from '../middleware/async-handler.js';

export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.status(200).json({
    success: true,
    data: projects
  });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const project = await projectService.getProjectBySlug(slug);
  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Project with slug '${slug}' was not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: project
  });
});
