import React, { useEffect } from "react";
import {
  ArrowRight,
  Loader2,
  LogIn,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { useStore } from "../../../../Store";
import {
  clearUserDashboardError,
  getUserDashboard,
} from "../../state/UserDashboard/Action";

import DashboardStatCard from "../../components/DashboardStatCard";
import DashboardQuickAction from "../../components/DashboardQuickAction";

import Navigation from "../../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../../home/customer/components/Footer/Footer";

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const token = localStorage.getItem("se_token");

  const dashboardState = state.userDashboard || {
    data: null,
    loading: false,
    error: null,
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(getUserDashboard()).catch(() => {});
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const dashboard = dashboardState.data;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>

        {/* =========================
            HERO
        ========================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <UserRound className="h-4 w-4" />
              User dashboard
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <p className="text-sm font-semibold text-blue-200">
                  Welcome back
                </p>

                <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {dashboard?.name || "Your dashboard"}
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                  Manage your account and quickly access your marketplace
                  activity.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-blue-50"
              >
                Explore products

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          </div>
        </section>


        {/* =========================
            DASHBOARD CONTENT
        ========================= */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* ERROR */}
          {dashboardState.error && (
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 sm:flex-row sm:items-center sm:justify-between">

              <span>
                {dashboardState.error}
              </span>

              <button
                type="button"
                onClick={() =>
                  dispatch(clearUserDashboardError())
                }
                className="font-bold hover:underline"
              >
                Dismiss
              </button>

            </div>
          )}


          {/* LOADING */}
          {dashboardState.loading && !dashboard ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-200 bg-white">

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">

                <Loader2 className="h-5 w-5 animate-spin" />

                Loading your dashboard...

              </div>

            </div>
          ) : (
            <>

              {/* =========================
                  STAT CARDS
              ========================= */}
              <div className="grid gap-5 md:grid-cols-2">

                <DashboardStatCard
                  label="Total orders"
                  value={dashboard?.totalOrders ?? 0}
                  description="Orders placed using your account."
                  icon={Package}
                />

                <DashboardStatCard
                  label="Account role"
                  value={dashboard?.role || "—"}
                  description="Current role assigned to your account."
                  icon={UserRound}
                />

              </div>


              {/* =========================
                  QUICK ACTIONS
              ========================= */}
              <div className="mt-10 grid gap-5 lg:grid-cols-2">

                <DashboardQuickAction
                  icon={Package}
                  title="View my orders"
                  description="Open your order history and check individual order details."
                  onClick={() => navigate("/orders")}
                />

                <DashboardQuickAction
                  icon={ShoppingBag}
                  title="Explore products"
                  description="Browse surplus products and filter them by category."
                  onClick={() => navigate("/products")}
                />

                <DashboardQuickAction
                  icon={UserRound}
                  title="Account information"
                  description={
                    dashboard?.email ||
                    "View the email associated with your account."
                  }
                  onClick={() => navigate("/change-password")}
                />

                <DashboardQuickAction
                  icon={LogIn}
                  title="Continue shopping"
                  description="Return to the marketplace and discover available surplus inventory."
                  onClick={() => navigate("/products")}
                />

              </div>


              {/* =========================
                  ACCOUNT
              ========================= */}
              <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Account
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                      {dashboard?.name || "Authenticated user"}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {dashboard?.email || "—"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Role: {dashboard?.role || "—"}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/orders")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Open orders

                    <ArrowRight className="h-4 w-4" />
                  </button>

                </div>
              </div>

            </>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
}