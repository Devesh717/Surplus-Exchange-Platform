import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, PackageCheck, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useStore } from "../../Store";
import {
  getSellerOrder,
  updateSellerOrderStatus,
} from "../state/Seller/Action";

import SellerGuard from "../components/SellerGuard";
import SellerLayout from "../components/SellerLayout";
import SellerStatusBadge from "../components/SellerStatusBadge";

const NEXT_STATUSES = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export default function SellerOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const sellerState = state.seller || {};
  const order = sellerState.selectedOrder;

  const [status, setStatus] = useState("");
  const [sellerNote, setSellerNote] = useState("");

  useEffect(() => {
    dispatch(getSellerOrder(id)).catch(() => {});
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setStatus(order.status || "");
      setSellerNote(order.sellerNote || "");
    }
  }, [order]);

  const options = useMemo(
    () => NEXT_STATUSES[order?.status] || [],
    [order?.status]
  );

  const save = async () => {
    if (!status || status === order?.status) return;

    try {
      await dispatch(
        updateSellerOrderStatus(order.sellerOrderId, {
          status,
          sellerNote,
        })
      );
    } catch {
      // Error is already stored by the reducer.
    }
  };

  return (
    <SellerGuard>
      <SellerLayout>
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/seller/orders")}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </button>

          {sellerState.error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {sellerState.error}
            </div>
          )}

          {sellerState.loading || !order ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-16 text-center font-semibold text-slate-500">
              Loading seller order...
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                      Seller order
                    </p>
                    <h1 className="mt-1 text-3xl font-black text-slate-950">
                      #{order.sellerOrderId}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Parent order #{order.orderId}
                    </p>
                  </div>

                  <SellerStatusBadge status={order.status} />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Buyer
                    </p>
                    <p className="mt-1 font-black text-slate-900">
                      #{order.buyerId}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Order amount
                    </p>
                    <p className="mt-1 font-black text-slate-900">
                      ₹{order.orderTotal ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Created
                    </p>
                    <p className="mt-1 font-black text-slate-900">
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-black text-slate-950">
                    Update order
                  </h2>
                </div>

                {options.length ? (
                  <>
                    <div className="mt-6">
                      <label className="text-sm font-bold text-slate-700">
                        Next status
                      </label>
                      <select
                        value={status}
                        onChange={(e) =>
                          setStatus(e.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                      >
                        <option value={order.status}>
                          {order.status}
                        </option>
                        {options.map((option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-5">
                      <label className="text-sm font-bold text-slate-700">
                        Seller note
                      </label>
                      <textarea
                        value={sellerNote}
                        onChange={(e) =>
                          setSellerNote(e.target.value)
                        }
                        rows={4}
                        placeholder="Optional note for this order..."
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={sellerState.mutationLoading}
                      onClick={save}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      {sellerState.mutationLoading
                        ? "Saving..."
                        : "Save status"}
                    </button>
                  </>
                ) : (
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">
                    This order is final and cannot be moved to another
                    status.
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </SellerLayout>
    </SellerGuard>
  );
}
