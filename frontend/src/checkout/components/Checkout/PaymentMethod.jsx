import React from "react";

export default function PaymentMethod({
  value,
  onChange,
  disabled,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-900">
        Payment method
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label
          className={`cursor-pointer rounded-2xl border p-4 transition ${
            value === "COD"
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={value === "COD"}
            onChange={onChange}
            disabled={disabled}
            className="sr-only"
          />

          <span className="block text-sm font-bold text-slate-900">
            Cash on Delivery
          </span>

          <span className="mt-1 block text-xs text-slate-500">
            Pay when the order is delivered.
          </span>
        </label>

        <label
          className={`cursor-pointer rounded-2xl border p-4 transition ${
            value === "ONLINE"
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="ONLINE"
            checked={value === "ONLINE"}
            onChange={onChange}
            disabled={disabled}
            className="sr-only"
          />

          <span className="block text-sm font-bold text-slate-900">
            Online Payment
          </span>

          <span className="mt-1 block text-xs text-slate-500">
            Backend can use paymentOrderId for the gateway flow.
          </span>
        </label>
      </div>
    </section>
  );
}
