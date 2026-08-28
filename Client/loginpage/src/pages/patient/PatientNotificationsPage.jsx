import React from 'react';
import { Check, Bell } from 'lucide-react';
import PatientNotificationCard from '../../components/patient/PatientNotificationCard';

export default function PatientNotificationsPage({ notifications, onMarkAsRead, onMarkAllAsRead }) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#102A43]">Notifications</h1>
          <p className="text-xs text-[#64748B]">Stay updated with your appointment requests and healthcare activities.</p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D9E6EC] rounded-lg text-xs font-semibold text-[#2490C9] hover:bg-[#E6F4FA] transition-colors self-start sm:self-auto"
          >
            <Check className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <PatientNotificationCard 
              key={notif.id} 
              notification={notif} 
              onMarkAsRead={onMarkAsRead} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#D9E6EC] p-12 text-center text-[#64748B]">
          <Bell className="w-12 h-12 text-[#2490C9]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#102A43]">No Notifications</h3>
          <p className="text-xs mt-1">You have no active notification updates at this time.</p>
        </div>
      )}
    </div>
  );
}