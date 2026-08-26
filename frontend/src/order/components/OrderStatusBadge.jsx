import React from "react";

const styles = {
  PENDING:
    "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED:
    "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING:
    "bg-indigo-50 text-indigo-700 border-indigo-200",
  SHIPPED:
    "bg-violet-50 text-violet-700 border-violet-200",
  DELIVERED:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED:
    "bg-red-50 text-red-700 border-red-200",
};

export default function OrderStatusBadge({ status }) {
  const normalized = String(status || "PENDING").toUpperCase();

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
        styles[normalized] ||
        "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      {normalized}
    </span>
  );
}
