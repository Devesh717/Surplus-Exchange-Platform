import React, { useEffect } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useStore } from "../../Store";
import {useOrdersState} from "../../Store";
import {
  clearOrderError,
  getMyOrders,
} from "../state/Order/Action";

import OrderCard from "../components/OrderCard";
import Navigation from "../../home/customer/components/Navigation/Navigation";
import Footer from "../../home/customer/components/Footer/Footer";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const orderState = useOrdersState();

  const page = orderState.page || 0;
  const totalPages = orderState.totalPages || 0;

  useEffect(() => {
    dispatch(getMyOrders(page, orderState.size || 10)).catch(
      () => {}
    );
    // Initial load only.
    // Pagination is handled by the page buttons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPage = (nextPage) => {
    if (
      nextPage < 0 ||
      (totalPages > 0 && nextPage >= totalPages)
    ) {
      return;
    }

    dispatch(
      getMyOrders(nextPage, orderState.size || 10)
    ).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue shopping
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <PackageCheck className="h-4 w-4" />
              My orders
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Your orders.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              View your order history, track order status, and open
              the details of every purchase.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
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

          {orderState.loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading your orders...
              </div>
            </div>
          ) : !orderState.orders?.length ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />

              <h2 className="mt-4 text-2xl font-black text-slate-900">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your completed purchases will appear here.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white"
              >
                Explore products
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    {orderState.totalElements || orderState.orders.length}{" "}
                    total order
                    {(orderState.totalElements || orderState.orders.length) ===
                    1
                      ? ""
                      : "s"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Order history
                  </h2>
                </div>
              </div>

              <div className="space-y-5">
                {orderState.orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={page <= 0 || orderState.loading}
                    onClick={() => loadPage(page - 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <span className="text-sm font-semibold text-slate-500">
                    Page {page + 1} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={
                      page >= totalPages - 1 ||
                      orderState.loading
                    }
                    onClick={() => loadPage(page + 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
