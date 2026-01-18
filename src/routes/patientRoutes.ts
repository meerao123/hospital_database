import { Router } from 'express';
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controllers/patientController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// All patient routes are protected
router.use(requireAuth);

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.patch('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;
