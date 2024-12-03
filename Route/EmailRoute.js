import express from 'express';
import { sendMail } from '../Controller/EmailController.js';

const router = express.Router();

// Route to send email
router.post('/send-email', sendMail);

export default router;
