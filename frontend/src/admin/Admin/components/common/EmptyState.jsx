import React from "react";
import "../styles/EmptyState.css";

export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="admin-empty-state card flex min-h-[220px] flex-col items-center justify-center p-6 text-center">
      {Icon && (
        <div className="admin-empty-state-icon flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
          <Icon size={19} />
        </div>
      )}
      <h2 className="mt-3 text-sm font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-gray-400">{description}</p>
      )}
    </div>
  );
}
