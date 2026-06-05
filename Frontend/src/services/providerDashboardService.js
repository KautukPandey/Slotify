import api from "./api";

/**
 * Service to manage provider profile, services, and slots actions
 */
const providerDashboardService = {
  /**
   * Fetch current provider's business profile
   * @returns {Promise<object>} Profile details
   */
  getProfile: async () => {
    const response = await api.get("/providers/me");
    return response.data;
  },

  /**
   * Fetch services created by current provider
   * @returns {Promise<object>} Services array
   */
  getMyServices: async () => {
    const response = await api.get("/services/me");
    return response.data;
  },

  /**
   * Create a new service
   * @param {object} serviceData - { name, description, price, duration }
   * @returns {Promise<object>} Created service details
   */
  createService: async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data;
  },

  /**
   * Fetch slots created by current provider
   * @returns {Promise<object>} Slots array
   */
  getMySlots: async () => {
    const response = await api.get("/slots/me");
    return response.data;
  },

  /**
   * Create a new slot
   * @param {object} slotData - { date, time, serviceId }
   * @returns {Promise<object>} Created slot details
   */
  createSlot: async (slotData) => {
    const response = await api.post("/slots", slotData);
    return response.data;
  },
};

export default providerDashboardService;
