import React from "react";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export default function CheckoutSummary({
  subtotal,
  shippingCharge,
  discount,
  total,
  submitting,
  onSubmit,
}) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-900">
        Payment summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">
            {formatINR(subtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-slate-500">
          <span>Shipping</span>
          <span className="font-semibold text-slate-800">
            {formatINR(shippingCharge)}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-slate-500">
          <span>Discount</span>
          <span className="font-semibold text-emerald-600">
            - {formatINR(discount)}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between gap-4">
            <span className="font-bold text-slate-700">
              Total
            </span>
            <span className="text-2xl font-black text-slate-950">
              {formatINR(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Processing checkout..."
          : "Place order"}
      </button>
    </aside>
  );
}
