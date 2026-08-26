import React from "react";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export default function OrderItems({ items = [] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-black text-slate-900">
          Ordered products
        </h2>
      </div>

      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 border-b border-slate-100 p-6 last:border-b-0 sm:flex-row sm:items-center"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-500">
              #{item.productId}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-bold text-slate-900">
                {item.productName || "Product"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Quantity: {item.quantity} ×{" "}
                {formatINR(item.unitPrice)}
              </p>
            </div>

            <p className="text-lg font-black text-slate-900">
              {formatINR(item.subtotal)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
