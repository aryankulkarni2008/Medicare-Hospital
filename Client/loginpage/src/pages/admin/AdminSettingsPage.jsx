import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Building, 
  User, 
  Bell, 
  LogOut, 
  Save, 
  Settings,
  Info,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Users,
  Clock
} from 'lucide-react';

export default function AdminSettingsPage({ onLogoutClick }) {
  const { 
    hospitalInfo, 
    adminProfile, 
    updateHospitalInfo, 
    updateAdminProfile, 
    doctors, 
    patients, 
    appointments 
  } = useAdmin();

  // Dynamic stats calculation for Overview Section
  const stats = {
    doctorsCount: doctors.length,
    patientsCount: patients.length,
    appointmentsCount: appointments.length,
    todaysCount: appointments.filter(a => a.date === "2026-08-25").length,
    completedCount: appointments.filter(a => a.status === "Completed").length
  };

  // Hospital Info Form state
  const [hospitalForm, setHospitalForm] = useState({
    name: hospitalInfo.name,
    email: hospitalInfo.email,
    phone: hospitalInfo.phone,
    address: hospitalInfo.address,
    workingHours: hospitalInfo.workingHours,
    emergencyContact: hospitalInfo.emergencyContact
  });

  // Admin Profile Form state
  const [adminForm, setAdminForm] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    employeeId: adminProfile.employeeId
  });

  // Notification Preferences toggles state
  const [prefs, setPrefs] = useState({
    doctorRequests: true,
    apptUpdates: true,
    patientReg: true,
    hospitalActivities: false
  });

  const handleHospitalSubmit = (e) => {
    e.preventDefault();
    updateHospitalInfo(hospitalForm);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    updateAdminProfile(adminForm);
  };

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-med-navy flex items-center gap-2">
          <Settings className="w-6 h-6 text-med-blue" />
          <span>Administration Settings</span>
        </h1>
        <p className="text-xs text-med-gray font-medium mt-1">
          Manage MediCare Hospital information, administrative account details, and system preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Stats Overview & Notification Prefs & Logout */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* SECTION 1 - HOSPITAL OVERVIEW */}
          <div className="bg-white border border-med-border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border flex items-center gap-2">
              <Building className="w-4 h-4 text-med-blue" />
              <span>Hospital Overview</span>
            </h3>
            
            <div className="space-y-3.5 text-xs font-semibold text-med-navy">
              <div className="flex justify-between items-center bg-med-bg/40 p-2.5 rounded-lg border border-med-border">
                <span className="text-med-gray">Hospital Name:</span>
                <span className="font-bold text-right">{hospitalInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-med-gray flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-med-blue" />
                  Total Doctors:
                </span>
                <span className="bg-med-light-blue text-med-blue px-2 py-0.5 rounded font-bold">{stats.doctorsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-med-gray flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-med-blue" />
                  Total Patients:
                </span>
                <span className="bg-green-50 text-status-success px-2 py-0.5 rounded font-bold">{stats.patientsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-med-gray flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-med-blue" />
                  Total Appointments:
                </span>
                <span className="bg-blue-50 text-med-blue px-2 py-0.5 rounded font-bold">{stats.appointmentsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-med-gray flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-med-blue" />
                  Today's Appointments:
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded font-bold">{stats.todaysCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-med-gray flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                  Completed Consultations:
                </span>
                <span className="bg-green-50 text-status-success px-2 py-0.5 rounded font-bold">{stats.completedCount}</span>
              </div>
            </div>
          </div>

          {/* SECTION 4 — NOTIFICATION PREFERENCES */}
          <div className="bg-white border border-med-border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border flex items-center gap-2">
              <Bell className="w-4 h-4 text-med-blue" />
              <span>Notification Preferences</span>
            </h3>

            <div className="space-y-4 text-xs font-semibold text-med-navy">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block">Doctor Registration Requests</span>
                  <span className="text-[10px] text-med-gray font-medium">Notify when new doctors apply to join.</span>
                </div>
                <button
                  type="button"
                  onClick={() => togglePref('doctorRequests')}
                  className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    prefs.doctorRequests ? 'bg-med-blue' : 'bg-med-gray/30'
                  }`}
                >
                  <span className={`bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${
                    prefs.doctorRequests ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block">Appointment Updates</span>
                  <span className="text-[10px] text-med-gray font-medium">Alert on confirmations or cancellations.</span>
                </div>
                <button
                  type="button"
                  onClick={() => togglePref('apptUpdates')}
                  className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    prefs.apptUpdates ? 'bg-med-blue' : 'bg-med-gray/30'
                  }`}
                >
                  <span className={`bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${
                    prefs.apptUpdates ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block">Patient Registration Updates</span>
                  <span className="text-[10px] text-med-gray font-medium">Log when new patients register.</span>
                </div>
                <button
                  type="button"
                  onClick={() => togglePref('patientReg')}
                  className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    prefs.patientReg ? 'bg-med-blue' : 'bg-med-gray/30'
                  }`}
                >
                  <span className={`bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${
                    prefs.patientReg ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 4 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block">Hospital Activity Notifications</span>
                  <span className="text-[10px] text-med-gray font-medium">Broadcast updates on minor updates.</span>
                </div>
                <button
                  type="button"
                  onClick={() => togglePref('hospitalActivities')}
                  className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    prefs.hospitalActivities ? 'bg-med-blue' : 'bg-med-gray/30'
                  }`}
                >
                  <span className={`bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${
                    prefs.hospitalActivities ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 5 — LOGOUT */}
          <div className="bg-red-50/50 border border-status-rejected/15 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-status-rejected uppercase tracking-wider flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Administrative Sign Out</span>
            </h4>
            <p className="text-[11px] text-med-gray font-medium leading-relaxed">
              You will be signed out of your MediCare Hospital Administration account.
            </p>
            <button
              onClick={onLogoutClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-status-rejected hover:bg-red-700 rounded-lg transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Right Side: Hospital Info & Admin Profile Info Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 2 — HOSPITAL INFORMATION */}
          <form onSubmit={handleHospitalSubmit} className="bg-white border border-med-border rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border flex items-center gap-2">
              <Building className="w-4 h-4 text-med-blue" />
              <span>Hospital Information Settings</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-med-navy">
              <div className="space-y-1">
                <label className="block text-med-gray">Hospital Name</label>
                <input
                  type="text"
                  required
                  value={hospitalForm.name}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, name: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-med-gray">Hospital Email</label>
                <input
                  type="email"
                  required
                  value={hospitalForm.email}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, email: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-med-gray">Phone Number</label>
                <input
                  type="text"
                  required
                  value={hospitalForm.phone}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, phone: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-med-gray">Emergency Contact Number</label>
                <input
                  type="text"
                  required
                  value={hospitalForm.emergencyContact}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, emergencyContact: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all text-status-rejected font-bold"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-med-gray">Hospital Working Hours</label>
                <input
                  type="text"
                  required
                  value={hospitalForm.workingHours}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, workingHours: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-med-gray">Hospital Physical Address</label>
                <textarea
                  rows="3"
                  required
                  value={hospitalForm.address}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, address: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium resize-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-med-border">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg shadow-sm hover:shadow transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Hospital Information</span>
              </button>
            </div>
          </form>

          {/* SECTION 3 — ADMIN PROFILE */}
          <form onSubmit={handleAdminSubmit} className="bg-white border border-med-border rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border flex items-center gap-2">
              <User className="w-4 h-4 text-med-blue" />
              <span>Admin Profile Settings</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-5 items-center pb-4 border-b border-med-border">
              <img 
                src={adminProfile.photo} 
                alt={adminProfile.name}
                className="w-16 h-16 rounded-full object-cover border border-med-border flex-shrink-0"
              />
              <div className="text-center sm:text-left space-y-1">
                <h4 className="text-sm font-bold text-med-navy">{adminProfile.name}</h4>
                <p className="text-xs text-med-gray font-medium">Employee ID: {adminProfile.employeeId}</p>
                <span className="inline-block px-2 py-0.5 text-[9px] font-bold text-med-blue bg-med-light-blue rounded-full">
                  {adminProfile.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-med-navy">
              <div className="space-y-1">
                <label className="block text-med-gray">Administrator Name</label>
                <input
                  type="text"
                  required
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-med-gray">Administrator Email</label>
                <input
                  type="email"
                  required
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-med-gray">Employee ID</label>
                <input
                  type="text"
                  required
                  value={adminForm.employeeId}
                  onChange={(e) => setAdminForm({ ...adminForm, employeeId: e.target.value })}
                  className="w-full py-2 px-3 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white font-medium transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-med-gray/50">System Role (Read-Only)</label>
                <input
                  type="text"
                  disabled
                  value={adminProfile.role}
                  className="w-full py-2 px-3 bg-med-bg/50 border border-med-border/70 rounded-lg text-med-gray/70 font-medium cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-med-border">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg shadow-sm hover:shadow transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
