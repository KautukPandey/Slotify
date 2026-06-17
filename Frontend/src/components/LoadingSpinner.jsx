import React from "react";

export const SkeletonCard = ({ count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="card p-6 space-y-4">
        <div className="skeleton h-5 w-2/3" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-4/5" />
        </div>
        <div className="skeleton h-9 w-full mt-2" />
      </div>
    ))}
  </>
);

export const SkeletonTable = ({ rows = 4 }) => (
  <div className="card overflow-hidden">
    <div className="p-4 border-b border-slate-200 dark:border-zinc-800">
      <div className="skeleton h-4 w-1/4" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 border-b border-slate-100 dark:border-zinc-800/50 last:border-0">
        <div className="flex gap-4">
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-4 w-1/4" />
          <div className="skeleton h-4 w-1/5" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center gap-4">
      <div className="skeleton w-14 h-14 rounded-full" />
      <div className="space-y-2 flex-1">
        <div className="skeleton h-5 w-1/3" />
        <div className="skeleton h-3 w-1/5" />
      </div>
    </div>
    <div className="space-y-3 pt-2">
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-4/5" />
      <div className="skeleton h-3 w-3/5" />
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="card p-6 space-y-3">
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-8 w-1/4" />
      </div>
    ))}
  </div>
);

const LoadingSpinner = ({ message = "Loading details..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700" />
        <div className="absolute w-10 h-10 rounded-full border-2 border-t-brand-600 dark:border-t-brand-400 animate-spin" />
      </div>
      {message && (
        <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400 animate-pulse font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
