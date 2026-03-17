import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard">
          <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
            Interview Prep AI
          </h2>
        </Link>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          {/* Assuming username inside ProfileInfoCard */}
          <div className="text-sm font-medium text-gray-700">
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
