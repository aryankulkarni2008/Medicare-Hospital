import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  LayoutDashboard, 
  Stethoscope, 
  UserCheck, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Activity,
  X
} from 'lucide-react';

export default function AdminPortalSidebar({ isOpen, toggleSidebar, onLogoutClick }) {
  const { doctorRequests, notifications, adminProfile } = useAdmin();

  // Calculate counts dynamically
  const pendingRequestsCount = doctorRequests.filter(r => r.status === 'Pending').length;
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: '/admin/doctors',
      name: 'Doctors',
      icon: Stethoscope,
    },
    {
      path: '/admin/doctor-requests',
      name: 'Doctor Requests',
      icon: UserCheck,
      badge: pendingRequestsCount
    },
    {
      path: '/admin/patients',
      name: 'Patients',
      icon: Users,
    },
    {
      path: '/admin/notifications',
      name: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount
    },
    {
      path: '/admin/settings',
      name: 'Settings',
      icon: Settings,
    }
  ];

  const activeStyle = "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-med-light-blue text-med-blue border-l-4 border-med-blue transition-all duration-200";
  const inactiveStyle = "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-med-gray hover:bg-med-light-blue hover:text-med-blue transition-all duration-200";

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-white border-r border-med-border transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Branding header */}
        <div className="flex items-center justify-between p-6 border-b border-med-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-med-light-blue text-med-blue">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-med-navy leading-none">MediCare Hospital</h1>
              <span className="text-xs font-bold text-med-gray tracking-wider uppercase">Administration</span>
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-lg text-med-gray hover:bg-med-light-blue lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
          <span className="px-4 text-xs font-bold text-med-gray/50 uppercase tracking-widest block mb-4">
            Main Menu
          </span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
                {item.badge !== undefined && item.badge > 0 ? (
                  <span className="ml-auto flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold text-white bg-med-blue rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Admin profile */}
        <div className="p-4 border-t border-med-border bg-med-bg/50">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={adminProfile.photo} 
              alt={adminProfile.name}
              className="w-11 h-11 rounded-full border-2 border-med-light-blue object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-med-navy truncate">{adminProfile.name}</h4>
              <p className="text-xs text-med-gray truncate">{adminProfile.email}</p>
              <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-bold text-med-blue bg-med-light-blue rounded-full">
                {adminProfile.role}
              </span>
            </div>
          </div>
          
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-status-rejected border border-status-rejected/20 rounded-lg bg-red-50/50 hover:bg-status-rejected hover:text-white transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
