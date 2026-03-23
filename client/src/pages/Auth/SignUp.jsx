import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstanse';
import uploadImage from '../../utils/uploadImage';
import Input from '../../components/Input/Input';

const SignUp = ({ setCurrentPage }) => {
  const [profilPic, setProfilPic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError('Please enter full name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (!pass) {
      setError('Please enter password.');
      return;
    }

    setError('');

    try {
      if (profilPic) {
        const imgUploadRes = await uploadImage(profilPic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password: pass,
        profileImageUrl
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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-6">
      <div className="w-full max-w-sm p-6 rounded-xl bg-slate-900 border border-slate-700 shadow-lg">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">Create Account</h2>

        <p className="text-center text-gray-400 mt-1 mb-5 text-sm">Enter your details to sign up</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex justify-center">
            <ProfilePhotoSelector image={profilPic} setImage={setProfilPic} />
          </div>

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Your name"
            type="text"
          />

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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold text-white"
          >
            Create Account
          </button>

          <p className="text-center text-gray-400 text-sm mt-2">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('login')}
              className="text-cyan-400 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
