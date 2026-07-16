import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';

// Route Imports
import profileRouter from './routes/profile.routes.js';
import educationRouter from './routes/education.routes.js';
import experienceRouter from './routes/experience.routes.js';
import skillRouter from './routes/skill.routes.js';
import projectRouter from './routes/project.routes.js';
import contactRouter from './routes/contact.routes.js';

// Middleware Imports
import { notFoundHandler, errorHandler } from './middleware/error.js';

const app = express();

// CORS Configuration
app.use(cors({
  origin: ENV.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// JSON Parser Middleware
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Mounting API Routes
app.use('/api/profile', profileRouter);
app.use('/api/education', educationRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/skills', skillRouter);
app.use('/api/projects', projectRouter);
app.use('/api/contact', contactRouter);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
