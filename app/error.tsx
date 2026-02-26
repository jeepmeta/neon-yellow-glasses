"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to Sentry or your error tracking service
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-black text-[#FFE154] mb-4">Oops!</h1>
        <p className="text-lg text-gray-300 mb-6">
          Something went wrong. The crew is investigating.
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 text-left text-sm">
          <p className="text-gray-500 font-mono break-all">
            {error.message || "Unknown error"}
          </p>
          {error.digest && (
            <p className="text-gray-600 text-xs mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <button
          onClick={() => reset()}
          className="bg-[#FFE154] text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
