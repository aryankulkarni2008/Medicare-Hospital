import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminNotificationCard from '../../components/admin/AdminNotificationCard';
import { Bell, CheckSquare } from 'lucide-react';

export default function AdminNotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAdmin();

  const handleMarkAsRead = (id) => {
    markNotificationRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsRead();
  };

  // Group notifications into Unread and Read
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="space-y-6">
      
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-med-navy flex items-center gap-2">
            <Bell className="w-6 h-6 text-med-blue" />
            <span>Notification Center</span>
          </h1>
          <p className="text-xs text-med-gray font-medium mt-1">
            Stay updated with important hospital activities and administrative actions.
          </p>
        </div>

        {unreadNotifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg shadow-sm hover:shadow transition-all duration-200 w-fit"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-6">
        
        {/* Unread Section */}
        {unreadNotifications.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-med-navy uppercase tracking-widest text-med-gray/70">
              New / Unread ({unreadNotifications.length})
            </h3>
            <div className="space-y-3">
              {unreadNotifications.map((notif) => (
                <AdminNotificationCard
                  key={notif.id}
                  notification={notif}
                  onClick={handleMarkAsRead}
                />
              ))}
            </div>
          </div>
        )}

        {/* Read Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-med-navy uppercase tracking-widest text-med-gray/70">
            Earlier Notifications ({readNotifications.length})
          </h3>
          
          {readNotifications.length === 0 && unreadNotifications.length === 0 ? (
            <div className="bg-white border border-med-border rounded-xl p-8 text-center text-med-gray font-medium text-xs">
              No notifications to display.
            </div>
          ) : (
            <div className="space-y-3">
              {readNotifications.map((notif) => (
                <AdminNotificationCard
                  key={notif.id}
                  notification={notif}
                  onClick={handleMarkAsRead}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
