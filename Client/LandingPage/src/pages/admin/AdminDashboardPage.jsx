import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import AdminStatisticsCard from '../../components/admin/AdminStatisticsCard';
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  AlertCircle, 
  Activity,
  PlusCircle,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { doctors, patients, appointments, doctorRequests, activities, notifications } = useAdmin();
  const navigate = useNavigate();

  // 1. Calculate dynamic statistics
  const totalDoctors = doctors.length;
  const totalPatients = patients.length;
  
  // Let's assume today is 2026-08-25 based on system metadata
  const todayDate = "2026-08-25";
  const todaysAppointmentsCount = appointments.filter(a => a.date === todayDate).length;
  
  const pendingRequestsCount = doctorRequests.filter(r => r.status === 'Pending').length;
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;
  const pendingActionsCount = pendingRequestsCount + unreadNotifsCount;

  // 2. Helper: Calculate appointment counts for each doctor
  const getDoctorAppointmentMetrics = (doctorId) => {
    const docAppts = appointments.filter(a => a.doctorId === doctorId);
    return {
      total: docAppts.length,
      completed: docAppts.filter(a => a.status === 'Completed').length,
      upcoming: docAppts.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length
    };
  };

  // 3. Activity Icon Selector helper
  const getActivityIcon = (type) => {
    switch (type) {
      case 'success':
      case 'doctor_approved':
        return { icon: CheckCircle, bg: 'bg-green-50 text-status-success' };
      case 'danger':
      case 'doctor_rejected':
        return { icon: XCircle, bg: 'bg-red-50 text-status-rejected' };
      case 'doctor_request':
        return { icon: PlusCircle, bg: 'bg-yellow-50 text-yellow-600' };
      default:
        return { icon: Activity, bg: 'bg-blue-50 text-med-blue' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-med-navy">MediCare Hospital Administration</h1>
        <p className="text-xs text-med-gray font-medium mt-1">
          Monitor and manage hospital doctors, patients, appointments, and administrative activities.
        </p>
      </div>

      {/* Grid of 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div onClick={() => navigate('/admin/doctors')}>
          <AdminStatisticsCard 
            title="Total Doctors"
            value={totalDoctors}
            subtext="Active medical professionals"
            icon={Stethoscope}
            iconBgColor="bg-med-light-blue"
            iconColor="text-med-blue"
          />
        </div>
        <div onClick={() => navigate('/admin/patients')}>
          <AdminStatisticsCard 
            title="Total Patients"
            value={totalPatients}
            subtext="Registered hospital patients"
            icon={Users}
            iconBgColor="bg-green-50"
            iconColor="text-status-success"
          />
        </div>
        <div onClick={() => navigate('/admin/doctors')}> {/* Navigate to doctor appts or list */}
          <AdminStatisticsCard 
            title="Today's Appointments"
            value={todaysAppointmentsCount}
            subtext="Scheduled for today"
            icon={Calendar}
            iconBgColor="bg-blue-50"
            iconColor="text-med-blue"
          />
        </div>
        <div onClick={() => navigate('/admin/doctor-requests')}>
          <AdminStatisticsCard 
            title="Pending Actions"
            value={pendingActionsCount}
            subtext="Requires your attention"
            icon={AlertCircle}
            iconBgColor="bg-yellow-50"
            iconColor="text-yellow-600"
          />
        </div>
      </div>

      {/* Main Grid: Doctors Overview & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Doctor Appointment Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-med-navy flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-med-blue" />
              <span>Doctor Appointment Overview</span>
            </h2>
            <Link 
              to="/admin/doctors"
              className="text-xs font-bold text-med-blue hover:text-med-blue-hover hover:underline"
            >
              View All Doctors
            </Link>
          </div>

          <div className="bg-white border border-med-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-med-bg border-b border-med-border text-xs font-bold text-med-navy uppercase tracking-wider">
                    <th className="py-4 px-6">Doctor</th>
                    <th className="py-4 px-6">Specialty</th>
                    <th className="py-4 px-6 text-center">Total Appts</th>
                    <th className="py-4 px-6 text-center">Completed</th>
                    <th className="py-4 px-6 text-center">Upcoming</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-med-border text-sm text-med-navy">
                  {doctors.slice(0, 3).map((doctor) => {
                    const metrics = getDoctorAppointmentMetrics(doctor.id);
                    return (
                      <tr key={doctor.id} className="hover:bg-med-bg/35 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={doctor.photo}
                              alt={doctor.name}
                              className="w-9 h-9 rounded-full object-cover border border-med-border"
                            />
                            <div>
                              <span className="font-semibold text-med-navy block leading-tight">{doctor.name}</span>
                              <span className="text-[10px] text-med-gray font-bold uppercase tracking-wider block">{doctor.department}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-semibold text-med-blue bg-med-light-blue px-2.5 py-1 rounded-full">
                            {doctor.specialty}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-med-navy">{metrics.total}</td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-status-success font-bold">{metrics.completed}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-med-blue font-bold">{metrics.upcoming}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Administrative Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-med-navy">
            Recent Administrative Activity
          </h2>
          
          <div className="bg-white border border-med-border rounded-xl p-5 shadow-sm space-y-4 max-h-[385px] overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-xs text-med-gray text-center font-medium py-8">No activities logged yet.</p>
            ) : (
              activities.map((act, idx) => {
                const { icon: ActIcon, bg: iconBg } = getActivityIcon(act.type);
                return (
                  <div key={act.id || idx} className="flex gap-3 relative pb-4 last:pb-0">
                    {/* Visual Connector Line */}
                    {idx < activities.length - 1 && (
                      <div className="absolute left-[18px] top-9 bottom-0 w-[2px] bg-med-border"></div>
                    )}
                    
                    <div className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 z-10 ${iconBg} border border-white shadow-sm`}>
                      <ActIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="text-xs font-bold text-med-navy truncate">
                          {act.title}
                        </h4>
                        <span className="text-[9px] text-med-gray/70 font-semibold flex-shrink-0">
                          {act.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-med-gray leading-normal font-medium">{act.message}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
