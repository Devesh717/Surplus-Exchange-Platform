import React, { useEffect } from "react";
import {
  Users,
  Package,
  Store,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "../../../Store";
import { getReportSummary } from "../../state/Admin/Action";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

import "./styles/Reports.css";
export default function Reports() {
  const { state, dispatch } = useStore();
  const { report, loading, errors } = state.admin;

  useEffect(() => {
    dispatch(getReportSummary());
  }, [dispatch]);

  if (loading.report && !report) {
    return <Loader label="Loading report..." />;
  }

  if (errors.report && !report) {
    return (
      <ErrorMessage
        message={errors.report}
        onRetry={() => dispatch(getReportSummary())}
      />
    );
  }

  const cards = [
    ["Users", report?.totalUsers, Users],
    ["Buyers", report?.totalBuyers, Users],
    ["Sellers", report?.totalSellers, Store],
    ["Products", report?.totalProducts, Package],
    ["Verified products", report?.verifiedProducts, ShieldCheck],
    ["Pending products", report?.pendingProducts, Package],
    ["Seller applications", report?.totalSellerApplications, Store],
    ["Verified seller applications", report?.verifiedSellerApplications, ShieldCheck],
    ["Pending seller applications", report?.pendingSellerApplications, Store],
  ];

  return (
    <div className="admin-reports-page">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        Admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">Reports</h1>
      <p className="mt-1 text-sm text-gray-500">
        Current platform summary from the admin reporting endpoint.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value, Icon]) => (
          <div className="admin-report-card card p-5" key={label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {value ?? 0}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon size={19} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
