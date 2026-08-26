import React from "react";

export default function SellerStatCard({
  label,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {value}
          </p>
        </div>

        {Icon && (
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
