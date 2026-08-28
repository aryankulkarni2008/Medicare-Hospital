import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  LayoutDashboard, 
  Calendar, 
  UserCheck, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

export default function PatientPortalSidebar({ patient, isMobileOpen, setIsMobileOpen, onLogoutClick }) {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { label: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { label: 'Find Doctor', path: '/patient/find-doctor', icon: UserCheck },
    { label: 'Medical History', path: '/patient/medical-history', icon: FileText },
    { label: 'Notifications', path: '/patient/notifications', icon: Bell },
    { label: 'Settings', path: '/patient/settings', icon: Settings },
  ];

  const handleLinkClick = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#D9E6EC] flex flex-col justify-between transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Upper Branding Section */}
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-[#D9E6EC]">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/patient/dashboard')}>
              <div className="w-10 h-10 rounded-lg bg-[#2490C9] flex items-center justify-center text-white shadow-sm">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-[#102A43] leading-none">MediCare</h1>
                <span className="text-[10px] font-semibold text-[#2490C9] tracking-wider uppercase">Patient Portal</span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button 
              className="lg:hidden text-[#64748B] hover:text-[#102A43] p-1 rounded-md"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                    ${isActive 
                      ? 'bg-[#2490C9] text-white shadow-xs' 
                      : 'text-[#64748B] hover:bg-[#E6F4FA] hover:text-[#102A43]'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="p-4 border-t border-[#D9E6EC] bg-slate-50/50">
          <div className="flex items-center space-x-3 mb-3 p-2 rounded-lg bg-[#E6F4FA]/50">
            <img 
              src={patient.photo} 
              alt={patient.name} 
              className="w-10 h-10 rounded-full object-cover border border-[#D9E6EC]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#102A43] truncate">{patient.name}</p>
              <p className="text-xs text-[#64748B] truncate">{patient.email}</p>
            </div>
          </div>
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}