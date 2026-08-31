const express = require('express');
const router = express.Router();
const { registerDoctorRequest, loginDoctor, getDoctors, getDoctorById } = require('../controllers/doctorController');

router.post('/register', registerDoctorRequest);
router.post('/login', loginDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

module.exports = router;
