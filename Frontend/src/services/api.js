import axios from "axios";

// Create an instance of Axios
const api = axios.create({
  // Use Vite's env variables or fallback to port 8000
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically inject JWT token into the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Optional global error handling (e.g. redirect on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 Unauthorized, we can clear expired token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

/**
 * Helper utility to parse and format API errors in a beginner-friendly, uniform way.
 * @param {Error} error - The Axios error object
 * @returns {string} The parsed error message
 */
export const extractErrorMessage = (error) => {
  if (error.response) {
    // Server responded with a code out of the 2xx range
    return error.response.data?.message || "An error occurred on the server.";
  } else if (error.request) {
    // Request was made but no response was received
    return "Network error. No response received from server. Please check if backend is running.";
  } else {
    // Something went wrong setting up the request
    return error.message || "An unexpected error occurred.";
  }
};

export default api;