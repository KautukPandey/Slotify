import api from "./api";

/**
 * Service to manage provider bookings
 */
const providerBookingService = {
  /**
   * Fetch all bookings associated with the current provider
   * @returns {Promise<object>} Bookings list
   */
  getProviderBookings: async () => {
    const response = await api.get("/bookings/provider");
    return response.data;
  },

  /**
   * Mark an active booking as completed
   * @param {string} bookingId - The ID of the booking to complete
   * @returns {Promise<object>} Updated booking details
   */
  completeBooking: async (bookingId) => {
    const response = await api.patch("/bookings/complete", { bookingId });
    return response.data;
  },
};

export default providerBookingService;
