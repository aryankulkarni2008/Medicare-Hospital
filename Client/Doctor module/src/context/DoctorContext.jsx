import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialDoctorProfile,
  initialNotifications,
} from '../mock/data';

import { authService } from '../../../LandingPage/src/services/authService';

const DoctorContext = createContext();

const defaultWeeklySchedule = [
  { day: 'Monday', available: true, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
  { day: 'Tuesday', available: true, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
  { day: 'Wednesday', available: true, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
  { day: 'Thursday', available: true, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
  { day: 'Friday', available: true, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
  { day: 'Saturday', available: false, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
  { day: 'Sunday', available: false, slots: [] },
];

// Helper: Safely parse JSON from fetch response without throwing syntax error on HTML 404/500
const safeJsonParse = async (res) => {
  try {
    const text = await res.text();
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
};

export const DoctorProvider = ({ children }) => {
  const currentUser = authService.getCurrentDoctor();
  const doctorIdentifier = currentUser?.doctorId || currentUser?.id || currentUser?._id;

  const [doctorProfile, setDoctorProfile] = useState({
    ...initialDoctorProfile,
    name: currentUser?.name || initialDoctorProfile.name,
    email: currentUser?.email || initialDoctorProfile.email,
  });
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  
  // Weekly Availability State linked to MongoDB
  const [weeklySchedule, setWeeklySchedule] = useState(defaultWeeklySchedule);
  const [slotDuration, setSlotDuration] = useState(30);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [availabilitySavedSuccess, setAvailabilitySavedSuccess] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Fetch Doctor Profile, Appointments, Availability, and Notifications on load
  useEffect(() => {
    if (doctorIdentifier) {
      // 1. Fetch Doctor details
      fetch(`http://localhost:5000/api/doctors/${doctorIdentifier}`)
        .then((res) => safeJsonParse(res))
        .then((doc) => {
          if (doc && (doc.doctorId || doc.fullName)) {
            setDoctorProfile((prev) => ({
              ...prev,
              name: doc.fullName || prev.name,
              email: doc.email || prev.email,
              phone: doc.phoneNumber || prev.phone,
              department: doc.department || prev.department,
              title: doc.specialization || prev.title,
              experience: doc.yearsOfExperience ? `${doc.yearsOfExperience} Years` : prev.experience,
              qualification: doc.medicalDegree || prev.qualification,
              hospital: doc.previousHospital || prev.hospital,
              about: `Dr. ${doc.fullName} is a specialist in ${doc.department} (${doc.specialization}).`,
            }));
          }
        })
        .catch((err) => console.error('Error fetching doctor details:', err));

      // 2. Fetch Appointments
      fetch(`http://localhost:5000/api/appointments/doctor/${doctorIdentifier}`)
        .then((res) => safeJsonParse(res))
        .then((data) => {
          if (Array.isArray(data)) {
            const mappedAppointments = data.map((app, idx) => ({
              ...app,
              id: app.appointmentId || `apt_${idx}`,
            }));
            setAppointments(mappedAppointments);
          }
        })
        .catch((err) => console.error('Error fetching appointments:', err));

      // 3. Fetch Notifications
      fetch(`http://localhost:5000/api/notifications/doctor/${doctorIdentifier}`)
        .then((res) => safeJsonParse(res))
        .then((data) => {
          if (Array.isArray(data)) {
            const mappedNotifs = data.map((notif, idx) => ({
              ...notif,
              id: notif.notificationId || `notif_${notif._id || idx}_${idx}`,
            }));
            setNotifications(mappedNotifs);
          }
        })
        .catch((err) => console.error('Error fetching notifications:', err));

      // 4. Fetch Doctor Availability from MongoDB
      setIsAvailabilityLoading(true);
      fetch(`http://localhost:5000/api/availability/doctor/${doctorIdentifier}`)
        .then((res) => safeJsonParse(res))
        .then((data) => {
          setIsAvailabilityLoading(false);
          if (data && data.weeklySchedule && data.weeklySchedule.length > 0) {
            // Merge with all 7 days to guarantee every day is present
            const fullWeek = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ].map((dayName) => {
              const found = data.weeklySchedule.find((d) => d.day === dayName);
              if (found) {
                return {
                  day: dayName,
                  available: Boolean(found.available),
                  slots: found.slots || [],
                };
              }
              return { day: dayName, available: false, slots: [] };
            });

            setWeeklySchedule(fullWeek);
            if (data.slotDuration) {
              setSlotDuration(data.slotDuration);
            }
          }
        })
        .catch((err) => {
          setIsAvailabilityLoading(false);
          console.error('Error fetching availability:', err);
        });
    } else {
      setIsAvailabilityLoading(false);
    }
  }, [doctorIdentifier]);

  // Real-time slot status overrides for simulation preview e.g. { "10:00 AM": "Booked" }
  const [slotOverrides, setSlotOverrides] = useState({});

  // Toast Helper with unique key generation
  const showToast = (message, type = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Appointment Actions
  const acceptAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Confirmed' }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: 'Confirmed' } : app))
        );
        showToast(`Appointment ${id} accepted successfully.`, 'success');

        // Refetch notifications
        if (doctorIdentifier) {
          fetch(`http://localhost:5000/api/notifications/doctor/${doctorIdentifier}`)
            .then((r) => safeJsonParse(r))
            .then((data) => {
              if (Array.isArray(data)) {
                setNotifications(
                  data.map((notif, idx) => ({
                    ...notif,
                    id: notif.notificationId || `notif_${idx}`,
                  }))
                );
              }
            });
        }
      } else {
        showToast(`Failed to accept appointment ${id}.`, 'danger');
      }
    } catch (e) {
      console.error(e);
      showToast(`Error accepting appointment ${id}.`, 'danger');
    }
  };

  const rejectAppointment = async (id, reason = 'Doctor unavailable') => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected', reason }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: 'Rejected', rejectReason: reason } : app
          )
        );
        showToast(`Appointment ${id} rejected.`, 'danger');

        // Refetch notifications
        if (doctorIdentifier) {
          fetch(`http://localhost:5000/api/notifications/doctor/${doctorIdentifier}`)
            .then((r) => safeJsonParse(r))
            .then((data) => {
              if (Array.isArray(data)) {
                setNotifications(
                  data.map((notif, idx) => ({
                    ...notif,
                    id: notif.notificationId || `notif_${idx}`,
                  }))
                );
              }
            });
        }
      } else {
        showToast(`Failed to reject appointment ${id}.`, 'danger');
      }
    } catch (e) {
      console.error(e);
      showToast(`Error rejecting appointment ${id}.`, 'danger');
    }
  };

  const completeAppointment = (id) => {
    fetch(`http://localhost:5000/api/appointments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' }),
    }).catch((err) => console.error(err));

    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Completed' } : app))
    );
    const target = appointments.find((a) => a.id === id);
    const patientName = target ? target.patientName : 'Patient';

    showToast(`Appointment for ${patientName} marked as completed.`, 'success');
  };

  const cancelAppointment = (id, reason = 'Cancelled by doctor') => {
    fetch(`http://localhost:5000/api/appointments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Cancelled', reason }),
    }).catch((err) => console.error(err));

    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Cancelled', reason } : app))
    );
    const target = appointments.find((a) => a.id === id);
    const patientName = target ? target.patientName : 'Patient';

    showToast(`Appointment ${id} for ${patientName} cancelled.`, 'warning');
  };

  // Profile Update Action
  const updateDoctorProfile = (updatedProfile) => {
    setDoctorProfile((prev) => ({ ...prev, ...updatedProfile }));
    showToast('Doctor profile updated successfully.', 'success');
  };

  // Save Availability to MongoDB (Supports POST /api/availability and PUT /api/availability)
  const saveAvailabilityToDatabase = async (newSchedule, newDuration) => {
    try {
      const token = currentUser?.token;
      const targetDocId = doctorIdentifier;

      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (targetDocId) {
        headers['x-doctor-id'] = targetDocId;
      }

      const response = await fetch('http://localhost:5000/api/availability', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          doctorId: targetDocId,
          weeklySchedule: newSchedule || weeklySchedule,
          slotDuration: newDuration || slotDuration,
        }),
      });

      const data = await safeJsonParse(response);

      if (response.ok && data && (data.success || data.availability)) {
        setWeeklySchedule(newSchedule || weeklySchedule);
        if (newDuration) setSlotDuration(newDuration);
        setAvailabilitySavedSuccess(true);
        setTimeout(() => setAvailabilitySavedSuccess(false), 5000);
        showToast('✓ Availability Saved Successfully: Your working schedule has been updated.', 'success');
        return { success: true, data };
      } else {
        const errorMsg = data?.message || 'Unable to save availability. Please try again.';
        showToast(errorMsg, 'danger');
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error('Error saving availability:', error);
      showToast('Unable to save availability. Please check your connection and try again.', 'danger');
      return { success: false, message: 'Server error saving availability' };
    }
  };

  // Notifications Actions
  const markNotificationAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, { method: 'PUT' });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification read', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      if (doctorIdentifier) {
        await fetch(
          `http://localhost:5000/api/notifications/doctor/${doctorIdentifier}/read-all`,
          { method: 'PUT' }
        );
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        showToast('All notifications marked as read.', 'info');
      }
    } catch (error) {
      console.error('Error marking all notifications read', error);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared.', 'info');
  };

  // Toggle Real-Time Slot Simulation Status
  const toggleSlotStatus = (timeStr) => {
    setSlotOverrides((prev) => {
      const current = prev[timeStr];
      let nextStatus = 'Booked';
      if (current === 'Booked') nextStatus = 'Available';
      else if (current === 'Available') nextStatus = 'Booked';

      showToast(`Slot ${timeStr} set to ${nextStatus} (Simulation).`, 'info');
      return { ...prev, [timeStr]: nextStatus };
    });
  };

  // Time conversion helpers
  const parseTimeToMins = (timeStr) => {
    if (!timeStr) return 0;
    const str = timeStr.trim();
    const isPM = /pm/i.test(str);
    const isAM = /am/i.test(str);
    const cleanStr = str.replace(/[^\d:]/g, '');
    const parts = cleanStr.split(':');
    let hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;

    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const formatMinsToTime = (totalMinutes) => {
    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const hStr = hours < 10 ? `0${hours}` : `${hours}`;
    const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hStr}:${mStr} ${ampm}`;
  };

  // Generate slots for simulation based on a specific selected day
  const getSimulationSlotsForDay = (selectedDayName) => {
    const dayConfig = weeklySchedule.find((d) => d.day === selectedDayName);
    if (!dayConfig || !dayConfig.available || !dayConfig.slots || dayConfig.slots.length === 0) {
      return [];
    }

    const duration = parseInt(slotDuration, 10) || 30;
    const slots = [];
    const addedTimeSet = new Set();

    for (const range of dayConfig.slots) {
      const startMins = parseTimeToMins(range.startTime);
      const endMins = parseTimeToMins(range.endTime);

      for (let curr = startMins; curr < endMins; curr += duration) {
        if (curr + duration <= endMins) {
          const timeLabel = formatMinsToTime(curr);
          if (!addedTimeSet.has(timeLabel)) {
            addedTimeSet.add(timeLabel);

            let status = 'Available';
            if (slotOverrides[timeLabel]) {
              status = slotOverrides[timeLabel];
            }

            slots.push({
              time: timeLabel,
              status: status,
              isBooked: status === 'Booked',
            });
          }
        }
      }
    }

    return slots;
  };

  // Stats calculation
  const stats = {
    todayCount: appointments.filter((a) => a.date === '2026-08-23').length,
    pendingCount: appointments.filter((a) => a.status === 'Pending').length,
    upcomingCount: appointments.filter((a) => a.status === 'Confirmed').length,
    completedCount: appointments.filter((a) => a.status === 'Completed').length,
    cancelledCount: appointments.filter(
      (a) => a.status === 'Cancelled' || a.status === 'Rejected'
    ).length,
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <DoctorContext.Provider
      value={{
        doctorProfile,
        appointments,
        patients,
        weeklySchedule,
        setWeeklySchedule,
        slotDuration,
        setSlotDuration,
        isAvailabilityLoading,
        availabilitySavedSuccess,
        notifications,
        toasts,
        stats,
        unreadNotificationCount,
        getSimulationSlotsForDay,
        toggleSlotStatus,
        saveAvailabilityToDatabase,
        acceptAppointment,
        rejectAppointment,
        completeAppointment,
        cancelAppointment,
        updateDoctorProfile,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        showToast,
        removeToast,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
