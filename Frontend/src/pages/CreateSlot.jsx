import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const CreateSlot = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    time: "",
  });
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      setError(null);
      try {
        const data = await providerDashboardService.getMyServices();
        const activeServices = data.myServices || [];
        setServices(activeServices);
        if (activeServices.length > 0) {
          setFormData((prev) => ({
            ...prev,
            serviceId: activeServices[0]._id,
          }));
        }
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.serviceId) {
      setError("Please select a service.");
      return;
    }
    if (!formData.date) {
      setError("Please select a date.");
      return;
    }
    if (!formData.time) {
      setError("Please select a time.");
      return;
    }

    setSubmitLoading(true);
    setError(null);

    try {
      await providerDashboardService.createSlot({
        serviceId: formData.serviceId,
        date: formData.date,
        time: formData.time,
      });
      navigate("/provider/slots");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-xl w-full mx-auto p-6">
        <PageHeader
          title="Create Slot"
          subtitle="Assign availability dates and times for client booking catalog"
          showBack={true}
        />

        <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-8 space-y-6 shadow-sm">
          {error && (
            <div className="p-3 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
              {error}
            </div>
          )}

          {loadingServices ? (
            <div className="text-center py-6 text-xs text-slate-500 dark:text-zinc-400 animate-pulse">
              Loading your services list...
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500 dark:text-zinc-400">
              You must create a service first before you can schedule available time slots.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="serviceId" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                  Select Associated Service
                </label>
                <select
                  id="serviceId"
                  name="serviceId"
                  required
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                >
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} (${service.price.toFixed(2)} - {service.duration} mins)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="date" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="time" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                    Start Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-755 disabled:bg-violet-400 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                {submitLoading ? "Creating Slot..." : "Create Slot"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateSlot;
