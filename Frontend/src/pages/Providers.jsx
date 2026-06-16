import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerService from "../services/providerService";
import { extractErrorMessage } from "../services/api";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProviders = async (
    searchValue = "",
    cityValue = ""
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await providerService.getProviders(
        searchValue,
        cityValue
      );

      setProviders(data.providers || []);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProviders(search, city);
  };

  const handleClear = () => {
    setSearch("");
    setCity("");
    fetchProviders();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <PageHeader
          title="Service Providers"
          subtitle="Find and book scheduled sessions with local business providers"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-wrap gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Search provider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 rounded-lg"
            >
              <option value="">All Cities</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="bangalore">Bangalore</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer shadow-sm shadow-violet-500/10"
            >
              Search
            </button>

            {(search || city) && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 text-sm text-slate-500 border border-slate-300 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 rounded-lg cursor-pointer transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </PageHeader>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-550 dark:text-zinc-400">
            Loading service providers...
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <p className="text-slate-500 dark:text-zinc-400">
              No service providers found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div
                key={provider._id}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-150"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 capitalize mb-1">
                    {provider.businessName}
                  </h3>

                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400 mb-3">
                    📍 {provider.city}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                    {provider.description}
                  </p>
                </div>

                <Link
                  to={`/providers/${provider._id}`}
                  className="w-full text-center py-2.5 text-xs font-bold text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900 hover:bg-violet-50 dark:hover:bg-violet-950/25 rounded-xl transition-all"
                >
                  View Details & Services
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Providers;