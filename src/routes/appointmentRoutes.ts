import { Router } from 'express';
import { getAppointments, createAppointment } from '../controllers/appointmentController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// All appointment routes are protected
router.use(requireAuth);

router.get('/', getAppointments);
router.post('/', createAppointment);

export default router;
