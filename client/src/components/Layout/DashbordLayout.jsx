import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

function DashbordLayout({ children }) {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Animated Blobs */}
      <div className="absolute top-70 left-10 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-blob"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-blob"></div>

      <div className="absolute top-40 right-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-blob"></div>

      <Navbar />

      {user && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default DashbordLayout;
