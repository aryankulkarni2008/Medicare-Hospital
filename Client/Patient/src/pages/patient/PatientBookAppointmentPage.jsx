import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  FileText,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  Info,
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function PatientBookAppointmentPage({ doctors, onBookAppointment }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(
    doctors?.find((d) => d.id === id || d.doctorId === id) || null
  );

  // Today or upcoming default date (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  // Dynamic slot availability state
  const [slotsData, setSlotsData] = useState({
    available: true,
    dayName: '',
    slots: [],
    message: '',
  });
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Doctor if not provided in props
  useEffect(() => {
    const docId = id;
    if (!doctor) {
      authService.getDoctorById(docId).then((data) => {
        if (data) {
          setDoctor({
            id: data.doctorId || data._id,
            doctorId: data.doctorId,
            name: data.fullName,
            specialty: data.specialization,
            department: data.department,
            photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
            hospital: data.previousHospital || 'Medicare Hospital',
          });
        }
      });
    }
  }, [id, doctor]);

  // Fetch Dynamic Time Slots whenever selectedDate or doctorId changes
  useEffect(() => {
    const docId = doctor?.doctorId || doctor?.id || id;
    if (docId && selectedDate) {
      setIsLoadingSlots(true);
      setSelectedTime(''); // Reset selected time on date change
      setBookingError('');

      authService
        .getDoctorSlots(docId, selectedDate)
        .then((data) => {
          setIsLoadingSlots(false);
          if (data) {
            setSlotsData(data);
          } else {
            setSlotsData({
              available: false,
              dayName: '',
              slots: [],
              message: 'Doctor is not available on this day.',
            });
          }
        })
        .catch((err) => {
          console.error('Error fetching doctor slots:', err);
          setIsLoadingSlots(false);
          setSlotsData({
            available: false,
            dayName: '',
            slots: [],
            message: 'Unable to load doctor availability.',
          });
        });
    }
  }, [selectedDate, doctor, id]);

  const currentDoctor = doctor || {
    id: id,
    doctorId: id,
    name: 'Doctor',
    specialty: 'Specialist',
    department: 'General',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    hospital: 'Medicare Hospital',
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !reason.trim() || isSubmitting) return;

    setBookingError('');
    setIsSubmitting(true);

    const currentUser = authService.getCurrentPatient();
    if (!currentUser) {
      setBookingError('Please log in to book an appointment.');
      setIsSubmitting(false);
      return;
    }

    const appointmentData = {
      patientId: currentUser.id,
      patientEmail: currentUser.email,
      doctorId: currentDoctor.doctorId || currentDoctor.id,
      date: selectedDate,
      time: selectedTime,
      reason: reason.trim(),
      hospital: currentDoctor.hospital,
    };

    const response = await authService.createAppointment(appointmentData);

    setIsSubmitting(false);

    if (response.success) {
      const createdApp = response.data.appointment;
      const newAppointment = {
        id: createdApp.appointmentId || createdApp.id,
        appointmentId: createdApp.appointmentId || createdApp.id,
        doctorId: currentDoctor.doctorId || currentDoctor.id,
        doctorName: currentDoctor.name || createdApp.doctorName,
        specialty: currentDoctor.specialty || createdApp.specialty,
        department: currentDoctor.department || createdApp.department,
        doctorPhoto: currentDoctor.photo,
        date: createdApp.date || selectedDate,
        time: createdApp.time || selectedTime,
        hospital: createdApp.hospital || currentDoctor.hospital,
        status: createdApp.status || 'Pending',
        reason: createdApp.reason || reason,
      };

      if (onBookAppointment) {
        onBookAppointment(newAppointment);
      }
      navigate('/patient/booking-success', { state: { appointment: newAppointment } });
    } else {
      setBookingError(response.message || 'Failed to book appointment. Please try again.');
    }
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    slotsData.available &&
    reason.trim().length > 0;

  // Format date for human readability: e.g. "Saturday, 12 September 2026"
  const getFormattedDate = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-xs font-semibold text-[#2490C9] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Doctor Profile</span>
      </button>

      <div>
        <h1 className="text-xl font-bold text-[#102A43]">Book an Appointment</h1>
        <p className="text-xs text-[#64748B]">
          Complete the steps below to schedule your consultation with {currentDoctor.name}.
        </p>
      </div>

      {bookingError && (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-center gap-3 text-[#991B1B] shadow-xs">
          <AlertCircle size={20} className="text-[#EF4444] shrink-0" />
          <div>
            <h4 className="text-sm font-bold m-0">Booking Error</h4>
            <p className="text-xs text-[#B91C1C] m-0 mt-0.5">{bookingError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form (2 Cols) */}
        <form onSubmit={handleConfirm} className="lg:col-span-2 space-y-6">
          {/* STEP 1: Select Date */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-sm font-bold text-[#102A43] mb-4 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#2490C9] text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Select Date</span>
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-64">
                <label className="block text-xs font-semibold text-[#64748B] mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] font-semibold focus:outline-none focus:border-[#2490C9]"
                  required
                />
              </div>

              {selectedDate && (
                <div className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0] flex-1">
                  <span className="font-semibold text-[#102A43] block">
                    {getFormattedDate(selectedDate)}
                  </span>
                  <span className="text-[11px] text-[#2490C9]">
                    Weekday: {slotsData.dayName || 'Selected'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: Select Time Slot (Dynamic from MongoDB) */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-sm font-bold text-[#102A43] mb-4 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#2490C9] text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Select Available Time Slot</span>
            </h2>

            {isLoadingSlots ? (
              <div className="py-8 text-center text-[#64748B] flex flex-col items-center justify-center gap-2">
                <RefreshCw size={24} className="animate-spin text-[#2490C9]" />
                <span className="text-xs font-semibold">Loading available slots...</span>
              </div>
            ) : !slotsData.available ? (
              <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-center">
                <AlertCircle size={24} className="text-[#EF4444] mx-auto mb-2" />
                <h3 className="text-sm font-bold text-[#991B1B]">
                  Doctor is not available on this day.
                </h3>
                <p className="text-xs text-[#B91C1C] mt-1">
                  {slotsData.message || 'Please select another date when the doctor is available.'}
                </p>
              </div>
            ) : slotsData.slots.length === 0 ? (
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center text-[#64748B]">
                <Clock size={24} className="mx-auto mb-2 text-[#94A3B8]" />
                <p className="text-xs font-semibold text-[#102A43]">
                  No time slots configured for {slotsData.dayName || 'this day'}.
                </p>
                <p className="text-[11px] mt-0.5">Please choose an alternative date.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span>Available slots for {slotsData.dayName}:</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-[#2490C9]"></span> Available
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-[#CBD5E1]"></span> Booked
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  {slotsData.slots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    const isBooked = slot.isBooked;

                    if (isBooked) {
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled
                          className="py-2.5 px-2 text-xs font-medium rounded-lg border bg-[#F1F5F9] text-[#94A3B8] border-[#E2E8F0] cursor-not-allowed opacity-75 text-center flex flex-col items-center justify-center gap-0.5"
                        >
                          <span className="line-through">{slot.time}</span>
                          <span className="text-[9px] font-bold uppercase text-[#EF4444]">Booked</span>
                        </button>
                      );
                    }

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#2490C9] text-white border-[#2490C9] shadow-sm ring-2 ring-[#2490C9]/30'
                            : 'bg-[#F4F9FC] text-[#102A43] border-[#D9E6EC] hover:border-[#2490C9] hover:bg-white'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Reason for Visit */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-sm font-bold text-[#102A43] mb-4 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#2490C9] text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Reason for Visit</span>
            </h2>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please briefly describe your symptoms or reason for scheduling this consultation..."
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
                src={currentDoctor.photo}
                alt={currentDoctor.name}
                className="w-12 h-12 rounded-full object-cover border border-[#D9E6EC]"
              />
              <div>
                <h3 className="font-bold text-[#102A43] text-xs">{currentDoctor.name}</h3>
                <p className="text-[11px] font-medium text-[#2490C9]">{currentDoctor.specialty}</p>
                <p className="text-[10px] text-[#64748B]">{currentDoctor.department}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs border-y border-[#D9E6EC] py-3.5 mb-6">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Date:</span>
                <span className="font-bold text-[#102A43]">{selectedDate || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Time Slot:</span>
                <span className="font-bold text-[#2490C9]">{selectedTime || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Location:</span>
                <span className="font-medium text-[#102A43] truncate max-w-[150px]">
                  {currentDoctor.hospital}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Initial Status:</span>
                <span className="font-semibold text-amber-700 bg-[#FFF4C2] px-1.5 py-0.5 rounded text-[10px]">
                  PENDING APPROVAL
                </span>
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
              {isSubmitting ? 'Booking Appointment...' : 'Confirm Appointment Request'}
            </button>

            <p className="text-[11px] text-[#64748B] text-center mt-3">
              Your request will be submitted to the doctor for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}