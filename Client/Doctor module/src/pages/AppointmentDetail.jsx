import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDoctor } from '../context/DoctorContext';
import { ArrowLeft, Calendar, Clock, User, Stethoscope, FileText, CheckCircle2, XCircle, Check, X, Phone, Mail } from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    appointments,
    acceptAppointment,
    rejectAppointment,
    completeAppointment,
    cancelAppointment
  } = useDoctor();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    return (
      <div className="text-center py-14 px-4">
        <h2 className="text-xl font-semibold text-[#102A43] mb-2">
          Appointment Not Found
        </h2>
        <p className="text-[#64748B] mb-6">
          The requested appointment ID <strong>{id}</strong> does not exist.
        </p>
        <Link
          to="/doctor/appointments"
          className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
        >
          Back to Appointments
        </Link>
      </div>
    );
  }

  const handleConfirmReject = () => {
    rejectAppointment(appointment.id, rejectReason || 'Doctor unavailable');
    setRejectModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[900px]">
      {/* Back Button & Title Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
        >
          <ArrowLeft size={16} />
          <span>Back to List</span>
        </button>
        <div className="flex items-center gap-2.5">
          <span className="text-[0.85rem] text-[#64748B]">Status:</span>
          <Badge status={appointment.status} />
        </div>
      </div>

      {/* Main Appointment Card */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-[1.75rem] shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
        <div className="flex justify-between items-start border-b border-[#D9E6EC] pb-[1.25rem] mb-[1.5rem]">
          <div>
            <span className="text-xs font-semibold text-[#2490C9] tracking-wider uppercase">
              APPOINTMENT DETAILS
            </span>
            <h1 className="text-[1.5rem] font-bold text-[#102A43] mt-1 m-0">
              {appointment.id}
            </h1>
            <span className="text-[0.8125rem] text-[#64748B]">
              Booked on: {appointment.bookingDate}
            </span>
          </div>

          {/* Action Buttons based on status */}
          <div className="flex gap-2.5">
            {appointment.status === 'Pending' && (
              <>
                <button
                  onClick={() => acceptAppointment(appointment.id)}
                  className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#10B981] bg-[#10B981] text-white hover:bg-[#059669]"
                >
                  <Check size={16} />
                  <span>Accept Appointment</span>
                </button>
                <button
                  onClick={() => setRejectModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#EF4444] bg-[#EF4444] text-white hover:bg-[#DC2626]"
                >
                  <X size={16} />
                  <span>Reject</span>
                </button>
              </>
            )}

            {appointment.status === 'Confirmed' && (
              <>
                <button
                  onClick={() => completeAppointment(appointment.id)}
                  className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
                >
                  <CheckCircle2 size={16} />
                  <span>Mark as Completed</span>
                </button>
                <button
                  onClick={() => cancelAppointment(appointment.id, 'Cancelled by doctor')}
                  className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#EF4444] hover:bg-[#F4F9FC]"
                >
                  <XCircle size={16} />
                  <span>Cancel Appointment</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Detailed Grid Info */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {/* Patient Card Section */}
          <div className="bg-[#F4F9FC] p-[1.25rem] rounded-lg border border-[#D9E6EC]">
            <h3 className="text-base font-semibold text-[#102A43] mb-[0.85rem] flex items-center gap-2 m-0">
              <User size={18} color="#2490C9" />
              <span>Patient Information</span>
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div>
                <span className="text-[#64748B]">Patient Name:</span>
                <div className="font-semibold text-[#102A43] text-[0.95rem]">{appointment.patientName}</div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-[#64748B]">Age:</span>
                  <div className="font-semibold text-[#102A43]">{appointment.patientAge} Yrs</div>
                </div>
                <div>
                  <span className="text-[#64748B]">Gender:</span>
                  <div className="font-semibold text-[#102A43]">{appointment.patientGender}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[#102A43] mt-1">
                <Phone size={14} color="#2490C9" />
                <span>{appointment.patientPhone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#102A43]">
                <Mail size={14} color="#2490C9" />
                <span>{appointment.patientEmail}</span>
              </div>

              <div className="mt-2">
                <Link to={`/doctor/patients/${appointment.patientId}`} className="text-[0.8125rem] font-semibold text-[#2490C9] hover:underline">
                  View Full Patient Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Consultation Card Section */}
          <div className="bg-[#F4F9FC] p-[1.25rem] rounded-lg border border-[#D9E6EC]">
            <h3 className="text-base font-semibold text-[#102A43] mb-[0.85rem] flex items-center gap-2 m-0">
              <Stethoscope size={18} color="#2490C9" />
              <span>Consultation Details</span>
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div>
                <span className="text-[#64748B]">Assigned Doctor:</span>
                <div className="font-semibold text-[#102A43]">{appointment.doctorName}</div>
              </div>
              <div>
                <span className="text-[#64748B]">Department:</span>
                <div className="font-semibold text-[#102A43]">{appointment.department}</div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-[#64748B]">Date:</span>
                  <div className="font-semibold text-[#102A43] flex items-center gap-1">
                    <Calendar size={14} color="#2490C9" />
                    <span>{appointment.date}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#64748B]">Time Slot:</span>
                  <div className="font-semibold text-[#102A43] flex items-center gap-1">
                    <Clock size={14} color="#2490C9" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reason for Visit Card Section */}
        <div className="mt-6 bg-white p-[1.25rem] rounded-lg border border-[#D9E6EC]">
          <h3 className="text-base font-semibold text-[#102A43] mb-2.5 flex items-center gap-2 m-0">
            <FileText size={18} color="#2490C9" />
            <span>Reason for Consultation</span>
          </h3>
          <p className="text-[0.9rem] text-[#102A43] leading-relaxed bg-[#F8FAFC] p-[0.85rem] rounded-md border border-[#E2E8F0] m-0">
            {appointment.reason}
          </p>
        </div>
      </div>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Appointment"
        footer={
          <>
            <button
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
              onClick={() => setRejectModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#EF4444] bg-[#EF4444] text-white hover:bg-[#DC2626]"
              onClick={handleConfirmReject}
            >
              Confirm Rejection
            </button>
          </>
        }
      >
        <p className="text-sm text-[#102A43] mb-4">
          Are you sure you want to reject appointment <strong>{appointment.id}</strong> for {appointment.patientName}?
        </p>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-medium text-[#102A43]">Note for Patient:</label>
          <input
            type="text"
            className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
            placeholder="e.g. Schedule full / doctor in emergency duty"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentDetail;
