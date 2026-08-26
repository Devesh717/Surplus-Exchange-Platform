import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye, ShoppingBag } from "lucide-react";

import { useStore } from "../../Store";
import { getSellerOrders } from "../state/Seller/Action";

import SellerGuard from "../components/SellerGuard";
import SellerLayout from "../components/SellerLayout";
import SellerStatusBadge from "../components/SellerStatusBadge";

export default function SellerOrdersPage() {
  const { state, dispatch } = useStore();
  const sellerState = state.seller || {};

  useEffect(() => {
    dispatch(
      getSellerOrders({
        page: 0,
        size: 10,
        sort: "createdAt,desc",
      })
    ).catch(() => {});
  }, [dispatch]);

  const loadPage = (page) => {
    dispatch(
      getSellerOrders({
        page,
        size: sellerState.size || 10,
        sort: "createdAt,desc",
      })
    ).catch(() => {});
  };

  return (
    <SellerGuard>
      <SellerLayout>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-blue-600">
                Seller Center
              </p>
              <h1 className="mt-1 text-3xl font-black text-slate-950">
                Orders
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Review and update orders assigned to your seller account.
              </p>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
              {sellerState.totalElements || 0} orders
            </div>
          </div>

          {sellerState.error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {sellerState.error}
            </div>
          )}

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {sellerState.ordersLoading ? (
              <div className="p-16 text-center font-semibold text-slate-500">
                Loading orders...
              </div>
            ) : sellerState.orders?.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-4">Seller order</th>
                        <th className="px-6 py-4">Buyer</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Created</th>
                        <th className="px-6 py-4" />
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {sellerState.orders.map((order) => (
                        <tr key={order.sellerOrderId} className="hover:bg-slate-50">
                          <td className="px-6 py-5 font-bold text-slate-900">
                            #{order.sellerOrderId}
                          </td>

                          <td className="px-6 py-5 text-slate-600">
                            #{order.buyerId}
                          </td>

                          <td className="px-6 py-5 font-bold text-slate-900">
                            ₹{order.orderTotal ?? 0}
                          </td>

                          <td className="px-6 py-5">
                            <SellerStatusBadge status={order.status} />
                          </td>

                          <td className="px-6 py-5 text-slate-500">
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString()
                              : "—"}
                          </td>

                          <td className="px-6 py-5 text-right">
                            <Link
                              to={`/seller/orders/${order.sellerOrderId}`}
                              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {sellerState.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 border-t border-slate-100 p-5">
                    <button
                      type="button"
                      disabled={
                        sellerState.page <= 0 ||
                        sellerState.ordersLoading
                      }
                      onClick={() =>
                        loadPage(sellerState.page - 1)
                      }
                      className="rounded-xl border border-slate-300 bg-white p-3 disabled:opacity-40"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <span className="rounded-xl bg-slate-900 px-4 py-3 text-xs font-black text-white">
                      Page {sellerState.page + 1} of{" "}
                      {sellerState.totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={
                        sellerState.page >=
                          sellerState.totalPages - 1 ||
                        sellerState.ordersLoading
                      }
                      onClick={() =>
                        loadPage(sellerState.page + 1)
                      }
                      className="rounded-xl border border-slate-300 bg-white p-3 disabled:opacity-40"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-16 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-slate-300" />
                <h2 className="mt-4 text-xl font-black text-slate-900">
                  No seller orders
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Orders assigned to your seller account will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </SellerLayout>
    </SellerGuard>
  );
}
