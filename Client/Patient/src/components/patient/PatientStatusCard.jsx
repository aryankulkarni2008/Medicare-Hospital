import React from 'react';

export default function PatientStatusCard({ title, count, icon: Icon, bgIconColor, textColor }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E6EC] p-5 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">{title}</p>
        <p className="text-2xl font-bold text-[#102A43] mt-1">{count}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgIconColor} ${textColor}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}