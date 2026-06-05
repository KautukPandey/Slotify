import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await providerDashboardService.getMyServices();
        setServices(data.myServices || []);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <PageHeader
          title="My Services"
          subtitle="Configure and update the list of services you offer to customers"
        >
          <Link
            to="/provider/services/create"
            className="inline-block px-4 py-2 text-xs font-bold text-white bg-violet-605 hover:bg-violet-700 rounded-lg no-underline shadow-sm shadow-violet-500/10"
          >
            + Create Service
          </Link>
        </PageHeader>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-zinc-400">
            Loading service offerings...
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <p className="text-slate-500 dark:text-zinc-400 mb-0">You haven't added any services to your catalog yet.</p>
            <Link
              to="/provider/services/create"
              className="inline-block px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-755 rounded-lg no-underline"
            >
              Create Your First Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-150"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 capitalize mb-0">
                      {service.name}
                    </h3>
                    {!service.isActive && (
                      <span className="bg-red-50 text-red-650 px-2 py-0.5 rounded text-[10px] font-bold">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 text-xs font-semibold text-slate-500 dark:text-zinc-400 my-2">
                    <span>⏱️ {service.duration} mins</span>
                    <span className="text-violet-600 dark:text-violet-400">💰 ${service.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-slate-650 dark:text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyServices;
