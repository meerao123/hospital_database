import { Router } from 'express';
import { getDoctors, createDoctor } from '../controllers/doctorController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public route to list doctors (as per requirements)
router.get('/', getDoctors);

// Protected route to create a doctor
router.post('/', requireAuth, createDoctor);

export default router;
