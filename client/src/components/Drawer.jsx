import React from 'react';
import { LuX } from 'react-icons/lu';

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] w-full md:w-[420px] xl:w-[480px]
        bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        border-l border-gray-200
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top Accent */}
        <div className="h-[4px] rounded-t-md bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-md"></div>

        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between
        px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200"
        >
          <h5 className="text-lg font-bold text-indigo-600 tracking-tight">{title}</h5>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg
            hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto h-[calc(100%-70px)] scroll-smooth space-y-4">
          <div className="space-y-6">
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50
        border-l-4 border-indigo-400 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
