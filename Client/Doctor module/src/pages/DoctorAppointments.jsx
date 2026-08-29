import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDoctor } from '../context/DoctorContext';
import { Search, Calendar, Filter, Eye, Check, X, CheckCircle2, Clock } from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export const DoctorAppointments = () => {
  const {
    appointments,
    acceptAppointment,
    rejectAppointment,
    completeAppointment,
    cancelAppointment
  } = useDoctor();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';

  // Local Filter States
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [activeTab, setActiveTab] = useState('All'); // All, Today, Upcoming, Completed, Cancelled
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Reject Modal
  const [rejectModalId, setRejectModalId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Filtered Appointments Logic
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      // 1. Search filter
      const matchesSearch =
        !searchTerm ||
        app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.patientPhone.includes(searchTerm);

      // 2. Status filter dropdown
      const matchesStatus =
        statusFilter === 'All' || app.status.toLowerCase() === statusFilter.toLowerCase();

      // 3. Date filter
      const matchesDate = !dateFilter || app.date === dateFilter;

      // 4. Tab filter
      let matchesTab = true;
      if (activeTab === 'Today') {
        matchesTab = app.date === '2026-08-23';
      } else if (activeTab === 'Upcoming') {
        matchesTab = app.date > '2026-08-23' && app.status === 'Confirmed';
      } else if (activeTab === 'Completed') {
        matchesTab = app.status === 'Completed';
      } else if (activeTab === 'Cancelled') {
        matchesTab = app.status === 'Cancelled' || app.status === 'Rejected';
      }

      return matchesSearch && matchesStatus && matchesDate && matchesTab;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter, activeTab]);

  const handleConfirmReject = () => {
    if (rejectModalId) {
      rejectAppointment(rejectModalId, rejectReason || 'Doctor unavailable');
      setRejectModalId(null);
      setRejectReason('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Title */}
      <div className="bg-white rounded-xl p-[1.5rem_1.75rem] border border-[#D9E6EC] flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div>
          <h1 className="text-[1.4rem] font-bold text-[#102A43] mb-1">
            Doctor Appointments
          </h1>
          <p className="text-[#64748B] text-sm m-0">
            View, filter, accept, reject, and manage all patient consultations.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#D9E6EC] mb-[0.25rem]">
        {['All', 'Today', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-[0.6rem] text-sm font-medium bg-transparent border-b-2 cursor-pointer transition-all ${
              activeTab === tab
                ? 'text-[#2490C9] border-b-[#2490C9] font-semibold'
                : 'text-[#64748B] border-b-transparent hover:text-[#102A43]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Appointments
          </button>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] flex items-center justify-between flex-wrap gap-4">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            className="w-full pl-[2.3rem] pr-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
            placeholder="Search patient name, ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} color="#64748B" />
          <select
            className="w-[150px] px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Calendar size={16} color="#64748B" />
          <input
            type="date"
            className="w-[160px] px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button
              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
              onClick={() => setDateFilter('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Appointments List Table */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-0 shadow-[0_1px_3px_rgba(16,42,67,0.06)] overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-14 px-4 text-[#64748B]">
            <Calendar size={48} color="#94A3B8" className="mx-auto mb-3" />
            <h3 className="text-[1.1rem] text-[#102A43] mb-1 font-semibold">No appointments found</h3>
            <p className="text-sm m-0">No appointments match your selected tab or search filters.</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#F4F9FC] text-[#64748B] font-semibold border-b border-[#D9E6EC]">
                  <th className="px-4 py-3 whitespace-nowrap">Appointment ID</th>
                  <th className="px-4 py-3 whitespace-nowrap">Patient Info</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date & Time</th>
                  <th className="px-4 py-3 whitespace-nowrap">Department</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((app) => (
                  <tr key={app.id} className="border-b border-[#D9E6EC] last:border-b-0 hover:bg-[#F4F9FC] transition-colors">
                    <td className="px-4 py-[0.85rem] align-middle">
                      <span className="font-bold text-[#2490C9]">{app.id}</span>
                      <div className="text-[0.725rem] text-[#64748B]">Booked: {app.bookingDate}</div>
                    </td>
                    <td className="px-4 py-[0.85rem] align-middle">
                      <div className="font-semibold text-[#102A43]">{app.patientName}</div>
                      <div className="text-xs text-[#64748B]">
                        Age: {app.patientAge} • {app.patientGender} • {app.patientPhone}
                      </div>
                    </td>
                    <td className="px-4 py-[0.85rem] align-middle">
                      <div className="font-semibold text-[#102A43]">{app.date}</div>
                      <div className="text-xs text-[#64748B] flex items-center gap-1">
                        <Clock size={12} color="#2490C9" />
                        <span>{app.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-[0.85rem] align-middle text-[#102A43]">{app.department}</td>
                    <td className="px-4 py-[0.85rem] align-middle">
                      <Badge status={app.status} />
                    </td>
                    <td className="px-4 py-[0.85rem] align-middle text-right">
                      <div className="flex gap-1.5 justify-end flex-wrap">
                        <button
                          onClick={() => navigate(`/doctor/appointments/${app.id}`)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </button>

                        {app.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => acceptAppointment(app.id)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#10B981] bg-[#10B981] text-white hover:bg-[#059669]"
                            >
                              <Check size={14} />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => setRejectModalId(app.id)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#EF4444] bg-[#EF4444] text-white hover:bg-[#DC2626]"
                            >
                              <X size={14} />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {app.status === 'Confirmed' && (
                          <>
                            <button
                              onClick={() => completeAppointment(app.id)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
                            >
                              <CheckCircle2 size={14} />
                              <span>Complete</span>
                            </button>
                            <button
                              onClick={() => cancelAppointment(app.id, 'Cancelled by doctor')}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#EF4444] hover:bg-[#F4F9FC]"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Reason Confirmation Modal */}
      <Modal
        isOpen={!!rejectModalId}
        onClose={() => setRejectModalId(null)}
        title="Confirm Appointment Rejection"
        footer={
          <>
            <button
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
              onClick={() => setRejectModalId(null)}
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#EF4444] bg-[#EF4444] text-white hover:bg-[#DC2626]"
              onClick={handleConfirmReject}
            >
              Confirm Reject
            </button>
          </>
        }
      >
        <p className="text-sm text-[#102A43] mb-4">
          Rejecting appointment request <strong>{rejectModalId}</strong>:
        </p>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-medium text-[#102A43]">Rejection note for patient:</label>
          <input
            type="text"
            className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
            placeholder="e.g. Schedule clash or doctor emergency duty"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DoctorAppointments;
