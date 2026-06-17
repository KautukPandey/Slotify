import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const CreateSlot = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ serviceId: "", date: "", time: "" });
  const [loadingServices, setLoadingServices] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
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
          setFormData((prev) => ({ ...prev, serviceId: activeServices[0]._id }));
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.serviceId) errors.serviceId = "Please select a service";
    if (!formData.date) errors.date = "Please select a date";
    if (!formData.time) errors.time = "Please select a time";
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitLoading(true);
    setError(null);
    try {
      await providerDashboardService.createSlot({
        serviceId: formData.serviceId, date: formData.date, time: formData.time,
      });
      navigate("/provider/slots");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  const inputClass = (field) => `input ${validationErrors[field] ? "input-error" : ""}`;

  return (
    <Layout>
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader title="Create Slot" subtitle="Assign availability dates and times for client bookings" showBack={true} />

        <div className="card p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {loadingServices ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-zinc-700 border-t-brand-600 animate-spin" />
                Loading services...
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400">You must create a service first before scheduling slots.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="serviceId" className="label">Service</label>
                <select id="serviceId" name="serviceId" required value={formData.serviceId}
                  onChange={handleChange} className={inputClass("serviceId")}>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} (${service.price.toFixed(2)} - {service.duration} mins)
                    </option>
                  ))}
                </select>
                {validationErrors.serviceId && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.serviceId}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="label">Date</label>
                  <input id="date" name="date" type="date" required value={formData.date}
                    onChange={handleChange} className={inputClass("date")} />
                  {validationErrors.date && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.date}</p>}
                </div>
                <div>
                  <label htmlFor="time" className="label">Time</label>
                  <input id="time" name="time" type="time" required value={formData.time}
                    onChange={handleChange} className={inputClass("time")} />
                  {validationErrors.time && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.time}</p>}
                </div>
              </div>

              <button type="submit" disabled={submitLoading} className="btn-primary w-full">
                {submitLoading ? (
                  <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating Slot...</>
                ) : "Create Slot"}
              </button>
            </form>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default CreateSlot;
