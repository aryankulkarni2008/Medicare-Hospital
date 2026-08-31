import React, { createContext, useContext, useState } from 'react';
import {
  initialDoctorProfile,
  initialAppointments,
  initialPatients,
  initialAvailability,
  initialNotifications,
  generateTimeSlots
} from '../mock/data';

import { authService } from '../../../loginpage/src/services/authService';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const currentUser = authService.getCurrentDoctor();

  const [doctorProfile, setDoctorProfile] = useState({
    ...initialDoctorProfile,
    name: currentUser?.name || initialDoctorProfile.name,
    email: currentUser?.email || initialDoctorProfile.email,
  });
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState(initialPatients);
  const [availability, setAvailability] = useState(initialAvailability);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Fetch appointments and notifications on load
  React.useEffect(() => {
    if (currentUser?.doctorId) {
      // Fetch Appointments
      fetch(`http://localhost:5000/api/appointments/doctor/${currentUser.doctorId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            // Map the backend model to match the frontend shape
            const mappedAppointments = data.map(app => ({
              ...app,
              id: app.appointmentId,
            }));
            setAppointments(mappedAppointments);
          }
        })
        .catch(err => console.error("Error fetching appointments:", err));

      // Fetch Notifications
      fetch(`http://localhost:5000/api/notifications/doctor/${currentUser.doctorId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const mappedNotifs = data.map(notif => ({
              ...notif,
              id: notif.notificationId,
            }));
            setNotifications(mappedNotifs);
          }
        })
        .catch(err => console.error("Error fetching notifications:", err));
    }
  }, [currentUser?.doctorId]);
  
  // Real-time slot status overrides map e.g. { "10:00 AM": "Booked" }
  const [slotOverrides, setSlotOverrides] = useState({});

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
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
        body: JSON.stringify({ status: 'Confirmed' })
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: 'Confirmed' } : app))
        );
        showToast(`Appointment ${id} accepted successfully.`, 'success');
        
        // Refetch notifications to get the new one
        if (currentUser?.doctorId) {
          fetch(`http://localhost:5000/api/notifications/doctor/${currentUser.doctorId}`)
            .then(r => r.json())
            .then(data => {
              if (Array.isArray(data)) {
                setNotifications(data.map(notif => ({ ...notif, id: notif.notificationId })));
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
        body: JSON.stringify({ status: 'Rejected', reason })
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: 'Rejected', rejectReason: reason } : app))
        );
        showToast(`Appointment ${id} rejected.`, 'danger');
        
        // Refetch notifications to get the new one
        if (currentUser?.doctorId) {
          fetch(`http://localhost:5000/api/notifications/doctor/${currentUser.doctorId}`)
            .then(r => r.json())
            .then(data => {
              if (Array.isArray(data)) {
                setNotifications(data.map(notif => ({ ...notif, id: notif.notificationId })));
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
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Completed' } : app))
    );
    const target = appointments.find((a) => a.id === id);
    const patientName = target ? target.patientName : 'Patient';

    showToast(`Appointment for ${patientName} marked as completed.`, 'success');
  };

  const cancelAppointment = (id, reason = 'Cancelled by doctor') => {
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

  // Availability Update Action
  const updateAvailability = (updatedAvail) => {
    setAvailability((prev) => ({ ...prev, ...updatedAvail }));
    showToast('Availability updated successfully.', 'success');
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
      if (currentUser?.doctorId) {
        await fetch(`http://localhost:5000/api/notifications/doctor/${currentUser.doctorId}/read-all`, { method: 'PUT' });
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
      
      showToast(`Slot ${timeStr} updated to ${nextStatus}.`, 'info');
      return { ...prev, [timeStr]: nextStatus };
    });
  };

  // Derived slot list incorporating overrides
  const getGeneratedSlots = () => {
    const rawSlots = generateTimeSlots(
      availability.workHours.from,
      availability.workHours.to,
      availability.breakTime.from,
      availability.breakTime.to,
      availability.slotDuration
    );

    return rawSlots.map((slot) => {
      if (slot.isBreak) return slot;
      if (slotOverrides[slot.time]) {
        return { ...slot, status: slotOverrides[slot.time] };
      }
      return slot;
    });
  };

  // Stats calculation
  const stats = {
    todayCount: appointments.filter((a) => a.date === '2026-08-23').length,
    pendingCount: appointments.filter((a) => a.status === 'Pending').length,
    upcomingCount: appointments.filter((a) => a.status === 'Confirmed').length,
    completedCount: appointments.filter((a) => a.status === 'Completed').length,
    cancelledCount: appointments.filter((a) => a.status === 'Cancelled' || a.status === 'Rejected').length
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <DoctorContext.Provider
      value={{
        doctorProfile,
        appointments,
        patients,
        availability,
        notifications,
        toasts,
        stats,
        unreadNotificationCount,
        getGeneratedSlots,
        toggleSlotStatus,
        acceptAppointment,
        rejectAppointment,
        completeAppointment,
        cancelAppointment,
        updateDoctorProfile,
        updateAvailability,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        showToast,
        removeToast
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
