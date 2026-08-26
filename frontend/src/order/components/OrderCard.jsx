import React from "react";
import { ArrowRight, CalendarDays, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Order
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            {order.orderNumber || `#${order.id}`}
          </h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(order.createdAt)}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Package className="h-4 w-4" />
              {order.items?.length || 0} product
              {(order.items?.length || 0) === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">
            Total amount
          </p>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {formatINR(order.totalAmount)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/orders/${order.id}`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
