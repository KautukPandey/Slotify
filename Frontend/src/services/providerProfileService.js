import api from "./api";

/**
 * Service to manage provider profile creation and retrieval
 */
const providerProfileService = {
  /**
   * Create provider profile
   * @param {object} profileData - { businessName, city, description }
   * @returns {Promise<object>} Created provider details
   */
  createProviderProfile: async (profileData) => {
    const response = await api.post("/providers", profileData);
    return response.data;
  },

  /**
   * Fetch provider details
   * @returns {Promise<object>} Provider profile details
   */
  getMyProviderProfile: async () => {
    const response = await api.get("/providers/me");
    return response.data;
  },
};

export default providerProfileService;
