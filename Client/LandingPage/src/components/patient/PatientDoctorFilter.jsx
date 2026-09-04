import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function PatientDoctorFilter({ searchQuery, setSearchQuery, selectedSpecialty, setSelectedSpecialty, specialties }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E6EC] p-4 shadow-xs mb-6 flex flex-col md:flex-row items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor name, specialty, or department..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] placeholder-[#64748B] focus:outline-none focus:border-[#2490C9] focus:bg-white transition-colors"
        />
      </div>

      {/* Specialty Filter Dropdown */}
      <div className="relative w-full md:w-64">
        <Filter className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:bg-white transition-colors appearance-none cursor-pointer"
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}