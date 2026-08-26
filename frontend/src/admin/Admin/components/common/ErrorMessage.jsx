import React from "react";
import "../styles/ErrorMessage.css";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="admin-error-message card p-5">
      <div className="admin-error-alert rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {message || "Something went wrong."}
      </div>
      {onRetry && (
        <button className="btn-secondary mt-3" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
