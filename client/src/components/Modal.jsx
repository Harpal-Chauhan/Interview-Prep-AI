import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl w-120 relative shadow-2xl">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
