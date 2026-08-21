import React from 'react';
import { User, Stethoscope, ShieldCheck } from 'lucide-react';

export default function AuthRoleTabs({ selectedRole, setSelectedRole }) {
  const roles = [
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'admin', label: 'Admin', icon: ShieldCheck }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 p-1 bg-[#E6F4FA] rounded-lg border border-[#D9E6EC]">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = selectedRole === role.id;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-[#2490C9] text-white shadow-sm'
                : 'text-[#102A43] hover:bg-[#D9E6EC] hover:text-[#126B9E]'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}