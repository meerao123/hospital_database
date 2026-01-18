import { Router } from 'express';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public route to list doctors (as per requirements)
router.get('/', getDoctors);

// Protected route to create a doctor
router.post('/', requireAuth, createDoctor);

// Update and Delete routes
router.patch('/:id', requireAuth, updateDoctor);
router.delete('/:id', requireAuth, deleteDoctor);

export default router;
