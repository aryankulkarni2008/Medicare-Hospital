import React, { useState, useEffect } from 'react';
import { useDoctor } from '../context/DoctorContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  RefreshCw,
  Lock,
  Unlock,
  Sparkles,
} from 'lucide-react';
import Badge from '../components/common/Badge';

const TIME_OPTIONS = [
  '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
  '10:00 PM'
];

export const DoctorAvailability = () => {
  const {
    weeklySchedule,
    slotDuration,
    isAvailabilityLoading,
    saveAvailabilityToDatabase,
    getSimulationSlotsForDay,
    toggleSlotStatus,
  } = useDoctor();

  // Local editable copy of the weekly schedule
  const [schedule, setSchedule] = useState([...weeklySchedule]);
  const [duration, setDuration] = useState(slotDuration);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Selected day for Slot Availability Simulation
  const [simulationDay, setSimulationDay] = useState('Monday');

  // Sync with context weeklySchedule when loaded
  useEffect(() => {
    if (weeklySchedule && weeklySchedule.length > 0) {
      setSchedule(JSON.parse(JSON.stringify(weeklySchedule)));
      // Set default simulation day to first available day
      const firstAvailable = weeklySchedule.find((d) => d.available);
      if (firstAvailable) {
        setSimulationDay(firstAvailable.day);
      }
    }
  }, [weeklySchedule]);

  useEffect(() => {
    if (slotDuration) {
      setDuration(slotDuration);
    }
  }, [slotDuration]);

  // Handle Day checkbox toggle
  const handleDayToggle = (dayName) => {
    setSchedule((prev) =>
      prev.map((dayItem) => {
        if (dayItem.day === dayName) {
          const nextAvailable = !dayItem.available;
          // If turning on and no slots exist, add a default 09:00 AM - 01:00 PM slot
          let updatedSlots = dayItem.slots || [];
          if (nextAvailable && updatedSlots.length === 0) {
            updatedSlots = [{ startTime: '09:00 AM', endTime: '01:00 PM' }];
          }
          return { ...dayItem, available: nextAvailable, slots: updatedSlots };
        }
        return dayItem;
      })
    );
  };

  // Add a new time slot to a specific day
  const handleAddSlot = (dayName) => {
    setSchedule((prev) =>
      prev.map((dayItem) => {
        if (dayItem.day === dayName) {
          const currentSlots = dayItem.slots || [];
          // Pick sensible default for next slot
          let newStartTime = '02:00 PM';
          let newEndTime = '06:00 PM';
          if (currentSlots.length > 0) {
            const lastEnd = currentSlots[currentSlots.length - 1].endTime;
            newStartTime = lastEnd;
            newEndTime = '08:00 PM';
          }
          return {
            ...dayItem,
            available: true,
            slots: [...currentSlots, { startTime: newStartTime, endTime: newEndTime }],
          };
        }
        return dayItem;
      })
    );
  };

  // Remove a time slot from a day
  const handleRemoveSlot = (dayName, slotIndex) => {
    setSchedule((prev) =>
      prev.map((dayItem) => {
        if (dayItem.day === dayName) {
          const updatedSlots = dayItem.slots.filter((_, idx) => idx !== slotIndex);
          return {
            ...dayItem,
            available: updatedSlots.length > 0 ? dayItem.available : false,
            slots: updatedSlots,
          };
        }
        return dayItem;
      })
    );
  };

  // Update start or end time for a specific slot
  const handleSlotTimeChange = (dayName, slotIndex, field, value) => {
    setSchedule((prev) =>
      prev.map((dayItem) => {
        if (dayItem.day === dayName) {
          const updatedSlots = dayItem.slots.map((s, idx) => {
            if (idx === slotIndex) {
              return { ...s, [field]: value };
            }
            return s;
          });
          return { ...dayItem, slots: updatedSlots };
        }
        return dayItem;
      })
    );
  };

  // Save to MongoDB
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    const res = await saveAvailabilityToDatabase(schedule, duration);
    setIsSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 6000);
    } else {
      setSaveError(res.message || 'Unable to save availability. Please try again.');
    }
  };

  // Available days list for simulation selector
  const activeDays = schedule.filter((d) => d.available);

  // Simulation slots for the selected preview day
  const simulatedSlots = getSimulationSlotsForDay(simulationDay);

  if (isAvailabilityLoading) {
    return (
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-12 text-center shadow-xs">
        <RefreshCw className="w-8 h-8 text-[#2490C9] animate-spin mx-auto mb-3" />
        <h3 className="text-base font-bold text-[#102A43]">Loading availability...</h3>
        <p className="text-xs text-[#64748B] mt-1">Fetching your configured schedule from MongoDB.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[1.75rem]">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-[1.5rem_1.75rem] border border-[#D9E6EC] flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div>
          <h1 className="text-[1.4rem] font-bold text-[#102A43] mb-1">
            Doctor Availability
          </h1>
          <p className="text-[#64748B] text-sm m-0">
            Manage your working days and appointment time slots.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-[1.25rem] py-[0.6rem] text-sm font-semibold rounded-[8px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E] shadow-sm disabled:opacity-50"
        >
          <Save size={16} />
          <span>{isSaving ? 'Saving...' : 'Save Availability'}</span>
        </button>
      </div>

      {/* Success Alert Banner */}
      {saveSuccess && (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-4 flex items-center gap-3 text-[#065F46] shadow-xs animate-in fade-in duration-300">
          <CheckCircle2 size={20} className="text-[#10B981] shrink-0" />
          <div>
            <h4 className="text-sm font-bold m-0">✓ Availability Saved Successfully</h4>
            <p className="text-xs text-[#047857] m-0 mt-0.5">Your availability has been updated in MongoDB.</p>
          </div>
        </div>
      )}

      {/* Error Alert Banner */}
      {saveError && (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-center gap-3 text-[#991B1B] shadow-xs">
          <AlertCircle size={20} className="text-[#EF4444] shrink-0" />
          <div>
            <h4 className="text-sm font-bold m-0">Unable to Save Availability</h4>
            <p className="text-xs text-[#B91C1C] m-0 mt-0.5">{saveError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Working Days Selection & Time Schedule Config (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Working Days Checkbox List */}
          <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
            <h2 className="text-[1.05rem] font-bold text-[#102A43] mb-4 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2 m-0">
              <Calendar size={18} color="#2490C9" />
              <span>Working Days</span>
            </h2>

            <p className="text-xs text-[#64748B] mb-3">
              Select the days of the week when you are available for patient consultations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {schedule.map((dayItem) => (
                <label
                  key={dayItem.day}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${
                    dayItem.available
                      ? 'bg-[#E6F4FA] border-[#2490C9]/40 shadow-xs'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={dayItem.available}
                      onChange={() => handleDayToggle(dayItem.day)}
                      className="w-4 h-4 accent-[#2490C9] rounded cursor-pointer"
                    />
                    <span
                      className={`font-semibold text-sm ${
                        dayItem.available ? 'text-[#102A43]' : 'text-[#64748B]'
                      }`}
                    >
                      {dayItem.day}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      dayItem.available
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : 'bg-slate-100 text-[#94A3B8]'
                    }`}
                  >
                    {dayItem.available ? 'Active' : 'Off'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Schedule for Active Days */}
          <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
            <div className="flex justify-between items-center mb-4 border-b border-[#D9E6EC] pb-2.5">
              <h2 className="text-[1.05rem] font-bold text-[#102A43] flex items-center gap-2 m-0">
                <Clock size={18} color="#2490C9" />
                <span>Time Schedule per Day</span>
              </h2>

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-[#64748B]">Slot Duration:</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="px-2.5 py-1 text-xs text-[#102A43] bg-[#F4F9FC] border border-[#D9E6EC] rounded-[6px] outline-none font-semibold focus:border-[#2490C9]"
                >
                  <option value={15}>15 mins</option>
                  <option value={30}>30 mins (Default)</option>
                  <option value={45}>45 mins</option>
                  <option value={60}>60 mins</option>
                </select>
              </div>
            </div>

            {activeDays.length === 0 ? (
              <div className="text-center py-8 text-[#64748B] bg-[#F8FAFC] rounded-lg border border-dashed border-[#CBD5E1]">
                <Calendar size={32} className="mx-auto mb-2 text-[#94A3B8]" />
                <p className="text-sm font-semibold text-[#102A43]">No Working Days Selected</p>
                <p className="text-xs">Select at least one day above to configure consultation hours.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {schedule
                  .filter((d) => d.available)
                  .map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg p-4 transition-all"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                          <span className="font-bold text-[#102A43] text-sm">
                            {dayItem.day}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddSlot(dayItem.day)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2490C9] bg-white border border-[#D9E6EC] px-2.5 py-1 rounded hover:bg-[#E6F4FA] transition-colors"
                        >
                          <Plus size={13} />
                          <span>Add Slot</span>
                        </button>
                      </div>

                      {/* Slots list for this day */}
                      <div className="flex flex-col gap-2">
                        {dayItem.slots.map((slot, sIdx) => (
                          <div
                            key={`${dayItem.day}_slot_${sIdx}_${slot.startTime}_${slot.endTime}`}
                            className="flex items-center gap-2 sm:gap-3 bg-white p-2.5 rounded-md border border-[#D9E6EC]"
                          >
                            <div className="flex-1 flex items-center gap-2">
                              <span className="text-xs text-[#64748B] font-medium shrink-0">From</span>
                              <select
                                value={slot.startTime}
                                onChange={(e) =>
                                  handleSlotTimeChange(dayItem.day, sIdx, 'startTime', e.target.value)
                                }
                                className="w-full text-xs p-1.5 bg-[#F8FAFC] border border-[#D9E6EC] rounded text-[#102A43] font-semibold focus:outline-none focus:border-[#2490C9]"
                              >
                                {TIME_OPTIONS.map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <span className="text-xs text-[#64748B] font-bold">→</span>

                            <div className="flex-1 flex items-center gap-2">
                              <span className="text-xs text-[#64748B] font-medium shrink-0">To</span>
                              <select
                                value={slot.endTime}
                                onChange={(e) =>
                                  handleSlotTimeChange(dayItem.day, sIdx, 'endTime', e.target.value)
                                }
                                className="w-full text-xs p-1.5 bg-[#F8FAFC] border border-[#D9E6EC] rounded text-[#102A43] font-semibold focus:outline-none focus:border-[#2490C9]"
                              >
                                {TIME_OPTIONS.map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {dayItem.slots.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSlot(dayItem.day, sIdx)}
                                title="Remove time slot"
                                className="p-1.5 text-[#EF4444] hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Slot Availability Simulation (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] sticky top-20">
            <div className="flex justify-between items-center mb-4 border-b border-[#D9E6EC] pb-2.5">
              <div>
                <h2 className="text-[1.05rem] font-bold text-[#102A43] flex items-center gap-2 m-0">
                  <Sparkles size={18} color="#2490C9" />
                  <span>Slot Availability Simulation</span>
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Interactive preview of generated slots. Click to simulate booking.
                </p>
              </div>
            </div>

            {/* Simulation Day Picker */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                Preview Day:
              </label>
              <select
                value={simulationDay}
                onChange={(e) => setSimulationDay(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#F4F9FC] border border-[#D9E6EC] rounded-lg text-[#102A43] font-semibold focus:outline-none focus:border-[#2490C9]"
              >
                {schedule.map((d) => (
                  <option key={d.day} value={d.day}>
                    {d.day} {d.available ? '(Available)' : '(Off Day)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Simulated Slots Grid */}
            {simulatedSlots.length === 0 ? (
              <div className="text-center py-8 text-[#64748B] bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <Clock size={28} className="mx-auto mb-2 text-[#94A3B8]" />
                <p className="text-xs font-semibold text-[#102A43]">
                  No slots generated for {simulationDay}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  {schedule.find((d) => d.day === simulationDay)?.available
                    ? 'No valid slot ranges defined.'
                    : 'This day is marked as Off Day.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-[#64748B] px-1">
                  <span>Generated ({simulatedSlots.length} slots • {duration}m each)</span>
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Booked
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {simulatedSlots.map((slot, idx) => (
                    <div
                      key={`sim_${simulationDay}_${slot.time}_${idx}`}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        slot.isBooked
                          ? 'bg-[#FEF2F2] border-[#FECACA]'
                          : 'bg-[#F0FDF4] border-[#BBF7D0]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#102A43]">{slot.time}</div>
                      <div className="mt-1">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            slot.isBooked
                              ? 'bg-[#FEE2E2] text-[#991B1B]'
                              : 'bg-[#DCFCE7] text-[#166534]'
                          }`}
                        >
                          {slot.isBooked ? 'BOOKED' : 'AVAILABLE'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSlotStatus(slot.time)}
                        className={`mt-2 w-full py-1 text-[10px] font-semibold rounded border transition-all flex items-center justify-center gap-1 ${
                          slot.isBooked
                            ? 'bg-white text-[#102A43] border-[#D9E6EC] hover:bg-slate-50'
                            : 'bg-[#2490C9] text-white border-[#2490C9] hover:bg-[#126B9E]'
                        }`}
                      >
                        {slot.isBooked ? (
                          <>
                            <Unlock size={10} />
                            <span>Set Available</span>
                          </>
                        ) : (
                          <>
                            <Lock size={10} />
                            <span>Simulate Booking</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#E6F4FA] rounded-lg border border-[#BEE3F8] text-[11px] text-[#0C4A6E]">
                  💡 <strong>Simulation Note:</strong> Toggling slots here previews how patient bookings appear. This preview is local and does not create real patient appointments in MongoDB.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
