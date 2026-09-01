import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Centralized Mock Data
import { 
  initialPatient, 
  initialAppointments, 
  initialNotifications, 
  initialActivities 
} from '../../data/patientMockData';

// Shared Components
import PatientPortalSidebar from './PatientPortalSidebar';
import PatientPortalHeader from './PatientPortalHeader';
import PatientAppointmentDetailsModal from './PatientAppointmentDetailsModal';

// Pages
import PatientDashboardPage from '../../pages/patient/PatientDashboardPage';
import PatientAppointmentsPage from '../../pages/patient/PatientAppointmentsPage';
import PatientFindDoctorPage from '../../pages/patient/PatientFindDoctorPage';
import PatientDoctorProfilePage from '../../pages/patient/PatientDoctorProfilePage';
import PatientBookAppointmentPage from '../../pages/patient/PatientBookAppointmentPage';
import PatientBookingSuccessPage from '../../pages/patient/PatientBookingSuccessPage';
import PatientMedicalHistoryPage from '../../pages/patient/PatientMedicalHistoryPage';
import PatientNotificationsPage from '../../pages/patient/PatientNotificationsPage';
import PatientSettingsPage from '../../pages/patient/PatientSettingsPage';

// Authentication Service
import { authService } from '../../services/authService';

export default function PatientPortal() {
  const location = useLocation();
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  if (!authService.isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  const loggedInUser = authService.getCurrentUser();

  const [patient, setPatient] = useState(() => {
    const storedProfile = localStorage.getItem('medicare_patient_profile');
    if (storedProfile) {
      try {
        return JSON.parse(storedProfile);
      } catch (e) {}
    }
    return {
      ...initialPatient,
      name: loggedInUser?.name || '',
      email: loggedInUser?.email || ''
    };
  });

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = loggedInUser?.token;
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/patients/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          const updatedPatient = {
            ...patient,
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            dob: data.dateOfBirth?.split('T')[0] || '',
            gender: data.gender,
            bloodGroup: data.bloodGroup || patient.bloodGroup,
            height: data.height || patient.height,
            weight: data.weight || patient.weight,
            address: data.address,
          };
          setPatient(updatedPatient);
          localStorage.setItem('medicare_patient_profile', JSON.stringify(updatedPatient));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const [doctors, setDoctors] = useState([]); // Fetch from API
  
  React.useEffect(() => {
    const fetchDoctors = async () => {
      const docs = await authService.getDoctors();
      const mappedDocs = docs.map(d => ({
        id: d.doctorId || d._id,
        doctorId: d.doctorId,
        name: d.fullName,
        specialty: d.specialization,
        department: d.department,
        availability: "Available",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
        phone: d.phoneNumber,
        email: d.email,
        experience: `${d.yearsOfExperience} Years`,
        location: d.address,
        degree: d.medicalDegree,
        college: d.medicalCollege,
        licenseNumber: d.registrationLicenceNumber,
        previousClinic: d.previousHospital,
        hospital: d.previousHospital || 'Medicare Hospital',
        qualifications: d.medicalDegree || 'MBBS, MD',
        languages: ['English', 'Hindi'],
        about: `Dr. ${d.fullName} is a specialist in ${d.specialization} with ${d.yearsOfExperience} years of experience.`,
        workingHours: "09:00 AM - 05:00 PM"
      }));
      setDoctors(mappedDocs);
    };
    fetchDoctors();
  }, []);
  const [appointments, setAppointments] = useState([]);
  
  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const currentUser = authService.getCurrentPatient();
        if (!currentUser?.id) return;
        
        const res = await fetch(`http://localhost:5000/api/appointments/patient/${currentUser.id}`);
        if (res.ok) {
          const data = await res.json();
          // Map backend format to frontend format if needed
          const mappedAppointments = data.map(app => ({
            id: app.appointmentId,
            doctorId: app.doctorId,
            doctorName: app.doctorName,
            specialty: app.specialty,
            department: app.department,
            doctorPhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
            date: app.date,
            time: app.time,
            hospital: app.hospital,
            status: app.status,
            reason: app.reason,
            bookingDate: new Date(app.createdAt).toISOString().split('T')[0],
            notes: app.rejectReason || ''
          }));
          setAppointments(mappedAppointments);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activities, setActivities] = useState(initialActivities);

  // Layout UI State
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeDetailsModalAppointment, setActiveDetailsModalAppointment] = useState(null);

  // Unread Count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Header Title Resolver based on Route
  const getPageTitle = (pathname) => {
    if (pathname.includes('/patient/dashboard')) return 'Dashboard Overview';
    if (pathname.includes('/patient/appointments')) return 'My Appointments';
    if (pathname.includes('/patient/find-doctor')) return 'Find & Consult Doctors';
    if (pathname.includes('/patient/doctor/')) return 'Doctor Profile';
    if (pathname.includes('/patient/book-appointment')) return 'Book Appointment';
    if (pathname.includes('/patient/booking-success')) return 'Booking Confirmation';
    if (pathname.includes('/patient/medical-history')) return 'Medical History & Records';
    if (pathname.includes('/patient/notifications')) return 'Notifications Center';
    if (pathname.includes('/patient/settings')) return 'Portal Settings';
    return 'Patient Portal';
  };

  // State Handlers
  const handleCancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt
      )
    );
    // Add activity record
    const newAct = {
      id: `ACT-${Date.now()}`,
      title: "Appointment Cancelled",
      desc: `Cancelled appointment reference ID: ${appointmentId}`,
      time: "Just now",
      type: "cancelled"
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleBookAppointment = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    // Add notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      type: "Appointment Pending",
      title: "New Appointment Requested",
      message: `Your appointment request with ${newAppointment.doctorName} for ${newAppointment.date} is pending confirmation.`,
      timestamp: "Just now",
      isRead: false,
      appointmentId: newAppointment.id,
      doctorName: newAppointment.doctorName,
      iconType: "Clock"
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleUpdatePatient = (updatedProfile) => {
    setPatient(updatedProfile);
    localStorage.setItem('medicare_patient_profile', JSON.stringify(updatedProfile));
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    authService.logoutPatient();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F4F9FC] flex flex-col lg:flex-row font-sans">
      {/* Sidebar */}
      <PatientPortalSidebar 
        patient={patient}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <PatientPortalHeader 
          title={getPageTitle(location.pathname)}
          patient={patient}
          unreadCount={unreadCount}
          onMobileMenuToggle={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/patient/dashboard" replace />} />
            <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />

            <Route 
              path="/patient/dashboard" 
              element={
                <PatientDashboardPage 
                  patient={patient}
                  appointments={appointments}
                  activities={activities}
                  onViewAppointmentDetails={setActiveDetailsModalAppointment}
                />
              } 
            />

            <Route 
              path="/patient/appointments" 
              element={
                <PatientAppointmentsPage 
                  appointments={appointments}
                  onCancelAppointment={handleCancelAppointment}
                />
              } 
            />

            <Route 
              path="/patient/find-doctor" 
              element={<PatientFindDoctorPage doctors={doctors} />} 
            />

            <Route 
              path="/patient/doctor/:id" 
              element={<PatientDoctorProfilePage doctors={doctors} />} 
            />

            <Route 
              path="/patient/book-appointment/:id" 
              element={
                <PatientBookAppointmentPage 
                  doctors={doctors}
                  onBookAppointment={handleBookAppointment}
                />
              } 
            />

            <Route 
              path="/patient/booking-success" 
              element={<PatientBookingSuccessPage />} 
            />

            <Route 
              path="/patient/medical-history" 
              element={
                <PatientMedicalHistoryPage 
                  patient={patient}
                  appointments={appointments}
                />
              } 
            />

            <Route 
              path="/patient/notifications" 
              element={
                <PatientNotificationsPage 
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              } 
            />

            <Route 
              path="/patient/settings" 
              element={
                <PatientSettingsPage 
                  patient={patient}
                  onUpdatePatient={handleUpdatePatient}
                  onLogoutClick={() => setShowLogoutModal(true)}
                />
              } 
            />
            
            {/* Fallback to dashboard */}
            <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Details Modal */}
      <PatientAppointmentDetailsModal 
        appointment={activeDetailsModalAppointment}
        onClose={() => setActiveDetailsModalAppointment(null)}
      />

      {/* Global Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-[#D9E6EC] shadow-xl w-full max-w-sm p-6 text-center space-y-4">
            <h3 className="text-base font-bold text-[#102A43]">Are you sure you want to logout?</h3>
            <p className="text-xs text-[#64748B]">You will need to sign in again to access your portal records.</p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 text-xs font-semibold border border-[#D9E6EC] rounded-lg text-[#102A43] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
