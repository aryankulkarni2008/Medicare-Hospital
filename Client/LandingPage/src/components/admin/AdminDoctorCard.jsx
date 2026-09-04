import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, DollarSign, Award } from 'lucide-react';
import DoctorAvatar from '../common/DoctorAvatar';

export default function AdminDoctorCard({ doctor, appointmentsCount = { total: 0, completed: 0, upcoming: 0 } }) {
  return (
    <div className="bg-white border border-med-border rounded-xl shadow-sm hover:shadow-md hover:border-med-blue/40 transition-all duration-200 ease-out flex flex-col p-5">
      <div className="flex items-center gap-4 pb-4 border-b border-med-border">
        <DoctorAvatar 
          name={doctor.name}
          photo={doctor.photo} 
          className="w-14 h-14 rounded-full object-cover border border-med-border flex-shrink-0"
        />
        <div className="min-w-0">
          <h4 className="font-bold text-base text-med-navy truncate">{doctor.name}</h4>
          <p className="text-xs text-med-blue font-semibold truncate">{doctor.specialty}</p>
          <span className="text-[10px] text-med-gray block truncate">{doctor.department}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 py-4 flex-1 text-xs">
        <div className="flex items-center gap-2 text-med-gray">
          <Award className="w-4 h-4 text-med-blue/70" />
          <span>{doctor.experience} yrs Exp</span>
        </div>
        <div className="flex items-center gap-2 text-med-gray">
          <DollarSign className="w-4 h-4 text-med-blue/70" />
          <span>${doctor.fee} Fee</span>
        </div>
        <div className="flex items-center gap-2 text-med-gray">
          <User className="w-4 h-4 text-med-blue/70" />
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${doctor.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-inactive/15 text-status-inactive'}`}>
            {doctor.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-med-gray">
          <Calendar className="w-4 h-4 text-med-blue/70" />
          <span>{appointmentsCount.total} Appts</span>
        </div>
      </div>

      <div className="bg-med-bg rounded-lg p-3 mb-4 text-xs space-y-1">
        <div className="flex justify-between">
          <span className="text-med-gray">Completed Appts:</span>
          <span className="font-bold text-med-navy">{appointmentsCount.completed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-med-gray">Upcoming Appts:</span>
          <span className="font-bold text-med-blue">{appointmentsCount.upcoming}</span>
        </div>
      </div>

      <Link 
        to={`/admin/doctor/${doctor.id}`}
        className="w-full text-center py-2 px-4 text-xs font-bold text-med-blue border border-med-blue rounded-lg bg-white hover:bg-med-light-blue transition-all duration-200 block"
      >
        View Full Profile
      </Link>
    </div>
  );
}
