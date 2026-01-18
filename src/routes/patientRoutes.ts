import { Router } from 'express';
import { getPatients, getPatientById, createPatient } from '../controllers/patientController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// All patient routes are protected
router.use(requireAuth);

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);

export default router;
