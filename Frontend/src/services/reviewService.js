import api from "./api";

/**
 * Service to manage review-related API requests
 */
const reviewService = {
  /**
   * Create a new review for a completed booking
   * @param {string} bookingId - The ID of the completed booking
   * @param {number} rating - Rating from 1 to 5 stars
   * @param {string} comment - Optional text comment
   * @returns {Promise<object>} Response containing the created review
   */
  createReview: async (bookingId, rating, comment) => {
    const response = await api.post("/reviews/create", {
      bookingId,
      rating,
      comment: comment || "",
    });
    return response.data;
  },

  /**
   * Fetch reviews for a specific provider
   * @param {string} providerId - The provider ID
   * @returns {Promise<object>} Response containing reviewCount, averageRating, and reviews list
   */
  getProviderReviews: async (providerId) => {
    const response = await api.get(`/reviews/provider/${providerId}`);
    return response.data;
  },
};

export default reviewService;
