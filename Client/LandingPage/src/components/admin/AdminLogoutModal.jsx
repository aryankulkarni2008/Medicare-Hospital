import React from 'react';
import { LogOut, X } from 'lucide-react';

export default function AdminLogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white border border-med-border rounded-xl shadow-xl max-w-sm w-full p-6 relative animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-med-gray hover:bg-med-light-blue hover:text-med-blue transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4 pt-2">
          {/* Warning Icon Circle */}
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-status-rejected border border-status-rejected/15">
            <LogOut className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-med-navy">Are you sure you want to logout?</h3>
            <p className="text-xs text-med-gray leading-relaxed font-medium">
              You will be signed out of your MediCare Hospital Administration account. Any unsaved form configurations may be lost.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 text-xs font-semibold text-med-navy border border-med-border bg-white hover:bg-med-bg rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-4 text-xs font-semibold text-white bg-status-rejected hover:bg-red-700 rounded-lg shadow-sm hover:shadow transition-all duration-200"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
