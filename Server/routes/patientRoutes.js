const express = require('express');
const router = express.Router();
const {
  registerPatient,
  loginPatient,
  getPatientProfile,
  getAllPatients,
  getPatientById,
} = require('../controllers/patientController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/profile', protect, getPatientProfile);
router.get('/', adminProtect, getAllPatients);
router.get('/:id', adminProtect, getPatientById);

module.exports = router;
