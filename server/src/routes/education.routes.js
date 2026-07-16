import express from 'express';
import { getAllEducation } from '../controllers/education.controller.js';

const router = express.Router();

router.get('/', getAllEducation);

export default router;
