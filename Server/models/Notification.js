const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      required: true,
      unique: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    appointmentId: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'info'],
      default: 'info',
    },
    read: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      default: 'Just now',
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
