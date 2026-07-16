import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/main-layout';
import HomePage from '../pages/home-page';
import ProjectDetailPage from '../pages/project-detail-page';
import NotFoundPage from '../pages/not-found-page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetailPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
