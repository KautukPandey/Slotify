import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const CreateService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", price: "", duration: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = "Service name is required";
    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) errors.price = "Enter a valid price greater than 0";
    const durationNum = parseInt(formData.duration, 10);
    if (!formData.duration || isNaN(durationNum) || durationNum <= 0) errors.duration = "Enter a valid duration in minutes";
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError(null);
    try {
      await providerDashboardService.createService({
        name: formData.name.trim(), description: formData.description.trim(),
        price: priceNum, duration: durationNum,
      });
      navigate("/provider/services");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) => `input ${validationErrors[field] ? "input-error" : ""}`;

  return (
    <Layout>
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader title="Create Service" subtitle="Define a new service for your client booking catalog" showBack={true} />

        <div className="card p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="label">Service Name</label>
              <input id="name" name="name" type="text" required placeholder="e.g. Consultation, Haircut"
                value={formData.name} onChange={handleChange} className={inputClass("name")} />
              {validationErrors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="description" className="label">Description</label>
              <textarea id="description" name="description" rows="4" required placeholder="Describe what's included..."
                value={formData.description} onChange={handleChange} className={inputClass("description")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="label">Price ($)</label>
                <input id="price" name="price" type="number" step="0.01" required placeholder="50.00"
                  value={formData.price} onChange={handleChange} className={inputClass("price")} />
                {validationErrors.price && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.price}</p>}
              </div>
              <div>
                <label htmlFor="duration" className="label">Duration (min)</label>
                <input id="duration" name="duration" type="number" required placeholder="45"
                  value={formData.duration} onChange={handleChange} className={inputClass("duration")} />
                {validationErrors.duration && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.duration}</p>}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving Service...</>
              ) : "Create Service"}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default CreateService;
