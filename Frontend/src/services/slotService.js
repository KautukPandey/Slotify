import api from "./api";

/**
 * Service to manage slot-related API requests
 */
const slotService = {
  /**
   * Fetch available slots for a specific service and optional date
   * @param {string} serviceId - The service ID (required by backend)
   * @param {string} date - Optional date string (YYYY-MM-DD)
   * @returns {Promise<object>} Response containing slots array
   */
  getAvailableSlots: async (serviceId, date) => {
    const params = { serviceId };
    if (date) {
      params.date = date;
    }
    const response = await api.get("/slots", { params });
    return response.data;
  },
};

export default slotService;
