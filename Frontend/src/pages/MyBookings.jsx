import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { SkeletonCard } from "../components/LoadingSpinner";
import bookingService from "../services/bookingService";
import reviewService from "../services/reviewService";
import { extractErrorMessage } from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingIds, setCancellingIds] = useState(new Set());
  const [actionError, setActionError] = useState(null);

  // Review Modal States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsData, reviewsData] = await Promise.all([
        bookingService.getMyBookings(),
        reviewService.getMyReviews(),
      ]);

      const reviewedBookingIds = new Set(
        (reviewsData.reviews || []).map((r) => r.booking)
      );

      const bookingsWithReviews = (bookingsData.myBookings || []).map((b) => ({
        ...b,
        isReviewed: reviewedBookingIds.has(b._id),
      }));

      const sorted = bookingsWithReviews.sort((a, b) => {
        const dateA = a.slot?.date ? new Date(a.slot.date) : new Date(0);
        const dateB = b.slot?.date ? new Date(b.slot.date) : new Date(0);
        return dateB - dateA;
      });
      setBookings(sorted);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    setActionError(null);
    setCancellingIds((prev) => {
      const next = new Set(prev);
      next.add(bookingId);
      return next;
    });
    try {
      await bookingService.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
      );
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setCancellingIds((prev) => {
        const next = new Set(prev);
        next.delete(bookingId);
        return next;
      });
    }
  };

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setRating(5);
    setComment("");
    setReviewError(null);
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedBooking(null);
    setRating(5);
    setComment("");
    setReviewError(null);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setSubmittingReview(true);
    setReviewError(null);
    try {
      await reviewService.createReview(selectedBooking._id, rating, comment);

      // Update local booking isReviewed state immediately
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, isReviewed: true } : b
        )
      );

      closeReviewModal();
    } catch (err) {
      setReviewError(extractErrorMessage(err));
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);
    return correctedDate.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="amber">Confirmed</Badge>;
      case "completed":
        return <Badge variant="emerald">Completed</Badge>;
      case "cancelled":
        return <Badge variant="red">Cancelled</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title="My Bookings"
          subtitle="Track and manage your upcoming and historical appointments"
        />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {actionError && (
          <div className="p-3.5 mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard count={3} />
          </div>
        ) : bookings.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-slate-200">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5 animate-fade-in">
              No bookings active
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Find local service professionals and schedule your first appointment.
            </p>
            <Link to="/providers" className="inline-block">
              <Button className="font-bold flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                Find Providers
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const isCancelling = cancellingIds.has(booking._id);
              const isConfirmed = booking.status === "confirmed";

              return (
                <Card
                  key={booking._id}
                  className="bg-white border border-slate-200 p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(booking.status)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 capitalize">
                          {booking.service?.name || "Service Profile Deleted"}
                        </h3>
                      </div>
                      <div className="text-sm text-slate-500 space-y-1.5">
                        <p className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-slate-400 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 7.5h-9m-3 0H5.625c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25h12A2.25 2.25 0 0021 18v-9.375c0-.621-.504-1.125-1.125-1.125H18M9 4.5h6m-6 3h6m-9 9h9"
                            />
                          </svg>
                          <span>
                            <span className="font-bold text-slate-400">Pro:</span>{" "}
                            {booking.provider?.businessName || "N/A"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-slate-400 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            <span className="font-bold text-slate-400">
                              Schedule:
                            </span>{" "}
                            {formatDate(booking.slot?.date)} at{" "}
                            {booking.slot?.time || "N/A"}
                          </span>
                        </p>
                        {booking.note && (
                          <p className="flex items-start gap-2 italic text-slate-450 pt-1">
                            <svg
                              className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                              />
                            </svg>
                            <span>&ldquo;{booking.note}&rdquo;</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 mt-4 sm:mt-0 flex sm:flex-col gap-2">
                      {isConfirmed && (
                        <Button
                          variant="danger"
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={isCancelling}
                          className="text-xs py-2 px-4 shadow-[0_1px_2px_rgba(239,68,68,0.1)]"
                        >
                          {isCancelling ? "Cancelling..." : "Cancel Appointment"}
                        </Button>
                      )}
                      {booking.status === "completed" &&
                        (booking.isReviewed ? (
                          <Button
                            variant="secondary"
                            disabled={true}
                            className="text-xs opacity-60 cursor-not-allowed flex items-center gap-1.5 py-2 px-4"
                          >
                            <svg
                              className="w-4 h-4 text-emerald-500 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Review Left
                          </Button>
                        ) : (
                          <Button
                            onClick={() => openReviewModal(booking)}
                            className="text-xs py-2 px-4 font-bold"
                          >
                            Leave Review
                          </Button>
                        ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Modal Overlay using reusable Modal primitive */}
        <Modal
          isOpen={showReviewModal}
          onClose={closeReviewModal}
          title="Share Your Review"
        >
          <form onSubmit={handleReviewSubmit} className="space-y-5 text-left">
            {reviewError && (
              <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                {reviewError}
              </div>
            )}

            {/* Booking Details card */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-1 text-xs border border-slate-100 font-semibold select-none">
              <p className="text-slate-800">
                {selectedBooking?.service?.name || "Service session"}
              </p>
              <p className="text-slate-400 font-medium">
                Reviewing provider:{" "}
                <span className="text-slate-800">
                  {selectedBooking?.provider?.businessName}
                </span>
              </p>
            </div>

            {/* Star selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 text-center select-none">
                Experience Rating (1-5 stars)
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isLit = hoveredRating
                    ? starValue <= hoveredRating
                    : starValue <= rating;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 focus:outline-none transition-transform active:scale-95 cursor-pointer bg-transparent border-none"
                    >
                      <svg
                        className={`w-9 h-9 transition-colors ${isLit ? "text-amber-400 fill-amber-400" : "text-slate-205"
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment details */}
            <div className="space-y-1.5">
              <label
                htmlFor="review-comment"
                className="text-xs font-bold text-slate-500"
              >
                Feedback comment
              </label>
              <textarea
                id="review-comment"
                rows="4"
                placeholder="How was your service appointment experience?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input resize-none text-xs"
              />
            </div>

            {/* Buttons UI actions */}
            <div className="flex gap-2.5 pt-2 justify-end">
              <Button
                variant="secondary"
                onClick={closeReviewModal}
                disabled={submittingReview}
                className="text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={submittingReview}
                className="text-xs font-bold px-4"
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </Layout>
  );
};

export default MyBookings;
