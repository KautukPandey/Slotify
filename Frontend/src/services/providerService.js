import api from "./api";

/**
 * Service to manage provider-related API requests
 */
const providerService = {
  /**
   * Fetch all providers, optionally filtered by city
   * @param {string} city - Optional city filter
   * @returns {Promise<object>} Response containing message and providers array
   */
  getProviders: async (search = "", city = "") => {
    const params = {};

    if (search) {
      params.search = search.trim();
    }

    if (city) {
      params.city = city.trim();
    }
    const response = await api.get("/providers", { params });
    return response.data;
  },

  /**
   * Fetch provider details by ID
   * @param {string} id - Provider ID
   * @returns {Promise<object>} Response containing message and provider details
   */
  getProviderById: async (id) => {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },

  /**
   * Fetch services offered by a specific provider
   * @param {string} providerId - Provider ID
   * @returns {Promise<object>} Response containing message and services array
   */
  getProviderServices: async (providerId) => {
    const response = await api.get(`/providers/${providerId}/services`);
    return response.data;
  },
};

export default providerService;
