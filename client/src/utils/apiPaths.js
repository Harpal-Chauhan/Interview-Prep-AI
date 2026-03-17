
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// All API Endpoints
export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/auth/register', // Signup
    LOGIN: '/api/auth/login', // Login & get JWT
    GET_PROFILE: '/api/auth/profile', // Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: '/api/auth/upload-image', // Upload profile image
  },

  AI: {
    GENERATE_QUESTIONS: '/api/ai/generate-questions', // Generate interview questions
    GENERATE_EXPLANATION: '/api/ai/generate-explanation', // Generate concept explanation
  },

  SESSION: {
    CREATE: '/api/sessions/create', // Create new session
    GET_ALL: '/api/sessions/my-session', // Get all sessions
    GET_ONE: (id) => `/api/sessions/${id}`, // Get session details with questions
    DELETE: (id) => `/api/sessions/${id}`, // Delete session
  },

  QUESTION: {
    ADD_TO_SESSION: '/api/questions/add', // Add question
    PIN: (id) => `/api/questions/${id}/pin`, // Pin / Unpin question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update note
  },
};
