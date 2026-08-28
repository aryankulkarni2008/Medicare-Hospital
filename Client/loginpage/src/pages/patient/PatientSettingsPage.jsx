import React, { useState } from 'react';
import { User, Shield, Bell, LogOut, Check } from 'lucide-react';

export default function PatientSettingsPage({ patient, onUpdatePatient, onLogoutClick }) {
  const [formData, setFormData] = useState({ ...patient });
  const [isSaved, setIsSaved] = useState(false);

  // Notification Toggles State
  const [toggles, setToggles] = useState({
    appointmentUpdates: true,
    appointmentReminders: true,
    hospitalNotifications: false
  });

  // Password Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passMessage, setPassMessage] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    onUpdatePatient(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-[#102A43]">Settings</h1>
        <p className="text-xs text-[#64748B]">Manage your personal information and account preferences.</p>
      </div>

      {/* SECTION 1: Personal Information */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#102A43] mb-4 pb-2 border-b border-[#D9E6EC] flex items-center space-x-2">
          <User className="w-5 h-5 text-[#2490C9]" />
          <span>Personal Information</span>
        </h2>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={formData.photo} 
              alt={formData.name} 
              className="w-16 h-16 rounded-full object-cover border border-[#D9E6EC]"
            />
            <div>
              <p className="text-xs font-bold text-[#102A43]">Profile Avatar</p>
              <p className="text-[11px] text-[#64748B]">Managed via patient details context</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Full Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Email Address</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Phone Number</label>
              <input 
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Date of Birth</label>
              <input 
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Address</label>
              <input 
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#2490C9] rounded-lg hover:bg-[#126B9E] transition-colors"
            >
              Save Changes
            </button>
            {isSaved && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* SECTION 2: Account Security */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#102A43] mb-4 pb-2 border-b border-[#D9E6EC] flex items-center space-x-2">
          <Shield className="w-5 h-5 text-[#2490C9]" />
          <span>Account Security</span>
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#102A43]">Password</p>
            <p className="text-xs text-[#64748B]">Last updated 30 days ago</p>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 text-xs font-semibold text-[#2490C9] bg-[#E6F4FA] rounded-lg hover:bg-[#2490C9] hover:text-white transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* SECTION 3: Notification Preferences */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#102A43] mb-4 pb-2 border-b border-[#D9E6EC] flex items-center space-x-2">
          <Bell className="w-5 h-5 text-[#2490C9]" />
          <span>Notification Preferences</span>
        </h2>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#102A43]">Appointment Updates</p>
              <p className="text-[#64748B]">Get notified when your appointment status changes.</p>
            </div>
            <input 
              type="checkbox"
              checked={toggles.appointmentUpdates}
              onChange={(e) => setToggles({ ...toggles, appointmentUpdates: e.target.checked })}
              className="w-4 h-4 text-[#2490C9] accent-[#2490C9] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-t border-[#D9E6EC] pt-3">
            <div>
              <p className="font-bold text-[#102A43]">Appointment Reminders</p>
              <p className="text-[#64748B]">Receive email reminders 24 hours prior to consultations.</p>
            </div>
            <input 
              type="checkbox"
              checked={toggles.appointmentReminders}
              onChange={(e) => setToggles({ ...toggles, appointmentReminders: e.target.checked })}
              className="w-4 h-4 text-[#2490C9] accent-[#2490C9] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-t border-[#D9E6EC] pt-3">
            <div>
              <p className="font-bold text-[#102A43]">Hospital Announcements</p>
              <p className="text-[#64748B]">Receive news about hospital updates and health programs.</p>
            </div>
            <input 
              type="checkbox"
              checked={toggles.hospitalNotifications}
              onChange={(e) => setToggles({ ...toggles, hospitalNotifications: e.target.checked })}
              className="w-4 h-4 text-[#2490C9] accent-[#2490C9] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Logout */}
      <div className="bg-white rounded-xl border border-red-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-red-600">Account Session</h3>
          <p className="text-xs text-[#64748B]">You will be signed out of your MediCare Patient Portal account.</p>
        </div>
        <button
          onClick={onLogoutClick}
          className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-[#D9E6EC] shadow-xl w-full max-w-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-[#102A43]">Change Password</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-2 text-xs border border-[#D9E6EC] rounded" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-2 text-xs border border-[#D9E6EC] rounded" />
              </div>
            </div>
            {passMessage && <p className="text-xs text-emerald-600 font-bold">{passMessage}</p>}
            <div className="flex justify-end space-x-2 pt-2">
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="px-3 py-1.5 text-xs text-[#64748B] border border-[#D9E6EC] rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setPassMessage('Password updated successfully!');
                  setTimeout(() => {
                    setPassMessage('');
                    setShowPasswordModal(false);
                  }, 1500);
                }}
                className="px-3 py-1.5 text-xs text-white bg-[#2490C9] rounded font-bold"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}