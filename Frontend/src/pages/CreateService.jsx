import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const CreateService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend verification
    const priceNum = parseFloat(formData.price);
    const durationNum = parseInt(formData.duration, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Price must be a valid number greater than 0.");
      return;
    }
    if (isNaN(durationNum) || durationNum <= 0) {
      setError("Duration must be a valid integer greater than 0.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await providerDashboardService.createService({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: priceNum,
        duration: durationNum,
      });
      navigate("/provider/services");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-xl w-full mx-auto p-6">
        <PageHeader
          title="Create Service"
          subtitle="Define a new service for your client booking catalog"
          showBack={true}
        />

        <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-8 space-y-6 shadow-sm">
          {error && (
            <div className="p-3 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                Service Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Consultation, Haircut, Tuneup"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-xs font-bold text-slate-655 dark:text-zinc-400">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                placeholder="Provide details about what is included in the service..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="price" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                  Price ($ USD)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 50.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="duration" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                  Duration (Minutes)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  required
                  placeholder="e.g. 45"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-755 disabled:bg-violet-400 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {loading ? "Saving Service..." : "Create Service"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateService;
