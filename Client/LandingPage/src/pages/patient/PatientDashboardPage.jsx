import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  UserCheck, 
  FileText,
  MapPin,
  Activity
} from 'lucide-react';
import PatientStatusCard from '../../components/patient/PatientStatusCard';

export default function PatientDashboardPage({ patient, appointments, activities, onViewAppointmentDetails }) {
  const navigate = useNavigate();

  // Metrics calculation
  const upcomingCount = appointments.filter(a => a.status === 'Confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled' || a.status === 'Rejected').length;

  // Nearest upcoming appointment
  const nextAppointment = appointments.find(a => a.status === 'Confirmed' || a.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2490C9] to-[#126B9E] rounded-xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Welcome back, {patient.name}!</h1>
        <p className="text-sm text-sky-100 mt-1">
          Here's an overview of your healthcare appointments and medical activity.
        </p>
      </div>

      {/* Appointment Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PatientStatusCard 
          title="Upcoming Appointments" 
          count={upcomingCount} 
          icon={Calendar} 
          bgIconColor="bg-[#E6F4FA]" 
          textColor="text-[#2490C9]" 
        />
        <PatientStatusCard 
          title="Pending Requests" 
          count={pendingCount} 
          icon={Clock} 
          bgIconColor="bg-[#FFF4C2]" 
          textColor="text-amber-800" 
        />
        <PatientStatusCard 
          title="Completed Appointments" 
          count={completedCount} 
          icon={CheckCircle} 
          bgIconColor="bg-emerald-100" 
          textColor="text-[#22A06B]" 
        />
        <PatientStatusCard 
          title="Cancelled / Rejected" 
          count={cancelledCount} 
          icon={XCircle} 
          bgIconColor="bg-red-100" 
          textColor="text-red-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D9E6EC]">
              <h2 className="text-base font-bold text-[#102A43] flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#2490C9]" />
                <span>Next Appointment</span>
              </h2>
              {nextAppointment && (
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  nextAppointment.status === 'Confirmed' ? 'bg-[#2490C9] text-white' : 'bg-[#FFF4C2] text-amber-800'
                }`}>
                  {nextAppointment.status}
                </span>
              )}
            </div>

            {nextAppointment ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-xl bg-[#F4F9FC] border border-[#D9E6EC]/60">
                <img 
                  src={nextAppointment.doctorPhoto} 
                  alt={nextAppointment.doctorName} 
                  className="w-16 h-16 rounded-full object-cover border border-[#D9E6EC]"
                />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#102A43]">{nextAppointment.doctorName}</h3>
                  <p className="text-xs font-semibold text-[#2490C9]">{nextAppointment.specialty}</p>
                  <p className="text-xs text-[#64748B] mb-2">{nextAppointment.department}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#102A43]">
                    <span className="flex items-center space-x-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#2490C9]" />
                      <span>{nextAppointment.date}</span>
                    </span>
                    <span className="flex items-center space-x-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#2490C9]" />
                      <span>{nextAppointment.time}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-[#64748B]">
                      <MapPin className="w-3.5 h-3.5 text-[#2490C9]" />
                      <span>{nextAppointment.hospital}</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#64748B]">
                <p className="text-sm">No upcoming appointments scheduled.</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button
              onClick={() => nextAppointment ? onViewAppointmentDetails(nextAppointment) : navigate('/patient/find-doctor')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2490C9] rounded-lg hover:bg-[#126B9E] transition-colors flex items-center space-x-2"
            >
              <span>{nextAppointment ? 'View Appointment' : 'Book New Appointment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#102A43] mb-4 pb-3 border-b border-[#D9E6EC]">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/patient/find-doctor')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-[#D9E6EC] hover:bg-[#E6F4FA] hover:border-[#2490C9] text-left transition-colors"
              >
                <div className="p-2 rounded-md bg-[#2490C9] text-white">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#102A43]">Find a Doctor</p>
                  <p className="text-[11px] text-[#64748B]">Search and book specialist doctors</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/patient/appointments')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-[#D9E6EC] hover:bg-[#E6F4FA] hover:border-[#2490C9] text-left transition-colors"
              >
                <div className="p-2 rounded-md bg-[#2490C9] text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#102A43]">View Appointments</p>
                  <p className="text-[11px] text-[#64748B]">Manage all booking requests</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/patient/medical-history')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-[#D9E6EC] hover:bg-[#E6F4FA] hover:border-[#2490C9] text-left transition-colors"
              >
                <div className="p-2 rounded-md bg-[#2490C9] text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#102A43]">Medical History</p>
                  <p className="text-[11px] text-[#64748B]">Access past records and prescriptions</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#102A43] mb-4 pb-3 border-b border-[#D9E6EC] flex items-center space-x-2">
          <Activity className="w-5 h-5 text-[#2490C9]" />
          <span>Recent Activity</span>
        </h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2490C9] mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-[#102A43]">{activity.title}</p>
                <p className="text-xs text-[#64748B]">{activity.desc}</p>
                <span className="text-[10px] text-slate-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}