import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { SkeletonCard } from "../components/LoadingSpinner";
import providerService from "../services/providerService";
import { extractErrorMessage } from "../services/api";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProviders = async (searchValue = "", cityValue = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await providerService.getProviders(searchValue, cityValue);
      setProviders(data.providers || []);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProviders(); }, []);

  const handleSearchSubmit = (e) => { e.preventDefault(); fetchProviders(search, city); };
  const handleClear = () => { setSearch(""); setCity(""); fetchProviders(); };

  return (
    <Layout>
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Find Top Professionals
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl">
            Browse our directory of vetted service providers ready to help you grow your business.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row items-stretch bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 shadow-sm">
            <div className="flex items-center gap-2 flex-1 px-3">
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Service, business or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 text-sm text-slate-900 dark:text-slate-100 bg-transparent border-none outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 px-3 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2.5 text-sm text-slate-900 dark:text-slate-100 bg-transparent border-none outline-none appearance-none cursor-pointer"
              >
                <option value="">All Cities</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>
            <div className="flex gap-2 p-1 sm:p-0">
              <button type="submit" className="btn-primary px-6 py-2.5 rounded-lg w-full sm:w-auto">
                Search
              </button>
              {(search || city) && (
                <button type="button" onClick={handleClear} className="btn-ghost px-4 py-2.5 text-sm shrink-0">
                  Clear
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Results count */}
        {!loading && providers.length > 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{providers.length}</span> provider{providers.length !== 1 ? "s" : ""}
          </p>
        )}

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={6} />
          </div>
        ) : providers.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="empty-state-icon">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">No providers found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Try adjusting your search or filters.</p>
            {(search || city) && (
              <button onClick={handleClear} className="btn-secondary">Clear filters</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider._id} className="card-hover flex flex-col justify-between overflow-hidden">
                {/* Card Header with Initial */}
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {(provider.businessName || "P").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 capitalize leading-tight truncate">
                        {provider.businessName}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {provider.city}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {provider.description}
                  </p>
                </div>
                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/providers/${provider._id}`}
                    className="btn-secondary w-full justify-center text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Providers;
