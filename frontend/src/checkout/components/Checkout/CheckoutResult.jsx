import React from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutResult({ result }) {
  const navigate = useNavigate();

  if (!result) return null;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-xl">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />

      <h2 className="mt-5 text-3xl font-black text-slate-900">
        Order created
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {result.message || "Your checkout was processed successfully."}
      </p>

      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-slate-50 p-5 text-left text-sm">
        {result.orderId && (
          <div className="flex justify-between gap-4 py-2">
            <span className="text-slate-500">Order ID</span>
            <span className="font-bold text-slate-900">
              #{result.orderId}
            </span>
          </div>
        )}

        <div className="flex justify-between gap-4 py-2">
          <span className="text-slate-500">Order status</span>
          <span className="font-bold text-slate-900">
            {result.orderStatus || "PENDING"}
          </span>
        </div>

        <div className="flex justify-between gap-4 py-2">
          <span className="text-slate-500">Payment status</span>
          <span className="font-bold text-slate-900">
            {result.paymentStatus || "PENDING"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/products")}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg"
      >
        <ShoppingBag className="h-4 w-4" />
        Continue shopping
      </button>
    </div>
  );
}
