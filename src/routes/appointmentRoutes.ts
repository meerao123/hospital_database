import { Router } from 'express';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointmentController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// All appointment routes are protected
router.use(requireAuth);

router.get('/', getAppointments);
router.post('/', createAppointment);
router.patch('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
