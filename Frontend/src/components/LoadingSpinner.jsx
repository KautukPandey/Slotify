import React from "react";

const LoadingSpinner = ({ message = "Loading details..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-zinc-800"></div>
        <div className="absolute w-12 h-12 rounded-full border-4 border-t-violet-650 dark:border-t-violet-400 animate-spin"></div>
      </div>
      {message && (
        <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-zinc-400 tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
