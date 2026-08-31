const Notification = require('../models/Notification');

// @desc    Get all notifications for a specific doctor
// @route   GET /api/notifications/doctor/:doctorId
// @access  Public
const getDoctorNotifications = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const notifications = await Notification.find({ doctorId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Public
const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params; // this is the custom notificationId
    const notification = await Notification.findOne({ notificationId: id });
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    notification.read = true;
    await notification.save();

    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Error marking notification read:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Mark all notifications as read for a doctor
// @route   PUT /api/notifications/doctor/:doctorId/read-all
// @access  Public
const markAllNotificationsRead = async (req, res) => {
  try {
    const { doctorId } = req.params;
    await Notification.updateMany({ doctorId, read: false }, { read: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications read:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getDoctorNotifications,
  markNotificationRead,
  markAllNotificationsRead
};
