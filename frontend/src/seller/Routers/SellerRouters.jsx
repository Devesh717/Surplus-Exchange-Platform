import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SellerDashboardPage from "../pages/SellerDashboardPage";
import SellerOrdersPage from "../pages/SellerOrdersPage";
import SellerOrderDetailsPage from "../pages/SellerOrderDetailsPage";
import SellerProfilePage from "../pages/SellerProfilePage";
import SellerProductsPage from "../customer/pages/SellerProductsPage/SellerProductsPage";
import CreateProductPage from "../customer/pages/SellerProductsPage/CreateProductPage";

export default function SellerRouters() {
  return (
    <Routes>

      {/* ================================
          SELLER DASHBOARD
          ================================ */}
      <Route
        path="dashboard"
        element={<SellerDashboardPage />}
      />

      {/* ================================
          SELLER PRODUCTS
          ================================ */}
      <Route
        path="products"
        element={<SellerProductsPage />}
      />

      <Route
        path="products/new"
        element={<CreateProductPage />}
      />

      {/* ================================
          SELLER ORDERS
          ================================ */}
      <Route
        path="orders"
        element={<SellerOrdersPage />}
      />

      <Route
        path="orders/:id"
        element={<SellerOrderDetailsPage />}
      />

      {/* ================================
          SELLER PROFILE
          ================================ */}
      <Route
        path="profile"
        element={<SellerProfilePage />}
      />

      {/* ================================
          UNKNOWN SELLER ROUTE
          ================================ */}
      <Route
        path="*"
        element={
          <Navigate
            to="/seller/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}