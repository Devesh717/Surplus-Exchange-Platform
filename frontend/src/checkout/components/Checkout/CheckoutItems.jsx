import React from "react";
import { PackageOpen } from "lucide-react";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutItems({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <PackageOpen className="mx-auto h-10 w-10 text-slate-400" />
        <p className="mt-3 text-sm font-semibold text-slate-600">
          No checkout items found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-900">
        Order items
      </h2>

      <div className="mt-2 divide-y divide-slate-100">
        {items.map((item, index) => (
          <CheckoutItem
            key={`${item?.productId}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
