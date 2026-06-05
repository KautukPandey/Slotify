import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-650 to-indigo-650">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight my-0">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
            Oops! The page you are looking for does not exist or has been moved. Check the URL or return to home.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-block px-6 py-3 text-sm font-bold text-white bg-violet-605 hover:bg-violet-705 rounded-xl no-underline shadow-md shadow-violet-600/15"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
