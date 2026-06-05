import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-200/40 dark:bg-violet-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navbar */}
      <nav className="w-full bg-white/70 dark:bg-zinc-900/75 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800/80 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-md shadow-md shadow-violet-500/15">
            S
          </div>
          <span className="font-semibold text-slate-800 dark:text-zinc-100 tracking-tight">Slotify</span>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-zinc-850 bg-transparent rounded-xl hover:bg-red-50/20 hover:border-red-200/30 transition-all duration-200 cursor-pointer"
        >
          Sign Out
        </button>
      </nav>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-slate-100/50 dark:shadow-none p-8 relative overflow-hidden transition-all duration-300">
          
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center text-2xl font-bold mb-4 uppercase shadow-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-zinc-100 tracking-tight">
              Authentication Active
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Phase 1 setup has verified your session successfully.
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-zinc-800/80 my-4"></div>

          {/* User Details Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-left">
              Session Profile Details
            </h4>
            
            <div className="grid grid-cols-3 py-1 gap-2 text-left">
              <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">Name</span>
              <span className="text-xs text-slate-800 dark:text-zinc-200 col-span-2 font-medium">{user?.name}</span>
            </div>

            <div className="grid grid-cols-3 py-1 gap-2 text-left">
              <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">Email</span>
              <span className="text-xs text-slate-800 dark:text-zinc-200 col-span-2 font-mono break-all">{user?.email}</span>
            </div>

            <div className="grid grid-cols-3 py-1 gap-2 text-left">
              <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">City</span>
              <span className="text-xs text-slate-800 dark:text-zinc-200 col-span-2 font-medium">{user?.city}</span>
            </div>

            <div className="grid grid-cols-3 py-1 gap-2 text-left">
              <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">User Role</span>
              <span className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-violet-100/50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                  {user?.role}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-8 p-3 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs rounded-xl flex items-center gap-2 text-left">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Token successfully stored and persisted in LocalStorage.</span>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
