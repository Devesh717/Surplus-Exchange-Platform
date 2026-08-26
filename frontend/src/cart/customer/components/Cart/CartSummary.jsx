import React from "react";
import { ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export default function CartSummary({
  itemCount,
  productCount,
  totalAmount,
  cartId,
  onCheckout,
  disabled,
}) {
  return (
    <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
        <p className="text-sm font-semibold text-blue-600">
          Order summary
        </p>
        <h2 className="mt-1 text-xl font-black text-slate-900">
          Your cart
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Cart #{cartId || "—"}
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Items</span>
            <span className="font-semibold text-slate-800">
              {itemCount}
            </span>
          </div>

          <div className="flex justify-between text-slate-500">
            <span>Products</span>
            <span className="font-semibold text-slate-800">
              {productCount}
            </span>
          </div>

          <div className="flex justify-between text-slate-500">
            <span>Shipping</span>
            <span className="font-semibold text-blue-600">
              Calculated at checkout
            </span>
          </div>
        </div>

        <div className="my-6 border-t border-dashed border-slate-200" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400">Cart total</p>
            <p className="mt-1 text-3xl font-black text-slate-900">
              {formatINR(totalAmount)}
            </p>
          </div>

          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={onCheckout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" />
          Proceed to checkout
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
