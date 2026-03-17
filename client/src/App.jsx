import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import LeandingPage from './pages/LeandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterViewPrep from './pages/InterViewPrep/InterViewPrep';
import { Toaster } from 'react-hot-toast';
import UserProvider from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <div>
        <>
          <Routes>
            <Route path="/" element={<LeandingPage />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId" element={<InterViewPrep />} />
          </Routes>
        </>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: '13px',
            },
          }}
        />
      </div>
    </UserProvider>
  );
}
