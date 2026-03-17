import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstanse';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input/Input';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!pass) {
      setError('Please enter the password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password: pass,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md p-10 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-white">Login</h2>

      <p className="text-center text-gray-400 mt-2 mb-8 text-sm">Enter your email and password</p>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="example@email.com"
          type="text"
        />

        <Input
          value={pass}
          onChange={({ target }) => setPass(target.value)}
          label="Password"
          placeholder="Enter password"
          type="password"
        />

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold text-white"
        >
          Login
        </button>

        {/* Signup */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentPage('signup')}
            className="text-cyan-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
