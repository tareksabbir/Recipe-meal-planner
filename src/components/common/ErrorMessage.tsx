import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 my-4 flex items-start">
      <svg className="w-5 h-5 text-emerald-600 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div className="flex-1">
        <p className="text-emerald-800 mb-2">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-emerald-600 hover:text-emerald-800 underline text-sm font-medium"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};