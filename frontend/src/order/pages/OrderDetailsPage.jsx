import React, { useEffect } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  Package,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useStore } from "../../Store";
import {useOrdersState} from "../../Store";
import {
  cancelOrder,
  clearOrderError,
  getOrderDetails,
} from "../state/Order/Action";

import OrderItems from "../components/OrderItems";
import OrderStatusBadge from "../components/OrderStatusBadge";
import Navigation from "../../home/customer/components/Navigation/Navigation";
import Footer from "../../home/customer/components/Footer/Footer";

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

export default function OrderDetailsPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { dispatch } = useStore();

  const orderState = useOrdersState();
  const order = orderState.selectedOrder;

  useEffect(() => {
    if (!orderId) return;

    dispatch(getOrderDetails(orderId)).catch(() => {});
  }, [dispatch, orderId]);

  const handleCancel = async () => {
    if (!orderId || orderState.cancelLoading) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    try {
      await dispatch(cancelOrder(orderId));
    } catch {
      // Reducer stores the error.
    }
  };

  const canCancel =
    order &&
    ["PENDING", "CONFIRMED"].includes(order.status);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </button>

        {orderState.error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            <span>{orderState.error}</span>

            <button
              type="button"
              onClick={() => dispatch(clearOrderError())}
              className="font-bold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {orderState.detailsLoading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading order details...
            </div>
          </div>
        ) : !order ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <Package className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-4 text-2xl font-black text-slate-900">
              Order not found
            </h2>
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
            >
              Back to orders
            </button>
          </div>
        ) : (
          <>
            <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-7 text-white shadow-lg sm:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Order details
                  </p>

                  <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                    {order.orderNumber || `#${order.id}`}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-blue-100">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(order.createdAt)}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {order.items?.length || 0} product
                      {(order.items?.length || 0) === 1
                        ? ""
                        : "s"}
                    </span>
                  </div>
                </div>

                <OrderStatusBadge status={order.status} />
              </div>
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <OrderItems items={order.items || []} />

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-black text-slate-900">
                    Order timeline
                  </h2>

                  <div className="mt-6 space-y-5">
                    {[
                      "PENDING",
                      "CONFIRMED",
                      "PROCESSING",
                      "SHIPPED",
                      "DELIVERED",
                    ].map((status) => {
                      const statuses = [
                        "PENDING",
                        "CONFIRMED",
                        "PROCESSING",
                        "SHIPPED",
                        "DELIVERED",
                      ];

                      const currentIndex =
                        statuses.indexOf(order.status);
                      const statusIndex =
                        statuses.indexOf(status);

                      const active =
                        order.status === status;
                      const completed =
                        currentIndex >= statusIndex &&
                        currentIndex >= 0;

                      return (
                        <div
                          key={status}
                          className="flex items-center gap-4"
                        >
                          <div
                            className={`h-3 w-3 rounded-full ${
                              completed
                                ? "bg-blue-600"
                                : "bg-slate-200"
                            }`}
                          />

                          <span
                            className={`text-sm font-bold ${
                              active
                                ? "text-blue-600"
                                : completed
                                ? "text-slate-700"
                                : "text-slate-400"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      );
                    })}

                    {order.status === "CANCELLED" && (
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-3 rounded-full bg-red-600" />
                        <span className="text-sm font-bold text-red-600">
                          CANCELLED
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-900">
                  Payment summary
                </h2>

                <div className="mt-6 flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Order total
                  </span>

                  <span className="text-xl font-black text-slate-900">
                    {formatINR(order.totalAmount)}
                  </span>
                </div>

                <div className="mt-4 text-sm text-slate-500">
                  <p>
                    Created: {formatDate(order.createdAt)}
                  </p>

                  <p className="mt-2">
                    Updated: {formatDate(order.updatedAt)}
                  </p>
                </div>

                {canCancel && (
                  <button
                    type="button"
                    disabled={orderState.cancelLoading}
                    onClick={handleCancel}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {orderState.cancelLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}

                    {orderState.cancelLoading
                      ? "Cancelling..."
                      : "Cancel order"}
                  </button>
                )}
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
