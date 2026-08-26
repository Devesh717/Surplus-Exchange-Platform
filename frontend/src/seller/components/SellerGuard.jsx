import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/** Protects seller-only pages. BUYER users are intentionally rejected here. */
export default function SellerGuard({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role !== "SELLER") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

/**
 * Seller application is different from seller dashboard:
 * - logged-out users must login first
 * - BUYER users are allowed to apply
 * - SELLER users are sent to their dashboard
 */
export function SellerApplicationGuard({ children }) {
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "SELLER") {
    return <Navigate to="/seller/dashboard" replace />;
  }

  return children;
}
