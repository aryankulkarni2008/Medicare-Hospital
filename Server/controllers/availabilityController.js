const DoctorAvailability = require('../models/DoctorAvailability');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// Days of the week in standard order
const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Helper: Convert time string like "09:00 AM", "9:00 AM", "09:00", "13:00", "01:00 PM" to minutes from midnight
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const str = timeStr.trim();
  
  // Check for AM/PM
  const isPM = /pm/i.test(str);
  const isAM = /am/i.test(str);
  
  // Clean string to just "HH:MM"
  const cleanStr = str.replace(/[^\d:]/g, '');
  const parts = cleanStr.split(':');
  let hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

// Helper: Format minutes from midnight to "HH:MM AM/PM"
const formatMinutesToTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hStr}:${mStr} ${ampm}`;
};

// Helper: Get weekday name from YYYY-MM-DD string
const getDayNameFromDate = (dateStr) => {
  if (!dateStr) return '';
  // Split YYYY-MM-DD to avoid timezone shifting
  const parts = dateStr.split('-');
  if (parts.length !== 3) return '';
  const [year, month, day] = parts.map(Number);
  const d = new Date(year, month - 1, day);
  return DAYS_OF_WEEK[d.getDay()];
};

// Default empty schedule
const getDefaultSchedule = () => [
  { day: 'Monday', available: false, slots: [] },
  { day: 'Tuesday', available: false, slots: [] },
  { day: 'Wednesday', available: false, slots: [] },
  { day: 'Thursday', available: false, slots: [] },
  { day: 'Friday', available: false, slots: [] },
  { day: 'Saturday', available: false, slots: [] },
  { day: 'Sunday', available: false, slots: [] },
];

// @desc    Get availability for a specific doctor (Public / Patient / Doctor view)
// @route   GET /api/availability/doctor/:doctorId
// @access  Public
const getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.json({
        success: true,
        doctorId: '',
        weeklySchedule: getDefaultSchedule(),
        slotDuration: 30,
        isConfigured: false,
      });
    }

    // Check if doctor exists in Doctor collection (by doctorId, preferredDoctorId, or _id)
    let doctor = await Doctor.findOne({
      $or: [
        { doctorId: doctorId },
        { _id: doctorId.match(/^[0-9a-fA-F]{24}$/) ? doctorId : null }
      ]
    });

    const targetDoctorId = doctor ? doctor.doctorId : doctorId;

    let availability = await DoctorAvailability.findOne({
      $or: [
        { doctorId: targetDoctorId },
        { doctorId: doctorId }
      ]
    });

    if (!availability) {
      // Return 200 JSON with default empty availability structure so frontend never gets 404 HTML
      return res.json({
        success: true,
        doctorId: targetDoctorId,
        weeklySchedule: getDefaultSchedule(),
        slotDuration: 30,
        isConfigured: false,
        message: 'No availability configured yet for this doctor.',
      });
    }

    return res.json({
      success: true,
      doctorId: availability.doctorId,
      weeklySchedule: availability.weeklySchedule,
      slotDuration: availability.slotDuration || 30,
      isConfigured: true,
      updatedAt: availability.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching availability.' });
  }
};

// @desc    Get logged-in doctor's own availability
// @route   GET /api/availability/me
// @access  Private (Doctor)
const getMyAvailability = async (req, res) => {
  try {
    const doctorId = req.doctor ? req.doctor.doctorId : req.headers['x-doctor-id'];

    if (!doctorId) {
      return res.status(401).json({ success: false, message: 'Doctor not authenticated' });
    }

    let availability = await DoctorAvailability.findOne({ doctorId });

    if (!availability) {
      return res.json({
        success: true,
        doctorId,
        weeklySchedule: getDefaultSchedule(),
        slotDuration: 30,
        isConfigured: false,
      });
    }

    return res.json({
      success: true,
      doctorId: availability.doctorId,
      weeklySchedule: availability.weeklySchedule,
      slotDuration: availability.slotDuration || 30,
      isConfigured: true,
      updatedAt: availability.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching own availability:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Update / Save logged-in doctor's availability (Supports both POST & PUT)
// @route   POST /api/availability OR PUT /api/availability
// @access  Private (Doctor)
const updateAvailability = async (req, res) => {
  try {
    // Identify doctor from auth middleware, token, or request body
    let doctorId = req.doctor ? req.doctor.doctorId : null;
    if (!doctorId && req.body && req.body.doctorId) {
      doctorId = req.body.doctorId;
    }

    if (!doctorId) {
      return res.status(400).json({ success: false, message: 'Doctor ID is required to save availability.' });
    }

    const { weeklySchedule, slotDuration } = req.body;

    if (!weeklySchedule || !Array.isArray(weeklySchedule)) {
      return res.status(400).json({ success: false, message: 'Invalid weekly schedule data.' });
    }

    // Format & validate schedule
    const sanitizedSchedule = weeklySchedule.map((dayItem) => {
      const slots = Array.isArray(dayItem.slots)
        ? dayItem.slots
            .filter((s) => s.startTime && s.endTime)
            .map((s) => ({
              startTime: formatMinutesToTime(parseTimeToMinutes(s.startTime)),
              endTime: formatMinutesToTime(parseTimeToMinutes(s.endTime)),
            }))
        : [];

      return {
        day: dayItem.day,
        available: Boolean(dayItem.available),
        slots,
      };
    });

    const parsedDuration = parseInt(slotDuration, 10) || 30;

    const updated = await DoctorAvailability.findOneAndUpdate(
      { doctorId },
      {
        doctorId,
        weeklySchedule: sanitizedSchedule,
        slotDuration: parsedDuration,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Availability saved successfully.',
      availability: updated,
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    return res.status(500).json({ success: false, message: 'Server error updating availability.' });
  }
};

// @desc    Get generated available & booked slots for a specific doctor & date
// @route   GET /api/availability/doctor/:doctorId/slots?date=YYYY-MM-DD
// @access  Public
const getDoctorSlotsForDate = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date parameter (YYYY-MM-DD) is required.' });
    }

    const dayName = getDayNameFromDate(date);
    if (!dayName) {
      return res.status(400).json({ success: false, message: 'Invalid date format.' });
    }

    let doctor = await Doctor.findOne({
      $or: [
        { doctorId: doctorId },
        { _id: doctorId.match(/^[0-9a-fA-F]{24}$/) ? doctorId : null }
      ]
    });

    const effectiveDoctorId = doctor ? doctor.doctorId : doctorId;
    const availability = await DoctorAvailability.findOne({ doctorId: effectiveDoctorId });

    if (!availability) {
      return res.json({
        success: true,
        available: false,
        dayName,
        date,
        doctorId: effectiveDoctorId,
        message: 'No availability has been configured for this doctor.',
        slots: [],
      });
    }

    const dayConfig = availability.weeklySchedule.find((d) => d.day === dayName);

    if (!dayConfig || !dayConfig.available || !dayConfig.slots || dayConfig.slots.length === 0) {
      return res.json({
        success: true,
        available: false,
        dayName,
        date,
        doctorId: effectiveDoctorId,
        message: `Doctor is not available on ${dayName}s.`,
        slots: [],
      });
    }

    const duration = availability.slotDuration || 30;

    // Fetch existing active appointments for this doctor on this date
    const existingAppointments = await Appointment.find({
      doctorId: effectiveDoctorId,
      date,
      status: { $nin: ['Cancelled', 'Rejected'] },
    });

    const bookedTimeSet = new Set(
      existingAppointments.map((app) => formatMinutesToTime(parseTimeToMinutes(app.time)))
    );

    // Generate discrete slots for each configured slot range
    const generatedSlots = [];
    const addedTimeSet = new Set();

    for (const range of dayConfig.slots) {
      const startMins = parseTimeToMinutes(range.startTime);
      const endMins = parseTimeToMinutes(range.endTime);

      for (let curr = startMins; curr < endMins; curr += duration) {
        if (curr + duration <= endMins) {
          const timeLabel = formatMinutesToTime(curr);
          if (!addedTimeSet.has(timeLabel)) {
            addedTimeSet.add(timeLabel);
            const isBooked = bookedTimeSet.has(timeLabel);
            generatedSlots.push({
              time: timeLabel,
              startTime: timeLabel,
              endTime: formatMinutesToTime(curr + duration),
              isBooked,
              status: isBooked ? 'Booked' : 'Available',
            });
          }
        }
      }
    }

    return res.json({
      success: true,
      available: true,
      dayName,
      date,
      doctorId: effectiveDoctorId,
      doctorName: doctor ? doctor.fullName : 'Doctor',
      slotDuration: duration,
      slots: generatedSlots,
    });
  } catch (error) {
    console.error('Error generating slots for date:', error);
    return res.status(500).json({ success: false, message: 'Server error generating slots.' });
  }
};

module.exports = {
  getDoctorAvailability,
  getMyAvailability,
  updateAvailability,
  getDoctorSlotsForDate,
  parseTimeToMinutes,
  formatMinutesToTime,
  getDayNameFromDate,
};
