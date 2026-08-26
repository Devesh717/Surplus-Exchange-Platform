import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import { useStore } from "../../Store";
import {
  clearSellerError,
  getSellerDashboard,
} from "../state/Seller/Action";

import SellerGuard from "../components/SellerGuard";
import SellerLayout from "../components/SellerLayout";
import SellerStatCard from "../components/SellerStatCard";

export default function SellerDashboardPage() {
  const { state, dispatch } = useStore();

  const sellerState = state.seller || {};
  const dashboard = sellerState.dashboard;

  useEffect(() => {
    dispatch(getSellerDashboard()).catch(() => {});
  }, [dispatch]);

  return (
    <SellerGuard>
      <SellerLayout>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
              Seller Center
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Manage your surplus business.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              Monitor inventory, orders, stock levels and your seller activity
              from one place.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {sellerState.error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              <span>{sellerState.error}</span>
              <button
                type="button"
                onClick={() => dispatch(clearSellerError())}
                className="font-black hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {sellerState.dashboardLoading && !dashboard ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center font-semibold text-slate-500">
              Loading seller dashboard...
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <SellerStatCard
                  label="Total products"
                  value={dashboard?.totalProducts ?? 0}
                  description="Products belonging to your seller account."
                  icon={Package}
                />

                <SellerStatCard
                  label="Active products"
                  value={dashboard?.activeProducts ?? 0}
                  description="Currently active product listings."
                  icon={CheckCircle2}
                />

                <SellerStatCard
                  label="Pending products"
                  value={dashboard?.pendingProducts ?? 0}
                  description="Products that are not yet verified."
                  icon={Clock3}
                />

                <SellerStatCard
                  label="Total orders"
                  value={dashboard?.totalOrders ?? 0}
                  description="Seller orders received."
                  icon={ShoppingBag}
                />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <SellerStatCard
                  label="Pending orders"
                  value={dashboard?.pendingOrders ?? 0}
                  icon={Clock3}
                />
                <SellerStatCard
                  label="Processing"
                  value={dashboard?.processingOrders ?? 0}
                  icon={Package}
                />
                <SellerStatCard
                  label="Shipped"
                  value={dashboard?.shippedOrders ?? 0}
                  icon={Truck}
                />
                <SellerStatCard
                  label="Delivered"
                  value={dashboard?.deliveredOrders ?? 0}
                  icon={CheckCircle2}
                />
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <SellerStatCard
                  label="Cancelled orders"
                  value={dashboard?.cancelledOrders ?? 0}
                  icon={XCircle}
                />
                <SellerStatCard
                  label="Low stock"
                  value={dashboard?.lowStockProducts ?? 0}
                  description="Products with quantity from 1 to 10."
                  icon={AlertTriangle}
                />
                <SellerStatCard
                  label="Out of stock"
                  value={dashboard?.outOfStockProducts ?? 0}
                  description="Products with zero available quantity."
                  icon={AlertTriangle}
                />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Link
                  to="/seller/orders"
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                  <h2 className="mt-4 text-xl font-black text-slate-900">
                    Manage orders
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Confirm, process, ship and complete your seller orders.
                  </p>
                </Link>

                <Link
                  to="/seller/products"
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Package className="h-6 w-6 text-blue-600" />
                  <h2 className="mt-4 text-xl font-black text-slate-900">
                    Manage products
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create, edit and monitor your surplus inventory.
                  </p>
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-bold text-blue-900">
                  Sales reporting
                </p>
                <p className="mt-1 text-sm text-blue-800">
                  Total sales currently reported for your seller account is:
                  <span className="ml-1 font-black">
                    ₹{dashboard?.totalSales ?? 0}
                  </span>
                </p>
              </div>
            </>
          )}
        </section>
      </SellerLayout>
    </SellerGuard>
  );
}
