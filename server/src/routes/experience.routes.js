import express from 'express';
import { getAllExperience } from '../controllers/experience.controller.js';

const router = express.Router();

router.get('/', getAllExperience);

export default router;
