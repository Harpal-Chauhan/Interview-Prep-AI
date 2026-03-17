import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstanse';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    topicsToFocus: '',
    experience: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, topicsToFocus, experience } = formData;

    if (!role || !topicsToFocus || !experience) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        topicsToFocus,
        experience,
        numberOfQuestions: 10,
      });

      // Should be arry like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-5">
        <h3 className="text-xl font-semibold text-white mb-1">Start a New Interview Journey</h3>

        <p className="text-gray-400 mb-4 text-xs">
          Fill out a few quick details and unlock your personalized set of interview questions.
        </p>

        <form onSubmit={handleCreateSession} className="space-y-3">
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange('role', target.value)}
            label="Target Role"
            placeholder="e.g. Software Engineer"
            type="text"
            required
          />

          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange('experience', target.value)}
            label="Years of Experience"
            placeholder="e.g. 1 year, 3 years, 5+ years"
            type="text"
            required
          />

          <Input
            value={formData.topicsToFocus}
            onChange={({ target }) => handleChange('topicsToFocus', target.value)}
            label="Topics to Focus On"
            placeholder="e.g. React, Node.js, System Design"
            type="text"
            required
          />

          <Input
            value={formData.description}
            onChange={({ target }) => handleChange('description', target.value)}
            label="Description"
            placeholder="Any goals or notes for this session"
            type="text"
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full mt-1 bg-gradient-to-r from-indigo-500 to-purple-600 
        text-white py-2 rounded-lg font-medium 
        hover:scale-[1.02] hover:shadow-lg 
        transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? <SpinnerLoader /> : 'Create Session'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
