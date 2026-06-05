import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerService from "../services/providerService";
import { extractErrorMessage } from "../services/api";

const ProviderDetails = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [providerData, servicesData] = await Promise.all([
          providerService.getProviderById(id),
          providerService.getProviderServices(id),
        ]);
        setProvider(providerData.provider);
        setServices(servicesData.services || []);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const providerName = provider?.businessName || "Provider Profile";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <PageHeader
          title={providerName}
          subtitle={provider ? `Located in ${provider.city}` : ""}
          showBack={true}
        />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-zinc-400">
            Loading provider profile details...
          </div>
        ) : !provider ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <p className="text-slate-500 dark:text-zinc-400">Provider details not found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Provider Bio Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-6 shadow-sm">
              <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-650 dark:bg-zinc-800 dark:text-zinc-400 mb-2">
                📍 {provider.city}
              </span>
              <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 my-0 mt-2">
                About the Business
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2 whitespace-pre-line leading-relaxed">
                {provider.description}
              </p>
            </div>

            {/* Services Header */}
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-zinc-50 my-0">
                Services Offered
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Select a service from the catalog to view calendar availabilities
              </p>
            </div>

            {/* Services List */}
            {services.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl p-6 text-center">
                <p className="text-slate-500 dark:text-zinc-400">No active services offered by this provider.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-855 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow duration-150"
                  >
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 capitalize my-0">
                        {service.name}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400 flex gap-2">
                        <span>⏱️ {service.duration} mins</span>
                      </div>
                      <p className="text-sm text-slate-650 dark:text-zinc-400 mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0">
                      <span className="text-2xl font-black text-slate-900 dark:text-zinc-50">
                        ${service.price.toFixed(2)}
                      </span>
                      <Link
                        to={`/services/${service._id}/slots`}
                        className="px-5 py-2.5 text-xs font-bold text-white bg-violet-605 hover:bg-violet-755 rounded-xl no-underline transition-colors shadow-sm shadow-violet-500/10"
                      >
                        Book Slot
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProviderDetails;
