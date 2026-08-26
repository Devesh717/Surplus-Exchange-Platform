import React from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function AddressForm({
  form,
  onChange,
  disabled,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-900">
        Shipping address
      </h2>

      <div className="mt-6 grid gap-5">
        <label className="text-sm font-semibold text-slate-700">
          Address
          <textarea
            name="shippingAddress"
            value={form.shippingAddress}
            onChange={onChange}
            disabled={disabled}
            required
            rows={4}
            placeholder="Enter complete shipping address"
            className={inputClass}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">
            City
            <input
              name="city"
              value={form.city}
              onChange={onChange}
              disabled={disabled}
              required
              placeholder="City"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            State
            <input
              name="state"
              value={form.state}
              onChange={onChange}
              disabled={disabled}
              required
              placeholder="State"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Postal code
            <input
              name="postalCode"
              value={form.postalCode}
              onChange={onChange}
              disabled={disabled}
              required
              inputMode="numeric"
              placeholder="Postal code"
              className={inputClass}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
