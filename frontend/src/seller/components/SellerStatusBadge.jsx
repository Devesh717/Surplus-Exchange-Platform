import React from "react";

const STATUS_CLASSES = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 ring-blue-200",
  PROCESSING: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  SHIPPED: "bg-violet-50 text-violet-700 ring-violet-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED: "bg-red-50 text-red-700 ring-red-200",
};

export default function SellerStatusBadge({ status }) {
  const normalized = status || "UNKNOWN";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${
        STATUS_CLASSES[normalized] ||
        "bg-slate-50 text-slate-700 ring-slate-200"
      }`}
    >
      {normalized.replaceAll("_", " ")}
    </span>
  );
}
