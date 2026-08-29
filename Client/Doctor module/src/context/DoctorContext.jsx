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
  const [appointments, setAppointments] = useState(initialAppointments);
  const [patients, setPatients] = useState(initialPatients);
  const [availability, setAvailability] = useState(initialAvailability);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toasts, setToasts] = useState([]);
  
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
  const acceptAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Confirmed' } : app))
    );
    const target = appointments.find((a) => a.id === id);
    const patientName = target ? target.patientName : 'Patient';
    
    // Add Notification
    setNotifications((prev) => [
      {
        id: `N-${Date.now()}`,
        title: 'Appointment Confirmed',
        description: `You accepted appointment ${id} for ${patientName}.`,
        time: 'Just now',
        read: false,
        type: 'confirmed'
      },
      ...prev
    ]);

    showToast(`Appointment ${id} accepted successfully.`, 'success');
  };

  const rejectAppointment = (id, reason = 'Doctor unavailable') => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Rejected', reason } : app))
    );
    const target = appointments.find((a) => a.id === id);
    const patientName = target ? target.patientName : 'Patient';

    setNotifications((prev) => [
      {
        id: `N-${Date.now()}`,
        title: 'Appointment Rejected',
        description: `You rejected appointment ${id} for ${patientName}.`,
        time: 'Just now',
        read: false,
        type: 'cancelled'
      },
      ...prev
    ]);

    showToast(`Appointment ${id} rejected.`, 'danger');
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
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
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
