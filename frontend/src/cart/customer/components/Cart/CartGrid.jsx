import React from "react";
import { PackageOpen } from "lucide-react";
import CartItem from "./CartItem";

export default function CartGrid({
  items = [],
  loading,
  mutationLoading,
  onUpdate,
  onRemove,
}) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex gap-5 border-b border-slate-100 p-5 last:border-b-0"
          >
            <div className="h-28 w-28 animate-pulse rounded-2xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <PackageOpen className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Your cart is empty
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Browse the marketplace and add surplus products to your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {items.map((item) => (
        <CartItem
          key={item.itemId}
          item={item}
          busy={mutationLoading}
          onUpdate={(quantity) =>
            onUpdate(item.itemId, quantity)
          }
          onRemove={() => onRemove(item.itemId)}
        />
      ))}
    </div>
  );
}
