import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Eye,
  Check,
  X,
  CalendarDays,
  Users,
  Bell
} from 'lucide-react';
import { useDoctor } from '../context/DoctorContext';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export const DoctorDashboard = () => {
  const {
    doctorProfile,
    appointments,
    stats,
    acceptAppointment,
    rejectAppointment
  } = useDoctor();
  
  const navigate = useNavigate();
  const [rejectModalId, setRejectModalId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Pending Requests list
  const pendingRequests = appointments.filter((app) => app.status === 'Pending');

  // Today's Appointments
  const todayAppointments = appointments.filter((app) => app.date === '2026-08-23');

  const handleConfirmReject = () => {
    if (rejectModalId) {
      rejectAppointment(rejectModalId, rejectReason || 'Doctor unavailable');
      setRejectModalId(null);
      setRejectReason('');
    }
  };

  return (
    <div className="flex flex-col gap-[1.75rem]">
      {/* Top Banner Greeting */}
      <div className="bg-white rounded-xl p-[1.5rem_1.75rem] border border-[#D9E6EC] flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div>
          <h1 className="text-[1.45rem] font-bold text-[#102A43] mb-1">
            Good Morning, {doctorProfile.name} 👋
          </h1>
          <p className="text-[#64748B] text-sm flex items-center gap-[0.4rem]">
            <Calendar size={15} color="#2490C9" />
            <span>Sunday, August 23, 2026</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#2490C9] font-medium">{doctorProfile.hospital}</span>
          </p>
        </div>

        {/* Quick Actions Panel */}
        <div className="flex gap-[0.6rem] flex-wrap">
          <button
            onClick={() => navigate('/doctor/availability')}
            className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC] hover:border-[#CBD5E1]"
          >
            <CalendarDays size={15} color="#2490C9" />
            <span>Manage Availability</span>
          </button>
          <button
            onClick={() => navigate('/doctor/appointments')}
            className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E] hover:border-[#126B9E]"
          >
            <Calendar size={15} />
            <span>View Appointments</span>
          </button>
          <button
            onClick={() => navigate('/doctor/patients')}
            className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC] hover:border-[#CBD5E1]"
          >
            <Users size={15} color="#2490C9" />
            <span>My Patients</span>
          </button>
          <button
            onClick={() => navigate('/doctor/notifications')}
            className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC] hover:border-[#CBD5E1]"
          >
            <Bell size={15} color="#2490C9" />
            <span>Notifications</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-1">
        <StatCard
          title="Today's Appointments"
          value={stats.todayCount || 8}
          icon={Calendar}
          color="#2490C9"
          subtext="8 scheduled today"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingCount || 3}
          icon={Clock}
          color="#F59E0B"
          subtext="Requires approval"
        />
        <StatCard
          title="Upcoming Appointments"
          value={stats.upcomingCount || 12}
          icon={UserCheck}
          color="#0284C7"
          subtext="Next 7 days"
        />
        <StatCard
          title="Completed"
          value={stats.completedCount || 42}
          icon={CheckCircle2}
          color="#10B981"
          subtext="This month"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelledCount || 4}
          icon={XCircle}
          color="#EF4444"
          subtext="Total cancelled"
        />
      </div>

      {/* Main Grid: Pending Requests + Analytics */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {/* Pending Appointment Requests */}
        <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} color="#F59E0B" />
              <h2 className="text-[1.1rem] font-semibold text-[#102A43] m-0">Pending Requests</h2>
            </div>
            <span className="text-xs bg-[#FEF3C7] text-[#B45309] font-semibold px-2.5 py-0.8 rounded-full">
              {pendingRequests.length} Pending
            </span>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 px-4 text-[#64748B]">
              <CheckCircle2 size={36} color="#10B981" className="mx-auto mb-2" />
              <p className="font-medium m-0">No pending requests!</p>
              <span className="text-xs">You're all caught up with appointment approvals.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-[0.85rem]">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg p-4"
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-[#102A43] text-[0.925rem]">{req.patientName}</span>
                    <span className="text-xs text-[#64748B]">{req.id}</span>
                  </div>
                  <div className="text-xs text-[#64748B] flex gap-3 mb-2">
                    <span>Age: <strong>{req.patientAge}</strong></span>
                    <span>•</span>
                    <span>Date: <strong>{req.date}</strong></span>
                    <span>•</span>
                    <span>Time: <strong>{req.time}</strong></span>
                  </div>
                  <p className="text-[0.8125rem] text-[#102A43] bg-white p-[0.4rem_0.6rem] rounded border border-[#E2E8F0] mb-3">
                    <strong>Reason:</strong> {req.reason}
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setRejectModalId(req.id)}
                      className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#EF4444] bg-[#EF4444] text-white hover:bg-[#DC2626] hover:border-[#DC2626]"
                    >
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => acceptAppointment(req.id)}
                      className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#10B981] bg-[#10B981] text-white hover:bg-[#059669] hover:border-[#059669]"
                    >
                      <Check size={14} />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} color="#2490C9" />
              <h2 className="text-[1.1rem] font-semibold text-[#102A43] m-0">Dashboard Analytics</h2>
            </div>
            <span className="text-xs text-[#64748B]">This Week</span>
          </div>

          {/* Breakdown bars */}
          <div>
            <div className="text-[0.8125rem] font-semibold text-[#64748B] mb-3">
              Appointment Breakdown
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#102A43]">Confirmed & Upcoming</span>
                  <strong className="text-[#0369A1]">{stats.upcomingCount} (25%)</strong>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="w-[25%] h-full bg-[#2490C9]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#102A43]">Completed Consultation</span>
                  <strong className="text-[#047857]">{stats.completedCount} (65%)</strong>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-[#10B981]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#102A43]">Pending Requests</span>
                  <strong className="text-[#B45309]">{stats.pendingCount} (6%)</strong>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="w-[6%] h-full bg-[#F59E0B]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#102A43]">Cancelled / Rejected</span>
                  <strong className="text-[#B91C1C]">{stats.cancelledCount} (4%)</strong>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="w-[4%] h-full bg-[#EF4444]" />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Appointments Bar Representation */}
          <div className="border-t border-[#D9E6EC] pt-4">
            <div className="text-[0.8125rem] font-semibold text-[#64748B] mb-3.5">
              Weekly Consultations Overview
            </div>
            <div className="flex items-end justify-between h-[110px] px-2">
              {[
                { day: 'Mon', count: 6, h: '60%' },
                { day: 'Tue', count: 9, h: '90%' },
                { day: 'Wed', count: 7, h: '70%' },
                { day: 'Thu', count: 8, h: '80%' },
                { day: 'Fri', count: 10, h: '100%' },
                { day: 'Sat', count: 4, h: '40%' }
              ].map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[0.7rem] font-semibold text-[#2490C9]">{item.count}</span>
                  <div
                    style={{ height: item.h }}
                    className="w-6 bg-[#2490C9] rounded-t transition-[height] duration-300 ease-in-out"
                  />
                  <span className="text-xs text-[#64748B] font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments Table Section */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h2 className="text-[1.15rem] font-semibold text-[#102A43] m-0">Today's Appointments</h2>
            <span className="text-xs text-[#64748B]">Schedule for 23 August 2026</span>
          </div>

          <Link
            to="/doctor/appointments"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC] hover:border-[#CBD5E1]"
          >
            <span>View All Appointments</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="w-full overflow-x-auto bg-white border border-[#D9E6EC] rounded-[10px]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#F4F9FC] text-[#64748B] font-semibold border-b border-[#D9E6EC]">
                <th className="px-4 py-3 whitespace-nowrap">Patient Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Time</th>
                <th className="px-4 py-3 whitespace-nowrap">Department</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((app) => (
                <tr key={app.id} className="border-b border-[#D9E6EC] last:border-b-0 hover:bg-[#F4F9FC] transition-colors">
                  <td className="px-4 py-[0.85rem] align-middle">
                    <div className="font-semibold text-[#102A43]">{app.patientName}</div>
                    <div className="text-xs text-[#64748B]">{app.id} • Age {app.patientAge}</div>
                  </td>
                  <td className="px-4 py-[0.85rem] align-middle">
                    <div className="flex items-center gap-1.5 font-medium text-[#102A43]">
                      <Clock size={14} color="#2490C9" />
                      <span>{app.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-[0.85rem] align-middle text-[#102A43]">{app.department}</td>
                  <td className="px-4 py-[0.85rem] align-middle">
                    <Badge status={app.status} />
                  </td>
                  <td className="px-4 py-[0.85rem] align-middle text-right">
                    <div className="flex gap-1.5 justify-end">
                      {app.status === 'Pending' ? (
                        <button
                          onClick={() => acceptAppointment(app.id)}
                          className="inline-flex items-center justify-center gap-2 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
                        >
                          Review
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/doctor/appointments/${app.id}`)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC] hover:border-[#CBD5E1]"
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Confirmation Modal */}
      <Modal
        isOpen={!!rejectModalId}
        onClose={() => setRejectModalId(null)}
        title="Reject Appointment Request"
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
              Confirm Rejection
            </button>
          </>
        }
      >
        <p className="text-sm text-[#102A43] mb-4">
          Are you sure you want to reject appointment <strong>{rejectModalId}</strong>?
        </p>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-medium text-[#102A43]">Reason for rejection (Optional):</label>
          <input
            type="text"
            className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
            placeholder="e.g. Doctor attending emergency duty"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
