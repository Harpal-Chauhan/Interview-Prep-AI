import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="mb-6 w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-300 mb-2">{label} </label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPass ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full px-4 py-3 pr-12 rounded-xl
  bg-slate-900/70
  text-gray-200
  placeholder-gray-500
  border border-slate-700
  backdrop-blur-md
  shadow-inner
  transition-all duration-300
  focus:border-cyan-400
  focus:ring-2 focus:ring-cyan-400/30
  focus:bg-slate-900
  outline-none"
        />

        {/* Eye Button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPass}
            className="absolute right-3 top-1/2 -translate-y-1/2
    flex items-center justify-center
    w-9 h-9 rounded-lg
    text-gray-400
    hover:text-cyan-400
    hover:bg-slate-800
    transition"
          >
            {showPass ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
export default Input;
