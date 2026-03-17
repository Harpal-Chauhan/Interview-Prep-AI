import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import iv from '../assets/iv.png';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

export default function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setopenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const isLoggedIn = !!localStorage.getItem('token');
  const buttonText = isLoggedIn ? 'Go to Dashboard' : 'Login Now';
  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setopenAuthModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        {/* HEADER */}
        <header className="flex justify-between items-center px-10 py-6 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="text-4xl relative">
              <div className="absolute inset-0 blur-xl bg-cyan-400 opacity-60 animate-pulse rounded-full"></div>
              <span className="relative">🤖</span>
            </div>

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Interview Prep AI
            </h1>
          </div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              onClick={() => setopenAuthModal(true)}
              className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition shadow-lg shadow-purple-500/30"
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* HERO */}
        <section className="grid md:grid-cols-2 items-center px-10 mt-20 gap-10">
          <div>
            <span className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-6 py-2 rounded-full font-semibold mb-6">
              🚀 AI Powered
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Smarter Practice.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Stronger Interview Results
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-lg">
              Practice interview questions, get AI-powered feedback, and track your progress to
              become interview ready faster.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTA}
              className="mt-8 px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-cyan-500 to-purple-600 shadow-xl hover:shadow-purple-500/40 transition"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </motion.button>
          </div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={iv}
              alt="AI Interview"
              className="w-full max-w-md rounded-3xl shadow-2xl shadow-purple-500/20"
            />
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="px-10 py-28">
          <h2
            className="text-4xl font-extrabold text-center mb-16
bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400
bg-clip-text text-transparent"
          >
            How Interview Prep AI Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-4">🎯</div>

              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Choose Your Role</h3>

              <p className="text-gray-400">
                Select the role you want to prepare for like Frontend, Backend or Full Stack.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:scale-105 transition">
              <div className="text-5xl mb-4">💻</div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Practice AI Questions</h3>

              <p className="text-gray-400">
                Get role-specific interview questions generated instantly by AI.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:scale-105 transition">
              <div className="text-5xl mb-4">📈</div>

              <h3 className="text-xl font-semibold mb-3 text-indigo-400">Improve Your Skills</h3>

              <p className="text-gray-400">
                Receive feedback, track progress and become interview ready faster.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="px-10 mt-20 pb-24">
          <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Why Choose Interview Prep AI?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">🤖 Smart AI Questions</h3>

              <p className="text-gray-400">
                Generate interview questions based on your role and experience level instantly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105 transition shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">🎯 Instant Feedback</h3>

              <p className="text-gray-400">
                Receive AI-powered suggestions to improve your answers and communication skills.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105 transition shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                📊 Performance Tracking
              </h3>

              <p className="text-gray-400">
                Track your interview preparation progress and identify areas to improve.
              </p>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-24 bg-white/5 backdrop-blur-md">
          <h2
            className="text-4xl font-extrabold text-center mb-16
bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400
bg-clip-text text-transparent"
          >
            Platform Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h2 className="text-5xl font-bold text-cyan-400 drop-shadow-lg">10K+</h2>
              <p className="text-gray-400 mt-2">Students Practicing</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-purple-400 drop-shadow-lg">5K+</h2>
              <p className="text-gray-400 mt-2">Interview Questions</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-indigo-400 drop-shadow-lg">95%</h2>
              <p className="text-gray-400 mt-2">Success Rate</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-10 py-28">
          <h2
            className="text-4xl font-extrabold text-center mb-16
bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400
bg-clip-text text-transparent"
          >
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
              <p className="text-gray-300">
                "This platform helped me crack my first frontend developer interview!"
              </p>

              <h4 className="mt-5 font-semibold text-cyan-400">— Rahul Sharma</h4>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
              <p className="text-gray-300">
                "The AI feedback feature improved my answers and confidence."
              </p>

              <h4 className="mt-5 font-semibold text-purple-400">— Priya Patel</h4>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
              <p className="text-gray-300">"Best interview preparation tool I have used so far."</p>

              <h4 className="mt-5 font-semibold text-indigo-400">— Aman Verma</h4>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          className="py-28 text-center
bg-gradient-to-r from-cyan-500 to-purple-600"
        >
          <h2 className="text-4xl font-extrabold mb-6">🚀 Start Your Interview Journey Today</h2>

          <p className="text-lg mb-8 text-white/90">
            Practice smarter and get hired faster with AI-powered interview preparation.
          </p>

          <button
            onClick={handleCTA}
            className="bg-white text-black shadow-xl hover:shadow-2xl px-10 py-4 rounded-2xl
  font-semibold hover:scale-105 transition"
          >
            {buttonText}
          </button>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-6 border-t border-white/10 text-gray-400">
          © 2026 Interview Prep AI | Built with ❤️ by Harpal Chauhan
        </footer>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setopenAuthModal(false);
          setCurrentPage('login');
        }}
        hideHeader
      >
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}

        {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
}
