const express = require('express');
const router = express.Router();
const {
  getDoctorNotifications,
  markNotificationRead,
  markAllNotificationsRead
} = require('../controllers/notificationController');

// GET /api/notifications/doctor/:doctorId
router.get('/doctor/:doctorId', getDoctorNotifications);

// PUT /api/notifications/doctor/:doctorId/read-all
router.put('/doctor/:doctorId/read-all', markAllNotificationsRead);

// PUT /api/notifications/:id/read
router.put('/:id/read', markNotificationRead);

module.exports = router;
