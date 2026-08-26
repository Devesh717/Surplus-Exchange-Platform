import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  ShoppingBag,
  Store,
  ShieldCheck,
  Package,
  Clock3,
  UserCheck,
  UserPlus,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import { useStore } from "../../../Store";
import { getDashboard } from "../../state/Admin/Action";

import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

import "./styles/Dashboard.css";


/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value) {
  if (value === null || value === undefined) {
    return "0";
  }

  return Number(value).toLocaleString();
}


function percentage(value, total) {
  if (!total || Number(total) <= 0) {
    return 0;
  }

  return Math.min(
    Math.max((Number(value) / Number(total)) * 100, 0),
    100
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  progress,
  type = "blue",
}) {
  return (
    <div className="dashboard-stat-card">

      <div className="dashboard-stat-top">

        <div>

          <p className="dashboard-stat-label">
            {label}
          </p>

          <p className="dashboard-stat-value">
            {formatNumber(value)}
          </p>

          {subtitle && (
            <p className="dashboard-stat-subtitle">
              {subtitle}
            </p>
          )}

        </div>

        <div className={`dashboard-stat-icon ${type}`}>
          <Icon size={20} />
        </div>

      </div>


      {progress !== undefined && (
        <div className="dashboard-stat-progress">

          <div className="dashboard-progress-track">

            <div
              className="dashboard-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <span>
            {progress.toFixed(0)}%
          </span>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   DONUT CHART
========================================================= */

function DonutChart({
  value,
  total,
  label,
  colorClass = "blue",
}) {
  const percent = percentage(value, total);

  const radius = 52;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percent / 100) * circumference;

  return (
    <div className="donut-wrapper">

      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="donut-chart"
      >

        <circle
          cx="75"
          cy="75"
          r={radius}
          className="donut-background"
        />

        <circle
          cx="75"
          cy="75"
          r={radius}
          className={`donut-progress ${colorClass}`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

      </svg>


      <div className="donut-center">

        <strong>
          {percent.toFixed(0)}%
        </strong>

        <span>
          {label}
        </span>

      </div>


      <div className="donut-value">
        {formatNumber(value)}
      </div>

    </div>
  );
}


/* =========================================================
   HORIZONTAL BAR
========================================================= */

function HorizontalBar({
  icon: Icon,
  label,
  value,
  total,
}) {
  const percent = percentage(value, total);

  return (
    <div className="bar-item">

      <div className="bar-item-header">

        <div className="bar-label">

          {Icon && <Icon size={16} />}

          <span>
            {label}
          </span>

        </div>

        <strong>
          {formatNumber(value)}
        </strong>

      </div>


      <div className="horizontal-bar-track">

        <div
          className="horizontal-bar-fill"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}


/* =========================================================
   APPLICATION STATUS
========================================================= */

function ApplicationStatus({
  icon: Icon,
  label,
  value,
  total,
  type,
}) {
  const percent = percentage(value, total);

  return (
    <div className="application-status-card">

      <div
        className={`application-status-icon ${type}`}
      >
        <Icon size={18} />
      </div>


      <div className="application-status-content">

        <div className="application-status-heading">

          <span>
            {label}
          </span>

          <strong>
            {formatNumber(value)}
          </strong>

        </div>


        <div className="application-status-track">

          <div
            className={`application-status-fill ${type}`}
            style={{
              width: `${percent}%`,
            }}
          />

        </div>


        <small>
          {percent.toFixed(0)}% of applications
        </small>

      </div>

    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {

  const navigate = useNavigate();

  const {
    state,
    dispatch,
  } = useStore();

  const {
    dashboard,
    loading,
    errors,
  } = state.admin;


  /* =======================================================
     LOAD DATABASE DATA
  ======================================================= */

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading.dashboard && !dashboard) {
    return (
      <Loader
        label="Loading dashboard data..."
      />
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (errors.dashboard && !dashboard) {
    return (
      <div className="dashboard-error-wrapper">

        <ErrorMessage
          message={errors.dashboard}
          onRetry={() => dispatch(getDashboard())}
        />

      </div>
    );
  }


  /* =======================================================
     NO DATA
  ======================================================= */

  if (!dashboard) {
    return (
      <div className="dashboard-empty">

        <BarChart3 size={40} />

        <h2>
          No dashboard data available
        </h2>

        <p>
          The backend did not return dashboard statistics.
        </p>

        <button
          type="button"
          onClick={() => dispatch(getDashboard())}
        >
          Retry
        </button>

      </div>
    );
  }


  /* =======================================================
     DATABASE VALUES
  ======================================================= */

  const totalUsers =
    dashboard.totalUsers ?? 0;

  const totalBuyers =
    dashboard.totalBuyers ?? 0;

  const totalSellers =
    dashboard.totalSellers ?? 0;

  const totalAdmins =
    dashboard.totalAdmins ?? 0;

  const totalProducts =
    dashboard.totalProducts ?? 0;

  const verifiedProducts =
    dashboard.verifiedProducts ?? 0;

  const pendingProducts =
    dashboard.pendingProducts ?? 0;

  const totalApplications =
    dashboard.totalSellerApplications ?? 0;

  const verifiedApplications =
    dashboard.verifiedSellerApplications ?? 0;

  const pendingApplications =
    dashboard.pendingSellerApplications ?? 0;


  /* =======================================================
     DERIVED DATABASE FIGURES
  ======================================================= */

  const buyerPercentage =
    percentage(
      totalBuyers,
      totalUsers
    );

  const sellerPercentage =
    percentage(
      totalSellers,
      totalUsers
    );

  const adminPercentage =
    percentage(
      totalAdmins,
      totalUsers
    );

  const verifiedProductPercentage =
    percentage(
      verifiedProducts,
      totalProducts
    );

  const pendingProductPercentage =
    percentage(
      pendingProducts,
      totalProducts
    );


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="admin-dashboard-page">


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="dashboard-header">

        <div>

          <p className="dashboard-eyebrow">
            ADMIN
          </p>

          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="dashboard-description">
            Live platform statistics from the database.
          </p>

        </div>


        <button
          type="button"
          className="dashboard-header-badge"
          disabled={loading.dashboard}
          onClick={() => dispatch(getDashboard())}
        >

          <RefreshCw
            size={15}
            className={
              loading.dashboard
                ? "refresh-spinning"
                : ""
            }
          />

          {loading.dashboard
            ? "Refreshing..."
            : "Refresh data"}

        </button>

      </div>


      {/* ==================================================
          KPI CARDS
      ================================================== */}

      <section className="dashboard-kpi-grid">

        <StatCard
          icon={Users}
          label="Total users"
          value={totalUsers}
          subtitle="Registered accounts"
          progress={100}
          type="blue"
        />


        <StatCard
          icon={ShoppingBag}
          label="Buyers"
          value={totalBuyers}
          subtitle={`${buyerPercentage.toFixed(0)}% of users`}
          progress={buyerPercentage}
          type="green"
        />


        <StatCard
          icon={Store}
          label="Sellers"
          value={totalSellers}
          subtitle={`${sellerPercentage.toFixed(0)}% of users`}
          progress={sellerPercentage}
          type="purple"
        />


        <StatCard
          icon={ShieldCheck}
          label="Admins"
          value={totalAdmins}
          subtitle={`${adminPercentage.toFixed(0)}% of users`}
          progress={adminPercentage}
          type="orange"
        />


        <StatCard
          icon={Package}
          label="Total products"
          value={totalProducts}
          subtitle="Products listed"
          type="blue"
        />


        <StatCard
          icon={CheckCircle2}
          label="Verified products"
          value={verifiedProducts}
          subtitle={`${verifiedProductPercentage.toFixed(0)}% verified`}
          progress={verifiedProductPercentage}
          type="green"
        />


        <StatCard
          icon={Clock3}
          label="Pending products"
          value={pendingProducts}
          subtitle={`${pendingProductPercentage.toFixed(0)}% awaiting review`}
          progress={pendingProductPercentage}
          type="orange"
        />


        <StatCard
          icon={UserPlus}
          label="Seller applications"
          value={totalApplications}
          subtitle={`${pendingApplications} pending`}
          type="purple"
        />

      </section>


      {/* ==================================================
          CHARTS
      ================================================== */}

      <section className="dashboard-chart-grid">


        {/* USER DISTRIBUTION */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                User distribution
              </h2>

              <p>
                Current user roles from database
              </p>

            </div>

            <div className="panel-icon">
              <Users size={18} />
            </div>

          </div>


          <div className="user-distribution">

            <div className="user-donut">

              <DonutChart
                value={totalBuyers}
                total={totalUsers}
                label="Buyers"
                colorClass="blue"
              />

            </div>


            <div className="user-bars">

              <HorizontalBar
                icon={ShoppingBag}
                label="Buyers"
                value={totalBuyers}
                total={totalUsers}
              />

              <HorizontalBar
                icon={Store}
                label="Sellers"
                value={totalSellers}
                total={totalUsers}
              />

              <HorizontalBar
                icon={ShieldCheck}
                label="Admins"
                value={totalAdmins}
                total={totalUsers}
              />

            </div>

          </div>

        </div>


        {/* PRODUCT VERIFICATION */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Product verification
              </h2>

              <p>
                Current product verification status
              </p>

            </div>

            <div className="panel-icon">
              <Package size={18} />
            </div>

          </div>


          <div className="verification-chart">

            <DonutChart
              value={verifiedProducts}
              total={totalProducts}
              label="Verified"
              colorClass="green"
            />


            <div className="verification-details">

              <div className="verification-item">

                <span className="legend-dot verified" />

                <div>

                  <span>
                    Verified products
                  </span>

                  <strong>
                    {formatNumber(verifiedProducts)}
                  </strong>

                </div>

              </div>


              <div className="verification-item">

                <span className="legend-dot pending" />

                <div>

                  <span>
                    Pending products
                  </span>

                  <strong>
                    {formatNumber(pendingProducts)}
                  </strong>

                </div>

              </div>


              <div className="verification-total">

                <span>
                  Total products
                </span>

                <strong>
                  {formatNumber(totalProducts)}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          SELLER APPLICATIONS
      ================================================== */}

      <section
        className="dashboard-panel seller-application-panel dashboard-clickable-panel"
        onClick={() =>
          navigate("/admin/verification/sellers")
        }
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            navigate("/admin/verification/sellers");
          }

        }}
      >

        <div className="dashboard-panel-header">

          <div>

            <h2>
              Seller applications
            </h2>

            <p>
              Seller verification status from database
            </p>

          </div>

          <div className="panel-icon">
            <Store size={18} />
          </div>

        </div>


        <div className="application-grid">

          <ApplicationStatus
            icon={UserCheck}
            label="Verified sellers"
            value={verifiedApplications}
            total={totalApplications}
            type="success"
          />


          <ApplicationStatus
            icon={Clock3}
            label="Pending applications"
            value={pendingApplications}
            total={totalApplications}
            type="warning"
          />


          <ApplicationStatus
            icon={BarChart3}
            label="Total applications"
            value={totalApplications}
            total={totalApplications}
            type="info"
          />

        </div>


        <div className="dashboard-panel-footer" 
        onClick={() =>
          navigate("/admin/verification/sellers")
        }>

          <span>
            Manage seller applications
          </span>

          <span className="dashboard-panel-link">
            View seller verification
            <ArrowRight size={15} />
          </span>

        </div>

      </section>


      {/* ==================================================
          PRODUCT VERIFICATION SHORTCUT
      ================================================== */}

      <section
        className="dashboard-panel product-verification-shortcut dashboard-clickable-panel"
        onClick={() =>
          navigate("/admin/verification/products")
        }
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            navigate("/admin/verification/products");
          }

        }}
      >

        <div className="dashboard-panel-header">

          <div>

            <h2>
              Product verification
            </h2>

            <p>
              Review products waiting for admin approval
            </p>

          </div>

          <div className="panel-icon">
            <Package size={18} />
          </div>

        </div>


        <div className="product-review-summary">

          <div>

            <span>
              Pending products
            </span>

            <strong>
              {formatNumber(pendingProducts)}
            </strong>

          </div>


          <div>

            <span>
              Verified products
            </span>

            <strong>
              {formatNumber(verifiedProducts)}
            </strong>

          </div>


          <div>

            <span>
              Total products
            </span>

            <strong>
              {formatNumber(totalProducts)}
            </strong>

          </div>

        </div>


        <div className="dashboard-panel-footer">

          <span>
            Manage product verification
          </span>

          <span className="dashboard-panel-link">
            View product verification
            <ArrowRight size={15} />
          </span>

        </div>

      </section>


      {/* ==================================================
          BOTTOM FIGURES
      ================================================== */}

      <section className="dashboard-bottom-grid">


        {/* PLATFORM FIGURES */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Platform figures
              </h2>

              <p>
                Live database aggregates
              </p>

            </div>

            <div className="panel-icon">
              <TrendingUp size={18} />
            </div>

          </div>


          <div className="figure-list">

            <div className="figure-row">
              <div>
                <Users size={17} />
                <span>Registered users</span>
              </div>

              <strong>
                {formatNumber(totalUsers)}
              </strong>
            </div>


            <div className="figure-row">
              <div>
                <ShoppingBag size={17} />
                <span>Buyer accounts</span>
              </div>

              <strong>
                {formatNumber(totalBuyers)}
              </strong>
            </div>


            <div className="figure-row">
              <div>
                <Store size={17} />
                <span>Seller accounts</span>
              </div>

              <strong>
                {formatNumber(totalSellers)}
              </strong>
            </div>


            <div className="figure-row">
              <div>
                <ShieldCheck size={17} />
                <span>Admin accounts</span>
              </div>

              <strong>
                {formatNumber(totalAdmins)}
              </strong>
            </div>


            <div className="figure-row">
              <div>
                <Package size={17} />
                <span>Products</span>
              </div>

              <strong>
                {formatNumber(totalProducts)}
              </strong>
            </div>

          </div>

        </div>


        {/* VERIFICATION HEALTH */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Verification health
              </h2>

              <p>
                Items requiring admin attention
              </p>

            </div>

            <div className="panel-icon">
              <ShieldCheck size={18} />
            </div>

          </div>


          <div className="health-card">


            <div className="health-item">

              <div className="health-item-left">

                <div className="health-icon success">
                  <CheckCircle2 size={18} />
                </div>

                <div>

                  <span>
                    Verified products
                  </span>

                  <small>
                    Successfully verified
                  </small>

                </div>

              </div>

              <strong>
                {formatNumber(verifiedProducts)}
              </strong>

            </div>


            <div className="health-item">

              <div className="health-item-left">

                <div className="health-icon warning">
                  <AlertCircle size={18} />
                </div>

                <div>

                  <span>
                    Pending products
                  </span>

                  <small>
                    Require admin review
                  </small>

                </div>

              </div>

              <strong>
                {formatNumber(pendingProducts)}
              </strong>

            </div>


            <div className="health-item">

              <div className="health-item-left">

                <div className="health-icon warning">
                  <Clock3 size={18} />
                </div>

                <div>

                  <span>
                    Pending seller applications
                  </span>

                  <small>
                    Waiting for approval
                  </small>

                </div>

              </div>

              <strong>
                {formatNumber(pendingApplications)}
              </strong>

            </div>


          </div>

        </div>

      </section>

    </div>
  );
}