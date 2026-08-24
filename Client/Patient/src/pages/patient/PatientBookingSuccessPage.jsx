import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, User, ArrowRight } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-8 text-center shadow-xs">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#22A06B] mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-[#102A43] mb-2">
          Appointment Request Sent Successfully
        </h1>
        <p className="text-xs text-[#64748B] max-w-md mx-auto mb-6">
          Your appointment request has been successfully sent to the doctor. You will receive an update once the doctor reviews your request.
        </p>

        {/* Status Badge */}
        <div className="inline-block px-3 py-1 bg-[#FFF4C2] text-amber-800 font-bold text-xs rounded-full mb-6">
          STATUS: {appointment.status.toUpperCase()}
        </div>

        {/* Appointment Card Breakdown */}
        <div className="bg-[#F4F9FC] rounded-xl p-5 text-left border border-[#D9E6EC] space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#D9E6EC] pb-2">
            <span className="text-[#64748B]">Appointment ID:</span>
            <span className="font-bold text-[#102A43]">{appointment.id}</span>
          </div>

          <div className="flex justify-between border-b border-[#D9E6EC] pb-2">
            <span className="text-[#64748B]">Doctor:</span>
            <span className="font-bold text-[#102A43]">{appointment.doctorName} ({appointment.specialty})</span>
          </div>

          <div className="flex justify-between border-b border-[#D9E6EC] pb-2">
            <span className="text-[#64748B]">Date & Time:</span>
            <span className="font-bold text-[#102A43]">{appointment.date} at {appointment.time}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#64748B]">Hospital Location:</span>
            <span className="font-medium text-[#102A43]">{appointment.hospital}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          <button
            onClick={() => navigate('/patient/dashboard')}
            className="px-4 py-2.5 text-xs font-semibold text-[#102A43] bg-white border border-[#D9E6EC] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/patient/appointments')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#2490C9] rounded-lg hover:bg-[#126B9E] transition-colors"
          >
            View Appointments
          </button>
          <button
            onClick={() => navigate('/patient/find-doctor')}
            className="px-4 py-2.5 text-xs font-semibold text-[#2490C9] bg-[#E6F4FA] rounded-lg hover:bg-[#2490C9] hover:text-white transition-colors"
          >
            Find Another Doctor
          </button>
        </div>
      </div>
    </div>
  );
}