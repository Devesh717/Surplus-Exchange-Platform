import React from "react";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export default function CheckoutItem({ item }) {
  return (
    <article className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Product #{item?.productId}
        </p>

        <h3 className="mt-1 truncate text-sm font-bold text-slate-900">
          {item?.productName || "Product"}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {item?.quantity || 0} × {formatINR(item?.price)}
        </p>
      </div>

      <p className="shrink-0 text-sm font-black text-slate-900">
        {formatINR(item?.total)}
      </p>
    </article>
  );
}
