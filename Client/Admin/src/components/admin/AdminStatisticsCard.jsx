import React from 'react';

export default function AdminStatisticsCard({ title, value, subtext, icon: Icon, iconBgColor = "bg-med-light-blue", iconColor = "text-med-blue" }) {
  return (
    <div className="flex items-center justify-between p-6 bg-white border border-med-border rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-med-blue/40 transition-all duration-200 ease-out cursor-pointer">
      <div className="space-y-1 min-w-0">
        <span className="text-xs font-bold text-med-gray tracking-wider uppercase">{title}</span>
        <h3 className="text-3xl font-extrabold text-med-navy">{value}</h3>
        <p className="text-xs text-med-gray truncate font-medium">{subtext}</p>
      </div>
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconBgColor} ${iconColor} flex-shrink-0 ml-4`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
