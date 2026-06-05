import api from "./api";

/**
 * Service to manage authentication requests
 */
const authService = {
  /**
   * Log in user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<object>} response data containing token and message
   */
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  /**
   * Register a new user
   * @param {object} userData - { name, email, password, city, role }
   * @returns {Promise<object>} response data containing user info and message
   */
  register: async (userData) => {
    // Note: 'city' is strictly required by the backend. 'role' defaults to 'customer'.
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  /**
   * Retrieve current user profile based on JWT token in Authorization header
   * @returns {Promise<object>} response data containing the authenticated user object
   */
  getMe: async () => {
    const response = await api.get("/auth/getMe");
    return response.data;
  },
};

export default authService;
