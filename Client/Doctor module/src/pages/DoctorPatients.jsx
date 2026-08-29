import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctor } from '../context/DoctorContext';
import { Search, Users, Eye, Phone, Mail, Calendar, User } from 'lucide-react';
import Badge from '../components/common/Badge';

export const DoctorPatients = () => {
  const { patients } = useDoctor();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-[1.5rem_1.75rem] border border-[#D9E6EC] flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div>
          <h1 className="text-[1.4rem] font-bold text-[#102A43] mb-1">
            My Patients
          </h1>
          <p className="text-[#64748B] text-sm m-0">
            View patient profiles, registration details, and historical visit records.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-[280px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            className="w-full pl-[2.3rem] pr-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-[0.85rem]">
                <div className="flex items-center gap-[0.65rem]">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#E6F4FA] text-[#2490C9] flex items-center justify-center font-bold text-base">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#102A43] m-0">{patient.name}</h3>
                    <span className="text-xs text-[#64748B]">{patient.id}</span>
                  </div>
                </div>
                <Badge status={patient.status} />
              </div>

              <div className="flex flex-col gap-[0.45rem] text-[0.8125rem] text-[#64748B] bg-[#F8FAFC] p-[0.85rem] rounded-md mb-4 border border-[#E2E8F0]">
                <div className="flex justify-between">
                  <span>Age / Gender:</span>
                  <strong className="text-[#102A43]">{patient.age} Yrs • {patient.gender}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Blood Group:</span>
                  <strong className="text-[#B91C1C]">{patient.bloodGroup}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Visits:</span>
                  <strong className="text-[#2490C9]">{patient.totalAppointments} Visits</strong>
                </div>
                <div className="flex justify-between">
                  <span>Last Visit:</span>
                  <strong className="text-[#102A43]">{patient.lastVisit}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/doctor/patients/${patient.id}`)}
              className="w-full inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
            >
              <Eye size={15} />
              <span>View Patient Details</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatients;
