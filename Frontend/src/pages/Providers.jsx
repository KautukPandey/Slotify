import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { SkeletonCard } from "../components/LoadingSpinner";
import providerService from "../services/providerService";
import { extractErrorMessage } from "../services/api";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync with initial URL search params if any
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search") || "";
    const cityParam = params.get("city") || "";
    setSearch(searchParam);
    setCity(cityParam);
    fetchProviders(searchParam, cityParam);
  }, []);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProviders(search, city);
    // Update URL to match search parameters
    const query = [];
    if (search) query.push(`search=${encodeURIComponent(search)}`);
    if (city) query.push(`city=${encodeURIComponent(city)}`);
    const newRelativePathQuery = window.location.pathname + (query.length > 0 ? `?${query.join("&")}` : "");
    window.history.pushState(null, "", newRelativePathQuery);
  };

  const handleClear = () => {
    setSearch("");
    setCity("");
    fetchProviders("", "");
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        {/* Page Header */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Service Providers
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
            Browse our marketplace directory of vetted professionals scheduling appointments in your area.
          </p>
        </div>

        {/* Search Bar Block */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row items-stretch bg-white border border-slate-200 rounded-2xl p-2 shadow-sm gap-2">
            <div className="flex items-center gap-2.5 flex-1 px-3 py-1 sm:py-0">
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search services (e.g. Design, Development, Yoga...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 text-sm text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="flex items-center gap-2.5 flex-1 px-3 py-1 sm:py-0 border-t sm:border-t-0 sm:border-l border-slate-100">
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2.5 text-sm text-slate-800 bg-transparent border-none outline-none appearance-none cursor-pointer font-medium"
              >
                <option value="">All Cities / Remote</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="px-6 py-2.5 rounded-xl font-bold w-full sm:w-auto">
                Search
              </Button>
              {(search || city) && (
                <Button type="button" variant="ghost" onClick={handleClear} className="px-4 py-2.5 text-sm">
                  Clear
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Results Info */}
        {!loading && providers.length > 0 && (
          <p className="text-sm text-slate-500 mb-6 text-left select-none">
            Showing <span className="font-semibold text-slate-800">{providers.length}</span> verified expert{providers.length !== 1 ? 's' : ''}
          </p>
        )}

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl text-left">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={6} />
          </div>
        ) : providers.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-slate-200">
            <div className="empty-state-icon">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5">No experts matching criteria</h3>
            <p className="text-sm text-slate-500 mb-5">Try modifying name keywords or selecting another location.</p>
            {(search || city) && (
              <Button onClick={handleClear} variant="secondary" className="mx-auto">
                Clear all filters
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((p) => (
              <Card key={p._id} className="flex flex-col justify-between h-full bg-white border border-slate-200 hover:shadow-md transition-all duration-200">
                <div className="flex-1">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg capitalize shrink-0">
                      {p.businessName?.charAt(0) || "P"}
                    </div>
                    <div className="text-left min-w-0">
                      <h3 className="text-base font-bold text-slate-900 capitalize truncate">
                        {p.businessName}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 mt-0.5 capitalize">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {p.city}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-550 leading-relaxed text-left line-clamp-3">
                    {p.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link to={`/providers/${p._id}`}>
                    <Button variant="secondary" className="w-full text-sm font-bold">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Providers;
