import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Calendar as CalendarIcon, ArrowRight, Clock, User, CheckCircle } from 'lucide-react';

export default function PatientBookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const appointment = location.state?.appointment || {
    id: "APT-8899",
    doctorName: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    department: "Cardiovascular Sciences",
    date: "2026-08-26",
    time: "10:30 AM",
    hospital: "MediCare Super Specialty Hospital",
    status: "Pending"
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#D9E6EC] p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transform transition-all duration-500 animate-in fade-in zoom-in-95">
        
        {/* Animated Check Icon */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-[#E6F4FA] rounded-full animate-ping opacity-20"></div>
          <div className="relative w-full h-full bg-[#E6F4FA] rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <CheckCircle className="w-12 h-12 text-[#2490C9]" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#102A43] mb-3">
          Appointment Request Sent!
        </h1>
        
        <p className="text-sm text-[#64748B] mb-8 leading-relaxed">
          Your appointment request has been successfully sent to:
          <br />
          <strong className="text-[#102A43] text-base mt-2 inline-block">{appointment.doctorName}</strong>
        </p>

        {/* Details Card */}
        <div className="bg-[#F4F9FC] rounded-xl p-6 text-left border border-[#D9E6EC] space-y-4 mb-8">
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-white rounded-lg border border-[#D9E6EC]">
              <User className="w-4 h-4 text-[#2490C9]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Specialization</p>
              <p className="font-bold text-[#102A43] text-sm">{appointment.specialty}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-white rounded-lg border border-[#D9E6EC]">
              <CalendarIcon className="w-4 h-4 text-[#2490C9]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Date</p>
              <p className="font-bold text-[#102A43] text-sm">{appointment.date}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-white rounded-lg border border-[#D9E6EC]">
              <Clock className="w-4 h-4 text-[#2490C9]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Time</p>
              <p className="font-bold text-[#102A43] text-sm">{appointment.time}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-[#FEF3C7] rounded-lg border border-[#FDE68A]">
              <Clock className="w-4 h-4 text-[#D97706]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Status</p>
              <p className="font-bold text-[#D97706] text-sm">{appointment.status.toUpperCase()}</p>
            </div>
          </div>
          
        </div>

        <p className="text-xs text-[#64748B] mb-8 font-medium">
          The doctor will review your appointment request.
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate('/patient/dashboard')}
          className="w-full py-4 text-sm font-bold text-white bg-[#102A43] rounded-xl hover:bg-[#2490C9] transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Go to Patient Dashboard</span>
        </button>

      </div>
    </div>
  );
}