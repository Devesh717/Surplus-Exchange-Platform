import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CartPage from "../customer/pages/CartPage/CartPage";

function CartGuard({ children }) {
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  if (!token) return <Navigate to="/login" replace />;

  // Backend cart is available to BUYER and SELLER.
  if (role !== "BUYER" && role !== "SELLER") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default function CartRoutes() {
  console.log("[CART ROUTES] Rendering");

  return (
    <Routes>
      <Route
        path="/cart"
        element={
          <CartGuard>
            <CartPage />
          </CartGuard>
        }
      />
    </Routes>
  );
}
