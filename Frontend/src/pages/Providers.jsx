import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
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
        <PageHeader title="Service Providers" subtitle="Find and book scheduled sessions with local business providers">
          <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search provider..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="input w-auto min-w-[130px]">
              <option value="">All Cities</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="bangalore">Bangalore</option>
            </select>
            <button type="submit" className="btn-primary">Search</button>
            {(search || city) && (
              <button type="button" onClick={handleClear} className="btn-secondary">Clear</button>
            )}
          </form>
        </PageHeader>

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
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-1">No providers found</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4">Try adjusting your search or filters.</p>
            {(search || city) && (
              <button onClick={handleClear} className="btn-secondary">Clear filters</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider._id} className="card-hover p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {(provider.businessName || "P").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 capitalize leading-tight">
                        {provider.businessName}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {provider.city}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                    {provider.description}
                  </p>
                </div>
                <Link
                  to={`/providers/${provider._id}`}
                  className="btn-secondary w-full justify-center text-xs group-hover:border-brand-200 dark:group-hover:border-brand-800 transition-colors"
                >
                  View Details & Services
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Providers;
