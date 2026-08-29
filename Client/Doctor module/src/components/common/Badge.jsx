import React from 'react';

export const Badge = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  const baseClass = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize';

  switch (normalized) {
    case 'pending':
      return <span className={`${baseClass} bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]`}>🟡 Pending</span>;
    case 'confirmed':
      return <span className={`${baseClass} bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]`}>🔵 Confirmed</span>;
    case 'completed':
      return <span className={`${baseClass} bg-[#D1FAE5] text-[#047857] border border-[#A7F3D0]`}>🟢 Completed</span>;
    case 'cancelled':
      return <span className={`${baseClass} bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]`}>🔴 Cancelled</span>;
    case 'rejected':
      return <span className={`${baseClass} bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]`}>🔴 Rejected</span>;
    case 'available':
      return <span className={`${baseClass} bg-[#D1FAE5] text-[#047857] border border-[#A7F3D0]`}>🟢 Available</span>;
    case 'booked':
      return <span className={`${baseClass} bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]`}>🔒 Booked</span>;
    case 'break':
      return <span className={`${baseClass} bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]`}>☕ Break</span>;
    default:
      return <span className={baseClass}>{status}</span>;
  }
};

export default Badge;
