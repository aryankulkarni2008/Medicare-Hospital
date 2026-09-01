import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Centralized Mock Data
import { 
  initialPatient, 
  initialDoctors, 
  initialAppointments, 
  initialNotifications, 
  initialActivities 
} from './data/patientMockData';

// Shared Components
import PatientPortalSidebar from './components/patient/PatientPortalSidebar';
import PatientPortalHeader from './components/patient/PatientPortalHeader';
import PatientAppointmentDetailsModal from './components/patient/PatientAppointmentDetailsModal';

// Pages
import PatientDashboardPage from './pages/patient/PatientDashboardPage';
import PatientAppointmentsPage from './pages/patient/PatientAppointmentsPage';
import PatientFindDoctorPage from './pages/patient/PatientFindDoctorPage';
import PatientDoctorProfilePage from './pages/patient/PatientDoctorProfilePage';
import PatientBookAppointmentPage from './pages/patient/PatientBookAppointmentPage';
import PatientBookingSuccessPage from './pages/patient/PatientBookingSuccessPage';
import PatientMedicalHistoryPage from './pages/patient/PatientMedicalHistoryPage';
import PatientNotificationsPage from './pages/patient/PatientNotificationsPage';
import PatientSettingsPage from './pages/patient/PatientSettingsPage';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Master State
  const [patient, setPatient] = useState(initialPatient);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activities, setActivities] = useState(initialActivities);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then((res) => res.json())
      .then((docs) => {
        if (Array.isArray(docs) && docs.length > 0) {
          const mappedDocs = docs.map((d) => ({
            id: d.doctorId || d._id,
            doctorId: d.doctorId,
            name: d.fullName,
            specialty: d.specialization,
            department: d.department,
            availability: 'Available',
            photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
            phone: d.phoneNumber,
            email: d.email,
            experience: `${d.yearsOfExperience} Years`,
            location: d.address,
            degree: d.medicalDegree,
            college: d.medicalCollege,
            licenseNumber: d.registrationLicenceNumber,
            hospital: d.previousHospital || 'Medicare Hospital',
            qualifications: d.medicalDegree || 'MBBS, MD',
            languages: ['English', 'Hindi'],
            about: `Dr. ${d.fullName} is a specialist in ${d.specialization} with ${d.yearsOfExperience} years of experience.`,
            workingHours: '09:00 AM - 05:00 PM',
          }));
          setDoctors(mappedDocs);
        }
      })
      .catch((err) => console.error('Error fetching doctors in standalone patient app:', err));
  }, []);

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
                  onUpdatePatient={setPatient}
                  onLogoutClick={() => setShowLogoutModal(true)}
                />
              } 
            />
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
                onClick={() => {
                  setShowLogoutModal(false);
                  navigate('/patient/dashboard');
                }}
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