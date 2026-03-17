import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  return (
    user && (
      <div
        className="flex items-center justify-between
bg-white/5 backdrop-blur-lg
border border-white/10
rounded-xl px-4 py-2
shadow-md"
      >
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <img
            src={user?.profileImageUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-9 h-9 rounded-full 
      object-cover border border-cyan-400"
          />

          {/* Name + Logout (Vertical Compact) */}
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user?.name || 'Guest User'}
            </span>

            <button
              onClick={handleLogout}
              className="text-xs text-red-400 
        hover:text-red-500 
        hover:underline 
        transition duration-200 
        text-left w-fit"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ProfileInfoCard;
