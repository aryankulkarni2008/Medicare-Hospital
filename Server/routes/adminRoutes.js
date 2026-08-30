const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getDoctorRequests,
  acceptDoctorRequest,
  rejectDoctorRequest
} = require('../controllers/adminController');
const { adminProtect } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', adminProtect, getAdminProfile);

// Doctor Requests (Using public access based on requirement, though adminProtect is better)
router.get('/requests/doctors', getDoctorRequests);
router.post('/requests/doctors/:id/accept', acceptDoctorRequest);
router.post('/requests/doctors/:id/reject', rejectDoctorRequest);

module.exports = router;
