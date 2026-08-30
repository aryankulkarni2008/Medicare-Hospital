import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialAdminProfile,
  initialHospitalInfo,
  initialDoctors,
  initialDoctorRequests,
  initialPatients,
  initialAppointments,
  initialNotifications,
  initialActivities
} from '../data/adminMockData';
import { authService } from '../services/authService';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const currentAdmin = authService.getCurrentAdmin();
  const defaultProfile = currentAdmin 
    ? { ...initialAdminProfile, name: currentAdmin.name, email: currentAdmin.email, role: currentAdmin.role } 
    : initialAdminProfile;

  const [adminProfile, setAdminProfile] = useState(defaultProfile);
  const [hospitalInfo, setHospitalInfo] = useState(initialHospitalInfo);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [doctorRequests, setDoctorRequests] = useState([]); // Default empty array, fetch from API
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activities, setActivities] = useState(initialActivities);
  const [alertMessage, setAlertMessage] = useState(null);

  // Show a temp alert message
  const showAlert = (message, type = 'success') => {
    setAlertMessage({ message, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  useEffect(() => {
    // Fetch doctor requests on mount
    const fetchRequests = async () => {
      const reqs = await authService.getDoctorRequests();
      // Map backend fields to frontend expected fields if needed, or just use directly
      const mapped = reqs.map(r => ({
        id: r._id,
        name: r.fullName,
        email: r.email,
        phone: r.phoneNumber,
        age: r.age,
        gender: r.gender,
        address: r.address,
        specialty: r.specialization,
        degree: r.medicalDegree,
        college: r.medicalCollege,
        licenseNumber: r.registrationLicenceNumber,
        preferredDepartment: r.department,
        experience: r.yearsOfExperience,
        status: r.status === 'pending' ? 'Pending' : r.status,
        date: new Date(r.createdAt).toLocaleDateString()
      }));
      setDoctorRequests(mapped);
    };
    fetchRequests();
  }, []);

  const approveDoctorRequest = async (requestId) => {
    const request = doctorRequests.find(r => r.id === requestId);
    if (!request) return;

    const response = await authService.acceptDoctorRequest(requestId);
    if (!response.success) {
      showAlert(response.message || "Failed to approve request", "error");
      return;
    }

    // 1. Create a new doctor from request info
    const newDoctor = {
      id: `doc_${Date.now()}`,
      name: request.name,
      email: request.email,
      phone: request.phone,
      age: request.age,
      gender: request.gender,
      address: request.address,
      specialty: request.specialty,
      department: request.preferredDepartment || "General Medicine",
      experience: request.experience,
      fee: 150,
      degree: request.degree,
      college: request.college,
      licenseNumber: request.licenseNumber,
      previousClinic: request.previousClinic || "N/A",
      about: `Dr. ${request.name} is a specialist in ${request.specialty} with ${request.experience} years of experience. Joined Medicare Hospital recently.`,
      status: "Active",
      photo: request.photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
    };

    // 2. Update Doctors List
    setDoctors(prev => [...prev, newDoctor]);

    // 3. Remove request from list since it's deleted in backend
    setDoctorRequests(prev => prev.filter(r => r.id !== requestId));

    // 4. Log Admin Activity
    const newActivity = {
      id: `act_${Date.now()}`,
      type: "success",
      title: "Doctor Request Approved",
      message: `${request.name} was approved as an active doctor in ${newDoctor.department}.`,
      timestamp: "Just now"
    };
    setActivities(prev => [newActivity, ...prev]);

    // 5. Add internal admin notification
    const newNotif = {
      id: `notif_${Date.now()}`,
      type: "doctor_approved",
      title: "Doctor Approved",
      message: `${request.name} is now active on the panel.`,
      timestamp: "Just now",
      isRead: false,
      relatedDoctorId: newDoctor.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    showAlert("Doctor request approved successfully.", "success");
  };

  const rejectDoctorRequest = async (requestId) => {
    const request = doctorRequests.find(r => r.id === requestId);
    if (!request) return;

    const response = await authService.rejectDoctorRequest(requestId);
    if (!response.success) {
      showAlert(response.message || "Failed to reject request", "error");
      return;
    }

    // 1. Remove request from list
    setDoctorRequests(prev => prev.filter(r => r.id !== requestId));

    // 2. Log Admin Activity
    const newActivity = {
      id: `act_${Date.now()}`,
      type: "danger",
      title: "Doctor Request Rejected",
      message: `Registration request from ${request.name} was rejected.`,
      timestamp: "Just now"
    };
    setActivities(prev => [newActivity, ...prev]);

    // 3. Add notification
    const newNotif = {
      id: `notif_${Date.now()}`,
      type: "doctor_rejected",
      title: "Doctor Request Rejected",
      message: `${request.name}'s registration request was declined.`,
      timestamp: "Just now",
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    showAlert("Doctor request rejected.", "error");
  };

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showAlert("All notifications marked as read.", "success");
  };

  const updateHospitalInfo = (newInfo) => {
    setHospitalInfo(prev => ({ ...prev, ...newInfo }));
    showAlert("Hospital information updated successfully.", "success");
  };

  const updateAdminProfile = (newProfile) => {
    setAdminProfile(prev => ({ ...prev, ...newProfile }));
    showAlert("Admin profile updated successfully.", "success");
  };

  return (
    <AdminContext.Provider value={{
      adminProfile,
      hospitalInfo,
      doctors,
      doctorRequests,
      patients,
      appointments,
      notifications,
      activities,
      alertMessage,
      showAlert,
      approveDoctorRequest,
      rejectDoctorRequest,
      markNotificationRead,
      markAllNotificationsRead,
      updateHospitalInfo,
      updateAdminProfile
    }}>
      {children}
      {alertMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg border transition-all duration-300 animate-slide-in bg-white border-med-border">
          <div className={`w-3 h-3 rounded-full mr-3 ${alertMessage.type === 'success' ? 'bg-status-success' : 'bg-status-rejected'}`}></div>
          <span className="text-med-navy font-medium text-sm">{alertMessage.message}</span>
        </div>
      )}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
