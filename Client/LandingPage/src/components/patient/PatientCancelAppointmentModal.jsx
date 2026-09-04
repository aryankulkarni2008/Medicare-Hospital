import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function PatientCancelAppointmentModal({ appointment, onClose, onConfirmCancel }) {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-[#D9E6EC] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in duration-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-[#102A43] mb-1">Cancel Appointment?</h3>
          <p className="text-xs text-[#64748B] mb-4">
            Are you sure you want to cancel your appointment with <span className="font-semibold text-[#102A43]">{appointment.doctorName}</span> on <span className="font-semibold text-[#102A43]">{appointment.date}</span>?
          </p>

          <div className="bg-[#F4F9FC] p-3 rounded-lg text-left text-xs border border-[#D9E6EC] mb-6 space-y-1">
            <p className="text-[#64748B]"><span className="font-semibold text-[#102A43]">Specialty:</span> {appointment.specialty}</p>
            <p className="text-[#64748B]"><span className="font-semibold text-[#102A43]">Time Slot:</span> {appointment.time}</p>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-semibold text-[#102A43] bg-white border border-[#D9E6EC] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={() => onConfirmCancel(appointment.id)}
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}