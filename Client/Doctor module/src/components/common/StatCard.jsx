import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = '#2490C9', subtext }) => {
  return (
    <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-[1.15rem] flex items-center justify-between shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
      <div>
        <span className="text-[0.8125rem] text-[#64748B] font-medium">{title}</span>
        <div className="text-[1.65rem] font-bold text-[#102A43] mt-[0.2rem]">{value}</div>
        {subtext && <div className="text-xs text-[#64748B] mt-[0.2rem]">{subtext}</div>}
      </div>
      {Icon && (
        <div className="w-[44px] h-[44px] rounded-[6px] bg-[#E6F4FA] flex items-center justify-center" style={{ color: color }}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
