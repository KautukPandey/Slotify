import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { SkeletonProfile, SkeletonCard } from "../components/LoadingSpinner";
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
    <Layout>
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader title={providerName} subtitle={provider ? `Located in ${provider.city}` : ""} showBack={true} />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            <SkeletonProfile />
            <div className="grid gap-4"><SkeletonCard count={2} /></div>
          </div>
        ) : !provider ? (
          <div className="card p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-1">Provider not found</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400">The provider you're looking for doesn't exist.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Provider Bio */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white font-bold text-lg">
                  {provider.businessName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">{provider.businessName}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-zinc-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {provider.city}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">About</h4>
              <p className="text-sm text-slate-600 dark:text-zinc-400 whitespace-pre-line leading-relaxed">
                {provider.description}
              </p>
            </div>

            {/* Services */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-50">Services Offered</h2>
                <p className="text-sm text-slate-500 dark:text-zinc-400">Select a service to view available time slots</p>
              </div>

              {services.length === 0 ? (
                <div className="card p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-1">No services available</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">This provider hasn't added any services yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service._id} className="card-hover p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 space-y-1.5">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 capitalize">
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-zinc-400">
                          <span className="inline-flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {service.duration} mins
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 shrink-0">
                        <span className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
                          ${service.price.toFixed(2)}
                        </span>
                        <Link
                          to={`/services/${service._id}/slots`}
                          className="btn-primary text-xs"
                        >
                          Book Slot
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProviderDetails;
