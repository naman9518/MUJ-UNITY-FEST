import express from 'express';
import { submitContactQuery } from './contactController.js';

const router = express.Router();
router.post('/', submitContactQuery);

export default router;
