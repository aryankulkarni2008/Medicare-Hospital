const express = require('express');
const router = express.Router();
const {
  createAppointmentRequest,
  getDoctorAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// POST /api/appointments
router.post('/', createAppointmentRequest);

// GET /api/appointments/doctor/:doctorId
router.get('/doctor/:doctorId', getDoctorAppointments);

// GET /api/appointments/patient/:patientId
router.get('/patient/:patientId', require('../controllers/appointmentController').getPatientAppointments);

// PUT /api/appointments/:id/status
router.put('/:id/status', updateAppointmentStatus);

module.exports = router;
