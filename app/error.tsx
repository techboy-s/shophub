"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center px-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Something went wrong!</h2>
      <p className="text-slate-500 mb-8">We encountered an unexpected error.</p>
      
      <button
        onClick={() => reset()} // Attempts to recover by re-rendering the segment
        className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
      >
        <RefreshCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}