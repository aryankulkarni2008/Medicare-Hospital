import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDoctor } from '../context/DoctorContext';
import { ArrowLeft, User, Calendar, Phone, Mail, Droplet, History, Clock } from 'lucide-react';
import Badge from '../components/common/Badge';

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, appointments } = useDoctor();

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="text-center py-14 px-4">
        <h2 className="text-xl font-semibold text-[#102A43] mb-2">Patient Not Found</h2>
        <p className="text-[#64748B] mb-6">
          The requested patient ID <strong>{id}</strong> was not found.
        </p>
        <Link
          to="/doctor/patients"
          className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
        >
          Back to Patients List
        </Link>
      </div>
    );
  }

  // Get all historical appointments for this patient
  const patientHistory = appointments.filter((app) => app.patientId === patient.id || app.patientName === patient.name);

  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
        >
          <ArrowLeft size={16} />
          <span>Back to My Patients</span>
        </button>
      </div>

      {/* Patient Header Summary */}
      <div className="bg-white rounded-xl p-[1.75rem] border border-[#D9E6EC] flex items-center gap-5 flex-wrap shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div className="w-[72px] h-[72px] rounded-full bg-[#E6F4FA] text-[#2490C9] flex items-center justify-center font-bold text-[1.75rem] border-2 border-[#2490C9]">
          {patient.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[1.4rem] font-bold text-[#102A43] m-0">{patient.name}</h1>
            <Badge status={patient.status} />
          </div>
          <p className="text-[#64748B] text-sm mt-1 m-0">
            Patient ID: <strong>{patient.id}</strong> • Registered: {patient.regDate}
          </p>
        </div>
      </div>

      {/* Patient Details Card */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
        <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-5 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2 m-0">
          <User size={18} color="#2490C9" />
          <span>Patient Information</span>
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          <div>
            <span className="text-xs text-[#64748B] block mb-1">Full Name</span>
            <strong className="text-[0.95rem] text-[#102A43]">{patient.name}</strong>
          </div>

          <div>
            <span className="text-xs text-[#64748B] block mb-1">Age / Gender</span>
            <strong className="text-[0.95rem] text-[#102A43]">{patient.age} Years ({patient.gender})</strong>
          </div>

          <div>
            <span className="text-xs text-[#64748B] block mb-1">Blood Group</span>
            <strong className="text-[0.95rem] text-[#B91C1C] flex items-center gap-1">
              <Droplet size={14} color="#B91C1C" />
              <span>{patient.bloodGroup}</span>
            </strong>
          </div>

          <div>
            <span className="text-xs text-[#64748B] block mb-1">Phone Number</span>
            <strong className="text-[0.95rem] text-[#102A43] flex items-center gap-1">
              <Phone size={14} color="#2490C9" />
              <span>{patient.phone}</span>
            </strong>
          </div>

          <div>
            <span className="text-xs text-[#64748B] block mb-1">Email Address</span>
            <strong className="text-[0.95rem] text-[#102A43] flex items-center gap-1">
              <Mail size={14} color="#2490C9" />
              <span>{patient.email}</span>
            </strong>
          </div>

          <div>
            <span className="text-xs text-[#64748B] block mb-1">Registration Date</span>
            <strong className="text-[0.95rem] text-[#102A43]">{patient.regDate}</strong>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
        <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-5 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2 m-0">
          <History size={18} color="#2490C9" />
          <span>Appointment History</span>
        </h2>

        {patientHistory.length === 0 ? (
          <p className="text-[#64748B] py-4 m-0">No consultation history found for this patient.</p>
        ) : (
          <div className="w-full overflow-x-auto bg-white border border-[#D9E6EC] rounded-[10px]">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#F4F9FC] text-[#64748B] font-semibold border-b border-[#D9E6EC]">
                  <th className="px-4 py-3 whitespace-nowrap">Appointment ID</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 whitespace-nowrap">Department</th>
                  <th className="px-4 py-3 whitespace-nowrap">Time</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {patientHistory.map((history) => (
                  <tr key={history.id} className="border-b border-[#D9E6EC] last:border-b-0 hover:bg-[#F4F9FC] transition-colors">
                    <td className="px-4 py-[0.85rem] align-middle">
                      <Link to={`/doctor/appointments/${history.id}`} className="font-semibold text-[#2490C9] hover:underline">
                        {history.id}
                      </Link>
                    </td>
                    <td className="px-4 py-[0.85rem] align-middle text-[#102A43]">{history.date}</td>
                    <td className="px-4 py-[0.85rem] align-middle text-[#102A43]">{history.department}</td>
                    <td className="px-4 py-[0.85rem] align-middle text-[#102A43]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} color="#2490C9" />
                        <span>{history.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-[0.85rem] align-middle">
                      <Badge status={history.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;
