import api from "./api";

/**
 * Service to manage booking-related API requests
 */
const bookingService = {
  /**
   * Create a new booking
   * @param {string} slotId - The slot ID to book
   * @param {string} note - Optional customer note
   * @returns {Promise<object>} Response containing the created booking
   */
  createBooking: async (slotId, note) => {
    const response = await api.post("/bookings", { slotId, note });
    return response.data;
  },

  /**
   * Fetch bookings created by the authenticated customer
   * @returns {Promise<object>} Response containing the list of customer bookings
   */
  getMyBookings: async () => {
    const response = await api.get("/bookings/me");
    return response.data;
  },

  /**
   * Cancel an active booking
   * @param {string} bookingId - The ID of the booking to cancel
   * @returns {Promise<object>} Response containing the updated booking details
   */
  cancelBooking: async (bookingId) => {
    const response = await api.patch("/bookings/cancel", { bookingId });
    return response.data;
  },
};

export default bookingService;
