import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import PatientAppointmentCard from '../../components/patient/PatientAppointmentCard';
import PatientAppointmentDetailsModal from '../../components/patient/PatientAppointmentDetailsModal';
import PatientCancelAppointmentModal from '../../components/patient/PatientCancelAppointmentModal';

export default function PatientAppointmentsPage({ appointments, onCancelAppointment }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedDetailsAppointment, setSelectedDetailsAppointment] = useState(null);
  const [selectedCancelAppointment, setSelectedCancelAppointment] = useState(null);

  const tabs = ['All Appointments', 'Today Appointments', 'Upcoming Appointments', 'Completed Appointments', 'Cancelled Appointments'];

  const todayStr = "2026-08-24";

  // Filter Logic
  const filteredAppointments = appointments.filter((apt) => {
    // Category Tabs filter
    let matchesCategory = true;
    if (activeTab === 'Today Appointments') {
      matchesCategory = apt.date === todayStr;
    } else if (activeTab === 'Upcoming Appointments') {
      matchesCategory = apt.status === 'Confirmed' || apt.status === 'Pending';
    } else if (activeTab === 'Completed Appointments') {
      matchesCategory = apt.status === 'Completed';
    } else if (activeTab === 'Cancelled Appointments') {
      matchesCategory = apt.status === 'Cancelled' || apt.status === 'Rejected';
    }

    // Status Dropdown filter
    let matchesStatus = true;
    if (statusFilter !== 'All') {
      matchesStatus = apt.status === statusFilter;
    }

    // Search Query filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      apt.doctorName.toLowerCase().includes(query) ||
      apt.specialty.toLowerCase().includes(query) ||
      apt.department.toLowerCase().includes(query) ||
      apt.id.toLowerCase().includes(query);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#102A43]">Patient Appointments</h1>
        <p className="text-xs text-[#64748B]">View and manage all your appointment requests and scheduled consultations.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-[#D9E6EC]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-[#2490C9] text-white shadow-xs'
                : 'bg-white border border-[#D9E6EC] text-[#64748B] hover:bg-[#E6F4FA] hover:text-[#102A43]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Controls: Search Bar & Status Filter */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, specialty, department, or appointment ID..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9]"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <Filter className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9] appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List Grid */}
      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAppointments.map((apt) => (
            <PatientAppointmentCard
              key={apt.id}
              appointment={apt}
              onViewDetails={setSelectedDetailsAppointment}
              onCancelClick={setSelectedCancelAppointment}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#D9E6EC] p-12 text-center text-[#64748B]">
          <Calendar className="w-12 h-12 text-[#2490C9]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#102A43]">No Appointments Found</h3>
          <p className="text-xs mt-1">Try resetting your filters or search query.</p>
        </div>
      )}

      {/* Details Modal */}
      <PatientAppointmentDetailsModal 
        appointment={selectedDetailsAppointment}
        onClose={() => setSelectedDetailsAppointment(null)}
      />

      {/* Cancel Confirmation Modal */}
      <PatientCancelAppointmentModal
        appointment={selectedCancelAppointment}
        onClose={() => setSelectedCancelAppointment(null)}
        onConfirmCancel={(id) => {
          onCancelAppointment(id);
          setSelectedCancelAppointment(null);
        }}
      />
    </div>
  );
}