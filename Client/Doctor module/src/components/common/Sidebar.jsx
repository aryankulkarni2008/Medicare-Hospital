import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../../../loginpage/src/services/authService';
import {
  LayoutDashboard,
  User,
  Calendar,
  CalendarCheck,
  Users,
  Bell,
  LogOut,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { useDoctor } from '../../context/DoctorContext';

export const Sidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const { doctorProfile, unreadNotificationCount, showToast } = useDoctor();
  const navigate = useNavigate();

  const handleLogout = () => {
    showToast('Logged out of Doctor Portal successfully.', 'info');
    authService.logoutDoctor();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/doctor/profile', icon: User },
    { label: 'Availability', path: '/doctor/availability', icon: Calendar },
    { label: 'Appointments', path: '/doctor/appointments', icon: CalendarCheck },
    { label: 'My Patients', path: '/doctor/patients', icon: Users },
    {
      label: 'Notifications',
      path: '/doctor/notifications',
      icon: Bell,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : null
    }
  ];

  return (
    <aside
      className={`w-[250px] bg-white border-r border-[#D9E6EC] flex flex-col fixed top-0 bottom-0 left-0 z-40 transition-transform duration-200 ease-in-out -translate-x-full lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : ''
      }`}
    >
      {/* Brand Header */}
      <div className="h-[64px] flex items-center gap-3 px-5 border-b border-[#D9E6EC] bg-white">
        <div className="w-[36px] h-[36px] rounded-lg bg-[#2490C9] flex items-center justify-center text-white">
          <Stethoscope size={22} />
        </div>
        <div>
          <h2 className="text-[1.15rem] text-[#102A43] font-bold leading-tight m-0">MediCare</h2>
          <span className="text-[0.725rem] text-[#64748B] font-medium tracking-wide">DOCTOR PORTAL</span>
        </div>
      </div>

      {/* Doctor Summary Badge */}
      <div className="p-4 bg-[#E6F4FA] border-b border-[#D9E6EC] flex items-center gap-3">
        <img
          src={doctorProfile.avatar}
          alt={doctorProfile.name}
          className="w-[42px] h-[42px] rounded-full object-cover border-2 border-[#2490C9]"
        />
        <div className="flex-1 min-w-0">
          <div className="text-[0.875rem] font-semibold text-[#102A43] truncate">
            {doctorProfile.name}
          </div>
          <div className="text-[0.75rem] text-[#64748B] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block"></span>
            {doctorProfile.department}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 flex-1 overflow-y-auto">
        <div className="text-[0.7rem] font-semibold text-[#64748B] px-2 pb-2 tracking-wider">
          MAIN MENU
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-[0.85rem] py-[0.65rem] rounded-lg text-sm transition-all duration-150 ease-in-out ${
                      isActive
                        ? 'font-semibold text-[#126B9E] bg-[#E6F4FA]'
                        : 'font-medium text-[#102A43] hover:bg-[#F4F9FC]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} color="#2490C9" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="bg-[#EF4444] text-white text-[0.7rem] font-bold px-2 py-[0.15rem] rounded-full">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight size={14} className="opacity-30" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#D9E6EC] bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 justify-start px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] text-[#EF4444] border border-[#FCA5A5] bg-[#FEF2F2] hover:bg-[#FEE2E2] cursor-pointer transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
