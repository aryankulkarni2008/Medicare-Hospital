const express = require('express');
const router = express.Router();
const { registerDoctorRequest, loginDoctor } = require('../controllers/doctorController');

router.post('/register', registerDoctorRequest);
router.post('/login', loginDoctor);

module.exports = router;
