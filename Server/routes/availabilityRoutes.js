const express = require('express');
const router = express.Router();
const {
  getDoctorAvailability,
  getMyAvailability,
  updateAvailability,
  getDoctorSlotsForDate,
} = require('../controllers/availabilityController');
const { doctorProtect } = require('../middleware/authMiddleware');

// Public routes
router.get('/doctor/:doctorId', getDoctorAvailability);
router.get('/doctor/:doctorId/slots', getDoctorSlotsForDate);

// Doctor protected routes (Support both POST and PUT for saving availability)
router.get('/me', doctorProtect, getMyAvailability);
router.post('/', doctorProtect, updateAvailability);
router.put('/', doctorProtect, updateAvailability);

module.exports = router;
