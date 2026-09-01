const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String, // e.g. "09:00 AM" or "09:00"
      required: true,
    },
    endTime: {
      type: String, // e.g. "01:00 PM" or "13:00"
      required: true,
    },
  },
  { _id: false }
);

const dayScheduleSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    available: {
      type: Boolean,
      default: false,
    },
    slots: [slotSchema],
  },
  { _id: false }
);

const doctorAvailabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    weeklySchedule: {
      type: [dayScheduleSchema],
      default: [
        { day: 'Monday', available: false, slots: [] },
        { day: 'Tuesday', available: false, slots: [] },
        { day: 'Wednesday', available: false, slots: [] },
        { day: 'Thursday', available: false, slots: [] },
        { day: 'Friday', available: false, slots: [] },
        { day: 'Saturday', available: false, slots: [] },
        { day: 'Sunday', available: false, slots: [] },
      ],
    },
    slotDuration: {
      type: Number,
      default: 30, // in minutes
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);
