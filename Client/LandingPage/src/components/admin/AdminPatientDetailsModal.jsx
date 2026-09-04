import React from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, ClipboardList } from 'lucide-react';

export default function AdminPatientDetailsModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white border border-med-border rounded-xl shadow-xl max-w-md w-full relative animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-med-gray hover:bg-med-light-blue hover:text-med-blue transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Header summary */}
          <div className="flex items-center gap-4 pb-5 border-b border-med-border">
            <img 
              src={patient.photo} 
              alt={patient.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-med-light-blue flex-shrink-0"
            />
            <div className="min-w-0">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${patient.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-inactive/15 text-status-inactive'}`}>
                {patient.status}
              </span>
              <h3 className="text-lg font-bold text-med-navy truncate">{patient.name}</h3>
              <p className="text-xs text-med-gray truncate">ID: {patient.id || "N/A"}</p>
            </div>
          </div>

          {/* Details */}
          <div className="py-4 space-y-4 text-xs font-medium border-b border-med-border">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-med-blue" />
              <div>
                <span className="text-[10px] text-med-gray block">Date of Birth / Age</span>
                <span className="text-med-navy">{patient.dob || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-med-blue" />
              <div>
                <span className="text-[10px] text-med-gray block">Gender</span>
                <span className="text-med-navy">{patient.gender || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-med-blue" />
              <div>
                <span className="text-[10px] text-med-gray block">Email Address</span>
                <span className="text-med-navy">{patient.email || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-med-blue" />
              <div>
                <span className="text-[10px] text-med-gray block">Phone Number</span>
                <span className="text-med-navy">{patient.phone || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-med-blue mt-0.5" />
              <div>
                <span className="text-[10px] text-med-gray block">Address</span>
                <span className="text-med-navy">{patient.address || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="py-4 text-xs font-semibold flex items-center justify-between text-med-gray bg-med-bg/40 p-3 rounded-lg border border-med-border mt-4">
            <span>Registered On:</span>
            <span className="text-med-navy font-bold">{patient.regDate}</span>
          </div>

          {/* Close button */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
