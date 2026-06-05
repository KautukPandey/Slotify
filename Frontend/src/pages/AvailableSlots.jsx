import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import slotService from "../services/slotService";
import bookingService from "../services/bookingService";
import api, { extractErrorMessage } from "../services/api";

const AvailableSlots = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch service details (by retrieving all active services and matching by ID)
  const fetchServiceDetails = useCallback(async () => {
    try {
      const response = await api.get("/services");
      const matched = (response.data.services || []).find((s) => s._id === serviceId);
      setService(matched || null);
    } catch (err) {
      console.error("Failed to fetch service details:", err);
    }
  }, [serviceId]);

  // Fetch available slots for the service
  const fetchSlots = useCallback(async () => {
    setSlotsLoading(true);
    setError(null);
    try {
      const data = await slotService.getAvailableSlots(serviceId, selectedDate || undefined);
      setSlots(data.slots || []);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSlotsLoading(false);
    }
  }, [serviceId, selectedDate]);

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      await fetchServiceDetails();
      await fetchSlots();
      setLoading(false);
    };
    initPage();
  }, [fetchServiceDetails, fetchSlots]);

  // Refetch slots when date changes
  useEffect(() => {
    if (!loading) {
      fetchSlots();
    }
    setSelectedSlot(null); // Clear selected slot when date filters change
  }, [selectedDate, fetchSlots]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setBookingLoading(true);
    setBookingError(null);
    setBookingSuccess(false);

    try {
      await bookingService.createBooking(selectedSlot._id, note);
      setBookingSuccess(true);
      setSelectedSlot(null);
      setNote("");
      // Refresh available slots list
      await fetchSlots();
    } catch (err) {
      setBookingError(extractErrorMessage(err));
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateStr) => {
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

  const serviceName = service?.name || "Book Service";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <PageHeader
          title={`Book ${serviceName}`}
          subtitle={service ? `Duration: ${service.duration} mins • Price: $${service.price.toFixed(2)}` : ""}
          showBack={true}
        />

        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-zinc-400">
            Loading service configurations...
          </div>
        ) : !service ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <p className="text-slate-500 dark:text-zinc-400">Service not found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Service & Filter Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-105 my-0 capitalize">
                  Service details
                </h3>
                <p className="text-sm text-slate-650 dark:text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-550 dark:text-zinc-400 pt-2">
                  <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
                    ⏱️ {service.duration} mins
                  </span>
                  <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-md text-violet-600 dark:text-violet-400">
                    💰 ${service.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Date Filter & Slots */}
              <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-105 my-0">
                    Available Time Slots
                  </h3>
                  <div className="flex items-center gap-2">
                    <label htmlFor="slot-date" className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                      Filter Date:
                    </label>
                    <input
                      id="slot-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                    {selectedDate && (
                      <button
                        onClick={() => setSelectedDate("")}
                        className="text-[10px] text-slate-500 hover:text-red-500 cursor-pointer font-bold transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 mb-4 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                    {error}
                  </div>
                )}

                {slotsLoading ? (
                  <div className="text-center py-8 text-xs text-slate-500 dark:text-zinc-400">
                    Fetching open availabilities...
                  </div>
                ) : slots.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 dark:text-zinc-400">
                    No open time slots found{selectedDate ? " for this date" : ""}.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot?._id === slot._id;
                      return (
                        <button
                          key={slot._id}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setBookingSuccess(false);
                            setBookingError(null);
                          }}
                          className={`flex flex-col items-center justify-center p-3 text-xs border rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                              : "bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 text-slate-800 dark:text-zinc-100 border-slate-205 dark:border-zinc-800"
                          }`}
                        >
                          <span className={`font-bold ${isSelected ? "text-white" : "text-slate-900 dark:text-zinc-50"}`}>
                            {slot.time}
                          </span>
                          <span className={`text-[10px] mt-1 ${isSelected ? "text-violet-200" : "text-slate-500 dark:text-zinc-400"}`}>
                            {formatDate(slot.date)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form Sidebar */}
            <div className="space-y-4">
              {bookingSuccess && (
                <div className="p-5 bg-green-50 dark:bg-green-950/20 border border-green-205 dark:border-green-900/30 rounded-2xl space-y-3">
                  <h4 className="text-sm font-bold text-green-800 dark:text-green-400 my-0">
                    🎉 Booking Confirmed!
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-450 leading-relaxed">
                    Your appointment has been successfully scheduled. Review your details inside the bookings tab.
                  </p>
                  <div>
                    <Link
                      to="/bookings"
                      className="inline-block px-4 py-2 text-xs font-semibold text-white bg-green-650 hover:bg-green-700 rounded-xl no-underline"
                    >
                      View Bookings History
                    </Link>
                  </div>
                </div>
              )}

              {bookingError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
                  {bookingError}
                </div>
              )}

              <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-6">
                <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 mb-4">
                  Booking Summary
                </h3>

                {selectedSlot ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="text-xs space-y-2.5">
                      <div className="flex justify-between border-b border-slate-100 dark:border-zinc-850 pb-2">
                        <span className="text-slate-400 font-medium">Date</span>
                        <span className="font-bold text-slate-800 dark:text-zinc-200">
                          {formatDate(selectedSlot.date)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-zinc-850 pb-2">
                        <span className="text-slate-400 font-medium">Time</span>
                        <span className="font-bold text-slate-800 dark:text-zinc-200">{selectedSlot.time}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-400 font-medium">Price</span>
                        <span className="font-black text-slate-900 dark:text-zinc-50">
                          ${service.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="booking-note" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                        Instructions / Notes
                      </label>
                      <textarea
                        id="booking-note"
                        rows="3"
                        placeholder="e.g. Any specific request for the provider..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-55 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 rounded-xl transition-all cursor-pointer shadow-sm shadow-violet-500/10"
                    >
                      {bookingLoading ? "Scheduling..." : "Confirm Booking"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400 dark:text-zinc-500 leading-relaxed">
                    {!bookingSuccess && "Please select a time slot on the left to review your booking and schedule."}
                    {bookingSuccess && "Choose another slot to schedule another appointment."}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default AvailableSlots;
