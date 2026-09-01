import React from 'react';
import { useDoctor } from '../../context/DoctorContext';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useDoctor();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} color="#10B981" />;
      case 'danger':
        return <XCircle size={18} color="#EF4444" />;
      case 'warning':
        return <AlertCircle size={18} color="#F59E0B" />;
      default:
        return <Info size={18} color="#2490C9" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-[#10B981]';
      case 'danger':
        return 'border-l-[#EF4444]';
      case 'warning':
        return 'border-l-[#F59E0B]';
      default:
        return 'border-l-[#2490C9]';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-[0.6rem] max-w-[380px] w-full">
      {toasts.map((toast, idx) => (
        <div
          key={toast.id ? `${toast.id}_${idx}` : `toast_${idx}`}
          className={`bg-white border-l-4 ${getBorderColor(
            toast.type
          )} shadow-[0_10px_15px_-3px_rgba(16,42,67,0.1),0_4px_6px_-2px_rgba(16,42,67,0.05)] rounded-[6px] px-4 py-[0.85rem] flex items-center justify-between gap-3 animate-fade-in`}
        >
          <div className="flex items-center gap-[0.6rem] text-sm text-[#102A43] font-medium">
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="bg-transparent border-0 cursor-pointer text-[#64748B] flex p-0.8 hover:text-[#102A43] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
