import React, { useState } from 'react';
import { useDoctor } from '../context/DoctorContext';
import { Calendar, Clock, Check, Coffee, Save, RefreshCw, Lock, Unlock } from 'lucide-react';
import Badge from '../components/common/Badge';

export const DoctorAvailability = () => {
  const { availability, updateAvailability, getGeneratedSlots, toggleSlotStatus } = useDoctor();

  const [days, setDays] = useState({ ...availability.days });
  const [workHours, setWorkHours] = useState({ ...availability.workHours });
  const [breakTime, setBreakTime] = useState({ ...availability.breakTime });
  const [slotDuration, setSlotDuration] = useState(availability.slotDuration);

  const handleDayToggle = (dayName) => {
    setDays((prev) => ({ ...prev, [dayName]: !prev[dayName] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateAvailability({
      days,
      workHours,
      breakTime,
      slotDuration
    });
  };

  const currentSlots = getGeneratedSlots();

  return (
    <div className="flex flex-col gap-[1.75rem]">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-[1.5rem_1.75rem] border border-[#D9E6EC] flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div>
          <h1 className="text-[1.4rem] font-bold text-[#102A43] mb-1">
            Manage Availability
          </h1>
          <p className="text-[#64748B] text-sm m-0">
            Configure your clinic consultation days, working hours, break schedules, and slot duration.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
          onClick={handleSave}
        >
          <Save size={16} />
          <span>Save Availability</span>
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {/* Working Days & Schedule Configuration */}
        <div className="flex flex-col gap-6">
          {/* Days Selection Card */}
          <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
            <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-4 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2 m-0">
              <Calendar size={18} color="#2490C9" />
              <span>Working Days</span>
            </h2>

            <div className="flex flex-col gap-[0.6rem]">
              {Object.keys(days).map((day) => (
                <label
                  key={day}
                  className={`flex items-center justify-between p-[0.65rem_0.85rem] rounded-lg cursor-pointer transition-all border ${
                    days[day]
                      ? 'bg-[#E6F4FA] border-[#BEE3F8]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <span className={`font-semibold text-[0.9rem] ${days[day] ? 'text-[#102A43]' : 'text-[#64748B]'}`}>
                    {day}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={days[day]}
                      onChange={() => handleDayToggle(day)}
                      className="w-[18px] h-[18px] accent-[#2490C9] cursor-pointer"
                    />
                    <span className={`text-xs font-semibold ${days[day] ? 'text-[#047857]' : 'text-[#B91C1C]'}`}>
                      {days[day] ? '✓ Available' : '✕ Off Day'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Hours & Duration Configuration Card */}
          <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
            <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-4 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2 m-0">
              <Clock size={18} color="#2490C9" />
              <span>Working Hours & Break</span>
            </h2>

            {/* Working Hours */}
            <div className="mb-5">
              <div className="text-[0.85rem] font-semibold text-[#102A43] mb-2.5">
                Shift Consultation Hours
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#102A43]">From</label>
                  <select
                    className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                    value={workHours.from}
                    onChange={(e) => setWorkHours({ ...workHours, from: e.target.value })}
                  >
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="08:30 AM">08:30 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#102A43]">To</label>
                  <select
                    className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                    value={workHours.to}
                    onChange={(e) => setWorkHours({ ...workHours, to: e.target.value })}
                  >
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Break Time */}
            <div className="mb-5">
              <div className="text-[0.85rem] font-semibold text-[#102A43] mb-2.5 flex items-center gap-1.5">
                <Coffee size={15} color="#64748B" />
                <span>Doctor Break Interval</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#102A43]">Break Start</label>
                  <select
                    className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                    value={breakTime.from}
                    onChange={(e) => setBreakTime({ ...breakTime, from: e.target.value })}
                  >
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#102A43]">Break End</label>
                  <select
                    className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                    value={breakTime.to}
                    onChange={(e) => setBreakTime({ ...breakTime, to: e.target.value })}
                  >
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Slot Duration */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#102A43]">Consultation Slot Duration</label>
              <select
                className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                value={slotDuration}
                onChange={(e) => setSlotDuration(e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes (Default)</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Automatic Slot Preview & Real-Time Availability Simulation */}
        <div className="flex flex-col gap-6">
          {/* Automatic Slot Preview Box */}
          <div className="bg-[#E6F4FA] border border-[#C3E2F3] rounded-[10px] p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-[#102A43] m-0">
                  Generated Appointment Slots
                </h2>
                <span className="text-xs text-[#64748B]">
                  Automatic preview for {workHours.from} – {workHours.to} ({slotDuration}m slots)
                </span>
              </div>
              <RefreshCw size={16} color="#2490C9" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[0.65rem]">
              {currentSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-[0.65rem_0.75rem] text-center border ${
                    slot.isBreak
                      ? 'bg-[#F1F5F9] border-[#CBD5E1] opacity-75'
                      : slot.status === 'Booked'
                      ? 'bg-[#FEE2E2] border-[#FCA5A5]'
                      : 'bg-white border-[#A7F3D0]'
                  }`}
                >
                  <div className={`font-bold text-sm ${slot.isBreak ? 'text-[#64748B]' : 'text-[#102A43]'}`}>
                    {slot.time}
                  </div>
                  <div className="mt-1">
                    {slot.isBreak ? (
                      <span className="text-[0.725rem] font-semibold text-[#475569]">☕ Break</span>
                    ) : (
                      <Badge status={slot.status} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slot Availability Preview Table */}
          <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-[#102A43] m-0">
                  Slot Availability Simulation
                </h2>
                <span className="text-xs text-[#64748B]">
                  Monday — 24 August 2026 (Click slot row to toggle Booked / Available)
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto bg-white border border-[#D9E6EC] rounded-[10px]">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#F4F9FC] text-[#64748B] font-semibold border-b border-[#D9E6EC]">
                    <th className="px-4 py-3 whitespace-nowrap">Time Slot</th>
                    <th className="px-4 py-3 whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Interactive Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSlots.map((slot, idx) => (
                    <tr key={idx} className="border-b border-[#D9E6EC] last:border-b-0 hover:bg-[#F4F9FC] transition-colors">
                      <td className="px-4 py-[0.85rem] font-semibold text-[#102A43] align-middle">{slot.time}</td>
                      <td className="px-4 py-[0.85rem] align-middle">
                        <Badge status={slot.status} />
                      </td>
                      <td className="px-4 py-[0.85rem] align-middle text-right">
                        {slot.isBreak ? (
                          <span className="text-xs text-[#64748B] italic">Blocked Break</span>
                        ) : (
                          <button
                            onClick={() => toggleSlotStatus(slot.time)}
                            className={`inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border ${
                              slot.status === 'Available'
                                ? 'bg-white text-[#102A43] border-[#D9E6EC] hover:bg-[#F4F9FC]'
                                : 'bg-[#2490C9] text-white border-[#2490C9] hover:bg-[#126B9E]'
                            }`}
                          >
                            {slot.status === 'Available' ? (
                              <>
                                <Lock size={13} />
                                <span>Simulate Booking</span>
                              </>
                            ) : (
                              <>
                                <Unlock size={13} />
                                <span>Set Available</span>
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
