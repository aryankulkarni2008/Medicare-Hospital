import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#102A43]/40 flex items-center justify-center z-[100] p-4 backdrop-blur-[2px]" onClick={onClose}>
      <div className="bg-white rounded-[10px] border border-[#D9E6EC] w-full max-w-[540px] shadow-[0_8px_24px_rgba(16,42,67,0.12)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-[#D9E6EC] flex items-center justify-between">
          <h3 className="m-0 text-[1.1rem] font-semibold text-[#102A43]">{title}</h3>
          <button
            onClick={onClose}
            className="bg-transparent border-0 cursor-pointer text-[#64748B] p-1 flex rounded hover:text-[#102A43] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-[#D9E6EC] flex justify-end gap-3 bg-[#F4F9FC]">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
