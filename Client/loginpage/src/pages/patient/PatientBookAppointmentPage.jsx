import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/authService';

export default function PatientBookAppointmentPage({ doctors, onBookAppointment }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  const [selectedDate, setSelectedDate] = useState('2026-08-26');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !reason.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const currentUser = authService.getCurrentPatient();
    if (!currentUser) {
      alert("Please log in to book an appointment.");
      setIsSubmitting(false);
      return;
    }

    const appointmentData = {
      patientId: currentUser.id,
      doctorId: doctor.doctorId || doctor.id, // Support mapped doctor format
      date: selectedDate,
      time: selectedTime,
      reason: reason,
      hospital: doctor.hospital || doctor.previousHospital
    };

    const response = await authService.createAppointment(appointmentData);
    
    setIsSubmitting(false);

    if (response.success) {
      const newAppointment = {
        ...response.data.appointment,
        doctorName: doctor.name || doctor.fullName,
        specialty: doctor.specialty || doctor.specialization,
        department: doctor.department,
        doctorPhoto: doctor.photo,
      };
      
      if (onBookAppointment) {
        onBookAppointment(newAppointment);
      }
      navigate('/patient/booking-success', { state: { appointment: newAppointment } });
    } else {
      alert(response.message);
    }
  };

  const isFormValid = selectedDate && selectedTime && reason.trim().length > 0;

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-xs font-semibold text-[#2490C9] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div>
        <h1 className="text-xl font-bold text-[#102A43]">Book an Appointment</h1>
        <p className="text-xs text-[#64748B]">Complete the steps below to schedule your consultation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form (2 Cols) */}
        <form onSubmit={handleConfirm} className="lg:col-span-2 space-y-6">
          {/* STEP 1: Select Date */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-sm font-bold text-[#102A43] mb-4 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#2490C9] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Select Date</span>
            </h2>
            <div className="w-full sm:w-64">
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Appointment Date</label>
              <input 
                type="date"
                min="2026-08-25"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
                required
              />
            </div>
          </div>

          {/* STEP 2: Select Time Slot */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-sm font-bold text-[#102A43] mb-4 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#2490C9] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Select Available Time Slot</span>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {doctor.availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    selectedTime === slot
                      ? 'bg-[#2490C9] text-white border-[#2490C9] shadow-xs'
                      : 'bg-[#F4F9FC] text-[#102A43] border-[#D9E6EC] hover:border-[#2490C9]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Reason */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-sm font-bold text-[#102A43] mb-4 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#2490C9] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Reason for Visit</span>
            </h2>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please briefly describe your symptoms or reason for appointment..."
              className="w-full p-3 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
              required
            />
          </div>
        </form>

        {/* Right Column: Appointment Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs sticky top-20">
            <h2 className="text-base font-bold text-[#102A43] mb-4 pb-3 border-b border-[#D9E6EC]">
              Appointment Summary
            </h2>

            {/* Doctor Info Mini */}
            <div className="flex items-center space-x-3 mb-4 p-3 bg-[#F4F9FC] rounded-lg border border-[#D9E6EC]">
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-12 h-12 rounded-full object-cover border border-[#D9E6EC]"
              />
              <div>
                <h3 className="font-bold text-[#102A43] text-xs">{doctor.name}</h3>
                <p className="text-[11px] font-medium text-[#2490C9]">{doctor.specialty}</p>
                <p className="text-[10px] text-[#64748B]">{doctor.department}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs border-y border-[#D9E6EC] py-3 mb-6">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Date:</span>
                <span className="font-bold text-[#102A43]">{selectedDate || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Time Slot:</span>
                <span className="font-bold text-[#102A43]">{selectedTime || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Location:</span>
                <span className="font-medium text-[#102A43] truncate max-w-[150px]">{doctor.hospital}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 text-xs font-bold rounded-xl transition-all ${
                isFormValid && !isSubmitting
                  ? 'bg-[#2490C9] text-white hover:bg-[#126B9E] shadow-sm cursor-pointer' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}