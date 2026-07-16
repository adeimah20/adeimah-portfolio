import express from 'express';
import { createMessage } from '../controllers/contact.controller.js';
import { validateContact } from '../validators/contact.validator.js';

const router = express.Router();

router.post('/', validateContact, createMessage);

export default router;
